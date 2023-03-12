import clsx from 'clsx';

type props = {
  children: React.ReactNode;
  className?: string;
};
const Container = ({ children, className }: props) => {
  return (
    <div className={clsx('mx-auto max-w-screen-lg px-4 lg:px-0', className)}>
      {children}
    </div>
  );
};

export default Container;
