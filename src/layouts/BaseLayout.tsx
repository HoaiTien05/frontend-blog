import { Outlet } from "react-router-dom";
import { RootLayout } from "./RootLayout";

export const BaseLayout = () => {
  return (
    <RootLayout>
      <Outlet />
    </RootLayout>
  );
};
