import { CalendarCheck, DollarSign, FlaskConical, UserPlus, TrendingUp } from "lucide-react";
import { dailyStats } from "@/lib/mockData";

interface StatCardProps {
  label: string;
  value: string;
  sub: string;
  icon: React.ReactNode;
  accent: string;
  iconBg: string;
}

function StatCard({ label, value, sub, icon, accent, iconBg }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl border border-border p-4 flex items-start gap-3 hover:shadow-sm transition-shadow">
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${iconBg}`}>
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide">{label}</p>
        <p className={`text-2xl font-bold leading-tight ${accent}`}>{value}</p>
        <p className="text-[11px] text-muted-foreground mt-0.5">{sub}</p>
      </div>
    </div>
  );
}

export function StatsRow() {
  const stats = dailyStats;
  const completionRate = Math.round((stats.completedAppointments / stats.totalAppointments) * 100);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <StatCard
        label="Today's Appts"
        value={`${stats.totalAppointments}`}
        sub={`${stats.completedAppointments} completed · ${completionRate}%`}
        icon={<CalendarCheck className="w-4 h-4 text-blue-600" />}
        accent="text-blue-700"
        iconBg="bg-blue-50"
      />
      <StatCard
        label="Daily Revenue"
        value={`$${stats.dailyRevenue.toLocaleString()}`}
        sub="Projected for today"
        icon={<DollarSign className="w-4 h-4 text-emerald-600" />}
        accent="text-emerald-700"
        iconBg="bg-emerald-50"
      />
      <StatCard
        label="Pending Lab Cases"
        value={`${stats.pendingLabCases}`}
        sub="Due within 5 days"
        icon={<FlaskConical className="w-4 h-4 text-amber-600" />}
        accent="text-amber-700"
        iconBg="bg-amber-50"
      />
      <StatCard
        label="New Patients"
        value={`${stats.newPatients}`}
        sub={`${stats.cancellations} cancellations today`}
        icon={<UserPlus className="w-4 h-4 text-violet-600" />}
        accent="text-violet-700"
        iconBg="bg-violet-50"
      />
    </div>
  );
}
