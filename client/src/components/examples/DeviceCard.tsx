import DeviceCard from '../DeviceCard';

export default function DeviceCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      <DeviceCard
        id="dev-001"
        name="Cognitive Sensor Alpha"
        battery={85}
        signal={92}
        firmwareVersion="2.4.1"
        lastSeen={new Date(Date.now() - 1000 * 60 * 5)}
        status="online"
        onCalibrate={() => console.log('Calibrate')}
        onDisconnect={() => console.log('Disconnect')}
        onUpdate={() => console.log('Update')}
      />
      <DeviceCard
        id="dev-002"
        name="Cognitive Sensor Beta"
        battery={42}
        signal={68}
        firmwareVersion="2.4.0"
        lastSeen={new Date(Date.now() - 1000 * 60 * 15)}
        status="online"
        onCalibrate={() => console.log('Calibrate')}
        onDisconnect={() => console.log('Disconnect')}
        onUpdate={() => console.log('Update')}
      />
      <DeviceCard
        id="dev-003"
        name="Cognitive Sensor Gamma"
        battery={15}
        signal={28}
        firmwareVersion="2.3.8"
        lastSeen={new Date(Date.now() - 1000 * 60 * 60 * 2)}
        status="offline"
        onCalibrate={() => console.log('Calibrate')}
        onDisconnect={() => console.log('Disconnect')}
        onUpdate={() => console.log('Update')}
      />
    </div>
  );
}
