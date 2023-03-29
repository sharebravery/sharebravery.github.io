---
title: 前端导出合并二（ExcelJSuu）
date: 2022-10-23
tag:
  - excel
  - merge
categories:
  - vue
---

    基于国产ExcelJS封装的一个工具类，简化原有的函数操作。

```
export class ExcelJSuu {
  constructor(public worksheet: Worksheet) {}

  calcHeaders = calcHeaders;

  flatCells = flatCells;

  flatColumns = flatColumns;

  ColumnCount = 0;

  /**
   *根据间隔构造排及其合并数据
   *
   * @param {string[]} row
   * @param {number} interval
   * @return {*}  {{ row: string[][]; merges: Range[] }}
   * @memberof ExcelJSuu
   */
  buildRowAndMergesByInterval(row: string[], interval: number): { row: string[][]; merges: Range[] } {
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
  buildHeadersAndMerges(columns: IUuColumn[]): { headers: string[][]; merges: Range[] } {
    const m = calcHeaders(columns);

    const mgs = new Array(...m.values()).map((e) => [e.top, e.left, e.bottom, e.right] as Range);

    return {
      headers: flatCells(m),
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

    return tableData.reduce((pre, cur) => {
      const arr = [];
      flats.forEach((column) => {
        arr.push(cur[column.dataIndex]);
      });
      pre.push(arr);
      return pre;
    }, []);
  }

  /**
   *根据数据构建基本带边框的表格
   *
   * @param {IUuTableColumnsType} columns
   * @param {any[]} tableData
   * @return {*}  {string[][]}
   * @memberof ExcelJSuu
   */
  buildBaseSheet(columns: IUuTableColumnsType, tableData: any[], autoMerge = true): string[][] {
    const headersAndMgs = this.buildHeadersAndMerges(columns);

    const sheet = this.buildSheet(columns, tableData);

    sheet.unshift(...headersAndMgs.headers);

    this.worksheet.addRows(sheet);

    autoMerge && this.merges(headersAndMgs.merges);

    this.setWidthByColumns(columns);

    this.setDefaultStyleByColumn(1, this.worksheet.columnCount);

    return sheet;
  }

  /**
   *合并单元格
   *
   * @param {MergeCells} v
   * @memberof ExcelJSuu
   */
  merges(v: ([top: number, left: number, bottom: number, right: number] | number[])[]): void {
    v.forEach((item) => {
      this.worksheet.mergeCells(item as [top: number, left: number, bottom: number, right: number]);
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
   *设置指定范围填充
   *
   * @param {number} top
   * @param {number} left
   * @param {number} bottom
   * @param {number} right
   * @param {Fill} fill
   * @memberof ExcelJSuu
   */
  setFillByRange(top: number, left: number, bottom: number, right: number, fill: Fill) {
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

      column.eachCell(function (cell, rowNumber) {
        cell.border = {
          top: { style: 'thin', color: { argb: 'ff000000' } },
          left: { style: 'thin', color: { argb: 'ff000000' } },
          bottom: { style: 'thin', color: { argb: 'ff000000' } },
          right: { style: 'thin', color: { argb: 'ff000000' } },
        };
        cell.alignment = { vertical: 'middle', horizontal: 'center' };

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
  setStyleInViewByColumn(start: number, end: number, style?: Partial<Style>): void {
    rangeArray(start, end).forEach((num) => {
      const column = this.worksheet.getColumn(num);
      column.eachCell(function (cell, rowNumber) {
        for (const key in style) {
          cell[key] = style[key];
        }
      });
    });
  }

  /**
   *写入XLSX文件
   *
   * @param {Workbook} workbook
   * @memberof ExcelJSuu
   */
  async writeXLSXFile(workbook: Workbook, filename = this.worksheet.name): Promise<void> {
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/octet-stream' });

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
  async insertRowWithBuffer(workbook: Workbook, pos: number, values: any[]): Promise<Workbook> {
    const buffer = await workbook.xlsx.writeBuffer();

    const newWb = await workbook.xlsx.load(buffer);

    const worksheet = newWb.worksheets.find((e) => e.name === this.worksheet.name);

    if (!worksheet) {
      console.warn('找不到工作表');
      return;
    }

    worksheet.insertRow(pos, values);

    return newWb;
  }
}
```

- 用例

```
  /**
-
- @param queryHeader 第一排表头数组
- @param data 所有处理好的表格数据
  \*/
  async function exportTable(queryHeader = tableHeader1.value, data = tableData.value) {
  const workbook = exportTableByExcelJSuu(
  unref(columns) as IUuTableColumnsType,
  data,
  queryHeader ?? ['学校', '考试', '考试时间', '年级', '班级', '考试总分']
  );

const [worksheet] = workbook.worksheets;

worksheet.name = '全科成绩.xlsx';

const excelJSuu = new ExcelJSuu(worksheet);

const length = excelJSuu.flatColumns(unref(columns) as IUuTableColumnsType).length;

excelJSuu.setFillByRange(1, 1, 3, length, {
type: 'pattern',
pattern: 'solid',
fgColor: { argb: 'ffc2f8ed' },
});

excelJSuu.writeXLSXFile(workbook);
}

```
