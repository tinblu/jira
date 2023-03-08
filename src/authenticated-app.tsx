//登录状态下
import { useAuth } from "context/auth-context";
import React, { memo } from "react";
import { ProjectListScreen } from "screens/project-list";

//登录后的页面
const AuthenticatedApp = memo(() => {
  const { logout } = useAuth();
  return (
    <div>
      <button onClick={logout}>登出</button>
      <ProjectListScreen />
    </div>
  );
});

export default AuthenticatedApp;
