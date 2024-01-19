import React from "react";
import { Accordion } from "../ui";
import { ListItemProps } from "../ui/types";
import CategoriesItemLeft from "./CategoriesItemLeft";
import CategoriesItemRight from "./CategoriesItemRight";

const CategoriesAccordion = () => {
  const categories: ListItemProps[] = [
    {
      title: "Bills",
      leftComponent: <CategoriesItemLeft />,
      rightComponent: <CategoriesItemRight />,
    },
    {
      title: "Groceries",
      leftComponent: <CategoriesItemLeft />,
      rightComponent: <CategoriesItemRight />,
    },
  ];

  return (
    <>
      <Accordion
        id="bills"
        title={"Bills"}
        rightComponent={null}
        items={categories}
      />
      <Accordion
        id="groceries"
        title={"Groceries"}
        rightComponent={null}
        items={categories}
      />
    </>
  );
};

export default CategoriesAccordion;
