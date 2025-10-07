import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface StatsCardProps {
  title: string;
  value: number;
  delta?: number;
  icon: LucideIcon;
  suffix?: string;
}

export default function StatsCard({ title, value, delta, icon: Icon, suffix = "" }: StatsCardProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 1000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="hover-elevate" data-testid={`card-stat-${title.toLowerCase().replace(/\s+/g, '-')}`}>
        <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <Icon className="h-4 w-4 text-muted-foreground" data-testid={`icon-${title.toLowerCase().replace(/\s+/g, '-')}`} />
        </CardHeader>
        <CardContent className="space-y-1">
          <div className="text-2xl font-bold" data-testid={`text-value-${title.toLowerCase().replace(/\s+/g, '-')}`}>
            {count}{suffix}
          </div>
          {delta !== undefined && (
            <div className={`text-xs flex items-center gap-1 ${delta >= 0 ? 'text-success' : 'text-error'}`} data-testid={`text-delta-${title.toLowerCase().replace(/\s+/g, '-')}`}>
              <span>{delta >= 0 ? '↑' : '↓'}</span>
              <span>{Math.abs(delta)}% from last month</span>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
