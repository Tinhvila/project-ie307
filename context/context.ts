import React, { SetStateAction } from "react";

export interface AuthenticationProp {
  id: string;
  userData: {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: string;
  };
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<SetStateAction<boolean>>;
  setId: React.Dispatch<SetStateAction<string>>;
  setUserData: React.Dispatch<
    SetStateAction<{
      username: string;
      email: string;
      firstName: string;
      lastName: string;
      phoneNumber: string;
      address: string;
    }>
  >;
}

export const AuthenticationContext = React.createContext<AuthenticationProp>({
  id: "",
  userData: {
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
  },
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  setId: () => {},
  setUserData: () => {},
});
