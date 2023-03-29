import{_ as e,W as n,X as i,Z as s}from"./framework-dc03c577.js";const d={},l=s(`<pre><code>业务需要，做了个前端导出，使用了XLSX，由于有部分数据长度不固定，所以合并范围需要动态计算。
后面需要调整样式，发现 XLSX 开源版本不支持，切换到国产 ExcelJS，并基于此封装了一个工具类
ExcelJSuu（文章二）,封装简化了插件提供的函数，并可以根据页面渲染所需的相同树形数据结构直接
计算出合并范围，最后封装完整后只需要直接传入表头和表格数据即可。
</code></pre><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/**
 *
 * @param queryHeader 第一排表头数组
 */
async function exportTable(queryHeader = tableHeader1.value) {
  const header1 = queryHeader ?? [&#39;学校&#39;, &#39;考试&#39;, &#39;考试时间&#39;, &#39;年级&#39;, &#39;班级&#39;, &#39;科目&#39;, &#39;考试总分&#39;];

  const header2 = [&#39;学号&#39;, &#39;姓名&#39;, &#39;班级&#39;];

  const dynamic = [&#39;分数&#39;, &#39;联考排名&#39;, &#39;学校排名&#39;, &#39;班级排名&#39;];

  const headers: [headerRow1: string[], headerRow2: string[], headerRow2: string[]] = [
    [],
    [...header2],
    new Array(header2.length + 1),
  ];
  const [headerRow1, headerRow2, headerRow3] = headers;

  const params = deepCopy(showScoreParams.value);
  params.limit = 100000000;

  const { items } = await api.Internal.ScoreAnalysis.GetScoreRanking_PostAsync(params, []);
  if (items?.length == 0) return;

  const [firstItem] = items;

  firstItem.scoreDetail
    .map((e) =&gt; e.subjectName)
    .forEach((subjectName) =&gt; {
      headerRow2.push(...[subjectName, ...new Array(dynamic.length - 1)]);
    });

  const interval = Math.floor(headerRow2.length / header1.length) - 1; // 间隔

  header1.reduce((pre, cur) =&gt; {
    // pre.push(...[cur, ...new Array(interval)]);
    headerRow1.push(...[cur, ...new Array(interval)]);
    return pre;
  }, []);

  for (let i = 0; i &lt; firstItem.scoreDetail.length; i++) {
    headerRow3.push(...dynamic);
  }

  const sheet = items.reduce((pre, cur) =&gt; {
    const { studentName, internalStudentNumber, schoolName, className, examName } = cur.info;

    const row: (string | number)[] = [internalStudentNumber, studentName, className];

    cur.scoreDetail.forEach((item) =&gt; {
      const { subjectName, score, unionExamRanking, ranking, classRanking } = item;

      row.push(...[score, unionExamRanking, ranking, classRanking]);
    });

    pre.push(row);

    return pre;
  }, []);

  sheet.unshift(...headers);

  const ws = utils.aoa_to_sheet(sheet);

  /**
   * 构造固定列，无定数列表头所合并行列坐标范围
   */
  const headerRow1MG = rangeArray(0, headerRow1.length - 1).flatMap((num, i) =&gt; {
    if (i % (interval + 1) === 0) {
      return {
        s: { c: num, r: 0 },
        e: { c: num + interval, r: 0 },
      };
    }
    return [];
  });

  const headerRow2MG = rangeArray(0, header2.length - 1).map((num) =&gt; ({
    s: { c: num, r: 1 },
    e: { c: num, r: 2 },
  }));

  const headerRow2DynamicMG = rangeArray(header2.length, headerRow2.length).flatMap((num, i) =&gt; {
    if (i % dynamic.length === 0) {
      return {
        s: { c: num, r: 1 },
        e: { c: num + dynamic.length - 1, r: 1 },
      };
    }
    return [];
  });

  ws[&#39;!merges&#39;] = [...headerRow1MG, ...headerRow2MG.concat(headerRow2DynamicMG)];

   ws[&#39;!cols&#39;] = headerRow3.map((e) =&gt; ({ wpx: 120 }));
   ws[&#39;!rows&#39;] = headerRow3.map((e) =&gt; ({ hpx: 32 }));

   const wb = utils.book_new();
   utils.book_append_sheet(wb, ws, &#39;显示成绩&#39;);
   writeFile(wb, &#39;学生成绩信息.xlsx&#39;);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),r=[l];function a(v,c){return n(),i("div",null,r)}const m=e(d,[["render",a],["__file","mergeXLSX.html.vue"]]);export{m as default};
