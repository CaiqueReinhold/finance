import clsx from 'clsx';

export function DashboardCard({ title, children, className }) {
  return (
    <div
      className={clsx(
        'rounded-lg border border-gray-100 bg-white md:p-5 border-slate-200',
        className
      )}
    >
      <div className="flex flex-col space-y-4">
        <h3 className="font-semibold text-md">{title}</h3>
        <div className="items-center flex">{children}</div>
      </div>
    </div>
  );
}

export default DashboardCard;
