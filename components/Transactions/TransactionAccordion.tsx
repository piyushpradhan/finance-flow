import { Accordion } from "../ui";
import { ListItemProps } from "../ui/types";
import TransactionHeaderRight from "./TransactionHeaderRight";
import TransactionItemLeft from "./TransactionItemLeft";
import TransactionItemRight from "./TransactionItemRight";

const TransactionAccordion = () => {
  const firstAmount = 14000;
  const amount: number = -12000;

  const transactionItems: ListItemProps[] = [
    {
      title: "Bills > Rent",
      description: "Ghar ka kharcha",
      leftComponent: <TransactionItemLeft label="HDFC" />,
      rightComponent: <TransactionItemRight firstAmount={3000} amount={100} />,
    },
    {
      title: "Bills > Rent",
      description: "Ghar ka kharcha",
      leftComponent: <TransactionItemLeft label="Axis" />,
      rightComponent: <TransactionItemRight firstAmount={3000} amount={100} />,
    },
  ];

  return (
    <>
      <Accordion
        id="13th"
        title="13th"
        rightComponent={
          <TransactionHeaderRight firstAmount={firstAmount} amount={amount} />
        }
        items={transactionItems}
      />
    </>
  );
};

export default TransactionAccordion;
