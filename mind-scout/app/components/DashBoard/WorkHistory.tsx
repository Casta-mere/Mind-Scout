"use client";
import { Card } from "@radix-ui/themes";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
const data = [
  { name: "Jaunary", commit: 12 },
  { name: "February", commit: 20 },
  { name: "March", commit: 5 },
  { name: "April", commit: 45 },
  { name: "May", commit: 50 },
];

const WorkHistory = () => {
  return (
    <Card>
      <ResponsiveContainer height={300}>
        <LineChart
          width={600}
          height={300}
          data={data}
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
        >
          <Line type="monotone" dataKey="commit" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};
export default WorkHistory;
