import React from "react";
import Home from "./Home";
import List from "./List";
import Google from "./Google";
import Github from "./Github";
import Facebook from "./Facebook";
import Microsoft from "./Microsoft";
import Twitter from "./Twitter";

type Props = {
  type: string;
  width?: number;
  height?: number;
};

const Icon = ({ type, ...rest }: Props) => {
  switch (type) {
    case "home":
      return <Home {...rest} />;
    case "list":
      return <List {...rest} />;
    case "google":
      return <Google {...rest} />;
    case "twitter":
      return <Twitter {...rest} />;
    case "github":
      return <Github {...rest} />;
    case "facebook":
      return <Facebook {...rest} />;
    case "microsoft":
      return <Microsoft {...rest} />;
    default:
      return null;
  }
};

export default Icon;
