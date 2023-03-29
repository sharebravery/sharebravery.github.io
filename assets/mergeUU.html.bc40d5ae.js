import{U as n,V as e,W as i,Y as l}from"./app.5c073211.js";import"./vendor.666c33a1.js";const s={},d=l(`<pre><code>基于国产ExcelJS封装的一个工具类，简化原有的函数操作。
</code></pre><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>export class ExcelJSuu {
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
    const newRow = row.reduce((pre, cur) =&gt; {
      if (pre.length + 1 == row.length * interval) {
        pre.push(cur);
      } else {
        pre.push(...[cur, ...new Array(interval)]);
      }
      return pre;
    }, []);

    const merges = rangeArray(1, newRow.length)
      .map((num, i) =&gt; {
        if (i % (interval + 1) === 0) {
          return [1, num, 1, num + interval];
        }
        return [];
      })
      .filter((e) =&gt; e.length !== 0) as Range[];

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

    const mgs = new Array(...m.values()).map((e) =&gt; [e.top, e.left, e.bottom, e.right] as Range);

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

    return tableData.reduce((pre, cur) =&gt; {
      const arr = [];
      flats.forEach((column) =&gt; {
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

    autoMerge &amp;&amp; this.merges(headersAndMgs.merges);

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
    v.forEach((item) =&gt; {
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
    flats.forEach((column, index) =&gt; {
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
    rangeArray(left, right).forEach((num) =&gt; {
      rows.forEach((row) =&gt; {
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
  setDefaultStyleByColumn(start: number, end: number, style?: Partial&lt;Style&gt;) {
    rangeArray(start, end).forEach((num) =&gt; {
      const column = this.worksheet.getColumn(num);

      column.eachCell(function (cell, rowNumber) {
        cell.border = {
          top: { style: &#39;thin&#39;, color: { argb: &#39;ff000000&#39; } },
          left: { style: &#39;thin&#39;, color: { argb: &#39;ff000000&#39; } },
          bottom: { style: &#39;thin&#39;, color: { argb: &#39;ff000000&#39; } },
          right: { style: &#39;thin&#39;, color: { argb: &#39;ff000000&#39; } },
        };
        cell.alignment = { vertical: &#39;middle&#39;, horizontal: &#39;center&#39; };

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
    rangeArray(start, end).forEach((num) =&gt; {
      const column = this.worksheet.getColumn(num);

      column.width = width;
    });

    const rows = this.worksheet.getRows(start, end);

    rows.forEach((row) =&gt; {
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
    return rangeArray(start, end).flatMap((num) =&gt; {
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
  setStyleInViewByColumn(start: number, end: number, style?: Partial&lt;Style&gt;): void {
    rangeArray(start, end).forEach((num) =&gt; {
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
  async writeXLSXFile(workbook: Workbook, filename = this.worksheet.name): Promise&lt;void&gt; {
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: &#39;application/octet-stream&#39; });

    openDownloadDialog(blob, filename);
  }

  /**
   *将row插入工作簿流 不会破坏原有的结构 并返回新的工作簿
   *
   * @param {Workbook} workbook
   * @param {number} pos
   * @param {any[]} values
   * @return {*}  {Promise&lt;Workbook&gt;}
   * @memberof ExcelJSuu
   */
  async insertRowWithBuffer(workbook: Workbook, pos: number, values: any[]): Promise&lt;Workbook&gt; {
    const buffer = await workbook.xlsx.writeBuffer();

    const newWb = await workbook.xlsx.load(buffer);

    const worksheet = newWb.worksheets.find((e) =&gt; e.name === this.worksheet.name);

    if (!worksheet) {
      console.warn(&#39;找不到工作表&#39;);
      return;
    }

    worksheet.insertRow(pos, values);

    return newWb;
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>用例</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>  /**
-
- @param queryHeader 第一排表头数组
- @param data 所有处理好的表格数据
  \\*/
  async function exportTable(queryHeader = tableHeader1.value, data = tableData.value) {
  const workbook = exportTableByExcelJSuu(
  unref(columns) as IUuTableColumnsType,
  data,
  queryHeader ?? [&#39;学校&#39;, &#39;考试&#39;, &#39;考试时间&#39;, &#39;年级&#39;, &#39;班级&#39;, &#39;考试总分&#39;]
  );

const [worksheet] = workbook.worksheets;

worksheet.name = &#39;全科成绩.xlsx&#39;;

const excelJSuu = new ExcelJSuu(worksheet);

const length = excelJSuu.flatColumns(unref(columns) as IUuTableColumnsType).length;

excelJSuu.setFillByRange(1, 1, 3, length, {
type: &#39;pattern&#39;,
pattern: &#39;solid&#39;,
fgColor: { argb: &#39;ffc2f8ed&#39; },
});

excelJSuu.writeXLSXFile(workbook);
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4),r=[d];function v(a,u){return e(),i("div",null,r)}const b=n(s,[["render",v],["__file","mergeUU.html.vue"]]);export{b as default};
