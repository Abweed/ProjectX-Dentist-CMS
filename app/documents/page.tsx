import { FileText } from "lucide-react";

export default function DocumentsPage() {
  return (
    <div className="flex flex-col h-full bg-slate-50 items-center justify-center p-8">
      <div className="bg-white rounded-[2rem] p-12 shadow-sm border border-slate-100 max-w-2xl w-full text-center flex flex-col items-center">
        <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6">
          <FileText className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight mb-4">Documents</h1>
        <p className="text-slate-500 max-w-md text-lg">
          The document management module is currently part of the mockup. Secure storage for medical records and patient forms will appear here.
        </p>
      </div>
    </div>
  );
}
