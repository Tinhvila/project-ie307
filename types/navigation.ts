import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { ItemProps } from "./types";

// Typechecking the shopping stack navigator
export type ShoppingStackNavigator = {
  BottomScreen: BottomTabNavigationStackParamList;
  ItemDetails: ItemProps;
};

// Typechecking the bottom tab navigator
export type BottomTabNavigationStackParamList = {
  Home: undefined;
  Categories: undefined;
  Search: undefined;
  Cart: undefined;
  Profile: undefined;
};

// Type Navigation to Home Screen
export type HomeNavigationProp = NativeStackNavigationProp<
  ShoppingStackNavigator,
  "ItemDetails"
>;

// Type Route to Item Detail Screen
export type ItemDetailsScreenRouteProp = RouteProp<
  ShoppingStackNavigator,
  "ItemDetails"
>;
