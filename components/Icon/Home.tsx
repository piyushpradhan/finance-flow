import Svg, { Path } from "react-native-svg";

type Props = {
  width?: number;
  height?: number;
};

const Home = ({ width = 24, height = 24 }: Props) => {
  return (
    <Svg width={width} height={height} fill="none">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M11.31 1.776a1 1 0 0 1 1.38 0l8 7.619 2.5 2.38a1 1 0 0 1-1.38 1.45l-.81-.773V20a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7.548l-.81.772a1 1 0 1 1-1.38-1.448l2.5-2.381 8-7.62zM5 10.548V20h4v-5a3 3 0 1 1 6 0v5h4v-9.452L12 3.88l-7 6.667zM13 20v-5a1 1 0 1 0-2 0v5h2z"
        fill="#000"
      />
    </Svg>
  );
};

export default Home;
