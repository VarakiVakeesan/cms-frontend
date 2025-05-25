// src/pages/AdminPanel.jsx
import React from "react";
import { Card, Button, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import { UsergroupAddOutlined, DashboardOutlined, FileTextOutlined } from "@ant-design/icons";
import "./AdminPanel.css";

export default function AdminPanel() {
  const navigate = useNavigate();
  return (
    <div className="admin-panel-bg">
      <Card className="admin-panel-card" bordered={false}>
        <h2 className="admin-panel-title">Admin Panel</h2>
        <Row gutter={[32, 32]} justify="center">
          <Col xs={24} md={8}>
            <Button
              type="primary"
              block
              icon={<DashboardOutlined />}
              size="large"
              className="admin-panel-btn"
              onClick={() => navigate("/admin/dashboard")}
            >
              Dashboard
            </Button>
          </Col>
          <Col xs={24} md={8}>
            <Button
              type="default"
              block
              icon={<FileTextOutlined />}
              size="large"
              className="admin-panel-btn"
              onClick={() => navigate("/admin/complaints")}
            >
              Complaints
            </Button>
          </Col>
          <Col xs={24} md={8}>
            <Button
              type="dashed"
              block
              icon={<UsergroupAddOutlined />}
              size="large"
              className="admin-panel-btn"
              onClick={() => navigate("/admin-flat-owners")}
            >
              Flat Owners
            </Button>
          </Col>
        </Row>
      </Card>
    </div>
  );
}