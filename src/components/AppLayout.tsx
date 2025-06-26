import React from "react";
import { Layout, Menu, Typography, Space, Row, Col } from "antd";
import { FormOutlined, HomeOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import "antd/dist/reset.css";
import LanguageDropdown from "./LanguageDropdown";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const { t } = useTranslation();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          background: "#fff",
          padding: "0 24px",
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        <Row align="middle" justify="space-between">
          <Col>
            <Space size={24} align="center">
              <img src="/Apaaci.png" alt="APAACI" style={{ height: 40 }} />
              <img src="/eaaci.jpg" alt="EAACI" style={{ height: 40 }} />
              <img src="/IHU.jpg" alt="IHU" style={{ height: 40 }} />
            </Space>
          </Col>
          <Col>
            <Space size={16} align="center">
              <Title level={4} style={{ margin: 0, color: "#1890ff" }}>
                {t("app.title")}
              </Title>
              <LanguageDropdown />
            </Space>
          </Col>
        </Row>
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
