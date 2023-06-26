// TODO: needs refactoring

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

type Color = { key: string; value: string };
type Props = {
  data: Record<string, string | number>[];
};
const CustomAreaChart = ({ data }: Props) => {
  const columns = Object.keys(data[0]).filter((i) => i !== 'name');

  const colors: Color[] = columns.reduce((acc: Color[], current) => {
    const prev: Color[] = [...acc];
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);

    prev.push({
      key: `c${current}`,
      value: '#' + randomColor,
    });
    return prev;
  }, []);

  const getColorByKey = (key: string) => {
    const color = colors.find((c: Color) => c.key === `c${key}`)?.value;
    return color;
  };
  return (
    <ResponsiveContainer width='100%' height={250}>
      <AreaChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          {colors.map((c: Color) => (
            <linearGradient key={c.key} id={c.key} x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor={c.value} stopOpacity={0.8} />
              <stop offset='95%' stopColor={c.value} stopOpacity={0} />
            </linearGradient>
          ))}
        </defs>
        <XAxis dataKey='name' />
        <YAxis />
        <CartesianGrid strokeDasharray='3 3' />
        <Tooltip />

        {columns.map((col) => {
          return (
            <Area
              key={col}
              type='monotone'
              dataKey={col}
              stroke={getColorByKey(col)}
              fillOpacity={1}
              fill={`url(#c${col})`}
            />
          );
        })}
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default CustomAreaChart;
