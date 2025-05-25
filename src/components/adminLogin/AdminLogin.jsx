import React, { useState } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { LockOutlined, UserOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import { useAdminAuth } from '../../context/AdminAuthContext'; // Adjust import path if needed
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminLogin.css';

export default function AdminLogin() {
  const [loading, setLoading] = useState(false);
  const { login } = useAdminAuth();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const basicToken = 'Basic ' + btoa(`${values.username}:${values.password}`);
      // Use an admin-protected endpoint to test login (e.g. complaint list)
      await axios.get('http://127.0.0.1:5000/api/admin/complaints?limit=1', {
        headers: { Authorization: basicToken },
      });
      login(values.username, values.password); // Save token in context
      setLoading(false);
      navigate('/admin/complaints'); // Redirect to complaints list page
    } catch (err) {
      setLoading(false);
      message.error('Invalid username or password');
    }
  };

  return (
    <div className="admin-login-bg">
      <Card className="admin-login-card" bordered={false}>
        <div className="admin-login-header">
          <SafetyCertificateOutlined className="admin-login-icon" />
          <h2>Admin Login</h2>
          <p className="admin-login-tagline">
            Secure portal for authorized administrators only.<br />
            <span className="admin-login-subtag">
              Manage, resolve, and oversee apartment complaints with Co-Man-S.
            </span>
          </p>
        </div>
        <Form
          name="admin_login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please enter your admin username!' }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Admin Username"
              size="large"
              autoComplete="username"
              className="admin-login-input"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please enter your password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              size="large"
              autoComplete="current-password"
              className="admin-login-input"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              className="admin-login-btn"
              loading={loading}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}