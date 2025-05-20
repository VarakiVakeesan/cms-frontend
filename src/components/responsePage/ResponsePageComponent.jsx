import { Card, Typography, Divider } from 'antd';
import { InfoCircleOutlined, FileTextOutlined, UserOutlined, HomeOutlined } from '@ant-design/icons';
import './ResponsePageComponent.css';

const { Title, Paragraph, Text } = Typography;



export default function ResponsePageComponent({ responseData }) {



  return (
    <div className="responsepage-bg">
      <Card className="responsepage-card" bordered={false}>
        <div className="responsepage-header">
          <InfoCircleOutlined className="responsepage-header-icon" />
          <Title level={3} className="responsepage-main-title">
            Complaint Response
          </Title>
        </div>
        <Divider />
        <div className="responsepage-section">
          <Text className="responsepage-label"><FileTextOutlined /> Complaint:</Text>
          <Paragraph className="responsepage-value">{responseData.complaint}</Paragraph>
        </div>
        <div className="responsepage-section">
          <Text className="responsepage-label"><UserOutlined /> NIC No:</Text>
          <Paragraph className="responsepage-value">{responseData.nic}</Paragraph>
        </div>
        <div className="responsepage-section">
          <Text className="responsepage-label"><HomeOutlined /> Apartment No:</Text>
          <Paragraph className="responsepage-value">{responseData.apartmentNo}</Paragraph>
        </div>
        <Divider />
        <div className="responsepage-section">
          <Text className="responsepage-label responsepage-solution-label">
            <InfoCircleOutlined /> Solution:
          </Text>
          <Card className="responsepage-solution-card" bordered={false}>
            <Paragraph
              className="responsepage-solution-text"
              style={{ whiteSpace: 'pre-line', textAlign: 'justify' }}
            >
              {responseData.solution}
            </Paragraph>
          </Card>
        </div>
      </Card>
    </div>
  );
}