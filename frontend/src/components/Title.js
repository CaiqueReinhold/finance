import clsx from 'clsx';

function Title({ className, children }) {
  return (
    <h1
      className={clsx('mt-6 text-2xl font-extrabold text-slate-700', className)}
    >
      {children}
    </h1>
  );
}

export default Title;
