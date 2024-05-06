"use client";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

interface Props {
  inProgress: number;
  finished: number;
}

const COLORS = ["#59e8b5", "#889cdd"];

const NotePieChart = ({ inProgress, finished }: Props) => {
  const data = [
    { name: "Finished", value: finished },
    { name: "In Progress", value: inProgress },
  ];

  return (
    <ResponsiveContainer height={200}>
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
