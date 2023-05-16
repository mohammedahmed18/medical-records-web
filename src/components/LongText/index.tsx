type Props = {
  text: string;
  maxChars?: number;
  className?: string;
};
const LongText = ({ text, className, maxChars }: Props) => {
  const finalText =
    text.length > (maxChars || 50) ? text.slice(0, maxChars) + '...' : text;
  return <span className={className}>{finalText}</span>;
};

export default LongText;
