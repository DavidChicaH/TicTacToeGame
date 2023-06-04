

type Props = {
  index: number;
  onClick(event: any): void;
  player?: string;
};

const Square = ({ index, onClick, player }: Props) => {
  const scale = player ? "scale-100" : "scale-0";
  const textColor = player === "X" ? "text-yellow-200" : "text-fuchsia-300";
  const hoverStyle = "transition duration-500 hover:scale";
  return (
    <div
      data-cell-index={index}
      className={`h-36 border-solid border-4 border-slate-200 text-7xl text-center flex justify-center items-center cursor-pointer ${hoverStyle}`}
      {...{ onClick }}
    >
      <span
        className={`transform transition-all duration-150 ease-in ${scale} ${textColor}`}
      >
        {" "}
        {player}
      </span>
    </div>
  );
};

export default Square;
