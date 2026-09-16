import React, { useState } from 'react';
import { ArchitectureNode, ArchitectureEdge } from '../types';
import { 
  Server, 
  Database, 
  Layers, 
  Cpu, 
  Bot, 
  ExternalLink, 
  CheckCircle, 
  Play, 
  RotateCcw, 
  Code, 
  Info,
  Globe,
  Lock,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface ArchitectureDiagramProps {
  title?: string;
  flowNotation?: string;
  nodes: ArchitectureNode[];
  edges: ArchitectureEdge[];
  showInspector?: boolean;
}

export const ArchitectureDiagram: React.FC<ArchitectureDiagramProps> = ({
  title,
  flowNotation,
  nodes,
  edges,
  showInspector = true
}) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(nodes[0]?.id || null);
  const [isTracing, setIsTracing] = useState(false);
  const [activeStepIndex, setActiveStepIndex] = useState<number | null>(null);

  // Function to simulate request tracing animation across the nodes
  const handleTraceFlow = () => {
    if (isTracing) return;
    setIsTracing(true);
    setActiveStepIndex(0);
    setSelectedNodeId(nodes[0]?.id || null);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < nodes.length) {
        setActiveStepIndex(step);
        setSelectedNodeId(nodes[step].id);
      } else {
        clearInterval(interval);
        setIsTracing(false);
        setActiveStepIndex(null);
      }
    }, 900);
  };

  const selectedNode = nodes.find(n => n.id === selectedNodeId) || nodes[0];

  const getNodeIcon = (type: ArchitectureNode['type']) => {
    switch (type) {
      case 'client':
        return <Globe className="w-4 h-4 text-sky-400" />;
      case 'api':
        return <Server className="w-4 h-4 text-emerald-400" />;
      case 'logic':
        return <Cpu className="w-4 h-4 text-[#ea580c]" />;
      case 'automation':
        return <Layers className="w-4 h-4 text-amber-400" />;
      case 'database':
        return <Database className="w-4 h-4 text-indigo-400" />;
      case 'ai':
        return <Bot className="w-4 h-4 text-purple-400" />;
      case 'external':
        return <ExternalLink className="w-4 h-4 text-rose-400" />;
      default:
        return <Layers className="w-4 h-4 text-slate-400" />;
    }
  };

  const getNodeTypeBadge = (type: ArchitectureNode['type']) => {
    switch (type) {
      case 'client': return 'Client / UI';
      case 'api': return 'API / Gateway';
      case 'logic': return 'Logic & Rules';
      case 'automation': return 'Queue / Event';
      case 'database': return 'Storage / ACID';
      case 'ai': return 'AI / LLM Tool';
      case 'external': return 'External System';
      default: return 'Component';
    }
  };

  return (
    <div className="rounded-xl bg-slate-950 text-slate-100 border border-slate-800 overflow-hidden shadow-xl" id="architecture-diagram-container">
      
      {/* Top Header Bar */}
      <div className="px-4 py-3 bg-slate-900/90 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ea580c] animate-pulse"></div>
          <span className="text-xs font-mono-tech font-semibold uppercase tracking-wider text-slate-300">
            {title || 'System Architecture Flow'}
          </span>
          <span className="hidden sm:inline-block text-[10px] font-mono-tech px-2 py-0.5 rounded bg-slate-800 text-slate-400">
            Interactive Model
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleTraceFlow}
            disabled={isTracing}
            id="btn-trace-flow"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#ea580c] hover:bg-[#c2410c] disabled:opacity-50 text-white text-xs font-semibold font-mono-tech transition-colors shadow-xs"
          >
            <Play className={`w-3.5 h-3.5 ${isTracing ? 'animate-spin' : ''}`} />
            <span>{isTracing ? `Tracing Step ${activeStepIndex! + 1}/${nodes.length}...` : 'Trace Request Flow'}</span>
          </button>
          
          <button
            onClick={() => {
              setIsTracing(false);
              setActiveStepIndex(null);
              setSelectedNodeId(nodes[0]?.id || null);
            }}
            title="Reset view"
            className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Notation Bar */}
      {flowNotation && (
        <div className="px-4 py-2 bg-slate-900/50 border-b border-slate-800/60 text-xs font-mono-tech text-slate-400 flex items-center gap-2 overflow-x-auto whitespace-nowrap">
          <span className="text-[#ea580c] shrink-0 font-bold">FLOW:</span>
          <span className="text-slate-300">{flowNotation}</span>
        </div>
      )}

      {/* Main Diagram Area */}
      <div className="p-5 sm:p-7 relative bg-grid-dark min-h-[260px] flex items-center justify-center overflow-x-auto">
        <div className="flex items-center gap-2 sm:gap-4 py-4 min-w-max">
          {nodes.map((node, index) => {
            const isSelected = selectedNodeId === node.id;
            const isHighlighted = activeStepIndex === index;
            const edgeToNext = edges.find(e => e.from === node.id);

            return (
              <React.Fragment key={node.id}>
                {/* Node Box */}
                <div
                  id={`arch-node-${node.id}`}
                  onClick={() => setSelectedNodeId(node.id)}
                  className={`group relative cursor-pointer p-3.5 sm:p-4 rounded-xl transition-all duration-200 w-44 sm:w-52 border text-left ${
                    isHighlighted
                      ? 'bg-[#ea580c]/20 border-[#ea580c] ring-2 ring-[#ea580c]/50 shadow-lg scale-105'
                      : isSelected
                      ? 'bg-slate-900 border-[#ea580c] ring-1 ring-[#ea580c]/40 shadow-md'
                      : 'bg-slate-900/80 hover:bg-slate-900 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {/* Step Number Badge */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-5 h-5 rounded-md bg-slate-800 border border-slate-700 text-[10px] font-mono-tech flex items-center justify-center font-bold text-slate-300">
                      {index + 1}
                    </span>
                    <span className="text-[10px] font-mono-tech px-1.5 py-0.5 rounded bg-slate-800/80 text-slate-400">
                      {getNodeTypeBadge(node.type)}
                    </span>
                  </div>

                  {/* Icon & Label */}
                  <div className="flex items-start gap-2.5">
                    <div className={`p-2 rounded-lg ${isSelected || isHighlighted ? 'bg-slate-800' : 'bg-slate-800/60'}`}>
                      {getNodeIcon(node.type)}
                    </div>
                    <div className="overflow-hidden">
                      <h4 className="font-semibold text-xs sm:text-sm text-white truncate tracking-tight">
                        {node.label}
                      </h4>
                      <p className="text-[11px] text-slate-400 font-mono-tech truncate">
                        {node.sublabel}
                      </p>
                    </div>
                  </div>

                  {/* Optional Protocol Tag */}
                  {node.protocol && (
                    <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono-tech text-slate-400">
                      <span>PROTOCOL:</span>
                      <span className="text-[#ea580c] font-semibold">{node.protocol}</span>
                    </div>
                  )}

                  {/* Active Indicator Pulse */}
                  {isHighlighted && (
                    <span className="absolute -top-1.5 -right-1.5 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ea580c] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-[#ea580c]"></span>
                    </span>
                  )}
                </div>

                {/* Connecting Edge Arrow */}
                {index < nodes.length - 1 && (
                  <div className="flex flex-col items-center justify-center px-1 text-slate-500">
                    <div className="flex items-center gap-1">
                      <div className={`h-0.5 w-6 sm:w-10 transition-colors ${
                        activeStepIndex !== null && activeStepIndex >= index
                          ? 'bg-[#ea580c]'
                          : 'bg-slate-700'
                      }`}></div>
                      <ArrowRight className={`w-3.5 h-3.5 -ml-1.5 transition-colors ${
                        activeStepIndex !== null && activeStepIndex >= index
                          ? 'text-[#ea580c]'
                          : 'text-slate-600'
                      }`} />
                    </div>
                    {edgeToNext && (
                      <span className="text-[9px] font-mono-tech text-slate-400 max-w-[80px] text-center truncate mt-1">
                        {edgeToNext.label}
                      </span>
                    )}
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Selected Node Spec Inspector */}
      {showInspector && selectedNode && (
        <div className="bg-slate-900 border-t border-slate-800 p-4 text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-800/80">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded bg-slate-800">
                {getNodeIcon(selectedNode.type)}
              </span>
              <div>
                <span className="font-semibold text-white mr-2">{selectedNode.label}</span>
                <span className="text-slate-400 font-mono-tech">({selectedNode.sublabel})</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-mono-tech text-slate-400">
              <span className="text-slate-500">TYPE:</span>
              <span className="text-[#ea580c] font-semibold">{getNodeTypeBadge(selectedNode.type)}</span>
              {selectedNode.protocol && (
                <>
                  <span className="text-slate-600">•</span>
                  <span className="text-slate-500">TRANS:</span>
                  <span className="text-slate-300">{selectedNode.protocol}</span>
                </>
              )}
            </div>
          </div>

          <div className="pt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="text-[10px] font-mono-tech uppercase tracking-wider text-slate-400 block mb-1">
                Node Responsibilities & Logic
              </span>
              <p className="text-slate-300 leading-relaxed">
                {selectedNode.details || 'Processes incoming requests, enforces contract invariants, and propagates state mutations down the execution chain.'}
              </p>
            </div>

            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800/80 font-mono-tech text-[11px] text-slate-300 flex flex-col justify-between">
              <div className="flex items-center justify-between text-[10px] text-slate-400 pb-1 border-b border-slate-900">
                <span>EXECUTION SPECIFICATION</span>
                <span className="text-emerald-400">Verified Protocol</span>
              </div>
              <div className="py-1 text-slate-400">
                <span>Inbound: </span>
                <span className="text-slate-200">
                  {edges.find(e => e.to === selectedNode.id)?.label || 'Client Request'}
                </span>
                <br />
                <span>Outbound: </span>
                <span className="text-slate-200">
                  {edges.find(e => e.from === selectedNode.id)?.label || 'Final Target / Response'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
