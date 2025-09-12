"use client";
import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import MarketInsightForm from "@/components/MarketInsightForm";
import ReportResult from "@/components/ReportResult";
import DownloadPDFButton from "@/components/ui/DownloadPDFButton";
import FeaturesSection from "@/components/FeaturesSection";

export default function HomePage() {
  const [report, setReport] = useState("");

  return (
      <div>
        <HeroSection />
        <MarketInsightForm onGenerate={setReport} />
        <ReportResult report={report} />
        {report && (
          <div className="text-center my-8">
            <DownloadPDFButton contentId="report" />
          </div>
        )}
        <FeaturesSection />
      </div>
  );
}
