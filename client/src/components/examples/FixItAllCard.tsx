import FixItAllCard from '../FixItAllCard';

export default function FixItAllCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <FixItAllCard
        title="Device Connection"
        subtitle="IoT Cognitive Sensor"
        state="online"
        progress={78}
        liveValue={42}
        chartData={[45, 52, 48, 65, 72, 68, 75, 82, 78, 85]}
        actions={[
          { label: "Calibrate", variant: "default", onClick: () => console.log('Calibrate') },
          { label: "Disconnect", variant: "outline", onClick: () => console.log('Disconnect') },
        ]}
        settingsActions={[
          { label: "View Details", onClick: () => console.log('View Details') },
          { label: "Update Firmware", onClick: () => console.log('Update') },
        ]}
      />
      <FixItAllCard
        title="Class Performance"
        subtitle="Mathematics - Grade 10"
        state="processing"
        progress={92}
        liveValue={28}
        actions={[
          { label: "View Report", variant: "default", onClick: () => console.log('Report') },
        ]}
      />
    </div>
  );
}
