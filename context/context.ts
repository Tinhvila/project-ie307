import React, { SetStateAction } from "react";

interface IContextSignedIn {
  isSignedIn: boolean;
  setIsSignedIn: React.Dispatch<SetStateAction<boolean>>;
}

export const ContextSignedIn = React.createContext<IContextSignedIn>({
  isSignedIn: false,
  setIsSignedIn: () => {},
});
export const UsernameDefault = React.createContext<string>(
  "21522762@gm.uit.edu.vn"
);
export const PasswordDefault = React.createContext<string>("trananhtuan");
