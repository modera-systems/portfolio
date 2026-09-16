import React, { useState } from 'react';
import { PageId, ArchitectureNode } from '../types';
import { architectureFlowsData } from '../data/architecturePatterns';
import { 
  ArrowRight, 
  Check, 
  Layers, 
  Zap, 
  Database, 
  Search, 
  Sparkles, 
  ShieldCheck, 
  AlertCircle, 
  ArrowDown, 
  Code,
  Info,
  ChevronRight
} from 'lucide-react';

interface ArchitectureViewProps {
  onNavigate: (page: PageId, caseStudyId?: string) => void;
}

export const ArchitectureView: React.FC<ArchitectureViewProps> = ({ onNavigate }) => {
  const [selectedFlowId, setSelectedFlowId] = useState<string>(architectureFlowsData[0].id);
  const activeFlow = architectureFlowsData.find(f => f.id === selectedFlowId) || architectureFlowsData[0];
  const [inspectedNodeId, setInspectedNodeId] = useState<string>(activeFlow.nodes[0].id);

  const inspectedNode = activeFlow.nodes.find(n => n.id === inspectedNodeId) || activeFlow.nodes[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      
      {/* Page Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full border-2 border-[#ea580c] flex items-center justify-center">
            <span className="w-1 h-1 rounded-full bg-[#ea580c]"></span>
          </span>
          <span className="font-mono-tech uppercase tracking-[0.16em] text-xs font-bold text-slate-700">
            SYSTEM ARCHITECTURE & SOLUTION FLOWS
          </span>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
          How I Connect Systems.
        </h1>

        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Real solution flows from projects I&apos;ve designed, built, or solutioned. These interactive topologies prioritize visual comprehension: click any node below to inspect its precise input, transformation action, schema output, and business purpose.
        </p>
      </div>

      {/* Selector Tabs for the 4 Real Architecture Flows */}
      <div className="flex flex-wrap gap-2 pt-1 border-b border-slate-200 pb-4">
        {architectureFlowsData.map((flow) => {
          const isSelected = flow.id === selectedFlowId;
          return (
            <button
              key={flow.id}
              onClick={() => {
                setSelectedFlowId(flow.id);
                setInspectedNodeId(flow.nodes[0].id);
              }}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-2 ${
                isSelected
                  ? 'bg-slate-950 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-950 hover:border-slate-300'
              }`}
            >
              <span className="font-mono-tech text-[10px] text-orange-400 font-bold">{flow.number}</span>
              <span>{flow.title}</span>
            </button>
          );
        })}
      </div>

      {/* Active Flow Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <span className="text-[10px] font-mono-tech uppercase tracking-widest text-[#ea580c] font-bold">
              ARCHITECTURE 0{activeFlow.number} • {activeFlow.tagline}
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-950">
              {activeFlow.title}
            </h2>
          </div>

          <span className={`px-3 py-1 rounded-full text-xs font-mono-tech font-bold self-start sm:self-auto ${
            activeFlow.statusLabel.includes('Proposed')
              ? 'bg-amber-100 text-amber-900 border border-amber-200'
              : 'bg-emerald-100 text-emerald-900 border border-emerald-200'
          }`}>
            {activeFlow.statusLabel}
          </span>
        </div>

        <p className="text-slate-600 text-sm leading-relaxed max-w-4xl">
          {activeFlow.overview}
        </p>

        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600 flex items-center gap-2">
          <Info className="w-4 h-4 text-[#ea580c] shrink-0" />
          <span>{activeFlow.contextNote}</span>
        </div>
      </div>

      {/* Interactive Visual Topology & Inspector Panel (Split Canvas) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Visual Node Topology Canvas */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-mono-tech text-xs uppercase tracking-wider text-slate-500 font-bold">
              WORKFLOW PIPELINE (CLICK ANY NODE TO INSPECT)
            </span>
            <span className="text-[11px] font-mono-tech text-slate-400">
              {activeFlow.nodes.length} Nodes in Flow
            </span>
          </div>

          {/* Node Flow Canvas */}
          <div className="p-6 rounded-3xl bg-[#fafafa] border border-slate-200/90 space-y-3">
            {activeFlow.nodes.map((node, index) => {
              const isInspected = node.id === inspectedNode.id;
              return (
                <div key={node.id} className="space-y-2">
                  <div
                    onClick={() => setInspectedNodeId(node.id)}
                    className={`cursor-pointer p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                      isInspected
                        ? 'bg-white border-2 border-[#ea580c] shadow-md scale-[1.01]'
                        : 'bg-white/90 border-slate-200 hover:border-slate-400 hover:bg-white shadow-2xs'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {/* Node Number and Type icon */}
                      <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-mono-tech text-xs font-bold ${
                        isInspected ? 'bg-[#ea580c] text-white' : 'bg-slate-100 text-slate-700'
                      }`}>
                        0{index + 1}
                      </span>

                      <div>
                        <h4 className="font-bold text-slate-950 text-xs sm:text-sm">
                          {node.label}
                        </h4>
                        <span className="text-[11px] text-slate-500 font-mono-tech block">
                          {node.sublabel || node.type.toUpperCase()}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono-tech uppercase font-bold ${
                        node.type === 'trigger' ? 'bg-orange-100 text-orange-800' :
                        node.type === 'action' ? 'bg-blue-100 text-blue-800' :
                        node.type === 'branch' ? 'bg-amber-100 text-amber-800' :
                        node.type === 'data' ? 'bg-purple-100 text-purple-800' :
                        node.type === 'output' ? 'bg-emerald-100 text-emerald-800' :
                        'bg-slate-100 text-slate-800'
                      }`}>
                        {node.type}
                      </span>
                      <ChevronRight className={`w-4 h-4 transition-transform ${isInspected ? 'text-[#ea580c] translate-x-1' : 'text-slate-300'}`} />
                    </div>
                  </div>

                  {/* Flow Arrow to next node */}
                  {index < activeFlow.nodes.length - 1 && (
                    <div className="flex justify-center py-0.5">
                      <div className="flex items-center gap-1.5 text-[10px] font-mono-tech text-slate-400">
                        <ArrowDown className="w-3.5 h-3.5 text-slate-400" />
                        <span>Passes Execution Context</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Deep Node Inspector (Sticky) */}
        <div className="lg:col-span-5 sticky top-24 space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-mono-tech text-xs uppercase tracking-wider text-[#ea580c] font-bold">
              NODE INSPECTOR DETAILS
            </span>
            <span className="text-[11px] font-mono-tech text-slate-500">
              ID: {inspectedNode.id}
            </span>
          </div>

          <div className="p-6 sm:p-7 rounded-3xl bg-slate-950 text-white space-y-6 shadow-xl border border-slate-900">
            
            <div className="space-y-1 pb-4 border-b border-slate-800">
              <span className="text-[10px] font-mono-tech uppercase tracking-widest text-[#ea580c] font-bold">
                {inspectedNode.type} Node
              </span>
              <h3 className="font-display text-2xl font-bold text-white">
                {inspectedNode.label}
              </h3>
              <p className="text-slate-400 text-xs font-mono-tech">
                {inspectedNode.sublabel}
              </p>
            </div>

            {/* 1. What Enters (Input) */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono-tech uppercase tracking-wider text-slate-400 font-bold block flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                1. WHAT ENTERS THE NODE (INPUT)
              </span>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 leading-relaxed font-sans">
                {inspectedNode.input}
              </div>
            </div>

            {/* 2. What Happens (Action) */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono-tech uppercase tracking-wider text-slate-400 font-bold block flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-orange-400"></span>
                2. WHAT HAPPENS (TRANSFORMATION / ACTION)
              </span>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 leading-relaxed font-sans">
                {inspectedNode.action}
              </div>
            </div>

            {/* 3. What Leaves (Output) */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono-tech uppercase tracking-wider text-slate-400 font-bold block flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                3. WHAT LEAVES THE NODE (OUTPUT)
              </span>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono-tech text-emerald-300 leading-relaxed break-all">
                {inspectedNode.output}
              </div>
            </div>

            {/* 4. Why It Exists (System Purpose) */}
            <div className="space-y-1.5 pt-2 border-t border-slate-800">
              <span className="text-[10px] font-mono-tech uppercase tracking-wider text-[#ea580c] font-bold block">
                WHY THIS NODE EXISTS IN THE ARCHITECTURE
              </span>
              <p className="text-slate-300 text-xs leading-relaxed">
                {inspectedNode.purpose}
              </p>
            </div>

          </div>

          {/* Quick link to related case study */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-center justify-between text-xs">
            <span className="text-slate-600 font-medium">Want the full problem story?</span>
            <button
              onClick={() => onNavigate('case-studies')}
              className="font-bold text-[#ea580c] hover:underline flex items-center gap-1"
            >
              <span>Explore Case Study</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
