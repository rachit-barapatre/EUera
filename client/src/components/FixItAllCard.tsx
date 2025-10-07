import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { motion } from "framer-motion";

interface FixItAllCardAction {
  label: string;
  variant?: "default" | "outline" | "ghost";
  onClick: () => void;
}

interface FixItAllCardProps {
  title: string;
  subtitle?: string;
  state?: "online" | "offline" | "processing";
  progress?: number;
  liveValue?: number;
  chartData?: number[];
  actions?: FixItAllCardAction[];
  settingsActions?: { label: string; onClick: () => void }[];
}

const stateColors = {
  online: "bg-success",
  offline: "bg-muted-foreground",
  processing: "bg-warning",
};

export default function FixItAllCard({
  title,
  subtitle,
  state,
  progress,
  liveValue,
  chartData,
  actions = [],
  settingsActions = [],
}: FixItAllCardProps) {
  return (
    <Card className="hover-elevate" data-testid={`card-fixitall-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <CardHeader className="flex flex-row items-start justify-between gap-2 pb-3">
        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-base" data-testid={`text-title-${title.toLowerCase().replace(/\s+/g, '-')}`}>{title}</h3>
            {state && (
              <div className="flex items-center gap-1.5">
                <div className={`h-2 w-2 rounded-full ${stateColors[state]} ${state === 'online' ? 'animate-pulse' : ''}`} data-testid={`indicator-status-${state}`} />
                <span className="text-xs text-muted-foreground capitalize">{state}</span>
              </div>
            )}
          </div>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </div>
        {settingsActions.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost" className="h-8 w-8" data-testid="button-settings">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {settingsActions.map((action, i) => (
                <DropdownMenuItem key={i} onClick={action.onClick} data-testid={`menu-${action.label.toLowerCase().replace(/\s+/g, '-')}`}>
                  {action.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {progress !== undefined && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" data-testid="progress-bar" />
          </div>
        )}
        
        {liveValue !== undefined && (
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2"
          >
            <Badge variant="outline" className="text-lg font-semibold px-3 py-1" data-testid="badge-live-value">
              {liveValue}
            </Badge>
          </motion.div>
        )}

        {chartData && chartData.length > 0 && (
          <div className="h-12 flex items-end gap-0.5" data-testid="chart-sparkline">
            {chartData.map((value, i) => (
              <div
                key={i}
                className="flex-1 bg-primary/30 rounded-sm transition-all"
                style={{ height: `${value}%` }}
              />
            ))}
          </div>
        )}

        {actions.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {actions.map((action, i) => (
              <Button
                key={i}
                variant={action.variant || "default"}
                size="sm"
                onClick={action.onClick}
                data-testid={`button-${action.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {action.label}
              </Button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
