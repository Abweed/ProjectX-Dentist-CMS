import { cn } from "@/lib/utils";

export function ToothMap() {
  return (
    <div className="relative w-full max-w-[800px] h-full min-h-[400px] flex items-center justify-center pt-8">
      {/* 
        For this demo, we'll build a simplified CSS/SVG representation of the tooth map.
        In a real app, this would be a complex SVG with individual path elements.
      */}
      <div className="flex w-full gap-8 h-full items-center justify-between px-10">
        
        {/* Left Arch (Maxilla / Mandible vertical overview) */}
        <div className="w-[180px] h-[360px] relative">
          <svg viewBox="0 0 200 400" className="w-full h-full" fill="none" stroke="currentColor">
            {/* Top Arch (Maxilla) */}
            <path d="M 40,160 C 40,60 160,60 160,160" stroke="#e2e8f0" strokeWidth="20" strokeLinecap="round" strokeDasharray="5 20" />
            
            {/* Bottom Arch (Mandible) */}
            <path d="M 40,240 C 40,340 160,340 160,240" stroke="#e2e8f0" strokeWidth="20" strokeLinecap="round" strokeDasharray="5 20" />
            
            <text x="100" y="140" textAnchor="middle" className="text-xs font-bold fill-slate-300">MAXILLA</text>
            <text x="100" y="270" textAnchor="middle" className="text-xs font-bold fill-slate-300">MANDIBLE</text>
            
            {/* Colored Indicators Left Arch */}
            {/* Maxilla indicators */}
            <circle cx="50" cy="110" r="4" fill="#3b82f6" /> {/* Plus */}
            <circle cx="150" cy="110" r="4" fill="#cbd5e1" /> {/* Minus */}
            <circle cx="150" cy="140" r="4" fill="#cbd5e1" /> {/* Minus */}
            <circle cx="150" cy="80" r="4" fill="#a855f7" /> {/* Plus */}
            
            {/* Mandible indicators */}
            <circle cx="45" cy="240" r="4" fill="#a855f7" /> {/* Plus */}
            <circle cx="50" cy="270" r="4" fill="#a855f7" /> {/* Plus */}
            <circle cx="60" cy="300" r="4" fill="#a855f7" /> {/* Plus */}
            <circle cx="75" cy="325" r="4" fill="#3b82f6" /> {/* Minus */}
            <circle cx="100" cy="340" r="4" fill="#a855f7" /> {/* Plus */}
            
            <circle cx="150" cy="250" r="4" fill="#22c55e" /> {/* Plus */}
            <circle cx="140" cy="300" r="4" fill="#22c55e" /> {/* Plus */}
            <circle cx="120" cy="330" r="4" fill="#a855f7" /> {/* Plus */}
          </svg>
        </div>

        {/* Main Dental Chart Rows */}
        <div className="flex-1 flex flex-col justify-center items-center h-full max-w-[500px]">
          
          {/* Top Row (Maxilla detailed) */}
          <div className="relative w-full h-[140px] bg-red-50/50 rounded-[3rem] border border-red-100 flex items-end justify-center pb-2 px-8 mb-4">
             {/* Dental silhouettes */}
             <div className="flex items-end justify-between w-full h-full pb-4">
                {[...Array(16)].map((_, i) => (
                  <div key={`max-${i}`} className="flex flex-col items-center">
                    <div className={cn(
                      "w-4 h-[60px] border-2 border-slate-200 rounded-t-full mb-2",
                      i === 12 ? "bg-amber-900/20 border-amber-900/40" : 
                      i === 8 ? "bg-cyan-500/20 border-cyan-500/40" : 
                      i === 4 ? "bg-pink-500/20 border-pink-500/40" : 
                      i === 2 ? "bg-green-500/20 border-green-500/40" : ""
                    )}></div>
                    <span className="text-[10px] text-slate-300 font-bold">{i + 1}</span>
                  </div>
                ))}
             </div>
          </div>

          {/* Bottom Row (Mandible detailed) */}
          <div className="relative w-full h-[140px] bg-red-50/50 rounded-[3rem] border border-red-100 flex items-start justify-center pt-2 px-8 mt-4">
            <div className="flex items-start justify-between w-full h-full pt-4">
                {[...Array(16)].map((_, i) => (
                  <div key={`man-${i}`} className="flex flex-col items-center">
                    <span className="text-[10px] text-slate-300 font-bold mb-2">{32 - i}</span>
                    <div className={cn(
                      "w-4 h-[60px] border-2 border-slate-200 rounded-b-full",
                      i === 1 ? "bg-pink-500/20 border-pink-500/40" :
                      i === 6 ? "bg-purple-500/20 border-purple-500" : // Selected implant
                      i === 13 ? "border-red-500 bg-red-500/20 rounded-t-none h-[40px] mt-[20px]" : "" // broken tooth
                    )}></div>
                  </div>
                ))}
            </div>
             
             {/* Selected indicator line */}
             <div className="absolute top-[40px] left-[38%] w-1.5 h-14 bg-purple-500 rounded-full opacity-50 z-0 hidden lg:block"></div>
          </div>

        </div>

      </div>
    </div>
  );
}
