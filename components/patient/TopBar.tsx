import { Bell, ChevronDown, Search } from "lucide-react";
import Image from "next/image";

export function TopBar() {
  return (
    <div className="flex items-center justify-between w-full h-20 px-8 border-b border-slate-100 bg-white">
      <div className="flex items-center w-full max-w-md bg-slate-100/70 rounded-2xl px-4 py-2.5">
        <Search className="w-5 h-5 text-slate-400 mr-2" />
        <input
          type="text"
          placeholder="Search by Name / ID"
          className="bg-transparent border-none outline-none text-sm w-full font-medium placeholder:text-slate-400"
        />
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="relative w-10 h-10 rounded-full overflow-hidden">
            <div className="w-full h-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
              JW
            </div>
            {/* Using a placeholder string so it doesn't fail if we lack next/image config, or we fall back to initals */}
            <Image 
              src="https://i.pravatar.cc/150?u=jeeves" 
              alt="Jeeves Wooster"
              fill
              className="object-cover"
            />
          </div>
          <div className="hidden md:block text-sm">
            <p className="text-slate-400 text-xs font-medium">Dentist</p>
            <p className="font-semibold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">Jeeves Wooster</p>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-600 ml-1 transition-colors" />
        </div>
      </div>
    </div>
  );
}
