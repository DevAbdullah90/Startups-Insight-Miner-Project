"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Target,
  MapPin,
  Cuboid,
  Loader,
  Rocket,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onGenerate: (report: string) => void;
}

const stepVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 50 },
};

const MarketInsightForm = ({ onGenerate }: Props) => {
  const [step, setStep] = useState(1);
  const [niche, setNiche] = useState("");
  const [region, setRegion] = useState("");
  const [audience, setAudience] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/market-insight', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ niche, region, audience }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      onGenerate(data.report);
    } catch (error) {
      console.error("Failed to fetch market insight:", error);
      // Optionally, handle the error in the UI
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => setStep((s) => s + 1);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, action: () => void) => {
    if (e.key === 'Enter') {
      action();
    }
  }

  return (
    <div className="w-full min-h-[600px] bg-gray-900 p-4 lg:p-8 flex items-center justify-center">
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Left Panel: Interactive Prompt */}
        <div className="lg:col-span-3">
          <Card className="relative bg-gray-900/60 text-white backdrop-blur-xl shadow-2xl shadow-blue-900/20 overflow-hidden h-full">
            <div className="absolute inset-[-2px] rounded-xl bg-[conic-gradient(from_90deg_at_50%_50%,#1e293b_0%,#3b82f6_50%,#1e293b_100%)] -z-10"></div>
            <div className="bg-gray-900/80 rounded-lg h-full flex flex-col">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold tracking-wider">
                  COMMAND INPUT
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Provide mission parameters one by one.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    variants={stepVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    {step === 1 && (
                      <div>
                        <label htmlFor="niche" className="text-lg font-medium text-blue-300 mb-3 block">1. TARGET NICHE</label>
                        <Input id="niche" placeholder="What is the business or product idea?" value={niche} onChange={(e) => setNiche(e.target.value)}
                               onKeyDown={(e) => niche && handleKeyDown(e, nextStep)}
                               className="pl-4 h-14 bg-gray-800/80 border-gray-600 text-lg focus:ring-2 focus:ring-offset-0 focus:ring-offset-transparent focus:ring-blue-500/50 focus:border-blue-500"/>
                        <Button onClick={nextStep} disabled={!niche} className="mt-4 float-right">Next <ChevronRight className="w-4 h-4 ml-2"/></Button>
                      </div>
                    )}
                    {step === 2 && (
                       <div>
                        <label htmlFor="region" className="text-lg font-medium text-blue-300 mb-3 block">2. AREA OF OPERATIONS</label>
                        <Input id="region" placeholder="Where is your target market located?" value={region} onChange={(e) => setRegion(e.target.value)}
                               onKeyDown={(e) => region && handleKeyDown(e, nextStep)}
                               className="pl-4 h-14 bg-gray-800/80 border-gray-600 text-lg focus:ring-2 focus:ring-offset-0 focus:ring-offset-transparent focus:ring-blue-500/50 focus:border-blue-500"/>
                        <Button onClick={nextStep} disabled={!region} className="mt-4 float-right">Next <ChevronRight className="w-4 h-4 ml-2"/></Button>
                      </div>
                    )}
                    {step === 3 && (
                        <div>
                          <label htmlFor="audience" className="text-lg font-medium text-blue-300 mb-3 block">3. PERSONNEL OF INTEREST</label>
                          <Input id="audience" placeholder="Describe your ideal customer." value={audience} onChange={(e) => setAudience(e.target.value)}
                                onKeyDown={(e) => audience && handleKeyDown(e, nextStep)}
                                 className="pl-4 h-14 bg-gray-800/80 border-gray-600 text-lg focus:ring-2 focus:ring-offset-0 focus:ring-offset-transparent focus:ring-blue-500/50 focus:border-blue-500"/>
                          <Button onClick={nextStep} disabled={!audience} className="mt-4 float-right">Finalize Parameters <ChevronRight className="w-4 h-4 ml-2"/></Button>
                        </div>
                    )}
                     {step === 4 && (
                        <div className="text-center">
                          <Rocket className="mx-auto h-12 w-12 text-green-400 mb-4"/>
                          <h3 className="text-2xl font-bold">Parameters Locked</h3>
                          <p className="text-gray-400">All inputs received. Ready for deployment.</p>
                        </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </CardContent>
            </div>
          </Card>
        </div>

        {/* Right Panel: Mission Briefing */}
        <div className="lg:col-span-2">
           <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 h-full flex flex-col shadow-lg">
              <h3 className="font-mono text-lg text-green-400 animate-pulse">SYSTEM LINK ESTABLISHED...</h3>
              <p className="font-mono text-sm text-gray-500 mb-6">//: MISSION_BRIEFING_AI_ANALYSIS</p>
              
              <div className="space-y-5 flex-grow">
                <div className="flex items-start">
                  <Cuboid className="w-5 h-5 text-gray-400 mr-4 mt-1 flex-shrink-0"/>
                  <div>
                    <h4 className="font-semibold text-gray-300">NICHE</h4>
                    <p className="text-blue-400 font-medium text-lg break-words">{niche || "[Awaiting Input...]"}</p>
                  </div>
                </div>
                 <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-gray-400 mr-4 mt-1 flex-shrink-0"/>
                  <div>
                    <h4 className="font-semibold text-gray-300">REGION</h4>
                    <p className="text-blue-400 font-medium text-lg break-words">{region || "[Awaiting Input...]"}</p>
                  </div>
                </div>
                 <div className="flex items-start">
                  <Target className="w-5 h-5 text-gray-400 mr-4 mt-1 flex-shrink-0"/>
                  <div>
                    <h4 className="font-semibold text-gray-300">AUDIENCE</h4>
                    <p className="text-blue-400 font-medium text-lg break-words">{audience || "[Awaiting Input...]"}</p>
                  </div>
                </div>
              </div>
              
               <Button
                onClick={handleSubmit}
                className="w-full mt-8 h-16 text-xl font-bold text-white  duration-300 ease-in-out flex items-center justify-center gap-3
                           bg-blue-600 hover:bg-blue-700 transition-all transform hover:scale-105 shadow-blue-500/50"
                disabled={loading || step < 4}
              >
                {loading ? (
                  <> <Loader className="animate-spin h-6 w-6" /> <span>EXECUTING...</span> </>
                ) : (
                  <> <Rocket className="h-7 w-7" /> <span>DEPLOY AGENTS</span> </>
                )}
              </Button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default MarketInsightForm;
