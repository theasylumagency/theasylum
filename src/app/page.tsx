"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

// Pre-defined responsive responses from Hermes AI Terminal
const HERMES_RESPONSES: Record<string, Record<string, string>> = {
  mad: {
    default: "SYSTEM OUTPOST: Target identified. Core vulnerabilities: marketing rot, beanbag culture, lack of signature grit. Prepare to dismantle.",
    audit: "DANGER AUDIT: Funnel leaks detected. Landing pages are boring templates. CAC is unsustainably high. We need to lock in the objective and execute high-impact visual campaigns.",
    scan: "GOOGLE ASSAULT: Google SEO engine is bleeding clicks to generic directories. Organic capture rate is low. Re-routing content power to high-intent keywords immediately.",
    ai: "COGNITIVE STACK: Human resources wasted on redundant report generation. We can automate 75% of CRM management. Prepare to deploy cognitive agents.",
  },
  less: {
    default: "HERMES ENGINE: Context loaded. Core pipeline is stable but under-optimized. Standard recommendations include funnel acceleration and keyword organic scaling.",
    audit: "FUNNEL ANALYSIS: Current funnel conversion is 1.2%. Average B2B benchmark is 2.8%. Landing page design represents a 45% drop-off. Audit recommended.",
    scan: "ORGANIC REPORT: Search Console reveals flatlining keyword impressions. Domain authority stands at 32. Competitor search share stands at 55%. Recommend intensive SEO campaign.",
    ai: "WORKFLOW AUTOMATION: CRM synchronization is fragmented. Standard API automation can save 12 hours/week per operator. Integration roadmap mapped.",
  },
  polished: {
    default: "PORTAL ONLINE: Welcoming secure enterprise session. Digital consulting directives active. Ready to proceed with system audit.",
    audit: "ENTERPRISE AUDIT: Funnel diagnostics show 18% leak in post-demo conversions. Recommending CRM lead nurturing flow and dynamic visual personalization. Let's schedule a formal review.",
    scan: "SEARCH AUDIT: Enterprise organic capture is highly fragmented. Recommending structural site optimization and high-intent semantic content cluster deployment.",
    ai: "SYSTEM AUTOMATION: Cognitive automation potential assessed at $48,000 annual savings. Streamlining operational workflows to reduce manual input. Download our framework PDF.",
  },
  war: {
    default: "TACTICAL HUD: Intercepting signal... Competitor offensive is aggressive. Pipeline status: CRITICAL. Deploying asymmetric defense.",
    audit: "FUNNEL COMBAT: Critical leakage in acquisition channels. Retainer fatigue confirmed. Combat deployment: restructure lead landing pages, execute high-velocity ad sprint.",
    scan: "SEARCH INTERVENTION: Organic keywords are being captured by competitors. Intercepting keyword traffic by deploying high-velocity, high-density landing page nets.",
    ai: "TACTICAL COGNITIVE: Automating surveillance feeds and intelligence report generation. Retrenching human resources to operational combat roles.",
  }
};

const MODE_COPY = {
  mad: {
    eyebrow: "digital disruption cell",
    h1First: "Branding that cuts through",
    h1Accent: "Burn the old rules",
    h1Desc: "Analysis-fueled madness that becomes a signature. We dismantle safe marketing to unlock high-voltage scale.",
    servicesNote: "Structured deconstruction. Methodical resurrection.",
  },
  less: {
    eyebrow: "Same brains. Different suit.",
    h1First: "Marketing that moves revenue.",
    h1Accent: "Less noise. More pipeline.",
    h1Desc: "Different solutions for different digital worlds. We build high-efficiency pipelines engineered for customer acquisition.",
    servicesNote: "Four disciplined phases engineered to uncover, build, launch, and scale.",
  },
  polished: {
    eyebrow: "Your digital haven",
    h1First: "AI & Automation Solutions",
    h1Accent: "Systems that scale without drama",
    h1Desc: "We map, automate, and measure workflows—cutting production costs down while ramping functional output up.",
    servicesNote: "Data-driven strategy. Scalable execution. Measurable results.",
  },
  war: {
    eyebrow: "SURVEILLANCE ENGAGED",
    h1First: "Asymmetric Combat Strategy",
    h1Accent: "Aggressive market capture",
    h1Desc: "Tactical digital interventions. Fast execution, massive leverage, zero compromises. High-velocity operations.",
    servicesNote: "Surveillance matrix. Aggressive tactical deployment.",
  }
};

export default function Home() {
  const [mood, setMood] = useState<"mad" | "less" | "polished" | "war">("less");
  const [dialAngle, setDialAngle] = useState(0); // rotation in degrees
  const [activeStep, setActiveStep] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  
  // Chatbot State
  const [chatLog, setChatLog] = useState<{ sender: "user" | "hermes"; text: string }[]>([
    { sender: "hermes", text: "HERMES ENGINE: Context loaded. Core pipeline is stable but under-optimized. Standard recommendations include funnel acceleration and keyword organic scaling." }
  ]);
  const [userInput, setUserInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Dialog Modal Refs
  const auditDialogRef = useRef<HTMLDialogElement>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Autoplay for Slider
  useEffect(() => {
    if (!isAutoplay) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoplay]);

  // Synchronize dynamic attributes to root HTML
  useEffect(() => {
    document.documentElement.setAttribute("data-mode", mood);
    document.body.setAttribute("data-mode", mood);
    
    // Auto-update chatbot greeting when mood changes
    let initialMsg = "";
    if (mood === "mad") initialMsg = HERMES_RESPONSES.mad.default;
    else if (mood === "less") initialMsg = HERMES_RESPONSES.less.default;
    else if (mood === "polished") initialMsg = HERMES_RESPONSES.polished.default;
    else if (mood === "war") initialMsg = HERMES_RESPONSES.war.default;

    setChatLog([{ sender: "hermes", text: initialMsg }]);
  }, [mood]);

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatLog, isTyping]);

  // Fallback click listener for dialog light-dismiss (Safari support)
  useEffect(() => {
    const dialog = auditDialogRef.current;
    if (!dialog) return;

    const handleBackdropClick = (event: MouseEvent) => {
      // Check if browser natively supports closedby (e.g. Chrome/Firefox)
      if ("closedBy" in HTMLDialogElement.prototype) return;
      if (event.target !== dialog) return;

      const rect = dialog.getBoundingClientRect();
      const isInside = (
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width
      );

      if (!isInside) {
        dialog.close();
      }
    };

    dialog.addEventListener("click", handleBackdropClick);
    return () => dialog.removeEventListener("click", handleBackdropClick);
  }, []);

  // Handle Mood switching via dial clicks
  const cycleMood = () => {
    const modes: ("mad" | "less" | "polished" | "war")[] = ["mad", "less", "polished", "war"];
    const nextIdx = (modes.indexOf(mood) + 1) % modes.length;
    const nextMode = modes[nextIdx];
    setMood(nextMode);
    setDialAngle((prev) => prev + 90);
  };

  const selectMood = (selected: "mad" | "less" | "polished" | "war") => {
    const modes: ("mad" | "less" | "polished" | "war")[] = ["mad", "less", "polished", "war"];
    const currentIdx = modes.indexOf(mood);
    const targetIdx = modes.indexOf(selected);
    let diff = targetIdx - currentIdx;
    
    // Ensure we rotate shortest path or positive rotation
    if (diff < 0) diff += 4;
    setDialAngle((prev) => prev + diff * 90);
    setMood(selected);
  };

  // Simulating typing effect for Hermes AI Bot
  const triggerHermesResponse = (queryKey: string, userText: string) => {
    if (isTyping) return;
    
    // Add user message
    setChatLog((prev) => [...prev, { sender: "user", text: userText }]);
    setIsTyping(true);

    setTimeout(() => {
      const modeResponses = HERMES_RESPONSES[mood];
      const reply = modeResponses[queryKey] || modeResponses.default;
      
      setChatLog((prev) => [...prev, { sender: "hermes", text: reply }]);
      setIsTyping(false);
    }, 1200);
  };

  // Custom text submission
  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isTyping) return;

    const query = userInput.toLowerCase();
    let queryKey = "default";
    if (query.includes("audit") || query.includes("funnel") || query.includes("leak") || query.includes("conversion")) {
      queryKey = "audit";
    } else if (query.includes("seo") || query.includes("google") || query.includes("traffic") || query.includes("organic") || query.includes("scan")) {
      queryKey = "scan";
    } else if (query.includes("ai") || query.includes("automation") || query.includes("workflow") || query.includes("script") || query.includes("saving")) {
      queryKey = "ai";
    }

    triggerHermesResponse(queryKey, userInput);
    setUserInput("");
  };

  // Form submission handler inside accessible <dialog>
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      auditDialogRef.current?.close();
    }, 3000);
  };

  return (
    <div className="relative min-h-screen crt-glow scanline-overlay overflow-x-hidden pb-12 selection:bg-[var(--theme-color)] selection:text-black">
      {/* Dynamic Animated Grid background */}
      <div className="absolute inset-0 technical-grid transition-all duration-500 z-0" />
      <div className="running-scanline z-10" />

      {/* Floating Header */}
      <header className="sticky top-0 z-40 w-full border-b border-white/[0.04] bg-[#060608]/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex flex-col">
            <span className="font-mono text-xs tracking-[0.25em] text-white/50">THE ASYLUM</span>
            <span className="font-sans text-sm font-bold tracking-tight text-white flex items-center gap-1.5">
              DIGITAL CONSULTING 
              <span className="inline-block w-2 h-2 rounded-full bg-[var(--theme-color)] animate-ping" />
            </span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 text-xs font-mono tracking-wider uppercase">
            <a href="#procedures" className="text-white/60 hover:text-[var(--theme-color)] transition-colors">procedures</a>
            <a href="#doctrine" className="text-white/60 hover:text-[var(--theme-color)] transition-colors">doctrine</a>
            <a href="#roadmap" className="text-white/60 hover:text-[var(--theme-color)] transition-colors">roadmap</a>
            <a href="#manifesto" className="text-white/60 hover:text-[var(--theme-color)] transition-colors">manifesto</a>
            <a href="#proof" className="text-white/60 hover:text-[var(--theme-color)] transition-colors">proof</a>
          </nav>

          <div>
            <button
              onClick={() => auditDialogRef.current?.showModal()}
              className="relative px-4 py-2 text-xs font-mono font-bold tracking-widest uppercase border border-[var(--theme-color)] text-[var(--theme-color)] hover:bg-[var(--theme-color)] hover:text-black transition-all duration-300 rounded shadow-[0_0_15px_rgba(var(--theme-color-rgb),0.1)]"
            >
              Request Audit
            </button>
          </div>
        </div>
      </header>

      {/* Main Hero & Console area */}
      <main className="relative z-10 mx-auto max-w-7xl px-6 pt-12 md:pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Big Brand Pitch */}
          <div className="lg:col-span-7 flex flex-col items-start gap-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/[0.06] bg-white/[0.02] text-xs font-mono text-[var(--theme-color)] uppercase tracking-wider transition-all duration-500">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--theme-color)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--theme-color)]"></span>
              </span>
              {MODE_COPY[mood].eyebrow}
            </div>

            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-[1.08] transition-all duration-500">
              <span className="block font-sans text-white/95">{MODE_COPY[mood].h1First}</span>
              <span className="block mt-2 font-mono uppercase text-[var(--theme-color)] drop-shadow-[0_0_12px_rgba(var(--theme-color-rgb),0.2)]">
                {MODE_COPY[mood].h1Accent}
              </span>
            </h1>

            <p className="max-w-xl text-base sm:text-lg text-zinc-400 font-sans leading-relaxed transition-all duration-500">
              {MODE_COPY[mood].h1Desc}
            </p>

            <div className="flex flex-wrap gap-4 mt-4">
              <button
                onClick={() => auditDialogRef.current?.showModal()}
                className="px-6 py-3.5 bg-[var(--theme-color)] text-black font-mono text-xs font-bold tracking-widest uppercase hover:brightness-110 transition-all rounded"
              >
                Initiate Engagement
              </button>
              <a
                href="#procedures"
                className="px-6 py-3.5 border border-white/10 hover:border-[var(--theme-color)] hover:text-white text-zinc-300 font-mono text-xs font-bold tracking-widest uppercase transition-all rounded bg-white/[0.01]"
              >
                Review Procedures
              </a>
            </div>
          </div>

          {/* Right Column: Dynamic Interactive Hermes Terminal */}
          <div className="lg:col-span-5 w-full">
            <div className="relative border border-white/[0.08] bg-[#0a0a0f]/90 shadow-[0_0_40px_rgba(0,0,0,0.8)] rounded-xl overflow-hidden animate-glow-pulse">
              
              {/* Terminal header */}
              <div className="flex items-center justify-between border-b border-white/[0.06] bg-white/[0.03] px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                </div>
                <span className="font-mono text-[10px] uppercase text-zinc-500 tracking-[0.2em]">
                  Hermes AI v2.8 // {mood.toUpperCase()} MODE
                </span>
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              </div>

              {/* Chat Log Output */}
              <div className="h-[260px] overflow-y-auto p-4 flex flex-col gap-4 font-mono text-xs text-zinc-300">
                {chatLog.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex flex-col gap-1 max-w-[85%] ${
                      msg.sender === "user" ? "self-end items-end" : "self-start items-start"
                    }`}
                  >
                    <span className="text-[10px] text-zinc-500 uppercase">
                      {msg.sender === "user" ? "YOU@ASYLUM" : "HERMES_CORE"}
                    </span>
                    <div
                      className={`px-3 py-2 rounded-lg border transition-all duration-300 ${
                        msg.sender === "user"
                          ? "bg-white/[0.03] border-white/10 text-white rounded-tr-none"
                          : "bg-[var(--theme-glow)] border-[var(--theme-color)]/20 text-[var(--theme-color)] rounded-tl-none shadow-[0_0_15px_rgba(var(--theme-color-rgb),0.03)]"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="self-start flex flex-col items-start gap-1">
                    <span className="text-[10px] text-zinc-500 uppercase">HERMES_CORE</span>
                    <div className="px-3 py-2 rounded-lg bg-[var(--theme-glow)] border border-[var(--theme-color)]/20 text-[var(--theme-color)] rounded-tl-none flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-color)] animate-bounce" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-color)] animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-color)] animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                )}
                <div ref={chatBottomRef} />
              </div>

              {/* Quick Actions Matrix */}
              <div className="border-t border-white/[0.04] bg-white/[0.01] p-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => triggerHermesResponse("audit", "Diagnose funnel conversions")}
                  className="px-2.5 py-1.5 bg-white/[0.02] border border-white/[0.08] hover:border-[var(--theme-color)] hover:bg-[var(--theme-glow)] text-zinc-400 hover:text-[var(--theme-color)] text-[10px] font-mono uppercase tracking-wider rounded transition-all"
                >
                  [Funnel Audit]
                </button>
                <button
                  type="button"
                  onClick={() => triggerHermesResponse("scan", "Check keyword market authority")}
                  className="px-2.5 py-1.5 bg-white/[0.02] border border-white/[0.08] hover:border-[var(--theme-color)] hover:bg-[var(--theme-glow)] text-zinc-400 hover:text-[var(--theme-color)] text-[10px] font-mono uppercase tracking-wider rounded transition-all"
                >
                  [Organic Scan]
                </button>
                <button
                  type="button"
                  onClick={() => triggerHermesResponse("ai", "Review custom workflows")}
                  className="px-2.5 py-1.5 bg-white/[0.02] border border-white/[0.08] hover:border-[var(--theme-color)] hover:bg-[var(--theme-glow)] text-zinc-400 hover:text-[var(--theme-color)] text-[10px] font-mono uppercase tracking-wider rounded transition-all"
                >
                  [Automation Potential]
                </button>
              </div>

              {/* Chat Input form */}
              <form onSubmit={handleChatSubmit} className="flex border-t border-white/[0.06]">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Ask Hermes a custom question..."
                  className="flex-1 px-4 py-3 bg-transparent border-0 outline-none text-xs text-white font-mono placeholder-zinc-600 focus:ring-1 focus:ring-[var(--theme-color)]"
                />
                <button
                  type="submit"
                  disabled={isTyping}
                  className="px-4 py-3 bg-white/[0.04] hover:bg-[var(--theme-color)] hover:text-black border-l border-white/[0.06] text-zinc-400 hover:text-black font-mono text-xs uppercase tracking-wider transition-all disabled:opacity-50"
                >
                  SEND
                </button>
              </form>
            </div>
          </div>

        </div>
      </main>

      {/* Floating Premium Cockpit Mood Switcher */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        <div className="hidden md:flex flex-col items-end justify-center font-mono text-[9px] uppercase tracking-[0.25em] text-white/50 bg-[#060608]/85 px-3 py-1.5 border border-white/[0.04] backdrop-blur-md rounded-md">
          <span>SELECT Mood SYSTEM</span>
          <span className="text-[var(--theme-color)] font-bold">{mood} active</span>
        </div>
        
        <div className="relative group">
          {/* Neon Glow Outer Halo */}
          <div className="absolute inset-0 -m-1 bg-gradient-to-r from-red-500 via-emerald-500 to-amber-500 rounded-full blur-md opacity-25 group-hover:opacity-60 transition-opacity duration-500" />
          
          <div className="relative flex items-center justify-center w-14 h-14 bg-[#0a0a0f] border-2 border-[var(--theme-color)] rounded-full shadow-[0_0_20px_rgba(var(--theme-color-rgb),0.3)] transition-all duration-300">
            {/* Inner Rotating dial core */}
            <button
              onClick={cycleMood}
              style={{ transform: `rotate(${dialAngle}deg)` }}
              className="absolute w-10 h-10 border border-white/20 rounded-full flex items-center justify-center bg-white/[0.02] cursor-pointer transition-transform duration-500 outline-none"
              title="Cycle Mode"
              aria-label="Cycle site mood mode"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--theme-color)] absolute top-1.5" />
              <span className="font-mono text-[9px] font-bold text-white tracking-widest scale-75 select-none">DIAL</span>
            </button>
          </div>

          {/* Quick Click Overlays */}
          <div className="absolute right-full bottom-0 mr-4 flex flex-col gap-2 opacity-0 scale-90 translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300">
            <button
              onClick={() => selectMood("mad")}
              className={`px-3 py-1.5 text-[9px] font-mono font-bold tracking-widest uppercase border rounded transition-all ${
                mood === "mad" ? "bg-red-500 border-red-500 text-black" : "bg-[#060608]/90 border-white/10 text-white hover:border-red-500"
              }`}
            >
              MAD
            </button>
            <button
              onClick={() => selectMood("less")}
              className={`px-3 py-1.5 text-[9px] font-mono font-bold tracking-widest uppercase border rounded transition-all ${
                mood === "less" ? "bg-emerald-500 border-emerald-500 text-black" : "bg-[#060608]/90 border-white/10 text-white hover:border-emerald-500"
              }`}
            >
              LESS MAD
            </button>
            <button
              onClick={() => selectMood("polished")}
              className={`px-3 py-1.5 text-[9px] font-mono font-bold tracking-widest uppercase border rounded transition-all ${
                mood === "polished" ? "bg-amber-500 border-amber-500 text-black" : "bg-[#060608]/90 border-white/10 text-white hover:border-amber-500"
              }`}
            >
              POLISHED
            </button>
            <button
              onClick={() => selectMood("war")}
              className={`px-3 py-1.5 text-[9px] font-mono font-bold tracking-widest uppercase border rounded transition-all ${
                mood === "war" ? "bg-orange-500 border-orange-500 text-black" : "bg-[#060608]/90 border-white/10 text-white hover:border-orange-500"
              }`}
            >
              WAR ROOM
            </button>
          </div>
        </div>
      </div>

      {/* How We Do Carousel (Workflow Slider) */}
      <section id="procedures" className="mx-auto max-w-7xl px-6 pt-24 md:pt-36">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--theme-color)]">operational cycle</span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mt-2">How We Do</h2>
          </div>
          <p className="text-zinc-500 font-mono text-xs max-w-md mt-4 md:mt-0 uppercase tracking-wider">
            [Systematic funnel deconstruction and performance engineering]
          </p>
        </div>

        {/* 3D Glass Carousel Panel */}
        <div 
          className="relative border border-white/[0.06] bg-[#0a0a0f]/60 rounded-2xl p-6 sm:p-12 overflow-hidden backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          onMouseEnter={() => setIsAutoplay(false)}
          onMouseLeave={() => setIsAutoplay(true)}
        >
          {/* Background decorative ring */}
          <div className="absolute -right-24 -bottom-24 w-96 h-96 rounded-full border border-white/[0.02] pointer-events-none z-0" />
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
            {/* Step Indicators */}
            <div className="md:col-span-4 flex flex-row md:flex-col gap-3 justify-center md:justify-start">
              {[
                { label: "01 · ANALYSIS", desc: "Funnel diagnostics" },
                { label: "02 · STRATEGY", desc: "Roadmap formulation" },
                { label: "03 · CREATION", desc: "Asset optimization" },
                { label: "04 · VIGILANCE", desc: "A/B performance metrics" }
              ].map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveStep(idx);
                    setIsAutoplay(false);
                  }}
                  className={`w-full text-left px-4 py-3 border rounded font-mono text-xs transition-all ${
                    activeStep === idx
                      ? "bg-[var(--theme-glow)] border-[var(--theme-color)] text-[var(--theme-color)] shadow-[0_0_12px_rgba(var(--theme-color-rgb),0.05)]"
                      : "border-white/[0.04] hover:border-white/10 text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  <span className="block font-bold">{step.label}</span>
                  <span className="text-[10px] opacity-70 block mt-0.5">{step.desc}</span>
                </button>
              ))}
            </div>

            {/* Slider Copy display */}
            <div className="md:col-span-8 md:pl-8 flex flex-col gap-6">
              <span className="font-mono text-4xl sm:text-6xl font-extrabold text-white/5 tracking-wider select-none block">
                0{activeStep + 1}
              </span>

              {activeStep === 0 && (
                <div className="flex flex-col gap-4 animate-fadeIn">
                  <h3 className="text-2xl font-bold text-white">Funnel Analysis & Performance Auditing</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    We carve through legacy analytics. Every tracking protocol, search keyword, target funnel step, CRM pipeline, and landing page asset is audited. No blind spots.
                  </p>
                  <ul className="flex flex-wrap gap-2 pt-2">
                    {["Google Analytics 4", "Search Console", "Funnel Mapping", "Heatmaps", "CAC/LTV Ratio", "Competitor Auditing"].map((chip) => (
                      <li key={chip} className="px-3 py-1 bg-white/[0.02] border border-white/[0.06] rounded font-mono text-[10px] text-zinc-400">
                        {chip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeStep === 1 && (
                <div className="flex flex-col gap-4 animate-fadeIn">
                  <h3 className="text-2xl font-bold text-white">Target Formulation & Positioning Doctrine</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    Engineering asymmetric campaigns. We map your Ideal Customer Profile (ICP), restructure product positioning, allocate budget weightings, and construct a detailed 90-day operational roadmap.
                  </p>
                  <ul className="flex flex-wrap gap-2 pt-2">
                    {["ICP Mapping", "Product Positioning", "Budget Allocations", "KPI Dashboard Structure", "90-Day Milestones", "Channel Matrix"].map((chip) => (
                      <li key={chip} className="px-3 py-1 bg-white/[0.02] border border-white/[0.06] rounded font-mono text-[10px] text-zinc-400">
                        {chip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeStep === 2 && (
                <div className="flex flex-col gap-4 animate-fadeIn">
                  <h3 className="text-2xl font-bold text-white">Dynamic Asset Deployment & Integration</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    We configure high-conversion machinery. Custom landing page systems, high-intent semantic content cluster pipelines, ad creatives, automations, and tracking tags are integrated from scratch.
                  </p>
                  <ul className="flex flex-wrap gap-2 pt-2">
                    {["UX/UI Systems", "Next.js Core LPs", "Google Ads Engine", "Marketing Automation", "CRM Hubspot Link", "Tag Tracking"].map((chip) => (
                      <li key={chip} className="px-3 py-1 bg-white/[0.02] border border-white/[0.06] rounded font-mono text-[10px] text-zinc-400">
                        {chip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeStep === 3 && (
                <div className="flex flex-col gap-4 animate-fadeIn">
                  <h3 className="text-2xl font-bold text-white">Relentless Optimizations & Scaling</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    Continuous feedback loops. We run real-time CRO sprints, execute robust ad copy A/B tests, measure LTV compounding, and optimize marketing spend parameters until scaling is highly predictable.
                  </p>
                  <ul className="flex flex-wrap gap-2 pt-2">
                    {["A/B Testing", "CRO Sprints", "Compounding LTV", "Budget Scale Realloc", "Surveillance Reports", "Retention Flow"].map((chip) => (
                      <li key={chip} className="px-3 py-1 bg-white/[0.02] border border-white/[0.06] rounded font-mono text-[10px] text-zinc-400">
                        {chip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Autoplay status bar */}
          <div className="mt-8 border-t border-white/[0.04] pt-4 flex items-center justify-between text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
            <span>[Operational Cycle HUD]</span>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsAutoplay(!isAutoplay)}
                className="hover:text-[var(--theme-color)] transition-colors"
              >
                {isAutoplay ? "[PAUSE CYCLE]" : "[PLAY CYCLE]"}
              </button>
              <div className="flex gap-1.5">
                {[0, 1, 2, 3].map((i) => (
                  <span 
                    key={i} 
                    className={`w-1.5 h-1.5 rounded-full transition-all ${
                      activeStep === i ? "bg-[var(--theme-color)] scale-110" : "bg-white/[0.06]"
                    }`} 
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Services Grid (Doctrine) */}
      <section id="doctrine" className="mx-auto max-w-7xl px-6 pt-24 md:pt-36">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--theme-color)]">Engagement doctrine</span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mt-2 mb-4">Operations Matrix</h2>
          <p className="text-zinc-500 font-sans text-sm transition-all duration-500">
            {MODE_COPY[mood].servicesNote}
          </p>
        </div>

        {/* Dynamic Service Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              phase: "01 // DIAGNOSIS",
              title: mood === "mad" ? "Interrogation" : mood === "less" ? "Full Funnel Audit" : "Growth Audit",
              desc: mood === "mad" 
                ? "Dissect campaigns with cold forensic precision. Surface legacy structural leakages immediately." 
                : mood === "less" 
                ? "Surgical tracking audit from acquisition clicks to closed pipeline deals."
                : "Professional full audit mapping data points and defining core KPI benchmarks.",
              bullets: ["Digital anatomy scan", "Objective locking", "Campaign autopsies"]
            },
            {
              phase: "02 // BLUEPRINT",
              title: mood === "mad" ? "Doctrine Blueprint" : mood === "less" ? "Arsenal Construction" : "Strategic Roadmap",
              desc: mood === "mad"
                ? "Formulating aggressive tactical moves. Design a high-voltage, rules-burning campaign matrix."
                : mood === "less"
                ? "Creating landing page infrastructure, SEO content frameworks, and high-impact ads."
                : "Mapping scalable automation blueprints, tech integrations, and brand voice manuals.",
              bullets: ["Asymmetric channels", "Asset cadence", "Resource allocations"]
            },
            {
              phase: "03 // DEPLOYMENT",
              title: mood === "mad" ? "Detonation" : mood === "less" ? "Funnel Offensive" : "System Launch",
              desc: mood === "mad"
                ? "Ignite the disruption engine. Launch high-density creative grids that capture market attention."
                : mood === "less"
                ? "Deploying targeted paid campaigns and publishing authoritative keyword networks."
                : "Integrating HubSpot/Mailchimp stacks and deploying production-grade optimizations.",
              bullets: ["Web structure rebuild", "Motion campaigns", "Lead conversion nets"]
            },
            {
              phase: "04 // SURVEILLANCE",
              title: mood === "mad" ? "Surveillance" : mood === "less" ? "Compound Evolution" : "Optimize & Scale",
              desc: mood === "mad"
                ? "Absolute vigilance. Monitor campaigns against core targets and implement modifications."
                : mood === "less"
                ? "Iterative A/B testing matrix. Scale profitable budget weightings dynamically."
                : "Continuous workflow streamlining, performance reviews, and CAC optimizations.",
              bullets: ["Live diagnostics HUD", "Adaptive iterations", "Futureproofing protocol"]
            }
          ].map((card, i) => (
            <div
              key={i}
              className="group relative border border-white/[0.05] bg-white/[0.02] hover:border-[var(--theme-color)]/30 hover:bg-white/[0.04] p-6 rounded-xl transition-all duration-300 flex flex-col gap-4 shadow-lg overflow-hidden"
            >
              {/* Top border neon bar on hover */}
              <div className="absolute top-0 inset-x-0 h-0.5 bg-[var(--theme-color)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              
              <span className="font-mono text-[10px] text-zinc-600 tracking-wider font-bold">
                {card.phase}
              </span>
              <h3 className="text-xl font-bold text-white group-hover:text-[var(--theme-color)] transition-colors">
                {card.title}
              </h3>
              <p className="text-zinc-400 text-xs leading-relaxed flex-1">
                {card.desc}
              </p>
              
              <div className="border-t border-white/[0.04] pt-4 mt-2">
                <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-500 block mb-2">Deliverables:</span>
                <ul className="flex flex-col gap-1.5">
                  {card.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2 font-mono text-[10px] text-zinc-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-color)]" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Engagement Roadmap section */}
      <section id="roadmap" className="mx-auto max-w-7xl px-6 pt-24 md:pt-36">
        <div className="border border-white/[0.05] bg-[#08080c]/85 rounded-2xl p-6 sm:p-12 relative overflow-hidden backdrop-blur-md">
          <div className="absolute inset-0 technical-grid opacity-30 pointer-events-none" />
          
          <div className="relative z-10 text-center max-w-2xl mx-auto mb-16">
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--theme-color)]">operational onboarding</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">Onboarding Roadmap</h2>
            <p className="text-zinc-500 text-xs font-mono uppercase mt-2">[Snapshot to Retainer Scalability Flow]</p>
          </div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Teardown Audit",
                desc: "Complimentary, no-obligation audit exposing your top 3 growth bottlenecks within 72 hours.",
                sub: "No barrier entry"
              },
              {
                step: "02",
                title: "Deep Funnel Scan",
                desc: "Full pipeline audit under signed agreement mapping all tracking points and conversion leaks.",
                sub: "Deliverable: Audit Report"
              },
              {
                step: "03",
                title: "Strategy Mapping",
                desc: "We formulate the operational blueprint, define KPI trees, and agree on target metrics.",
                sub: "Tranche 1 Approval"
              },
              {
                step: "04",
                title: "Retainer Scale",
                desc: "Deploy campaigns, optimize landing pages, run A/B sprints, and compound monthly ROI.",
                sub: "Compounding retainers"
              }
            ].map((pt, i) => (
              <div key={i} className="relative flex flex-col gap-3 group">
                <span className="text-4xl font-black text-white/5 font-mono group-hover:text-[var(--theme-color)]/10 transition-colors">
                  {pt.step}
                </span>
                <h4 className="text-lg font-bold text-white group-hover:text-[var(--theme-color)] transition-colors">
                  {pt.title}
                </h4>
                <p className="text-zinc-400 text-xs leading-relaxed">
                  {pt.desc}
                </p>
                <span className="mt-2 font-mono text-[9px] uppercase tracking-widest text-[var(--theme-color)] bg-[var(--theme-glow)] px-2.5 py-1 border border-[var(--theme-color)]/20 rounded self-start">
                  {pt.sub}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Manifesto Section */}
      <section id="manifesto" className="mx-auto max-w-7xl px-6 pt-24 md:pt-36">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 relative border border-white/[0.06] rounded-2xl overflow-hidden shadow-2xl bg-white/[0.02] max-w-md mx-auto">
            <Image
              src="/img/home2_3.webp"
              alt="Monochrome close-up of a scanning human eye representing technical surveillance and precision digital consulting"
              width={500}
              height={500}
              className="w-full object-cover aspect-square opacity-70 group-hover:opacity-90 transition-opacity duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#040406] via-transparent to-transparent" />
            <div className="absolute top-4 left-4 font-mono text-[10px] uppercase text-red-500 border border-red-500/30 bg-red-950/20 px-2 py-0.5 rounded tracking-widest animate-pulse">
              [SURVEILLANCE ACTIVE]
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col items-start gap-6">
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--theme-color)]">Manifesto</span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Architects of Digital Disruption
            </h2>
            <div className="flex flex-col gap-4 text-zinc-400 text-sm leading-relaxed font-sans">
              <p>
                We do not support corporate complacency. No neon beanbags, no bloated corporate meetings, and zero jargon. We are absolute operators obsessed with pipeline performance and functional metrics.
              </p>
              <p className="border-l-2 border-[var(--theme-color)] pl-4 py-1 italic font-mono text-[var(--theme-color)] bg-[var(--theme-glow)]/40 rounded-r">
                "The Voice: We extract the raw truths you are afraid to voice and engineer campaigns to capture market territory."
              </p>
              <p>
                Every consulting project is a controlled, technical experiment. Data is our scripture. Precision-engineered coding and cinematic content strategies are our weapons.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Proof & Metrics section */}
      <section id="proof" className="mx-auto max-w-7xl px-6 pt-24 md:pt-36">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--theme-color)]">verifiable performance</span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mt-2 mb-4">Evidence, Not Adjectives</h2>
          <p className="text-zinc-500 font-mono text-xs uppercase tracking-wider">
            [Real outcomes. Redacted datasets. Strict performance metrics.]
          </p>
        </div>

        {/* Dynamic Proof Bands based on active Mode */}
        <div className="border border-white/[0.05] bg-[#0a0a0f]/80 rounded-2xl p-6 sm:p-12 backdrop-blur-md overflow-hidden relative shadow-2xl">
          
          {mood === "mad" && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center animate-fadeIn">
              <div className="md:col-span-5 relative border border-white/[0.08] rounded-xl overflow-hidden max-w-sm mx-auto">
                <Image
                  src="/img/mad-proof.webp"
                  alt="High contrast artistic representation of explosive growth impact"
                  width={400}
                  height={400}
                  className="w-full object-cover opacity-80"
                />
              </div>
              <div className="md:col-span-7 flex flex-col items-start gap-4">
                <span className="font-mono text-xs uppercase tracking-widest text-red-500">[PROOF IS A VERB]</span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white">We Dismantle Complacent Funnels</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Name dropping is cheap. Case studies are easily faked. We prove our worth on your actual site. Submit your domain and we will deploy a private Loom video analyzing your top 3 leaks.
                </p>
                <div className="flex gap-4 mt-2">
                  <button 
                    onClick={() => auditDialogRef.current?.showModal()}
                    className="px-5 py-2.5 bg-red-500 text-black font-mono text-xs font-bold uppercase rounded tracking-widest"
                  >
                    Dismantle My Funnel
                  </button>
                </div>
              </div>
            </div>
          )}

          {mood === "less" && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center animate-fadeIn">
              <div className="md:col-span-5 relative border border-white/[0.08] rounded-xl overflow-hidden max-w-sm mx-auto">
                <Image
                  src="/img/less-mad-proof.webp"
                  alt="X-ray mechanical render of highly structured pipeline nodes representing transparent systems architecture"
                  width={400}
                  height={400}
                  className="w-full object-cover opacity-80"
                />
              </div>
              <div className="md:col-span-7 flex flex-col items-start gap-4">
                <span className="font-mono text-xs uppercase tracking-widest text-emerald-400">[RESULTS, NOT REVIEWS]</span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white">High Fidelity Funnel Reporting</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  We maintain absolute transparency. We build clean lag and lead indicator dashboards showing CAC, search traffic authority, and lead capture speeds. View our scrubbed sample monthly report.
                </p>
                <div className="flex gap-4 mt-2">
                  <button 
                    onClick={() => auditDialogRef.current?.showModal()}
                    className="px-5 py-2.5 bg-emerald-500 text-black font-mono text-xs font-bold uppercase rounded tracking-widest"
                  >
                    Preview Sample Report
                  </button>
                </div>
              </div>
            </div>
          )}

          {mood === "polished" && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center animate-fadeIn">
              <div className="md:col-span-5 relative border border-white/[0.08] rounded-xl overflow-hidden max-w-sm mx-auto">
                <Image
                  src="/img/polished-proof.webp"
                  alt="High end luxury renders representing secure systemic operations"
                  width={400}
                  height={400}
                  className="w-full object-cover opacity-80"
                />
              </div>
              <div className="md:col-span-7 flex flex-col items-start gap-4">
                <span className="font-mono text-xs uppercase tracking-widest text-amber-400">[PILOT &rarr; PROOF &rarr; SCALE]</span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white">Risk-Free 30-Day Launch Sprint</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  We deploy targeted campaigns under a risk-free 30-day proof-of-concept pilot. If we do not successfully move your target lead metrics, you are under no obligation to continue.
                </p>
                <div className="flex gap-4 mt-2">
                  <button 
                    onClick={() => auditDialogRef.current?.showModal()}
                    className="px-5 py-2.5 bg-amber-500 text-black font-mono text-xs font-bold uppercase rounded tracking-widest"
                  >
                    Start 30-Day Pilot
                  </button>
                </div>
              </div>
            </div>
          )}

          {mood === "war" && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center animate-fadeIn">
              <div className="md:col-span-5 relative border border-white/[0.08] rounded-xl overflow-hidden max-w-sm mx-auto">
                <div className="relative aspect-square w-full bg-orange-950/10 flex items-center justify-center p-4 border border-orange-500/20 rounded">
                  {/* Glowing Radar scanline visual using pure css/svg */}
                  <div className="absolute inset-0 border border-orange-500/10 rounded-full animate-ping" />
                  <span className="font-mono text-orange-500 text-[10px] uppercase tracking-widest animate-pulse">[TACTICAL MAP SCAN]</span>
                </div>
              </div>
              <div className="md:col-span-7 flex flex-col items-start gap-4">
                <span className="font-mono text-xs uppercase tracking-widest text-orange-500">[ASYMMETRIC INTERVENTION]</span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white">Rapid Defensive Interceptions</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  When competitor search volume spikes or customer acquisition funnels contract, standard operations fail. We deploy high-density capture pages and automated re-engagement funnels to seize traffic.
                </p>
                <div className="flex gap-4 mt-2">
                  <button 
                    onClick={() => auditDialogRef.current?.showModal()}
                    className="px-5 py-2.5 bg-orange-500 text-black font-mono text-xs font-bold uppercase rounded tracking-widest"
                  >
                    Request Combat Audit
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Mode Switch Reminder */}
          <div className="mt-8 border-t border-white/[0.04] pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
            <span>[Use Dial switcher in bottom right to inspect other proof cases]</span>
            <div className="flex gap-2">
              <button onClick={() => selectMood("mad")} className={`hover:text-red-500 ${mood === "mad" && "text-red-500"}`}>MAD</button>
              <span>/</span>
              <button onClick={() => selectMood("less")} className={`hover:text-emerald-500 ${mood === "less" && "text-emerald-500"}`}>LESS</button>
              <span>/</span>
              <button onClick={() => selectMood("polished")} className={`hover:text-amber-500 ${mood === "polished" && "text-amber-500"}`}>POLISHED</button>
              <span>/</span>
              <button onClick={() => selectMood("war")} className={`hover:text-orange-500 ${mood === "war" && "text-orange-500"}`}>WAR</button>
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="mx-auto max-w-7xl px-6 pt-24 pb-12 border-t border-white/[0.03] mt-24 text-zinc-500 font-mono text-xs flex flex-col md:flex-row items-center justify-between gap-6">
        <span>&copy; The Asylum Digital 2026 // Controlled Aggression Delivered</span>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <span>&bull;</span>
          <a href="#" className="hover:text-white transition-colors">Standard NDA</a>
          <span>&bull;</span>
          <a href="mailto:ops@theasylum.agency" className="text-white hover:text-[var(--theme-color)] transition-colors">ops@theasylum.agency</a>
        </div>
      </footer>

      {/* ================= MODERN DIALOG MODAL ================= */}
      <dialog 
        ref={auditDialogRef} 
        closedby="any" 
        aria-labelledby="modal-title"
        className="w-full max-w-lg border border-white/[0.1] bg-[#0a0a0f]/95 text-white p-6 sm:p-8 rounded-xl outline-none shadow-[0_0_80px_rgba(0,0,0,0.9)] backdrop-blur-2xl"
      >
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-4 mb-6">
          <div>
            <h3 id="modal-title" className="text-xl font-bold font-sans text-white">
              Request Your Audit
            </h3>
            <span className="font-mono text-[9px] uppercase tracking-widest text-[var(--theme-color)] mt-0.5 block">
              [No-Obligation Funnel Diagnostics Scan]
            </span>
          </div>
          <button
            onClick={() => auditDialogRef.current?.close()}
            className="w-8 h-8 rounded-full border border-white/10 hover:border-[var(--theme-color)] hover:text-[var(--theme-color)] flex items-center justify-center text-lg leading-none cursor-pointer transition-all"
            aria-label="Close dialog"
          >
            &times;
          </button>
        </div>

        {formSubmitted ? (
          <div className="py-8 flex flex-col items-center justify-center gap-3 text-center animate-fadeIn font-mono text-xs">
            <div className="w-12 h-12 rounded-full border-2 border-[var(--theme-color)] flex items-center justify-center text-[var(--theme-color)] text-xl font-bold animate-pulse">
              ✓
            </div>
            <p className="text-white font-bold uppercase tracking-wider mt-2">Audit Payload Transmitted</p>
            <p className="text-zinc-500 leading-relaxed max-w-xs">
              Diagnostics queued. Our operational team will run your teardown and reach out within 72 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 font-sans text-xs">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="modal-name" className="font-mono text-[10px] uppercase text-zinc-400">
                Full Name
              </label>
              <input
                type="text"
                id="modal-name"
                required
                className="w-full px-3.5 py-2.5 bg-white/[0.02] border border-white/10 focus:border-[var(--theme-color)] outline-none rounded text-white transition-all text-xs"
                placeholder="Jane Doe"
              />
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label htmlFor="modal-email" className="font-mono text-[10px] uppercase text-zinc-400">
                Work Email
              </label>
              <input
                type="email"
                id="modal-email"
                required
                className="w-full px-3.5 py-2.5 bg-white/[0.02] border border-white/10 focus:border-[var(--theme-color)] outline-none rounded text-white transition-all text-xs"
                placeholder="jane@company.com"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="modal-website" className="font-mono text-[10px] uppercase text-zinc-400">
                Company Website
              </label>
              <input
                type="url"
                id="modal-website"
                required
                className="w-full px-3.5 py-2.5 bg-white/[0.02] border border-white/10 focus:border-[var(--theme-color)] outline-none rounded text-white transition-all text-xs"
                placeholder="https://company.com"
              />
            </div>

            <button
              type="submit"
              className="mt-4 w-full py-3.5 bg-[var(--theme-color)] hover:brightness-110 text-black font-mono text-xs font-bold uppercase tracking-widest rounded transition-all shadow-[0_0_15px_rgba(var(--theme-color-rgb),0.15)]"
            >
              Submit Audit Request
            </button>
            
            <span className="text-[9px] font-mono text-zinc-600 text-center uppercase tracking-widest mt-2 block">
              [All data is encrypted. Strict NDA protocols apply.]
            </span>
          </form>
        )}
      </dialog>
    </div>
  );
}
