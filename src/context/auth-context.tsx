import React, { ReactNode, useState } from "react";
import * as auth from "auth_provider";
import { User } from "screens/project-list/search-panel";

interface AuthFrom {
  username: string;
  password: string;
}
//用useContext存储全局用户信息
const AuthContext = React.createContext<
  | {
      user: User | null;
      register: (form: AuthFrom) => Promise<void>;
      login: (form: AuthFrom) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);
AuthContext.displayName = "AuthContext"; //描述干什么的

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (form: AuthFrom) => auth.login(form).then(setUser);

  const register = (form: AuthFrom) => auth.register(form).then(setUser);

  const logout = () => auth.logout().then(() => setUser(null));

  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  );
};

//用useContext存储全局用户信息
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth必须再AuthProvider中使用");
  }
  return context;
};
