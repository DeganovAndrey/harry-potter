import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import type { FacultyData } from "../types/harryPotter";

interface FacultyChartProps {
  data: FacultyData[];
}

const FacultyChart: React.FC<FacultyChartProps> = ({ data }) => {
  const getHouseColor = (house: string): string => {
    const colors = {
      Gryffindor: "#AE0001",
      Slytherin: "#2A623D",
      Hufflepuff: "#ECB939",
      Ravenclaw: "#222F5B",
    };
    return colors[house as keyof typeof colors] || "#8884d8";
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${payload[0].payload.faculty}: ${payload[0].value} студентов`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="chart-container">
      <h3>Распределение студентов по факультетам</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="faculty" tick={{ fill: "#333" }} />
          <YAxis
            label={{
              value: "Количество студентов",
              angle: -90,
              position: "insideLeft",
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="count">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getHouseColor(entry.faculty)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FacultyChart;
