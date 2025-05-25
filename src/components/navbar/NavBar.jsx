import { Layout, Menu, Button } from 'antd';
import {
  HomeOutlined,
  FileProtectOutlined,
  UserOutlined,
  PhoneOutlined,
  InfoCircleOutlined,
  CrownOutlined,
} from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import './NavBar.css';

const { Header } = Layout;

const menuItems = [
  {
    key: '/',
    icon: <HomeOutlined />,
    label: <Link to="/">Home</Link>,
  },
  {
    key: '/complaint',
    icon: <FileProtectOutlined />,
    label: <Link to="/complaint">File Complaint</Link>,
  },
  {
    key: '/admin/complaints',
    icon: <CrownOutlined />,
    label: <Link to="/admin/complaints">Admin Panel</Link>,
  },
  {
    key: '/dashboard',
    icon: <CrownOutlined />,
    label: <Link to="/admin/dashboard">Dashboard</Link>,
  },

  {
    key: '/contact',
    icon: <PhoneOutlined />,
    label: <Link to="/contact">Contact Us</Link>,
  },
  {
    key: '/about',
    icon: <InfoCircleOutlined />,
    label: <Link to="/about">About</Link>,
  },
];

export default function NavBar() {
  const location = useLocation();
  return (
    <Header className="navbar-header">
      <div className="navbar-logo">
        <UserOutlined className="navbar-logo-icon" />
        <span className="navbar-logo-text">CoManS</span>
      </div>
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[location.pathname]}
        items={menuItems}
        className="navbar-menu"
      />
      <div className="navbar-actions">
        <Button type="primary" className="navbar-login-btn"
            onClick={() => {
                window.location.href = '/admin-login';
            }}
        
        >
          Admin Login
        </Button>
      </div>
    </Header>
  );
}