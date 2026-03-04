import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig, Easing } from 'remotion';

export const TUI: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Define commands to "type" (from previous version)
  const commands = [
    { text: '> INITIALIZING REMOTE HANDSHAKE...', delay: 10 },
    { text: '> ESTABLISHING SECURE PROTOCOL...', delay: 25 },
    { text: '> FETCHING ITINERARY DATA...', delay: 40 },
    // { text: '> COMPILING TRAVEL PACKAGE...', delay: 55 },
    // { text: '> FINALIZING BOOKING REQUEST...', delay: 75 },
    // { text: '> SUCCESS: CONFIRMATION RECEIVED.', delay: 90 },
  ];

  // Bar chart data for Graphs panel
  const barData = [
    { label: 'CPU1', value: interpolate(frame % 40, [0, 20, 40], [30, 85, 30]) },
    { label: 'CPU2', value: interpolate((frame + 10) % 45, [0, 22, 45], [20, 95, 20]) },
    { label: 'MEM', value: 65 },
    { label: 'NET', value: interpolate(frame % 30, [0, 15, 30], [10, 50, 10]) },
    { label: 'DISK', value: 42 },
  ];

  return (
    <div className="w-full h-full p-8 font-mono text-blue-400 flex flex-col gap-6 overflow-hidden bg-black/40">
      {/* HEADER SECTION */}
      <div className="flex justify-between items-start border-b border-blue-900 pb-4">
        <div className="flex flex-col gap-1">
          <div className="text-2xl font-black text-white tracking-tighter italic">SERVER_v4.2</div>
          <div className="flex items-center gap-3">
            <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-[10px] text-blue-300 tracking-[0.2em] uppercase">Status: Processing_Itinerary</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xl text-blue-200">2026-03-03 // 14:22:08</div>
          <div className="text-[10px] text-blue-500 opacity-60">USER: AUTHORIZED_AGENT</div>
        </div>
      </div>

      {/* TOP GRID: MONITOR & GRAPHS */}
      <div className="grid grid-cols-12 gap-6 h-52">
        {/* User's Manual Monitor Box preserved in size */}
        <div className="col-span-5 h-full border-2 border-blue-500 rounded-md relative bg-blue-900/10 overflow-hidden flex items-center justify-center p-4 text-center">
          <div className="absolute top-1 left-2 text-[10px] text-blue-300 opacity-50 uppercase font-bold tracking-widest">MONITOR_01</div>
          
          {/* Alert Text (Behind Scanning Line due to DOM order) */}
          {frame >= 30 && (
            <div 
              className={`font-bold z-0 ${frame < 120 ? 'text-4xl text-white uppercase tracking-widest' : 'text-3xl text-orange-500 tracking-wide'}`}
              style={{
                opacity: frame < 90 ? (Math.floor(frame / 10) % 2 === 0 ? 1 : 0) : 1
              }}
            >
              {frame < 120 ? "New Booking!" : "Initializing Booking Orchestrator..."}
            </div>
          )}

          {/* Animated Scanning Line */}
          <div 
            className="absolute left-0 right-0 h-1 bg-blue-400/30 blur-[2px] z-10" 
            style={{ 
              top: interpolate(frame % 60, [0, 60], [0, 100], { extrapolateRight: 'clamp' }) + '%' 
            }} 
          />

          
        </div>

        {/* Graphs / Stats Panel */}
        <div className="col-span-7 h-full border border-blue-900 rounded bg-black/20 p-4 flex flex-col gap-3">
          <div className="text-[10px] text-blue-300 uppercase opacity-50 mb-1">System_Loads</div>
          {barData.map((bar, i) => (
            <div key={i} className="flex items-center gap-3 h-full">
              <div className="w-12 text-[10px] text-white">{bar.label}</div>
              <div className="flex-1 h-2 bg-blue-950 rounded-sm overflow-hidden">
                <div 
                  className="h-full bg-blue-500" 
                  style={{ width: `${bar.value}%` }} 
                />
              </div>
              <div className="w-8 text-[10px] text-right text-blue-300">{Math.floor(bar.value)}%</div>
            </div>
          ))}
        </div>
      </div>

      {/* MAIN CONTENT GRID: LOGS & WIDGETS */}
      <div className="grid grid-cols-12 gap-6 flex-1 min-h-0">
        {/* Terminal Logs Panel */}
        <div className="col-span-8 border border-blue-900 rounded bg-black/30 p-4 flex flex-col gap-2 overflow-hidden">
          <div className="text-[10px] text-blue-300 uppercase opacity-50 mb-2 border-b border-blue-900/30 pb-1">Process_Logs</div>
          <div className="flex-1 flex flex-col gap-2 overflow-y-auto pr-2">
            {commands.map((cmd, i) => {
              const isVisible = frame >= cmd.delay;
              if (!isVisible) return null;

              const charsVisible = Math.floor(interpolate(frame - cmd.delay, [0, 10], [0, cmd.text.length], { extrapolateRight: 'clamp' }));
              const currentText = cmd.text.substring(0, charsVisible);

              return (
                <div key={i} className="flex flex-col gap-1 mb-1">
                  <div className="text-[11px] font-bold flex gap-2 leading-tight">
                    <span className="text-white">{currentText}</span>
                    {charsVisible < cmd.text.length && <span className="animate-pulse">_</span>}
                  </div>
                  
                  {i % 2 === 1 && frame > cmd.delay + 10 && (
                    <div className="flex items-center gap-4 ml-4">
                      <div className="w-32 h-1 bg-blue-900 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.5)]" 
                          style={{ 
                            width: `${interpolate(frame - (cmd.delay + 10), [0, 20], [0, 100], { extrapolateRight: 'clamp' })}%` 
                          }} 
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Sidebar Widgets Panel */}
        <div className="col-span-4 flex flex-col gap-4">
          {/* Radio Buttons Style Widget */}
          <div className="flex-1 border border-blue-900 rounded bg-black/20 p-4 flex flex-col gap-3">
             <div className="text-[10px] text-blue-300 uppercase opacity-50 border-b border-blue-900/30 pb-1">Mode_Selector</div>
             {[
               { label: 'Default', active: true },
               { label: 'Optimizer', active: false },
               { label: 'Low_Latency', active: true },
               { label: 'Debug_MS-DOS', active: false }
             ].map((item, i) => (
               <div key={i} className="flex items-center gap-3">
                 <div className={`w-3 h-3 border border-blue-500 rounded-sm flex items-center justify-center`}>
                    {item.active && <div className="w-1.5 h-1.5 bg-white rounded-sm" />}
                 </div>
                 <span className={`text-[10px] ${item.active ? 'text-white' : 'text-blue-700'}`}>{item.label}</span>
               </div>
             ))}
          </div>

          {/* Data Waveform Widget */}
          <div className="h-24 border border-blue-900 rounded bg-blue-900/10 p-2 relative flex items-center gap-[2px] justify-center overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <div 
                key={i} 
                className="w-1 bg-blue-500/60" 
                style={{ 
                  height: (10 + Math.sin((frame + i * 5) * 0.2) * 20) + 'px',
                  opacity: interpolate(Math.sin((frame + i * 5) * 0.2), [-1, 1], [0.3, 1])
                }} 
              />
            ))}
            <div className="absolute top-1 left-2 text-[8px] text-blue-400 opacity-40">SIGNAL_OUT</div>
          </div>
        </div>
      </div>

      {/* FOOTER STATUS BAR */}
      <div className="flex justify-between items-end text-[10px] border-t border-blue-900/50 pt-3 pl-3">
        <div className="flex gap-10">
          <div className="flex flex-col">
            <span className="text-blue-500 opacity-50 uppercase">Network</span>
            <span className="text-white">UP: 42.1 MB/s // DOWN: 12.8 MB/s</span>
          </div>
          <div className="flex flex-col">
            <span className="text-blue-500 opacity-50 uppercase">Location</span>
            <span className="text-white">NODE_SERVER_PRAGUE_#14</span>
          </div>
        </div>
        
        <div className="flex flex-col items-end">
          <span className="text-blue-500 opacity-50 uppercase tracking-widest animate-pulse">Encryption_Active</span>
          <span className="text-white opacity-40">FRAME_{frame} // PID_{Math.floor(1000 + frame/10)}</span>
        </div>
      </div>
    </div>
  );
};
