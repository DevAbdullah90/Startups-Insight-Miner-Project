"use client";
import { ShieldCheck, BrainCircuit } from "lucide-react";

interface Props {
  report: string;
}


const renderInlineFormatting = (text: string) => {
  // Regex to find text wrapped in double asterisks, e.g., **Hello World**
  // The 'g' flag is crucial to find all occurrences, not just the first one.
  const parts = text.split(/(\*\*.*?\*\*)/g);

  return parts.map((part, i) => {
    // If the part matches the bold format...
    if (part.startsWith('**') && part.endsWith('**')) {
      // ...render it as a <strong> tag without the asterisks.
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    // Otherwise, it's just regular text.
    return part;
  });
};

const ReportResult = ({ report }: Props) => {
  if (!report) return null;

  // The main formatting function, now smarter.
  const formatReport = (text: string) => {
    // We process a block of list items together for correct <ul> wrapping
    const blocks = text.split(/(\n(?:-|\*)\s.*?(?=\n\n|\n[^\s*-]|$))/s);
    
    return text.split('\n').map((line, index) => {
      // Main Title (e.g., # Business Report)
      if (line.startsWith('# ') && !line.startsWith('##')) {
        return <h1 key={index} className="report-h1">{renderInlineFormatting(line.replace('# ', '').trim())}</h1>;
      }
      // Section Headers (e.g., ## Top 5 Competitors)
      if (line.startsWith('## ')) {
        return <h2 key={index} className="report-h2">{renderInlineFormatting(line.replace('## ', '').trim())}</h2>;
      }
      // Sub-Headers (e.g., ### Key Finding)
      if (line.startsWith('### ')) {
        return <h3 key={index} className="report-h3">{renderInlineFormatting(line.replace('### ', '').trim())}</h3>;
      }
      // Key Metric Cards: e.g., [Market Size: $500M]
      if (line.startsWith('[')) {
        const match = line.match(/\[(.*?):(.*?)\]/);
        if (match) {
          return (
            <div key={index} className="key-metric-card">
              <span className="metric-title">{match[1].trim()}</span>
              <span className="metric-value">{match[2].trim()}</span>
            </div>
          );
        }
      }
      // Blockquotes for insights (e.g., > This is important)
      if (line.startsWith('> ')) {
        return <blockquote key={index} className="insight-blockquote">{renderInlineFormatting(line.replace('> ', '').trim())}</blockquote>;
      }
      
      // List Items (Handles both * and -)
      if (line.startsWith('* ') || line.startsWith('- ')) {
        const content = line.substring(2);
        return <li key={index} className="report-li">{renderInlineFormatting(content)}</li>;
      }

      // Default paragraph (ensuring it's not an empty line)
      if(line.trim() !== "") {
        return <p key={index} className="report-p">{renderInlineFormatting(line)}</p>;
      }
      
      return null;
    });
  };

  // The JSX structure remains the same as it was already exceptionally designed.
  // The magic happens in the formatReport function above.
  return (
    <section className="report-section-bg">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white tracking-tight">Analysis Complete</h2>
        <p className="text-lg text-gray-400 mt-2">The Intelligence Dossier is ready for your review.</p>
      </div>

      <div id="report" className="report-document-container">
        <header className="report-header">
          <div className="flex items-center gap-4">
            <BrainCircuit className="w-10 h-10 text-blue-600" />
            <div>
              <h1 className="font-bold text-2xl text-gray-800 tracking-wider uppercase font-teko">Intelligence Report</h1>
              <p className="text-gray-500 text-sm">AI-Powered Market Analysis</p>
            </div>
          </div>
          <div className="text-right text-xs text-gray-500">
            <p><strong className="text-gray-700">Date Generated:</strong> {new Date().toLocaleDateString()}</p>
            <p><strong className="text-gray-700">Status:</strong> <span className="text-green-600 font-semibold">Complete</span></p>
            <p><strong className="text-gray-700">Confidentiality:</strong> Level 1</p>
          </div>
        </header>

        <main className="report-content">
          {formatReport(report)}
        </main>
        
        <footer className="report-footer">
            <ShieldCheck className="w-4 h-4 text-gray-400" />
            <p><strong>InsightMiner</strong> — Confidential & Proprietary. © {new Date().getFullYear()}.</p>
        </footer>
      </div>

      {/* The CSS for the insane design remains unchanged */}
      <style jsx global>{`
        .font-teko { font-family: 'Teko', sans-serif; }
        .report-section-bg {
          padding: 4rem 1rem;
          background-color: #111827;
          background-image: radial-gradient(#26324a 1px, transparent 1px);
          background-size: 24px 24px;
        }
        .report-document-container {
          max-width: 8.5in;
          min-height: 11in;
          margin: 0 auto;
          background: white;
          padding: 0.75in;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
          border-radius: 4px;
          font-family: 'Roboto', sans-serif;
          display: flex;
          flex-direction: column;
        }
        .report-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          border-bottom: 4px solid #1e3a8a;
          padding-bottom: 1.5rem;
        }
        .report-footer {
          margin-top: auto;
          padding-top: 1rem;
          border-top: 1px solid #e5e7eb;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-size: 0.75rem;
          color: #6b7280;
        }
        .report-content {
          padding: 2rem 0;
          flex-grow: 1;
        }
        .report-h1 { font-family: 'Teko', sans-serif; font-size: 3rem; font-weight: 700; letter-spacing: 0.5px; color: #111827; margin-bottom: 2rem; text-align: center; }
        .report-h2 { font-family: 'Teko', sans-serif; font-size: 2rem; font-weight: 600; color: #1e3a8a; margin-top: 2.5rem; margin-bottom: 1rem; border-bottom: 2px solid #dbeafe; padding-bottom: 0.5rem; }
        .report-h3 { font-weight: 500; color: #1f2937; font-size: 1.25rem; margin-top: 1.5rem; margin-bottom: 0.5rem; }
        .report-p { font-size: 11pt; line-height: 1.7; color: #374151; margin-bottom: 1.25rem; }
        .report-li { font-size: 11pt; line-height: 1.7; color: #374151; margin-left: 1.5rem; list-style-type: disc; margin-bottom: 0.5rem; }
        .key-metric-card { background-color: #f0f5ff; border: 1px solid #d6e4ff; border-left: 5px solid #2563eb; border-radius: 8px; padding: 1rem 1.5rem; margin: 1.5rem 0; display: flex; justify-content: space-between; align-items: center; }
        .metric-title { font-weight: 500; font-size: 1rem; color: #1e3a8a; }
        .metric-value { font-family: 'Teko', sans-serif; font-size: 2.5rem; font-weight: 700; color: #1d4ed8; }
        .insight-blockquote { border-left: 4px solid #93c5fd; padding-left: 1.5rem; margin: 1.5rem 0; font-style: italic; color: #1e3a8a; background-color: #eff6ff; padding-top: 1rem; padding-bottom: 1rem; padding-right: 1rem; border-radius: 0 8px 8px 0; }
      `}</style>
    </section>
  );
};

export default ReportResult;