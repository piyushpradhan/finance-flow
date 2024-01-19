import React, { useState } from "react";

import {
  View,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
} from "react-native";
import { IconButton, Input, Text } from "../ui";
import { useAppTheme } from "../../provider/ThemeProvider";

type Props = {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  updateValue: (
    event: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) => void;
  setShowSubcategoryInput: React.Dispatch<React.SetStateAction<boolean>>;
  handleCancelEdit?: () => void;
};

const CategoryListItem = ({
  name,
  setName,
  updateValue,
  setShowSubcategoryInput,
  handleCancelEdit,
}: Props) => {
  const theme = useAppTheme();
  const [hasUserInteracted, setHasUserInteracted] = useState<boolean>(false);

  const styles = StyleSheet.create({
    itemContainer: {
      display: "flex",
      width: "100%",
      flexDirection: "column",
      justifyContent: "flex-start",
    },
    subcategoryInputContainer: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    subcategoryInput: {
      width: "90%",
      height: 16,
      fontSize: 14,
      paddingVertical: 8,
    },
    subcategoryRemoveContainer: {
      height: "100%",
      flexGrow: 1,
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
  });

  const shouldShowError = hasUserInteracted && name?.trim().length === 0;

  return (
    <View style={styles.itemContainer}>
      <View style={styles.subcategoryInputContainer}>
        <Input
          mode="outlined"
          label=""
          value={name}
          shouldShowError={shouldShowError}
          onChangeText={(text: string) => {
            setHasUserInteracted(true);
            setName(text);
          }}
          onSubmit={updateValue}
          props={{
            placeholder: "Sub-Category",
            autoFocus: true,
            activeOutlineColor: theme.colors.primary,
            outlineColor: theme.colors.border,
            blurOnSubmit: false,
            onBlur: () => {
              if (name.trim().length === 0) {
                setShowSubcategoryInput(false);
              }
            },
          }}
          style={styles.subcategoryInput}
        />
        <View style={styles.subcategoryRemoveContainer}>
          <IconButton
            name="x"
            color={theme.colors.secondary}
            onPress={() => {
              handleCancelEdit
                ? handleCancelEdit()
                : setShowSubcategoryInput(false);
            }}
          />
        </View>
      </View>
      {shouldShowError && (
        <Text variant="labelSmall" style={{ color: theme.colors.error }}>
          This field can't be left empty
        </Text>
      )}
    </View>
  );
};

export default CategoryListItem;
