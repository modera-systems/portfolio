import React, { useState } from 'react';
import { Copy, Check, Terminal, Code2 } from 'lucide-react';

interface InteractivePayloadViewerProps {
  title?: string;
  language?: string;
  code: string;
  description?: string;
}

export const InteractivePayloadViewer: React.FC<InteractivePayloadViewerProps> = ({
  title = 'Payload Inspection',
  language = 'json',
  code,
  description
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.trim().split('\n');

  return (
    <div className="rounded-xl bg-slate-950 border border-slate-800 text-slate-200 overflow-hidden font-mono-tech text-xs shadow-lg">
      
      {/* Header bar */}
      <div className="px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Code2 className="w-3.5 h-3.5 text-[#ea580c]" />
          <span className="font-semibold text-slate-300 tracking-tight">{title}</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 uppercase">
            {language}
          </span>
        </div>

        <button
          onClick={handleCopy}
          id="btn-copy-payload"
          className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[11px] transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3 text-slate-400" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {description && (
        <div className="px-4 py-1.5 bg-slate-900/40 border-b border-slate-900 text-[11px] text-slate-400">
          {description}
        </div>
      )}

      {/* Code body with line numbers */}
      <div className="p-4 overflow-x-auto max-h-96 leading-relaxed">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, idx) => (
              <tr key={idx} className="hover:bg-slate-900/50">
                <td className="w-8 pr-4 text-right select-none text-slate-600 text-[10px]">
                  {idx + 1}
                </td>
                <td className="whitespace-pre text-slate-300">
                  {formatJsonLine(line)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Simple syntax colorizer for JSON lines
function formatJsonLine(line: string) {
  // Highlight keys: "key":
  const keyRegex = /"([^"]+)":/g;
  const stringValRegex = /: "([^"]+)"/g;
  const numBoolRegex = /: (true|false|null|[0-9.-]+)/g;

  if (line.includes('//')) {
    return <span className="text-slate-500 italic">{line}</span>;
  }

  // Key match
  if (line.match(keyRegex)) {
    return (
      <span>
        {line.split(':').map((part, index) => {
          if (index === 0) {
            return (
              <span key={index} className="text-sky-300 font-semibold">
                {part}:
              </span>
            );
          }
          // Process value side
          const val = part.trim();
          if (val.startsWith('"')) {
            return (
              <span key={index} className="text-emerald-300">
                {' '}{val}
              </span>
            );
          }
          if (val.match(/^(true|false|null|[0-9.-]+)/)) {
            return (
              <span key={index} className="text-amber-300">
                {' '}{val}
              </span>
            );
          }
          return <span key={index} className="text-slate-300">{' '}{part}</span>;
        })}
      </span>
    );
  }

  return <span>{line}</span>;
}
