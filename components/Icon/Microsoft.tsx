import { Svg, Path } from "react-native-svg";

type Props = {
  width?: number;
  height?: number;
};

const Microsoft = ({ width = 24, height = 24 }: Props) => {
  return (
    <Svg width={width} height={height} fill="none">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4zm2 1v6h6V5H5zm8 0v6h6V5h-6zm6 8h-6v6h6v-6zm-8 6v-6H5v6h6z"
        fill="#000"
      />
    </Svg>
  );
};

export default Microsoft;
