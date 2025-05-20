import { Card, Typography } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import './ResponseCard.css'
// Assuming you have a CSS file for styling
const { Title, Paragraph } = Typography;

export default function ResponseCard({ solution }) {
  // Ensure the response text keeps formatting and newlines
  return (
    <div className="response-card-wrapper">
      <Card className="response-card" bordered={false}>
        <div className="response-header">
          <InfoCircleOutlined className="response-icon" />
          <Title level={4} className="response-title">
            Solution to Your Complaint
          </Title>
        </div>
        <Paragraph className="response-solution" style={{ whiteSpace: 'pre-line' }}>
          {solution}
        </Paragraph>
      </Card>
    </div>
  );
}