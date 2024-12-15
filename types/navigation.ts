import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ItemProps } from "./types";

// Typechecking the shopping stack navigator - navigation stack
export type ShoppingStackNavigator = {
  BottomScreen: BottomTabNavigationStackParamList;
  Search: undefined;
  ProfileStack: undefined;
  ItemDetails: ItemProps;
};

// Typechecking the bottom tab navigator - tab stack
export type BottomTabNavigationStackParamList = {
  HomeStack: HomeStackNavigationParamList;
  Categories: undefined;
  Search: undefined;
  Cart: undefined;
  ProfileStack: undefined;
};

// Typechecking the HomeStackScreen - navigation stack
export type HomeStackNavigationParamList = {
  Home: undefined;
  Categories: {
    value?: number;
  };
};

// Typechecking the Profile - navigation stack
export type ProfileStackNavigationParamList = {
  Profile: undefined;
  Order: undefined;
  EditProfile: undefined;
  ChangePassword: undefined;
};

// Typechecking the AuthenticationStackScreen - navigation stack
export type AuthenticationStackNavigationParamList = {
  Intro: undefined;
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  ResetPassword: {
    email: string;
  };
};

// Type Navigation for Authentication
export type AuthenticationStackNavigationProp =
  NativeStackNavigationProp<AuthenticationStackNavigationParamList>;

// Type Navigation for Profile
export type ProfileStackNavigationProp =
  NativeStackNavigationProp<ProfileStackNavigationParamList>;

// Type Navigation from any Item Card to Item Details - navigation prop
export type ItemDetailsNavigationProp = NativeStackNavigationProp<
  ShoppingStackNavigator,
  "ItemDetails"
>;

// Type Navigation from Any Item Card to to Items List Screen - navigation prop
export type ItemsListScreenNavigationProp =
  NativeStackNavigationProp<HomeStackNavigationParamList>;

// Type Route to Item Detail Screen - route prop
export type ItemDetailsScreenRouteProp = RouteProp<ShoppingStackNavigator>;

// Type Route to Item List Screen - route prop
export type ItemsListScreenRouteProp = RouteProp<HomeStackNavigationParamList>;
