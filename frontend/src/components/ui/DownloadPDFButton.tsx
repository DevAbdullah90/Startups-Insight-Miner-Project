"use client";
import { Button } from "@/components/ui/button";
import html2pdf from "html2pdf.js";

interface Props {
  contentId: string;
}

const DownloadPDFButton = ({ contentId }: Props) => {
  const handleDownload = () => {
    const element = document.getElementById(contentId);
    if (!element) return;

    const opt = {
      margin:       0.5,
      filename:     "market_insight_report.pdf",
      image:        { type: "jpeg", quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: "in", format: "letter", orientation: "portrait" }
    };

    html2pdf().from(element).set(opt).save();
  };

  return (
    <Button onClick={handleDownload} className="bg-blue-600 text-white hover:bg-blue-700">
      Download Report as PDF
    </Button>
  );
};

export default DownloadPDFButton;
