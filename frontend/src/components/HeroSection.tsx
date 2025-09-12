import { Button } from "@/components/ui/button";
import { ArrowRight, Terminal } from "lucide-react";

// A component to represent each AI agent in the status panel
const AiAgent = ({ name, status, delay }) => (
  <div
    className="flex items-center justify-between py-2 border-b border-gray-700/50 animate-fade-in"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="flex items-center">
      <Terminal className="w-4 h-4 mr-3 text-green-400" />
      <span className="text-sm text-gray-300">{name}</span>
    </div>
    <div className="flex items-center">
      <span className="text-xs text-green-400 mr-2">{status}</span>
      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
    </div>
  </div>
);

const HeroSection = () => (
  <section className="relative w-full min-h-screen bg-gray-900 text-white flex items-center justify-center p-4 overflow-hidden">
    {/* Background Grid */}
    <div className="absolute inset-0 z-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

    <div className="relative z-10 container mx-auto grid lg:grid-cols-2 gap-16 items-center">
      {/* Left side: The main prompt and CTA */}
      <div className="animate-slide-in-left">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-gray-200 to-gray-500 !leading-tight">
          Define Your Market.
          <br />
          We'll Mobilize the AI.
        </h1>
        <p className="mt-6 text-lg text-gray-400 max-w-xl">
          Enter your idea, and our multi-agent system will conduct in-depth market research, delivering a comprehensive analysis in minutes.
        </p>

        {/* Interactive Prompt Area */}
        <div className="mt-10 p-4 border border-gray-700 bg-gray-800/50 rounded-lg shadow-lg">
          <div className="flex flex-col space-y-4">
            <input
              type="text"
              placeholder="Enter your business niche (e.g., 'sustainable pet food')"
              className="w-full bg-gray-900 border border-gray-600 rounded-md px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
            <input
              type="text"
              placeholder="Define your target region & audience"
              className="w-full bg-gray-900 border border-gray-600 rounded-md px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
            <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700 transition-all transform hover:scale-105 shadow-blue-500/50">
              Deploy Agents <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
         <p className="mt-4 text-xs text-center text-gray-500">
          Or, <a href="#" className="underline hover:text-white">see an example report</a>.
        </p>
      </div>

      {/* Right side: The AI Agent status panel */}
      <div className="hidden lg:block p-6 bg-gray-800/30 border border-gray-700/50 rounded-xl backdrop-blur-sm animate-slide-in-right shadow-2xl">
        <h3 className="font-semibold text-lg border-b border-gray-600 pb-3 mb-4">AI Agent Collective: STANDING BY</h3>
        <div className="space-y-2">
          <AiAgent name="Market Analyst Agent" status="Online" delay={100} />
          <AiAgent name="Competitor Scout Agent" status="Online" delay={200} />
          <AiAgent name="Trend Forecaster Agent" status="Online" delay={300} />
          <AiAgent name="Audience Profiler Agent" status="Online" delay={400} />
          <AiAgent name="Risk Assessment Agent" status="Online" delay={500} />
          <AiAgent name="Strategy Synthesizer Agent" status="Online" delay={600} />
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;