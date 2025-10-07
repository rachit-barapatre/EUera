import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Activity } from "lucide-react";
import DeviceCard from "@/components/DeviceCard";
import FixItAllCard from "@/components/FixItAllCard";

export default function DeviceHub() {
  const devices = [
    {
      id: "dev-001",
      name: "Cognitive Sensor Alpha",
      battery: 85,
      signal: 92,
      firmwareVersion: "2.4.1",
      lastSeen: new Date(Date.now() - 1000 * 60 * 5),
      status: "online" as const,
    },
    {
      id: "dev-002",
      name: "Cognitive Sensor Beta",
      battery: 42,
      signal: 68,
      firmwareVersion: "2.4.0",
      lastSeen: new Date(Date.now() - 1000 * 60 * 15),
      status: "online" as const,
    },
    {
      id: "dev-003",
      name: "Cognitive Sensor Gamma",
      battery: 15,
      signal: 28,
      firmwareVersion: "2.3.8",
      lastSeen: new Date(Date.now() - 1000 * 60 * 60 * 2),
      status: "offline" as const,
    },
  ];

  const onlineDevices = devices.filter((d) => d.status === "online").length;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold" data-testid="text-page-title">Device Integration Hub</h1>
              <p className="text-sm text-muted-foreground">Manage IoT cognitive sensors and connections</p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="gap-2">
                <Activity className="h-3 w-3" />
                {onlineDevices}/{devices.length} Online
              </Badge>
              <Button data-testid="button-add-device">
                <Plus className="h-4 w-4 mr-2" />
                Add Device
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FixItAllCard
            title="System Status"
            subtitle="All devices synchronized"
            state="online"
            progress={94}
            liveValue={onlineDevices}
            chartData={[65, 72, 68, 78, 82, 88, 92, 89, 94, 94]}
            actions={[
              { label: "View Logs", variant: "outline", onClick: () => console.log("View logs") },
              { label: "Run Diagnostics", variant: "default", onClick: () => console.log("Diagnostics") },
            ]}
            settingsActions={[
              { label: "System Settings", onClick: () => console.log("Settings") },
              { label: "Export Data", onClick: () => console.log("Export") },
            ]}
          />
          <FixItAllCard
            title="Data Streaming"
            subtitle="Real-time cognitive metrics"
            state="processing"
            liveValue={127}
            chartData={[55, 62, 58, 68, 72, 78, 82, 79, 84, 88]}
            actions={[
              { label: "Pause Stream", variant: "outline", onClick: () => console.log("Pause") },
            ]}
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Connected Devices</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {devices.map((device) => (
              <DeviceCard
                key={device.id}
                {...device}
                onCalibrate={() => console.log(`Calibrate ${device.id}`)}
                onDisconnect={() => console.log(`Disconnect ${device.id}`)}
                onUpdate={() => console.log(`Update ${device.id}`)}
              />
            ))}
          </div>
        </div>

        <Card>
          <CardHeader>
            <h3 className="font-semibold">WebSocket Activity Log</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 font-mono text-xs">
              <div className="flex items-start gap-3">
                <span className="text-muted-foreground">[12:34:56]</span>
                <span className="text-success">CONNECTED</span>
                <span>Device dev-001 connected successfully</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-muted-foreground">[12:34:58]</span>
                <span className="text-primary">DATA</span>
                <span>Cognitive metrics received from dev-001</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-muted-foreground">[12:35:12]</span>
                <span className="text-warning">WARNING</span>
                <span>Low battery on dev-003 (15%)</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-muted-foreground">[12:35:45]</span>
                <span className="text-error">DISCONNECTED</span>
                <span>Device dev-003 lost connection</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
