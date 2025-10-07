import HeatmapCell from '../HeatmapCell';

export default function HeatmapCellExample() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4">
      <HeatmapCell
        studentId="1"
        name="Alice Johnson"
        cognitiveState="green"
        metrics={{ attention: 0.85, engagement: 0.78, stress: 0.25 }}
        onClick={() => console.log('Student clicked')}
      />
      <HeatmapCell
        studentId="2"
        name="Bob Smith"
        cognitiveState="yellow"
        metrics={{ attention: 0.62, engagement: 0.55, stress: 0.48 }}
        onClick={() => console.log('Student clicked')}
      />
      <HeatmapCell
        studentId="3"
        name="Carol Davis"
        cognitiveState="red"
        metrics={{ attention: 0.42, engagement: 0.38, stress: 0.82 }}
        onClick={() => console.log('Student clicked')}
      />
      <HeatmapCell
        studentId="4"
        name="David Lee"
        cognitiveState="green"
        metrics={{ attention: 0.91, engagement: 0.88, stress: 0.18 }}
        onClick={() => console.log('Student clicked')}
      />
    </div>
  );
}
