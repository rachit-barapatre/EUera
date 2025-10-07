import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Battery, Signal, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface DeviceCardProps {
  id: string;
  name: string;
  battery: number;
  signal: number;
  firmwareVersion: string;
  lastSeen: Date;
  status: "online" | "offline";
  onCalibrate?: () => void;
  onDisconnect?: () => void;
  onUpdate?: () => void;
}

export default function DeviceCard({
  id,
  name,
  battery,
  signal,
  firmwareVersion,
  lastSeen,
  status,
  onCalibrate,
  onDisconnect,
  onUpdate,
}: DeviceCardProps) {
  const getBatteryColor = (level: number) => {
    if (level > 60) return "text-success";
    if (level > 30) return "text-warning";
    return "text-error";
  };

  const getSignalColor = (strength: number) => {
    if (strength > 70) return "text-success";
    if (strength > 40) return "text-warning";
    return "text-error";
  };

  return (
    <Card className="hover-elevate" data-testid={`card-device-${id}`}>
      <CardHeader className="flex flex-row items-start justify-between gap-2 pb-3">
        <div className="flex-1">
          <h3 className="font-semibold" data-testid={`text-device-name-${id}`}>{name}</h3>
          <p className="text-xs text-muted-foreground mt-1">v{firmwareVersion}</p>
        </div>
        <Badge variant={status === "online" ? "default" : "outline"} data-testid={`badge-status-${id}`}>
          {status}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Battery className={`h-4 w-4 ${getBatteryColor(battery)}`} />
            <span className="font-medium" data-testid={`text-battery-${id}`}>{battery}%</span>
          </div>
          <div className="flex items-center gap-2">
            <Signal className={`h-4 w-4 ${getSignalColor(signal)}`} />
            <span className="font-medium" data-testid={`text-signal-${id}`}>{signal}%</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground" data-testid={`text-lastseen-${id}`}>
              {formatDistanceToNow(lastSeen, { addSuffix: true })}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {onCalibrate && (
            <Button size="sm" variant="default" onClick={onCalibrate} data-testid={`button-calibrate-${id}`}>
              Calibrate
            </Button>
          )}
          {onDisconnect && (
            <Button size="sm" variant="outline" onClick={onDisconnect} data-testid={`button-disconnect-${id}`}>
              Disconnect
            </Button>
          )}
          {onUpdate && (
            <Button size="sm" variant="ghost" onClick={onUpdate} data-testid={`button-update-${id}`}>
              Update Firmware
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
