import StatsCard from '../StatsCard';
import { Users, Brain, FileCheck } from 'lucide-react';

export default function StatsCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      <StatsCard title="Total Students" value={142} delta={12} icon={Users} />
      <StatsCard title="Avg Cognitive Score" value={78} delta={5} icon={Brain} suffix="%" />
      <StatsCard title="Assessments" value={24} delta={-3} icon={FileCheck} />
    </div>
  );
}
