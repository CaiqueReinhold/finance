import clsx from 'clsx';

import { TrendUp, TrendDown } from './Icons';

export function SingleNumberCard({
  title,
  mainNumber,
  percentageChange,
  className,
}) {
  const trendIcon =
    percentageChange >= 0
      ? TrendUp(24, 24, '#14B8A6')
      : TrendDown(24, 24, '#EF4444');

  return (
    <div
      className={clsx(
        'bg-white rounded-md border-slate-200 border p-6',
        className
      )}
    >
      <div className="flex justify-between">
        <span className="font-light text-slate-700">{title}</span>
      </div>
      <div className="flex justify-between items-center mt-5">
        <span className="text-3xl font-semibold">R$ {mainNumber}</span>
        {percentageChange ? (
          <span className="text-slate-700 flex p-2">
            <span className="mr-5">{trendIcon}</span> {percentageChange}%
          </span>
        ) : null}
      </div>
    </div>
  );
}

export default SingleNumberCard;
