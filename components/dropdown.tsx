import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { FontAwesome6 } from "@expo/vector-icons";

const DropdownComponent = ({ title, data }: { title: string; data: any }) => {
  const [value, setValue] = useState(null);
  const renderItem = (item: any) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {item.value === value && (
          <FontAwesome6
            style={styles.icon}
            color="black"
            name="check"
            size={20}
          />
        )}
      </View>
    );
  };

  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={data}
      //   search
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder={title}
      searchPlaceholder="Search..."
      value={value}
      onChange={(item: any) => {
        setValue(item.value);
      }}
      //   renderLeftIcon={() => (
      //     <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
      //   )}
      renderItem={renderItem}
    />
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  dropdown: {
    width: "80%",
    margin: 16,
    height: 50,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
