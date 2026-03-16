import { MessageSquare } from "lucide-react";

export default function MessagesPage() {
  return (
    <div className="flex flex-col h-full bg-slate-50 items-center justify-center p-8">
      <div className="bg-white rounded-[2rem] p-12 shadow-sm border border-slate-100 max-w-2xl w-full text-center flex flex-col items-center">
        <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6">
          <MessageSquare className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight mb-4">Messages</h1>
        <p className="text-slate-500 max-w-md text-lg">
          The messaging module is currently part of the mockup. Direct patient communication and internal team chats will appear here.
        </p>
      </div>
    </div>
  );
}
