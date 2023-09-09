import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export function ExpenseIncomeChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart width={300} height={200} data={data}>
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="expense"
          stackId="1"
          stroke="#ef4444"
          fill="#fecaca"
        />
        <Area
          type="monotone"
          dataKey="income"
          stackId="1"
          stroke="#22c55e"
          fill="#bbf7d0"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default ExpenseIncomeChart;
