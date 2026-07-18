"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

type MonthlyPoint = { label: string; teklif: number; onSiparis: number };

export default function MonthlyChart({ data }: { data: MonthlyPoint[] }) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <XAxis dataKey="label" stroke="#8A9096" fontSize={12} tickLine={false} axisLine={{ stroke: "#2E3339" }} />
          <YAxis stroke="#8A9096" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
          <Tooltip
            contentStyle={{ background: "#1C1F23", border: "1px solid #2E3339", fontSize: 12, borderRadius: 2 }}
            labelStyle={{ color: "#C8CDD2" }}
          />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Bar dataKey="teklif" name="Teklif" fill="#D8301F" radius={[2, 2, 0, 0]} />
          <Bar dataKey="onSiparis" name="Ön Sipariş" fill="#F2523F" radius={[2, 2, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
