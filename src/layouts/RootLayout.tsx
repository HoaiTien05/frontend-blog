import { Layout, Menu, Button, Space, Dropdown, Avatar } from "antd";
import { LogoutOutlined, UserOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../core/hooks/useAuth";
import { useEffect } from "react";
import { useAppDispatch } from "../core/redux";
import { authAPI } from "../core/services/authAPI";
import { setUser, setLoading } from "../core/redux/authSlice";

const { Header, Content, Footer } = Layout;

interface RootLayoutProps {
  children?: React.ReactNode;
}

export const RootLayout = ({ children }: RootLayoutProps) => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const dispatch = useAppDispatch();

  // On app start, if accessToken exists but user not loaded, try to fetch profile
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token && !user) {
      (async () => {
        try {
          dispatch(setLoading(true));
          const res = await authAPI.getProfile();
          dispatch(setUser(res.data));
        } catch (e) {
          // token invalid or network error — remove stored tokens
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
        } finally {
          dispatch(setLoading(false));
        }
      })();
    }
  }, [user, dispatch]);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const menuItems = [
    { key: "/", label: "Home", onClick: () => navigate("/") },
    { key: "/posts", label: "All Posts", onClick: () => navigate("/posts") },
  ];

  const userMenu = [
    {
      key: "profile",
      label: "My Profile",
      icon: <UserOutlined />,
      onClick: () => navigate("/profile"),
    },
    {
      key: "logout",
      label: "Logout",
      icon: <LogoutOutlined />,
      onClick: handleLogout,
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          background: "#fff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{ fontSize: 20, fontWeight: "bold", color: "#1890ff" }}
          onClick={() => navigate("/")}
          role="button"
          tabIndex={0}
        >
          📝 Mini Blog
        </div>

        <Menu
          mode="horizontal"
          items={menuItems}
          style={{ flex: 1, justifyContent: "center" }}
        />

        <Space size="large">
          {isAuthenticated ? (
            <>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => navigate("/create-post")}
              >
                New Post
              </Button>
              <Dropdown menu={{ items: userMenu }} trigger={["click"]}>
                <Avatar
                  style={{ backgroundColor: "#87d068", cursor: "pointer" }}
                  icon={<UserOutlined />}
                >
                  {user?.username[0]?.toUpperCase()}
                </Avatar>
              </Dropdown>
            </>
          ) : (
            <>
              <Button type="link" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button type="primary" onClick={() => navigate("/register")}>
                Register
              </Button>
            </>
          )}
        </Space>
      </Header>

      <Content
        style={{
          padding: "24px",
          maxWidth: 1200,
          margin: "0 auto",
          width: "100%",
        }}
      >
        {children}
      </Content>

      <Footer
        style={{
          textAlign: "center",
          background: "#fafafa",
          marginTop: "auto",
        }}
      >
        <p>Mini Blog © 2025. All rights reserved.</p>
      </Footer>
    </Layout>
  );
};
