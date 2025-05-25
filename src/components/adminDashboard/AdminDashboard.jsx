import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Typography, Spin, message } from 'antd';
import { Pie, Bar } from '@ant-design/charts';
import axios from 'axios';
import { useAdminAuth } from '../../context/AdminAuthContext';
import './AdminDashboard.css';

const { Title } = Typography;

export default function AdminDashboard() {
  const [domainData, setDomainData] = useState([]);
  const [flatData, setFlatData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { authToken } = useAdminAuth();

  useEffect(() => {
    fetchStats();
    // eslint-disable-next-line
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://127.0.0.1:5000/api/admin/dashboard-stats', {
        headers: { Authorization: authToken }
      });
      // Make sure count is a number for all entries (defensive)
      setDomainData((res.data.domain_counts || []).map(d => ({
        ...d, count: Number(d.count)
      })));
      setFlatData((res.data.flat_counts || []).map(f => ({
        ...f, count: Number(f.count)
      })));
    } catch (err) {
      message.error("Failed to load statistics.");
    }
    setLoading(false);
  };

  // Pie Chart (already fixed in your last step)
  const pieConfig = {
    data: domainData,
    angleField: 'count',
    colorField: 'domain',
    radius: 0.9,
    innerRadius: 0.65,
    label: {
      type: 'spider',
      labelHeight: 30,
      formatter: (datum, idx, data) => {
        const total = data.reduce((sum, item) => sum + item.count, 0);
        const percent = total === 0 ? 0 : ((datum.count / total) * 100).toFixed(1);
        return `${datum.domain}\n${percent}%`;
      },
    },
    legend: { position: 'bottom' },
    color: ['#1677ff', '#265eb3', '#2bc2ff', '#65d6ff', '#002147'],
    statistic: { title: false, content: false },
  };

  // --- FIXED BAR CONFIG ---
const barConfig = {
    data: flatData,
    xField: 'count',
    yField: 'flat_no',
    legend: false,
    color: '#1677ff',
    label: {
      position: 'right',
      style: { fill: '#001133', fontWeight: 700 }
    },
    xAxis: { title: { text: 'Complaints' } },
    yAxis: { title: { text: 'Flat No' } },
    minBarWidth: 18,
    maxBarWidth: 28,
    style: { borderRadius: 10 },
  };


  // Most Complained Flat(s)
  let maxFlatCount = 0;
  let mostComplainedFlats = [];
  if (flatData.length > 0) {
    maxFlatCount = flatData[0].count;
    mostComplainedFlats = flatData.filter(f => f.count === maxFlatCount);
  }

  // Most Common Domain(s)
  let maxDomainCount = 0;
  let mostCommonDomains = [];
  if (domainData.length > 0) {
    maxDomainCount = domainData[0].count;
    mostCommonDomains = domainData.filter(d => d.count === maxDomainCount);
  }

  return (
    <div className="dashboard-bg">
      <Card className="dashboard-card" bordered={false}>
        <Title level={2} className="dashboard-title">Admin Dashboard</Title>
        {loading ? (
          <div style={{ textAlign: 'center', padding: 32 }}>
            <Spin size="large" />
          </div>
        ) : (
          <Row gutter={[32, 32]}>
            <Col xs={24} md={14}>
              <Card className="dashboard-stats-card" title="Complaints by Domain" bordered={false}>
                <Pie {...pieConfig} height={320} />
                {mostCommonDomains.length > 0 && (
                  <div className="dashboard-most-complaint dashboard-domain-card" style={{
                    marginTop: 24, background: "linear-gradient(90deg,#1677ff,#002147)",
                    color: "#fff", borderRadius: 16, padding: "18px 0", textAlign: "center"
                  }}>
                    <div className="dashboard-most-label" style={{ fontWeight: 600, letterSpacing: 1, fontSize: "1rem" }}>
                      Most Common Domain{mostCommonDomains.length > 1 ? "s" : ""}:
                    </div>
                    <div className="dashboard-most-value" style={{ fontWeight: 900, fontSize: "2.1rem" }}>
                      {mostCommonDomains.map(d => d.domain).join(", ")}
                    </div>
                    <div className="dashboard-most-flat" style={{ fontSize: "1.12rem", opacity: 0.9 }}>
                      {maxDomainCount} Complaint{maxDomainCount > 1 ? "s" : ""}
                    </div>
                  </div>
                )}
              </Card>
            </Col>
            <Col xs={24} md={10}>
              <Card className="dashboard-stats-card" title="Complaints by Flat No" bordered={false}>
                <Bar {...barConfig} height={250} />
                {mostComplainedFlats.length > 0 && (
                  <div className="dashboard-most-complaint" style={{
                    marginTop: 24, background: "linear-gradient(90deg,#1677ff,#002147)",
                    color: "#fff", borderRadius: 16, padding: "18px 0", textAlign: "center"
                  }}>
                    <div className="dashboard-most-label" style={{ fontWeight: 600, letterSpacing: 1, fontSize: "1rem" }}>
                      Most Complaints:
                    </div>
                    <div className="dashboard-most-value" style={{ fontWeight: 900, fontSize: "2.1rem" }}>
                      {maxFlatCount}
                    </div>
                    <div className="dashboard-most-flat" style={{ fontSize: "1.12rem", opacity: 0.9 }}>
                      Flat{mostComplainedFlats.length > 1 ? "s" : ""} {mostComplainedFlats.map(f => f.flat_no).join(", ")}
                    </div>
                  </div>
                )}
              </Card>
            </Col>
          </Row>
        )}
      </Card>
    </div>
  );
}