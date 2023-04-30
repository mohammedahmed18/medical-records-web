import clsx from 'clsx';

const Divider = ({ className }: { className?: string }) => {
  return <div className={clsx('my-3 h-[1px] w-full bg-gray-200', className)} />;
};

export default Divider;
