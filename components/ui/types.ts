import { Category } from "../../app/types";

export type ListItemProps = {
  item: Category;
  description?: string;
  leftComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
};
