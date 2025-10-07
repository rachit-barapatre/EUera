import { motion } from "framer-motion";
import { CognitiveState } from "@shared/schema";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface HeatmapCellProps {
  studentId: string;
  name: string;
  avatarUrl?: string;
  cognitiveState: CognitiveState;
  metrics: {
    attention: number;
    engagement: number;
    stress: number;
  };
  onClick?: () => void;
}

const stateColors = {
  green: "bg-success/20 border-success/40 hover:bg-success/30",
  yellow: "bg-warning/20 border-warning/40 hover:bg-warning/30",
  red: "bg-error/20 border-error/40 hover:bg-error/30",
};

const statePulse = {
  red: "animate-pulse",
  yellow: "",
  green: "",
};

export default function HeatmapCell({ studentId, name, avatarUrl, cognitiveState, metrics, onClick }: HeatmapCellProps) {
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
            className={`${stateColors[cognitiveState]} ${statePulse[cognitiveState]} border rounded-md p-3 cursor-pointer transition-all hover-elevate active-elevate-2`}
            onClick={onClick}
            data-testid={`cell-heatmap-${studentId}`}
          >
            <div className="flex flex-col items-center gap-2">
              <Avatar className="h-12 w-12">
                <AvatarImage src={avatarUrl} alt={name} />
                <AvatarFallback className="bg-primary/10 text-primary text-xs">{initials}</AvatarFallback>
              </Avatar>
              <p className="text-xs font-medium text-center line-clamp-1">{name}</p>
            </div>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <div className="space-y-1">
            <p className="font-semibold">{name}</p>
            <div className="text-xs space-y-0.5">
              <p>Attention: {(metrics.attention * 100).toFixed(0)}%</p>
              <p>Engagement: {(metrics.engagement * 100).toFixed(0)}%</p>
              <p>Stress: {(metrics.stress * 100).toFixed(0)}%</p>
            </div>
            <p className="text-xs text-muted-foreground pt-1">Real-time cognitive state — click for full profile</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
