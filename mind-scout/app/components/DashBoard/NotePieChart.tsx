"use client";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

interface Props {
  inProgress: number;
  archieved: number;
}

const COLORS = ["#00a43319", "#1f0099af"];

const NotePieChart = ({ inProgress, archieved }: Props) => {
  const data = [
    { name: "In Progress", value: inProgress },
    { name: "Archieved", value: archieved },
  ];

  return (
    <ResponsiveContainer height={300}>
      <PieChart>
        <Pie
          data={data}
          cx={100}
          cy={100}
          innerRadius={50}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};
export default NotePieChart;
