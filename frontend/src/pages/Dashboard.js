import { useDispatch, useSelector } from 'react-redux';

import { Import } from '../components/Icons';
import Title from '../components/Title';
import Button from '../components/Button';
import SingleNumberCard from '../components/SingleNumberCard';
import DashboardCard from '../components/DashboardCard';
import CategoryExpensesTable from '../components/CategoryExpensesTable';
import ExpenseIncomeChart from '../components/ExpenseIncomeChart';

function Dashboard() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.account.account);

  return (
    <div>
      <div className="flex justify-between">
        <Title className="text-left">{`Welcome, ${user.name}!`}</Title>
        <span className="items-center flex">
          <Button>
            Import Data <span className="pl-2">{Import(18, 18, '#FFF')}</span>
          </Button>
        </span>
      </div>
      <div className="my-8 gap-y-10 flex flex-col">
        <div className="flex gap-10 flex-wrap">
          <div className="flex gap-10 flex-wrap grow">
            <SingleNumberCard
              className="grow"
              title="Total Income"
              mainNumber="0.00"
              percentageChange="0"
            />
            <SingleNumberCard
              className="grow"
              title="Total Expenses"
              mainNumber="0.00"
              percentageChange="0"
            />
          </div>
          <div className="flex gap-10 flex-wrap grow">
            <SingleNumberCard
              className="grow"
              title="Balance"
              mainNumber="0.00"
              percentageChange="0"
            />
            <SingleNumberCard
              className="grow"
              title="Projected expenses"
              mainNumber="0.00"
              percentageChange="0"
            />
          </div>
        </div>
        <div className="flex gap-10 flex-wrap">
          <div className="flex flex-col grow-[2] gap-10">
            <DashboardCard title="Expense by category">
              <CategoryExpensesTable
                categoryData={[
                  {
                    name: 'Category 1',
                    total: 100,
                    last6Months: [
                      { name: 'Jan', total: 120 },
                      { name: 'Feb', total: 110 },
                      { name: 'Mar', total: 105 },
                      { name: 'Apr', total: 90 },
                      { name: 'May', total: 98 },
                      { name: 'Jun', total: 130 },
                    ],
                  },
                  {
                    name: 'Category 2',
                    total: 100,
                    last6Months: [
                      { name: 'Jan', total: 100 },
                      { name: 'Feb', total: 100 },
                      { name: 'Mar', total: 100 },
                      { name: 'Apr', total: 100 },
                      { name: 'May', total: 100 },
                      { name: 'Jun', total: 100 },
                    ],
                  },
                ]}
              />
            </DashboardCard>
            <DashboardCard title="Expense x Income">
              <ExpenseIncomeChart
                data={[
                  { day: '01', expense: 0, income: 0 },
                  { day: '02', expense: 10, income: 0 },
                  { day: '03', expense: 100, income: 0 },
                  { day: '04', expense: 120, income: 0 },
                  { day: '05', expense: 250, income: 15000.0 },
                  { day: '06', expense: 400, income: 15000.0 },
                  { day: '07', expense: 530, income: 15000.0 },
                  { day: '08', expense: 530, income: 15000.0 },
                  { day: '09', expense: 600, income: 15000.0 },
                ]}
              />
            </DashboardCard>
          </div>
          <DashboardCard className="grow" title="Notifications">
            <div>No new Notifications</div>
          </DashboardCard>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
