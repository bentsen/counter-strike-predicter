"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  Target,
  Database,
  Code2,
  Cpu,
  Layers,
  GitBranch,
  FileJson,
  CheckCircle2,
  ChevronRight,
  Terminal,
  ArrowLeft,
} from "lucide-react";
import { cn } from "../../lib/utils";

// --- Design Systems ---
const CARD_BG = "bg-[#0A1229]/80 backdrop-blur-md border border-[#1E293B]";
const TEXT_GRADIENT =
  "bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-amber-400";
const HEADING_GRADIENT =
  "bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400";

interface SectionProps {
  id: string;
  title: string;
  children?: React.ReactNode;
}

const Section = ({ id, title, children }: SectionProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="mb-16 scroll-mt-32"
    id={id}
  >
    <div className="flex items-center gap-3 mb-6">
      <div className="h-8 w-1 bg-gradient-to-b from-orange-500 to-amber-500 rounded-full" />
      <h2 className={`text-3xl font-bold ${HEADING_GRADIENT}`}>{title}</h2>
    </div>
    {children}
  </motion.div>
);

const FeatureCard = ({
  icon: Icon,
  title,
  description,
}: {
  icon: any;
  title: string;
  description: string;
}) => (
  <div
    className={`${CARD_BG} p-6 rounded-2xl hover:border-orange-500/30 transition-all duration-300 group`}
  >
    <div className="mb-4 p-3 bg-orange-900/20 w-fit rounded-xl group-hover:bg-orange-500/20 transition-colors">
      <Icon className="h-6 w-6 text-orange-400" />
    </div>
    <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
    <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
  </div>
);

const CodeBlock = ({
  code,
  language = "python",
}: {
  code: string;
  language?: string;
}) => (
  <div className="relative rounded-xl overflow-hidden bg-[#0D1117] border border-[#1E293B] font-mono text-sm my-6">
    <div className="flex items-center gap-2 px-4 py-2 bg-[#161B22] border-b border-[#1E293B]">
      <Terminal className="h-4 w-4 text-slate-500" />
      <span className="text-slate-400 text-xs uppercase tracking-wider">
        {language}
      </span>
    </div>
    <div className="p-4 overflow-x-auto">
      <pre className="text-slate-300">
        <code>{code}</code>
      </pre>
    </div>
  </div>
);

export default function DocumentationPage() {
  const [activeTab, setActiveTab] = useState<"predictor" | "chat">("predictor");

  const sidebarLinks = [
    { id: "overview", label: "Overview" },
    { id: "algorithm", label: "Algorithm Architecture" },
    { id: "features", label: "Feature Engineering" },
    { id: "training", label: "Training Pipeline" },
    { id: "performance", label: "Performance Metrics" },
  ];

  return (
    <div className="min-h-screen bg-[#060522] selection:bg-orange-500/30">
      <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-900/10 via-[#060522] to-[#060522]" />

      <Link
        href="/"
        className="fixed top-8 left-8 z-50 p-2.5 bg-slate-900/50 backdrop-blur-md border border-slate-700 rounded-full text-slate-400 hover:text-white hover:border-orange-500/50 hover:bg-orange-500/10 transition-all duration-300 group"
      >
        <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
      </Link>

      <main className="relative z-10 container mx-auto px-4 pt-24 pb-20 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Navigation */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="fixed top-24 space-y-8">
              <div>
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2">
                  Models
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setActiveTab("predictor")}
                    className={cn(
                      "w-full text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center gap-3",
                      activeTab === "predictor"
                        ? "bg-gradient-to-r from-orange-500/20 to-amber-500/20 text-orange-300 border border-orange-500/30"
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    )}
                  >
                    <Target className="h-5 w-5" />
                    <span className="font-medium">Round Predictor</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("chat")}
                    className={cn(
                      "w-full text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center gap-3",
                      activeTab === "chat"
                        ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-500/30"
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    )}
                  >
                    <Brain className="h-5 w-5" />
                    <span className="font-medium">AI Chat Assistant</span>
                    <span className="ml-auto text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full">
                      Soon
                    </span>
                  </button>
                </div>
              </div>

              {activeTab === "predictor" && (
                <div className="hidden lg:block">
                  <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2">
                    Contents
                  </h3>
                  <nav className="space-y-1">
                    {sidebarLinks.map((link) => (
                      <a
                        key={link.id}
                        href={`#${link.id}`}
                        className="block px-4 py-2 text-sm text-slate-400 hover:text-orange-300 transition-colors border-l-2 border-transparent hover:border-orange-500"
                      >
                        {link.label}
                      </a>
                    ))}
                  </nav>
                </div>
              )}
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              {activeTab === "predictor" ? (
                <motion.div
                  key="predictor"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-12">
                    <h1 className="text-5xl font-bold text-white mb-6 tracking-tight">
                      Round <span className={TEXT_GRADIENT}>Predictor</span>
                    </h1>
                    <p className="text-xl text-slate-400 leading-relaxed max-w-3xl">
                      A high-precision machine learning model engineered to
                      analyze real-time CS2 match snapshots and forecast round
                      winners with advanced statistical confidence.
                    </p>
                  </div>

                  <Section id="overview" title="Overview">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      <FeatureCard
                        icon={Brain}
                        title="Random Forest"
                        description="Utilizes an ensemble of decision trees to capture complex non-linear relationships in game state data."
                      />
                      <FeatureCard
                        icon={Layers}
                        title="Snapshot Analysis"
                        description="Processes discrete game states including economy, loadouts, and positioning proxies."
                      />
                      <FeatureCard
                        icon={Cpu}
                        title="Real-time Inference"
                        description="Optimized pipeline delivering win probabilities in milliseconds for live-match integration."
                      />
                    </div>
                  </Section>

                  <Section id="algorithm" title="Algorithm Architecture">
                    <div
                      className={`${CARD_BG} p-8 rounded-3xl border border-slate-800`}
                    >
                      <p className="text-slate-300 mb-6 leading-relaxed">
                        The core engine is built upon the{" "}
                        <strong className="text-orange-300">
                          Random Forest Classifier
                        </strong>{" "}
                        from scikit-learn. We chose this architecture for its
                        robustness against overfitting and its ability to handle
                        the high-dimensional, categorical nature of
                        Counter-Strike data without extensive scaling.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                            <GitBranch className="text-orange-400 h-5 w-5" />
                            Ensemble Logic
                          </h4>
                          <ul className="space-y-3 text-slate-400 text-sm">
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-orange-500 mt-0.5" />
                              Constructs multiple decision trees during training
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-orange-500 mt-0.5" />
                              Aggregates predictions via mode (majority vote)
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-orange-500 mt-0.5" />
                              parallelized training with <code>n_jobs=4</code>
                            </li>
                          </ul>
                        </div>
                        <div className="bg-[#050B14] rounded-xl p-4 border border-slate-800/50">
                          <code className="text-xs text-slate-500 block mb-2">
                            // Architecture Config
                          </code>
                          <CodeBlock
                            language="python"
                            code={`rf_model = RandomForestClassifier(
    n_jobs=4,
    n_estimators=100,  # Default
    criterion='gini'   # Default
)`}
                          />
                        </div>
                      </div>
                    </div>
                  </Section>

                  <Section id="features" title="Feature Engineering">
                    <p className="text-slate-300 mb-6">
                      Our model ingests a comprehensive <code>GameData</code>{" "}
                      object, flattening it into a feature vector that captures
                      the exact state of the round.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className={`${CARD_BG} p-6 rounded-2xl`}>
                        <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                          <Database className="text-amber-400 h-5 w-5" />
                          Global State Features
                        </h4>
                        <ul className="space-y-2 text-slate-400 text-sm">
                          <li className="flex justify-between border-b border-slate-800 py-2">
                            <span>Time Left</span>
                            <span className="font-mono text-amber-400">
                              float
                            </span>
                          </li>
                          <li className="flex justify-between border-b border-slate-800 py-2">
                            <span>Team Scores (CT/T)</span>
                            <span className="font-mono text-amber-400">
                              int
                            </span>
                          </li>
                          <li className="flex justify-between border-b border-slate-800 py-2">
                            <span>Bomb Planted</span>
                            <span className="font-mono text-amber-400">
                              0 | 1
                            </span>
                          </li>
                          <li className="flex justify-between border-b border-slate-800 py-2">
                            <span>Map Selection</span>
                            <span className="font-mono text-amber-400">
                              One-Hot
                            </span>
                          </li>
                        </ul>
                      </div>

                      <div className={`${CARD_BG} p-6 rounded-2xl`}>
                        <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                          <UsersIcon />
                          Team Aggregate Features
                        </h4>
                        <div className="space-y-2 text-slate-400 text-sm">
                          <p>Aggregated separately for T and CT sides:</p>
                          <ul className="grid grid-cols-2 gap-2 mt-2">
                            <li className="bg-slate-900/50 px-3 py-1.5 rounded border border-slate-800">
                              Total Health
                            </li>
                            <li className="bg-slate-900/50 px-3 py-1.5 rounded border border-slate-800">
                              Armor Value
                            </li>
                            <li className="bg-slate-900/50 px-3 py-1.5 rounded border border-slate-800">
                              Alive Players
                            </li>
                            <li className="bg-slate-900/50 px-3 py-1.5 rounded border border-slate-800">
                              Helmet Count
                            </li>
                            <li className="bg-slate-900/50 px-3 py-1.5 rounded border border-slate-800">
                              Defuse Kits
                            </li>
                            <li className="bg-slate-900/50 px-3 py-1.5 rounded border border-slate-800">
                              Team Money
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h4 className="text-white font-semibold mb-4 text-lg">
                        Detailed Loadout Vectors
                      </h4>
                      <div className="bg-[#0D1117] rounded-xl border border-slate-800 overflow-hidden">
                        <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-slate-400">
                          <div>
                            <strong className="block text-orange-500 mb-1">
                              Rifles
                            </strong>
                            AK-47, M4A4, M4A1-S, AUG, SG553, FAMAS, Galil
                          </div>
                          <div>
                            <strong className="block text-orange-500 mb-1">
                              Snipers
                            </strong>
                            AWP, SSG08, SCAR-20, G3SG1
                          </div>
                          <div>
                            <strong className="block text-orange-500 mb-1">
                              SMGs/Heavy
                            </strong>
                            Mac-10, MP9, P90, UMP-45, Mag-7, XM1014
                          </div>
                          <div>
                            <strong className="block text-orange-500 mb-1">
                              Utility
                            </strong>
                            Smoke, Flash, HE, Incendiary, Molotov, Decoy
                          </div>
                        </div>
                      </div>
                    </div>
                  </Section>

                  <Section id="training" title="Training Pipeline">
                    <p className="text-slate-300 mb-6">
                      Models are trained on a curated dataset of round snapshots
                      (<code>csgo_round_snapshots.csv</code>). Data
                      preprocessing involves label encoding for categorical
                      targets and one-hot encoding for map selection.
                    </p>

                    <div className="relative">
                      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-800" />

                      <Step
                        number="01"
                        title="Data Loading"
                        desc="Raw CSV ingestion and cleaning. 'bomb_planted' boolean conversion."
                      />
                      <Step
                        number="02"
                        title="Encoding"
                        desc="LabelEncoder for 'round_winner'. One-Hot Encoding for 'map' column."
                      />
                      <Step
                        number="03"
                        title="Splitting"
                        desc="80/20 Train-Test split via sklearn trained on verified match data."
                      />
                      <Step
                        number="04"
                        title="Model Fitting"
                        desc="Random Forest Classifier initialization and parallel fitting."
                      />
                      <Step
                        number="05"
                        title="Serialization"
                        desc="Model persisted to 'rf_model.pkl' via joblib for production use."
                      />
                    </div>
                  </Section>

                  <Section id="performance" title="Performance Metrics">
                    <div className={`${CARD_BG} rounded-3xl p-8`}>
                      <p className="text-slate-400 mb-6">
                        We benchmark our Random Forest implementation against
                        Gradient Boosting and Decision Trees. Key metrics
                        monitored during evaluation include:
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        <MetricBadge label="Accuracy" />
                        <MetricBadge label="Precision" />
                        <MetricBadge label="Recall" />
                        <MetricBadge label="F1-Score" />
                        <MetricBadge label="ROC AUC" />
                      </div>
                    </div>
                  </Section>
                </motion.div>
              ) : (
                <motion.div
                  key="chat"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center justify-center min-h-[50vh] text-center"
                >
                  <div className="h-20 w-20 bg-purple-500/10 rounded-full flex items-center justify-center mb-6 ring-1 ring-purple-500/30">
                    <Brain className="h-10 w-10 text-purple-400" />
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-3">
                    Chat Model Documentation
                  </h2>
                  <p className="text-slate-400 max-w-md mx-auto">
                    Documentation for the conversational AI assistant will be
                    available once the model implementation is finalized.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}

// --- Helper Components ---

function UsersIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-amber-400 h-5 w-5"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function Step({
  number,
  title,
  desc,
}: {
  number: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="relative pl-12 mb-8 last:mb-0 group">
      <div className="absolute left-0 top-0 h-8 w-8 rounded-full bg-[#0D1117] border border-slate-700 flex items-center justify-center text-xs font-mono text-orange-500 z-10 group-hover:border-orange-500 transition-colors">
        {number}
      </div>
      <h4 className="text-white font-semibold text-lg mb-1">{title}</h4>
      <p className="text-slate-400 text-sm">{desc}</p>
    </div>
  );
}

function MetricBadge({ label }: { label: string }) {
  return (
    <div className="bg-[#0D1117] border border-slate-800 rounded-lg p-3 text-center">
      <div className="text-orange-400 font-bold mb-1">
        <CheckCircle2 className="h-4 w-4 mx-auto" />
      </div>
      <div className="text-slate-400 text-sm font-medium">{label}</div>
    </div>
  );
}
