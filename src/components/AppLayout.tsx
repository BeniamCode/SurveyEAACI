import React from "react";
import { Layout, Menu, Typography, Space } from "antd";
import { FormOutlined, HomeOutlined } from "@ant-design/icons";
import "antd/dist/reset.css";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <div style={{ marginRight: 32 }}>
          <Title level={4} style={{ color: "white", margin: 0 }}>
            Survey App
          </Title>
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["survey"]}
          items={[
            {
              key: "home",
              icon: <HomeOutlined />,
              label: "Home",
            },
            {
              key: "survey",
              icon: <FormOutlined />,
              label: "Survey",
            },
          ]}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Content style={{ padding: "50px" }}>
        <div
          style={{
            background: "#fff",
            padding: 24,
            minHeight: 380,
            borderRadius: 8,
          }}
        >
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Survey App ©{new Date().getFullYear()} Created with Astro, Ant Design &
        SurveyJS
      </Footer>
    </Layout>
  );
}
