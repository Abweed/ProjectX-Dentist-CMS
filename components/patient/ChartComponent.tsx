export function ChartComponent() {
  const data = [
    { label: "Caries", value: 12, color: "bg-green-400" },
    { label: "Surgery", value: 4, color: "bg-pink-400" },
    { label: "Implants", value: 10, color: "bg-purple-400" },
    { label: "Gingivitis", value: 3, color: "bg-red-400" },
    { label: "Periodontitis", value: 7, color: "bg-cyan-400" },
    { label: "Removal", value: 3, color: "bg-slate-300" },
    { label: "Periostitis", value: 3, color: "bg-amber-900" },
  ];

  const maxVal = Math.max(...data.map(d => d.value));

  return (
    <div className="w-full flex flex-col pt-2">
      <h3 className="font-bold text-slate-800 tracking-tight text-lg mb-8">Chart</h3>
      
      <div className="flex items-end justify-between h-[160px] pb-6 border-b border-slate-100 px-4">
        {data.map((item) => {
          const heightPercent = (item.value / maxVal) * 100;
          return (
            <div key={item.label} className="flex flex-col items-center gap-3 w-12 group">
              <span className="text-[11px] font-bold text-slate-800">{item.value}%</span>
              <div className="w-full h-[120px] flex items-end">
                <div 
                  className={`w-full ${item.color} rounded-t-md transition-all group-hover:opacity-80`} 
                  style={{ height: `${heightPercent}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Chart Labels */}
      <div className="flex items-center justify-between pt-4 px-4">
        {data.map((item) => (
          <div key={`label-${item.label}`} className="w-12 text-center">
             <span className="text-[11px] font-medium text-slate-400 block -ml-2 w-16 truncate">
               {item.label}
             </span>
          </div>
        ))}
      </div>
    </div>
  );
}
