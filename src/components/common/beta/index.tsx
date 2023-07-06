import { twMerge } from 'tailwind-merge';

const BetaLabel = ({ theme }: { theme: 'dark' | 'light' }) => {
  return (
    <span
      className={twMerge(
        'w-fit rounded-2xl px-7 py-4 text-xl tracking-wider shadow-lg',
        theme === 'dark'
          ? 'bg-black text-white'
          : 'border-2 bg-gray-50 text-black'
      )}
    >
      BETA
    </span>
  );
};

export default BetaLabel;
