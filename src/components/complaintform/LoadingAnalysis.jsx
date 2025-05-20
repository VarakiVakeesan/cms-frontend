import { Spin, Typography } from 'antd';
import { RobotOutlined } from '@ant-design/icons';

export default function LoadingAnalysis() {
  return (
    <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
      <Spin size="large" style={{ marginBottom: 16 }} />
      <div style={{ marginTop: 18 }}>
        <RobotOutlined style={{ fontSize: 32, color: '#1677ff', marginBottom: 8 }} />
        <Typography.Title level={4} style={{ marginBottom: 0 }}>Analysing your complaint...</Typography.Title>
        <Typography.Paragraph style={{ color: '#888', marginTop: 6 }}>
          Please wait a moment while we process and generate the best solution using our AI engine.
        </Typography.Paragraph>
      </div>
    </div>
  );
}