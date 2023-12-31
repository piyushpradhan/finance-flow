import { Svg, Path } from "react-native-svg";

type Props = {
  width?: number;
  height?: number;
};

const Facebook = ({ width = 24, height = 24 }: Props) => {
  return (
    <Svg width={width} height={height} fill="none">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M2 6a4 4 0 0 1 4-4h12a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V6zm4-2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6v-7h-1a1 1 0 1 1 0-2h1V9.5A3.5 3.5 0 0 1 15.5 6h.6a1 1 0 1 1 0 2h-.6A1.5 1.5 0 0 0 14 9.5V11h2.1a1 1 0 1 1 0 2H14v7h4a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H6z"
        fill="#000"
      />
    </Svg>
  );
};

export default Facebook;
