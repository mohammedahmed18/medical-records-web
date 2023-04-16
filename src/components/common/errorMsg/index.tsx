type Props = {
  msg: string;
};
const ErrorMessage = (props: Props) => {
  return <span className='text-lg font-bold text-red-800'>{props.msg}</span>;
};

export default ErrorMessage;
