import React, { SetStateAction } from "react";

interface AuthenticationProp {
  username: string;
  email: string;
  isAuthenticated: boolean;
  setUsername: React.Dispatch<SetStateAction<string>>;
  setEmail: React.Dispatch<SetStateAction<string>>;
  setIsAuthenticated: React.Dispatch<SetStateAction<boolean>>;
}

export const AuthenticationContext = React.createContext<AuthenticationProp>({
  username: "",
  email: "",
  isAuthenticated: true,
  setUsername: () => {},
  setEmail: () => {},
  setIsAuthenticated: () => {},
});
