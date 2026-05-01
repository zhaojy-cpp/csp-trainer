import React, { useState, useEffect } from "react";

const sections = ["决策树", "训练题单", "模型训练", "错题本", "进度统计"];

const problems = [ { id: "P1001", name: "A+B", tag: "模拟", link: "https://www.luogu.com.cn/problem/P1001" }, { id: "P1046", name: "陶陶摘苹果", tag: "枚举", link: "https://www.luogu.com.cn/problem/P1046" }, { id: "P1216", name: "数字三角形", tag: "DP", link: "https://www.luogu.com.cn/problem/P1216" }, { id: "P3371", name: "最短路", tag: "图论", link: "https://www.luogu.com.cn/problem/P3371" }, { id: "P3367", name: "并查集", tag: "数据结构", link: "https://www.luogu.com.cn/problem/P3367" }, ];

const quiz = [ { q: "给定数组求最大子段和", options: ["DP", "图论", "枚举"], answer: "DP", }, { q: "求城市之间最短路径", options: ["DP", "图论", "贪心"], answer: "图论", }, ];

export default function App() { const [active, setActive] = useState("决策树"); const [done, setDone] = useState({}); const [score, setScore] = useState(0); const [mistakes, setMistakes] = useState([]);

// ✅ 本地存储加载 useEffect(() => { const d = localStorage.getItem("done"); const s = localStorage.getItem("score"); const m = localStorage.getItem("mistakes"); if (d) setDone(JSON.parse(d)); if (s) setScore(Number(s)); if (m) setMistakes(JSON.parse(m)); }, []);

// ✅ 自动保存 useEffect(() => { localStorage.setItem("done", JSON.stringify(done)); localStorage.setItem("score", score); localStorage.setItem("mistakes", JSON.stringify(mistakes)); }, [done, score, mistakes]);

return ( <div className="p-6 max-w-5xl mx-auto"> <h1 className="text-3xl font-bold mb-6">🚀 CSP训练系统（终版）</h1>

<div className="flex gap-3 mb-6 flex-wrap">
    {sections.map((s) => (
      <button
        key={s}
        onClick={() => setActive(s)}
        className={`px-4 py-2 rounded-2xl ${active === s ? "bg-black text-white" : "bg-gray-200"}`}
      >
        {s}
      </button>
    ))}
  </div>

  {active === "决策树" && <Decision />}
  {active === "训练题单" && (
    <Problems done={done} setDone={setDone} setMistakes={setMistakes} />
  )}
  {active === "模型训练" && (
    <Quiz score={score} setScore={setScore} />
  )}
  {active === "错题本" && <Mistakes mistakes={mistakes} />}
  {active === "进度统计" && <Stats done={done} />}
</div>

); }

function Decision() { return ( <div> <h2 className="text-xl font-semibold mb-3">3秒决策树</h2> <ul className="list-disc pl-6"> <li>最优 → DP</li> <li>路径 → 图论</li> <li>区间 → 前缀和 / DP</li> <li>方案 → 枚举 / DP</li> <li>单调 → 二分 / 贪心</li> </ul> </div> ); }

function Problems({ done, setDone, setMistakes }) { const toggle = (p) => { const newDone = { ...done, [p.id]: !done[p.id] }; setDone(newDone);

if (!newDone[p.id]) {
  const reason = prompt("记录错因:");
  if (reason) {
    setMistakes((prev) => [...prev, { ...p, reason }]);
  }
}

};

return ( <div> <h2 className="text-xl font-semibold mb-3">训练题单</h2> <ul className="space-y-2"> {problems.map((p) => ( <li key={p.id} className="flex justify-between items-center"> <a href={p.link} target="_blank" rel="noreferrer" className="underline"> {p.id} {p.name} 【{p.tag}】 </a> <button onClick={() => toggle(p)} className="px-2 py-1 bg-gray-200 rounded"> {done[p.id] ? "✅" : "❌"} </button> </li> ))} </ul> </div> ); }

function Quiz({ score, setScore }) { return ( <div> <h2 className="text-xl font-semibold mb-3">模型识别训练</h2> {quiz.map((q, i) => ( <div key={i} className="mb-4"> <p>{q.q}</p> <div className="flex gap-2 mt-2"> {q.options.map((op) => ( <button key={op} onClick={() => { if (op === q.answer) setScore(score + 1); }} className="px-3 py-1 bg-gray-200 rounded" > {op} </button> ))} </div> </div> ))} <p className="mt-4">得分：{score}</p> </div> ); }

function Mistakes({ mistakes }) { return ( <div> <h2 className="text-xl font-semibold mb-3">错题本</h2> {mistakes.length === 0 ? ( <p>暂无错题</p> ) : ( <ul className="space-y-2"> {mistakes.map((m, i) => ( <li key={i} className="bg-gray-100 p-3 rounded"> <p>{m.id} {m.name} 【{m.tag}】</p> <p className="text-sm text-gray-600">错因：{m.reason}</p> </li> ))} </ul> )} </div> ); }

function Stats({ done }) { const total = problems.length; const completed = Object.values(done).filter(Boolean).length;

return ( <div> <h2 className="text-xl font-semibold mb-3">进度统计</h2> <p>已完成：{completed} / {total}</p> <div className="w-full bg-gray-200 h-4 rounded mt-2"> <div className="bg-black h-4 rounded" style={{ width: ${(completed / total) * 100}% }}></div> </div> </div> ); }
