import Svg, { Path } from "react-native-svg";

type Props = {
  width?: number;
  height?: number;
};

const Github = ({ width = 24, height = 24 }: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 25 24" fill="none">
      <Path
        d="M15.5 22V18C15.6391 16.7473 15.2799 15.4901 14.5 14.5C17.5 14.5 20.5 12.5 20.5 9C20.58 7.75 20.23 6.52 19.5 5.5C19.78 4.35 19.78 3.15 19.5 2C19.5 2 18.5 2 16.5 3.5C13.86 3 11.14 3 8.50001 3.5C6.50001 2 5.50001 2 5.50001 2C5.20001 3.15 5.20001 4.35 5.50001 5.5C4.77188 6.51588 4.41848 7.75279 4.50001 9C4.50001 12.5 7.50001 14.5 10.5 14.5C10.11 14.99 9.82001 15.55 9.65001 16.15C9.48001 16.75 9.43001 17.38 9.50001 18V22"
        stroke="#1E293B"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M9.5 18C4.99 20 4.5 16 2.5 16"
        stroke="#1E293B"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default Github;
