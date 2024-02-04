import React, { useState } from "react";
import { Animated, StyleSheet } from "react-native";
import { Divider, List } from "react-native-paper";
import { useAppTheme } from "../../provider/ThemeProvider";
import { Text } from "../../components/ui";

import type { ListItemProps } from "./types";
import { RectButton, Swipeable } from "react-native-gesture-handler";

type Props = {
  id: string;
  title: string;
  rightComponent: React.ReactNode;
  items: ListItemProps[];
};

const Accordion = ({ id, title, rightComponent, items }: Props) => {
  const theme = useAppTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const [contentHeight] = useState(new Animated.Value(0));

  const styles = StyleSheet.create({
    accordionParent: {
      minWidth: "100%",
      borderRadius: theme.borderRadius.md,
      backgroundColor: theme.colors.primaryContainer,
    },
    accordionTitle: {
      fontWeight: "bold",
    },
    accordionItem: {
      padding: 8,
    },
    rightSwipeButton: {
      backgroundColor: theme.colors.error,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: theme.colors.surface,
    },
  });

  const animateAccordion = (toValue: number) => {
    Animated.timing(contentHeight, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleAccordionToggle = () => {
    setIsExpanded((prev) => !prev);
    const finalValue = isExpanded ? 0 : 100;
    animateAccordion(finalValue);
  };

  const renderRightActions = (
    _progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>
  ) => {
    const translate = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1],
    });

    return (
      <RectButton style={styles.rightSwipeButton}>
        <Animated.Text
          style={[
            {
              transform: [{ translateX: translate }],
            },
          ]}
        >
          Delete
        </Animated.Text>
      </RectButton>
    );
  };

  // TODO: Assign proper id for each accordion in the group of accordions
  // if there are multiple accordions in a group otherwise just ignore
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <List.Accordion
        style={styles.accordionParent}
        title={title}
        right={() => rightComponent}
        id={id}
        descriptionNumberOfLines={1}
        titleNumberOfLines={1}
      >
        {items.map((accordionItem, index) => (
          <React.Fragment key={index}>
            <List.Item
              style={styles.accordionItem}
              title={accordionItem.title}
              description={accordionItem.description}
              left={() => accordionItem.leftComponent}
              right={() => accordionItem.rightComponent}
            />
            {index !== items.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List.Accordion>
    </Swipeable>
  );
};

export default Accordion;
