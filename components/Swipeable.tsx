import React from "react";
import { Animated, View, StyleSheet } from "react-native";
import { IconButton, Text } from "../components/ui";
import { Swipeable as SwipeableWidget } from "react-native-gesture-handler";
import { useAppTheme } from "../provider/ThemeProvider";
import useDeleteParentCategory from "../hooks/category/useDeleteParentCategory";

type Props = {
  renderRightActions?: (
    progressAnimatedValue: Animated.AnimatedInterpolation<string | number>,
    dragAnimatedValue: Animated.AnimatedInterpolation<string | number>,
    swipeable: SwipeableWidget
  ) => React.ReactNode;
  itemToBeDeleted: {
    itemId: string | number;
    title: string;
  };
  children: React.ReactNode;
};

const Swipeable = ({
  renderRightActions,
  itemToBeDeleted,
  children,
}: Props) => {
  const theme = useAppTheme();

  const styles = StyleSheet.create({
    rightSwipeButton: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: theme.colors.error,
      paddingLeft: theme.spacing(2),
    },
    deleteContainer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing(1),
    },
    deleteLabel: {
      color: theme.colors.surface,
    },
    deleteConfirm: {
      backgroundColor: theme.colors.surface,
      color: theme.colors.error,
      padding: theme.spacing(0.5),
      borderRadius: theme.borderRadius.sm,
    },
  });

  const deleteCategoryMutation = useDeleteParentCategory();

  const defaultRenderRightActions = (
    progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>
  ) => {
    const translate = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [-4, 0],
    });

    return (
      <View style={styles.rightSwipeButton}>
        <IconButton name="trash" color={theme.colors.surface} />
        <Animated.View
          style={[
            styles.deleteContainer,
            {
              transform: [{ translateX: translate }],
            },
          ]}
        >
          <Text variant="labelLarge" style={styles.deleteLabel}>
            Do you want to delete {itemToBeDeleted.title ?? ""}?
          </Text>
          <IconButton
            name="check"
            color={theme.colors.error}
            style={styles.deleteConfirm}
            onPress={() => {
              deleteCategoryMutation.mutate(`${itemToBeDeleted.itemId}`);
            }}
          />
          <IconButton name="x" color={theme.colors.surfaceVariant} />
        </Animated.View>
      </View>
    );
  };

  return (
    <SwipeableWidget
      renderRightActions={renderRightActions ?? defaultRenderRightActions}
    >
      {children}
    </SwipeableWidget>
  );
};

export default Swipeable;
