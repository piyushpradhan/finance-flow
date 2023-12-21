import { Svg, Path } from "react-native-svg";

type Props = {
  width?: number;
  height?: number;
};

const Google = ({ width = 24, height = 24 }: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M12 5a7 7 0 1 0 6.93 8H13a1 1 0 1 1 0-2h7a1 1 0 0 1 1 1 9 9 0 1 1-3.342-7A1 1 0 0 1 16.4 6.555 6.967 6.967 0 0 0 12 5z"
        fill="#000"
      />
    </Svg>
  );
};

export default Google;
