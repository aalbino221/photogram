interface StatsProps {
  name: string;
  count: number;
}

function Stats({ name, count }: StatsProps) {
  return (
    <div
      className=" flex
      flex-col
      items-center
      text-gray-800
      font-semibold"
    >
      <p>{count}</p>
      <p>{name}</p>
    </div>
  );
}

export default Stats;
