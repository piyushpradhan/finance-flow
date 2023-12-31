import { Svg, Path } from "react-native-svg";

type Props = {
  width?: number;
  height?: number;
};

const List = ({ width = 24, height = 24 }: Props) => {
  return (
    <Svg width={width} height={height} fill="none">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M6 4a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H6zm0 2h3v3H6V6zm8 0a1 1 0 1 0 0 2h5a1 1 0 1 0 0-2h-5zm0 9a1 1 0 1 0 0 2h5a1 1 0 1 0 0-2h-5zM4 15a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-3zm5 0H6v3h3v-3z"
        fill="#000"
      />
    </Svg>
  );
};

export default List;
