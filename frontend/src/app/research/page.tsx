"use client";

import { useState } from "react";

export default function ResearchPage() {
  const [niche, setNiche] = useState("");
  const [region, setRegion] = useState("");
  const [audience, setAudience] = useState("");
  const [report, setReport] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    const prompt = `Niche: ${niche}, Region: ${region}, Audience: ${audience}`;
    const res = await fetch("http://localhost:8000/api/research", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();
    setReport(data.report);
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">InsightMiner AI</h1>
      <input className="input" value={niche} onChange={e => setNiche(e.target.value)} placeholder="Niche (e.g. Sustainable Fashion)" />
      <input className="input" value={region} onChange={e => setRegion(e.target.value)} placeholder="Region (e.g. Europe)" />
      <input className="input" value={audience} onChange={e => setAudience(e.target.value)} placeholder="Audience (e.g. Gen Z Females)" />
      <button onClick={handleGenerate} className="btn mt-4">{loading ? "Generating..." : "Generate Report"}</button>

      {report && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg whitespace-pre-wrap">
          {report}
        </div>
      )}
    </div>
  );
}
