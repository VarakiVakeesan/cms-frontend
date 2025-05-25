import { Layout, Menu, Button } from 'antd';
import {
  HomeOutlined,
  FileProtectOutlined,
  UserOutlined,
  PhoneOutlined,
  InfoCircleOutlined,
  CrownOutlined,
} from '@ant-design/icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
    key: '/complaint-list',
    icon: <FileProtectOutlined />,
    label: <Link to="/admin/complaints">Complaint List</Link>,
   
  },
  {
    key: '/admin-panel',
    icon: <CrownOutlined />,
    label: <Link to="/admin-panel">Admin Panel</Link>,
  },
  {
    key: '/admin/dashboard',
    icon: <CrownOutlined />,
    label: <Link to="/admin/dashboard">Dashboard</Link>,
  },
  {
    key: '/admin-flat-owners',
    icon: <UserOutlined />,
    label: <Link to="/admin-flat-owners">Flat Owners</Link>,
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
  const navigate = useNavigate();

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
        <Button
          type="primary"
          className="navbar-login-btn"
          onClick={() => navigate('/admin-login')}
        >
          Admin Login
        </Button>
      </div>
    </Header>
  );
}