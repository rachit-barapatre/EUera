import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

interface ProgressLineProps {
  data: {
    label: string;
    value: number;
  }[];
  color?: string;
}

export default function ProgressLine({ data, color = "rgba(99, 102, 241, 1)" }: ProgressLineProps) {
  const chartData = {
    labels: data.map((item) => item.label),
    datasets: [
      {
        label: "Progress",
        data: data.map((item) => item.value),
        borderColor: color,
        backgroundColor: color.replace("1)", "0.1)"),
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

  return (
    <div className="w-full h-48" data-testid="chart-line">
      <Line data={chartData} options={options} />
    </div>
  );
}
