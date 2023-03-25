type props = {
  children: React.ReactNode;
};
const Note: React.FC<props> = ({ children }) => {
  return (
    <div className='rounded-lg bg-zinc-800 px-5 py-3 text-lg text-gray-50'>
      {children}
    </div>
  );
};

export default Note;
