---
title: 前端表格导出合并三（ExcelJSuu 终版）
date: 2022-10-24
tag:
  - excel
  - ts
categories:
  - vue
---

# 介绍

业务需要需要导出合并多个表格，为此写了这个工具类，简化了 ExcelJS 原有的函数操作，并能够根据数据结构直接合并表头，省去不少针对每个表格定制合并的心力。该工具类 ExcelJSuu 提供了一系列操作 Excel 的方法，包括构建表头、构建 sheet 二维数据结构、构建基本带边框的表格、合并单元格、设置宽高、设置样式等。

## 几个比较重要的函数

先观察一下 sheetjs !merges 函数合并所需要的数据

```
workSheet['!merges'] =  [ { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } } ];
```

ExccelJS 的则是

```
// 按开始行，开始列，结束行，结束列合并
worksheet.mergeCells(10,11,12,13);
```

可见他们的原理是差不多的，我们的目标就是要得到这种数据

### 1. calcHeaders

该方法用于计算表头，返回一个 Map 对象，其中 key 为表头列，value 为该列的位置信息。这是一个核心的方法，我司使用的 UI 框架是 antdv，此函数根据 UI 所需的数据结构来计算表格合并的行列数据。

```typescript
interface IUuColumn {
  title: string;

  key: string;

  width: number;

  children: Array<IUuColumn>;
}

type IUuColumnMap = Map<IUuColumn, { top: number; bottom: number; left: number; right: number }>;

calcHeaders(columns: IUuColumn[]): IUuColumnMap {
  let totalCol = 1;
  let totalRow = 1;
  const m = new Map<IUuColumn, { top: number; bottom: number; left: number; right: number }>();

  columns.forEach((c, i) => inspectTLR(c as IUuColumn, i));
  inspectBottom();
  return m;

  function inspectTLR(column: IUuColumn, childIndex: number, parent?: IUuColumn) {
    const top = parent ? m.get(parent).top + 1 : 1;
    if (top > totalRow) {
      totalRow = top;
    }
    m.set(column, {
      top,
      bottom: 0,
      left: childIndex > 0 ? ++totalCol : totalCol,
      right: 0,
    });
    if (column.children && column.children.length > 0) {
      column.children.forEach((c, i) => inspectTLR(c, i, column));
    }
    m.get(column).right = column.children ? m.get(column.children.at(-1)).right : m.get(column).left;
  }
  function inspectBottom() {
    for (const [column, c] of m.entries()) {
      if (column.children && column.children.length > 0) {
        c.bottom = c.top;
      } else {
        c.bottom = totalRow;
      }
    }
  }
}
```

### 2. flatCells

该方法用于将表头 Map 对象扁平化成二维数组，方便后续操作。

```typescript
export function flatCells(m: IUuColumnMap): string[][] {
  const a = new Array(...m.entries());
  const cells = rangeArray(0, a.at(-1)[1].bottom - 1).map((_) =>
    new Array(a.at(-1)[1].right).fill(null)
  );
  a.forEach(
    ([column, location]) =>
      (cells[location.top - 1][location.left - 1] = column.title)
  );

  return cells;
}
```

### 3.writeXLSXFile

```typescript
/**
   *写入XLSX文件
   *
   * @param {Workbook} workbook
   * @memberof ExcelJSuu
   */
  async writeXLSXFile(workbook: Workbook = this.worksheet.workbook, filename = this.worksheet.name): Promise<void> {
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/octet-stream' });

    openDownloadDialog(blob, filename);
  }

/**
 * 下载对话框
 * @param url 下载地址，也可以是一个blob对象，必选
 * @param saveName 文件名，可选
 */
export function openDownloadDialog(url: Blob | string, saveName = '导出文件.xlsx') {
  if (typeof url == 'object' && url instanceof Blob) {
    url = URL.createObjectURL(url);
  }
  const aLink = document.createElement('a');
  aLink.href = url;
  aLink.download = saveName || '';
  let event = null;
  if (window.MouseEvent) event = new MouseEvent('click');
  else {
    event = document.createEvent('MouseEvents');
    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
  }
  aLink.dispatchEvent(event);
}
```

### 4. insertBase64Image

中途还有一个有趣的函数，因为表格中需要插入图表，正好我们用的 antv g2plot 可以提供 base64 的图片形式，所以在构造表格的时候就顺便把图表插进数据源了,在这里判断一下是 base64 的数据的话就调用 ExcelJS 插入图片的函数。

```typescript
insertBase64Image(sheetData: any[][], insertRowCount: number = this.insertRowCount) {
    for (let x = 0; x < sheetData.length; x++) {
      const item = sheetData[x];

      for (let y = 0; y < item.length; y++) {
        const v = item[y];

        if (validateBase64(v)) {
          const imageId = this.worksheet.workbook.addImage({
            base64: v,
            extension: 'png',
          });

          this.worksheet.addImage(imageId, {
            tl: { col: y, row: x + insertRowCount },
            ext: { width: 500, height: 200 },
          });

          this.worksheet.getCell(x + 1, y + 1).value = null;
        }
      }
    }
  }
```

# 完整代码

```typescript
import { rangeArray } from "@/utils/util";
import type { Fill, Style, Workbook, Worksheet } from "exceljs";

export type IUuTableColumnsType = (IUuColumn & {
  children: IUuTableColumnsType;
  dataIndex: string;
})[];

export type Range = [top: number, left: number, bottom: number, right: number];

export interface IUuColumn {
  title: string;

  key: string;

  width: number;

  children: Array<IUuColumn>;
}

export type IUuColumnMap = Map<
  IUuColumn,
  { top: number; bottom: number; left: number; right: number }
>;

/**
 * 下载对话框
 * @param url 下载地址，也可以是一个blob对象，必选
 * @param saveName 文件名，可选
 */
export function openDownloadDialog(
  url: Blob | string,
  saveName = "导出文件.xlsx"
) {
  if (typeof url == "object" && url instanceof Blob) {
    url = URL.createObjectURL(url);
  }
  const aLink = document.createElement("a");
  aLink.href = url;
  aLink.download = saveName || "";
  let event = null;
  if (window.MouseEvent) event = new MouseEvent("click");
  else {
    event = document.createEvent("MouseEvents");
    event.initMouseEvent(
      "click",
      true,
      false,
      window,
      0,
      0,
      0,
      0,
      0,
      false,
      false,
      false,
      false,
      0,
      null
    );
  }
  aLink.dispatchEvent(event);
}

validateBase64.regex =
  /^\s*data:([a-z]+\/[a-z0-9-+.]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s]*?)\s*$/i;
function validateBase64(s) {
  return validateBase64.regex.test(s);
}

export function calcHeaders(columns: IUuColumn[]): IUuColumnMap {
  let totalCol = 1;
  let totalRow = 1;
  const m = new Map<
    IUuColumn,
    { top: number; bottom: number; left: number; right: number }
  >();

  columns.forEach((c, i) => inspectTLR(c as IUuColumn, i));
  inspectBottom();
  return m;

  function inspectTLR(
    column: IUuColumn,
    childIndex: number,
    parent?: IUuColumn
  ) {
    const top = parent ? m.get(parent).top + 1 : 1;
    if (top > totalRow) {
      totalRow = top;
    }
    m.set(column, {
      top,
      bottom: 0,
      left: childIndex > 0 ? ++totalCol : totalCol,
      right: 0,
    });
    if (column.children && column.children.length > 0) {
      column.children.forEach((c, i) => inspectTLR(c, i, column));
    }
    m.get(column).right = column.children
      ? m.get(column.children.at(-1)).right
      : m.get(column).left;
  }
  function inspectBottom() {
    for (const [column, c] of m.entries()) {
      if (column.children && column.children.length > 0) {
        c.bottom = c.top;
      } else {
        c.bottom = totalRow;
      }
    }
  }
}

export function flatCells(m: IUuColumnMap): string[][] {
  const a = new Array(...m.entries());
  const cells = rangeArray(0, a.at(-1)[1].bottom - 1).map((_) =>
    new Array(a.at(-1)[1].right).fill(null)
  );
  a.forEach(
    ([column, location]) =>
      (cells[location.top - 1][location.left - 1] = column.title)
  );

  return cells;
}

/**
 *扁平化表头
 *
 * @export
 * @template T
 * @param {T} columns
 * @param {*} [flats=[] as T]
 * @return {*}  {T}
 */
export function flatColumns<T extends IUuTableColumnsType>(
  columns: T,
  flats = [] as T
): T {
  columns.forEach((e) => {
    if (e?.children?.length > 0) {
      flatColumns(e.children as any, flats);
    }
    if (e?.dataIndex && (e?.children?.length ?? 0) == 0) {
      flats.push(e);
    }
  });
  return flats;
}

export class ExcelJSuu {
  constructor(public worksheet: Worksheet) {}

  calcHeaders = calcHeaders;

  flatCells = flatCells;

  flatColumns = flatColumns;

  public columnCount = 0;

  public rowCount = 0;

  public headersRowCount = 0;

  public insertRowCount = 0;

  get tableRowCount() {
    return this.headersRowCount + this.rowCount;
  }

  /**
   *根据间隔构造排及其合并数据
   *
   * @param {string[]} row
   * @param {number} interval
   * @return {*}  {{ row: string[][]; merges: Range[] }}
   * @memberof ExcelJSuu
   */
  buildRowAndMergesByInterval(
    row: string[],
    interval: number
  ): { row: string[][]; merges: Range[] } {
    const newRow = row.reduce((pre, cur) => {
      if (pre.length + 1 == row.length * interval) {
        pre.push(cur);
      } else {
        pre.push(...[cur, ...new Array(interval)]);
      }
      return pre;
    }, []);

    const merges = rangeArray(1, newRow.length)
      .map((num, i) => {
        if (i % (interval + 1) === 0) {
          return [1, num, 1, num + interval];
        }
        return [];
      })
      .filter((e) => e.length !== 0) as Range[];

    return {
      row: newRow,
      merges,
    };
  }

  /**
   *构建表头
   *
   * @param {IUuColumn[]} columns
   * @return {*}  {string[][]}
   * @memberof ExcelJSuu
   */
  buildHeadersAndMerges(columns: IUuColumn[]): {
    headers: string[][];
    merges: Range[];
  } {
    const m = calcHeaders(columns);

    const mgs = new Array(...m.values()).map(
      (e) => [e.top, e.left, e.bottom, e.right] as Range
    );

    const headers = flatCells(m);

    return {
      headers,
      merges: mgs,
    };
  }

  /**
   *构建sheet二维数据结构
   *
   * @param {IUuTableColumnsType} flatColumns
   * @param {any[]} tableData
   * @return {*}  {string[][]}
   * @memberof ExcelJSuu
   */
  buildSheet(columns: IUuTableColumnsType, tableData: any[]): string[][] {
    const flats = flatColumns(columns);

    this.columnCount = flats.length;

    const sheet = tableData.reduce((pre, cur) => {
      const arr = [];

      flats.forEach((column) => {
        arr.push(cur[column.dataIndex]);
      });
      pre.push(arr);

      return pre;
    }, []);

    return sheet;
  }

  /**
   *根据数据构建基本带边框的表格
   *
   * @param {IUuTableColumnsType} columns
   * @param {any[]} tableData
   * @return {*}  {string[][]}
   * @memberof ExcelJSuu
   */
  buildBaseSheet(
    columns: IUuTableColumnsType,
    tableData: any[],
    autoMerge = true,
    insertRowCount = 0
  ): string[][] {
    const headersAndMgs = this.buildHeadersAndMerges(columns);

    const sheet = this.buildSheet(columns, tableData);

    sheet.unshift(...headersAndMgs.headers);

    this.worksheet.addRows(sheet);

    autoMerge && this.merges(headersAndMgs.merges);

    this.setWidthByColumns(columns);

    this.setDefaultStyleByColumn(1, this.columnCount);

    this.insertBase64Image(sheet, insertRowCount);

    this.rowCount = sheet.length;

    this.headersRowCount = headersAndMgs.headers.length;

    return sheet;
  }

  /**
   *合并单元格
   *
   * @param {MergeCells} v
   * @memberof ExcelJSuu
   */
  merges(
    v: ([top: number, left: number, bottom: number, right: number] | number[])[]
  ): void {
    v.forEach((item) => {
      this.worksheet.mergeCells(
        item as [top: number, left: number, bottom: number, right: number]
      );
    });
  }

  /**
   *根据columns的width属性调整表格宽度
   *
   * @param {IUuTableColumnsType} columns
   * @memberof ExcelJSuu
   */
  setWidthByColumns(columns: IUuTableColumnsType) {
    const flats = flatColumns(columns);
    flats.forEach((column, index) => {
      this.worksheet.getColumn(index + 1).width = column.width / 5;
    });
  }

  /**
   *设置表头的填充和冻结
   *
   * @param {string} [argb='ffc2f8ed']
   * @memberof ExcelJSuu
   */
  setColumnsFillAndFreeze(
    range: Range = [1, 1, this.headersRowCount, this.columnCount],
    argb = "ffc2f8ed"
  ) {
    this.worksheet.views = [{ state: "frozen", xSplit: 0, ySplit: range[2] }];

    this.setFillByRange(...range, {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb },
    });
  }

  /**
   *设置指定范围填充
   *
   * @param {number} top
   * @param {number} left
   * @param {number} bottom
   * @param {number} right
   * @param {Fill} fill
   * @memberof ExcelJSuu
   */
  setFillByRange(
    top: number,
    left: number,
    bottom: number,
    right: number,
    fill: Fill
  ) {
    const rows = this.worksheet.getRows(top, bottom);
    rangeArray(left, right).forEach((num) => {
      rows.forEach((row) => {
        row.getCell(num).fill = fill;
      });
    });
  }

  /**
   *设置默认样式 边框 居中
   *
   * @param {number} start
   * @param {number} end
   * @param {object} style
   * @memberof ExcelJSuu
   */
  setDefaultStyleByColumn(start: number, end: number, style?: Partial<Style>) {
    rangeArray(start, end).forEach((num) => {
      const column = this.worksheet.getColumn(num);

      column.eachCell(function (cell) {
        cell.border = {
          top: { style: "thin", color: { argb: "ff000000" } },
          left: { style: "thin", color: { argb: "ff000000" } },
          bottom: { style: "thin", color: { argb: "ff000000" } },
          right: { style: "thin", color: { argb: "ff000000" } },
        };
        cell.alignment = {
          vertical: "middle",
          horizontal: "center",
          wrapText: true,
        };

        for (const key in style) {
          cell[key] = style[key];
        }
      });
    });
  }

  /**
   *设置宽高
   *
   * @param {number} start
   * @param {number} end
   * @param {number} width
   * @param {number} height
   * @memberof ExcelJSuu
   */
  setWidthAndHeight(start: number, end: number, width: number, height: number) {
    rangeArray(start, end).forEach((num) => {
      const column = this.worksheet.getColumn(num);

      column.width = width;
    });

    const rows = this.worksheet.getRows(start, end);

    rows.forEach((row) => {
      row.height = height;
    });
  }

  /**
   *获取当前范围的列
   *
   * @param {number} start
   * @param {number} end
   * @return {*}
   * @memberof ExcelJSuu
   */
  getRangeByColumn(start: number, end: number) {
    return rangeArray(start, end).flatMap((num) => {
      const column = this.worksheet.getColumn(num);
      return [column];
    });
  }

  /**
   *根据列来设置当前范围的样式
   *
   * @param {number} start
   * @param {number} end
   * @param {object} [style]
   * @memberof ExcelJSuu
   */
  setStyleInViewByColumn(
    start: number,
    end: number,
    style?: Partial<Style>
  ): void {
    rangeArray(start, end).forEach((num) => {
      const column = this.worksheet.getColumn(num);
      column.eachCell(function (cell) {
        for (const key in style) {
          cell[key] = style[key];
        }
      });
    });
  }

  insertBase64Image(
    sheetData: any[][],
    insertRowCount: number = this.insertRowCount
  ) {
    for (let x = 0; x < sheetData.length; x++) {
      const item = sheetData[x];

      for (let y = 0; y < item.length; y++) {
        const v = item[y];

        if (validateBase64(v)) {
          const imageId = this.worksheet.workbook.addImage({
            base64: v,
            extension: "png",
          });

          this.worksheet.addImage(imageId, {
            tl: { col: y, row: x + insertRowCount },
            ext: { width: 500, height: 200 },
          });

          this.worksheet.getCell(x + 1, y + 1).value = null;
        }
      }
    }
  }

  insertRow(pos: number, value: any, style?: string) {
    this.worksheet.insertRow(pos, value, style);
    this.insertRowCount += pos;
  }

  /**
   *写入XLSX文件
   *
   * @param {Workbook} workbook
   * @memberof ExcelJSuu
   */
  async writeXLSXFile(
    workbook: Workbook = this.worksheet.workbook,
    filename = this.worksheet.name
  ): Promise<void> {
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: "application/octet-stream" });

    openDownloadDialog(blob, filename);
  }

  /**
   *将row插入工作簿流 不会破坏原有的结构 并返回新的工作簿
   *
   * @param {Workbook} workbook
   * @param {number} pos
   * @param {any[]} values
   * @return {*}  {Promise<Workbook>}
   * @memberof ExcelJSuu
   */
  async insertRowWithBuffer(
    workbook: Workbook,
    pos: number,
    values: any[]
  ): Promise<Workbook> {
    const buffer = await workbook.xlsx.writeBuffer();

    const newWb = await workbook.xlsx.load(buffer);

    const worksheet = newWb.worksheets.find(
      (e) => e.name === this.worksheet.name
    );

    if (!worksheet) {
      console.warn("找不到工作表");
      return;
    }

    worksheet.insertRow(pos, values);

    return newWb;
  }
}
```
