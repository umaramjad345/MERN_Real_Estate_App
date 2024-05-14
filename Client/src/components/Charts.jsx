import React from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  Rectangle,
} from "recharts";

const Charts = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={"name"} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="Rent"
          fill="#2563EB"
          activeBar={<Rectangle fill="#1E40AF" />}
        />
        <Bar
          dataKey="Sale"
          fill="#60A5FA"
          activeBar={<Rectangle fill="#60A5FA" />}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Charts;
