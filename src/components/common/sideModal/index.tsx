import clsx from 'clsx';
import { HiChevronRight } from 'react-icons/hi';
interface Props {
  children: React.ReactNode;
  closePanel: () => void;
  shown: boolean;
}
const SideModal = ({ children, shown, closePanel }: Props) => {
  return (
    <>
      <div
        className={clsx('fixed inset-0 z-[999]', shown ? 'block' : 'hidden')}
        onClick={closePanel}
      ></div>
      <div
        className={clsx(
          'transition-[right width] fixed top-0 bottom-0 z-[1000] w-full overflow-auto bg-white p-7 drop-shadow-2xl duration-300 md:w-1/2 lg:w-1/3',
          shown ? 'right-0' : '-right-full'
        )}
        onClick={(event) => event.stopPropagation()}
      >
        <span
          className='mb-10 inline-block cursor-pointer rounded-lg p-2 text-3xl text-gray-500 hover:bg-zinc-200'
          onClick={closePanel}
        >
          <HiChevronRight />
        </span>
        {children}
      </div>
    </>
  );
};

export default SideModal;
