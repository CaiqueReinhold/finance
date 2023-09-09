import { LineChart, Line, Tooltip, XAxis, YAxis } from 'recharts';

import Table from './Table';

export function CategoryExpensesTable({ categoryData }) {
  const data = categoryData.map((category) => [
    category.name,
    category.total,
    <LineChart width={300} height={30} data={category.last6Months}>
      <Line type="natural" dataKey="total" stroke="#8884d8" />
      <XAxis hide dataKey="name" />
      <YAxis hide type="number" domain={['dataMin', 'dataMax']} />
      <Tooltip />
    </LineChart>,
  ]);
  return (
    <Table columns={['Category', 'Expenses', 'Last 6 months']} data={data} />
  );
}

export default CategoryExpensesTable;
