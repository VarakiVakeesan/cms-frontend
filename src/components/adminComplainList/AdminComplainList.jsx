import React, { useEffect, useState } from "react";
import {
  Card,
  Table,
  Button,
  Tag,
  Modal,
  Spin,
  message,
  Descriptions,
  Grid,
  Tooltip,
  Switch
} from "antd";
import { EyeOutlined, CheckCircleTwoTone } from "@ant-design/icons";
import { useAdminAuth } from "../../context/AdminAuthContext";
import axios from "axios";
import "./AdminComplaintList.css";

const { useBreakpoint } = Grid;

export default function AdminComplaintList() {
  const { authToken, logout } = useAdminAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal related
  const [viewModal, setViewModal] = useState(false);
  const [currentComplaint, setCurrentComplaint] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [toggling, setToggling] = useState(false);

  const screens = useBreakpoint();

  useEffect(() => {
    fetchComplaints();
    // eslint-disable-next-line
  }, []);

  const fetchComplaints = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://127.0.0.1:5000/api/admin/complaints", {
        headers: { Authorization: authToken },
      });
      setData(res.data.complaints || res.data); // adjust to your backend
    } catch (err) {
      message.error("Failed to fetch complaints");
    }
    setLoading(false);
  };

  // Fetch complaint details for modal
  const handleView = async (complaint) => {
    setModalLoading(true);
    try {
      const res = await axios.get(
        `http://127.0.0.1:5000/api/admin/complaints/${complaint.id}`,
        { headers: { Authorization: authToken } }
      );
      setCurrentComplaint(res.data);
      setViewModal(true);
    } catch (err) {
      message.error("Failed to load complaint details");
    }
    setModalLoading(false);
  };

  // Toggle checked status (only in modal)
  const onToggleChecked = async (complaint, checked) => {
    setToggling(true);
    try {
      await axios.patch(
        `http://127.0.0.1:5000/api/admin/complaints/${complaint.id}/toggle-checked`,
        {},
        { headers: { Authorization: authToken } }
      );
      message.success("Checked status updated");
      // Refetch modal details and complaints list
      handleView(complaint);
      fetchComplaints();
    } catch (err) {
      message.error("Failed to update checked status");
    }
    setToggling(false);
  };

  // Responsive Table Columns
  const columns = [
    ...(screens.xs
      ? []
      : [
          {
            title: "ID",
            dataIndex: "id",
            key: "id",
            width: 60,
          },
        ]),
    {
      title: "Flat No",
      dataIndex: "flat_no",
      key: "flat_no",
      width: 90,
    },
    {
      title: "Domain",
      dataIndex: "domain",
      key: "domain",
      render: (domain) => (
        <Tag color="blue" style={{ fontWeight: 500, fontSize: screens.xs ? 13 : 15 }}>
          {domain}
        </Tag>
      ),
      width: 120,
    },
    ...(!screens.xs
      ? [
          {
            title: "Checked",
            dataIndex: "is_checked",
            key: "is_checked",
            render: (checked) =>
              checked ? (
                <CheckCircleTwoTone twoToneColor="#1677ff" />
              ) : (
                <CheckCircleTwoTone twoToneColor="#ccc" />
              ),
            width: 95,
          },
        ]
      : []),
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) =>
        screens.xs ? (
          <Tooltip title="View">
            <Button
              icon={<EyeOutlined />}
              onClick={() => handleView(record)}
              type="primary"
              shape="circle"
              size="middle"
              style={{ background: "#1677ff", borderColor: "#1677ff", color: "#fff" }}
            />
          </Tooltip>
        ) : (
          <Button
            icon={<EyeOutlined />}
            onClick={() => handleView(record)}
            type="primary"
            style={{ background: "#1677ff", borderColor: "#1677ff", color: "#fff" }}
          >
            View
          </Button>
        ),
      width: screens.xs ? 64 : 100,
    },
  ];

  return (
    <div className="complaint-list-bg">
      <Card className="complaint-list-card" bordered={false}>
        <div className="complaint-list-header">
          <h2>List of Complaints</h2>
          <Button type="primary" onClick={logout}>
            Logout
          </Button>
        </div>
        {loading ? (
          <div style={{ textAlign: "center", padding: "3rem" }}>
            <Spin size="large" />
          </div>
        ) : (
          <Table
            dataSource={data}
            columns={columns}
            rowKey="id"
            pagination={{ pageSize: 7, showSizeChanger: false }}
            bordered
            size="middle"
            scroll={screens.xs ? { x: true } : undefined}
          />
        )}
      </Card>
      <Modal
        title="Complaint Details"
        open={viewModal}
        onCancel={() => setViewModal(false)}
        footer={[
          <Button key="close" onClick={() => setViewModal(false)}>
            Close
          </Button>,
        ]}
        width={screens.xs ? "95vw" : 600}
        centered
        className="complaint-modal"
        styles={{ body: { padding: screens.xs ? 10 : 24, maxHeight: "70vh", overflowY: "auto" } }}
      >
        {modalLoading ? (
          <Spin />
        ) : (
          currentComplaint && (
            <Descriptions
              column={1}
              bordered
              size="small"
              labelStyle={{ fontWeight: "bold", color: "#1677ff" }}
              contentStyle={{ fontSize: screens.xs ? 13 : 16 }}
            >
              <Descriptions.Item label="Flat No">{currentComplaint.flat_owner?.flat_no}</Descriptions.Item>
              <Descriptions.Item label="Contact No">{currentComplaint.flat_owner?.contact_no}</Descriptions.Item>
              <Descriptions.Item label="Domain">{currentComplaint.domain}</Descriptions.Item>
              <Descriptions.Item label="Checked">
                <Switch
                  checked={currentComplaint.is_checked}
                  onChange={(checked) => onToggleChecked(currentComplaint, checked)}
                  checkedChildren={<CheckCircleTwoTone twoToneColor="#1677ff" />}
                  unCheckedChildren={<CheckCircleTwoTone twoToneColor="#ccc" />}
                  loading={toggling}
                  style={{ marginRight: 8 }}
                />
                {currentComplaint.is_checked ? "Checked" : "Unchecked"}
              </Descriptions.Item>
              <Descriptions.Item label="Complaint">
                <div style={{ whiteSpace: "pre-line", color: "#273552" }}>
                  {currentComplaint.description}
                </div>
              </Descriptions.Item>
              <Descriptions.Item label="Solution">
                <div style={{ whiteSpace: "pre-line", color: "#0b2b51", fontWeight: 500 }}>
                  {currentComplaint.solution}
                </div>
              </Descriptions.Item>
              {currentComplaint.proof_image && (
                <Descriptions.Item label="Proof">
                  <img
                    src={currentComplaint.proof_image}
                    alt="Proof"
                    style={{ maxWidth: "100%", borderRadius: 8, marginTop: 8 }}
                  />
                </Descriptions.Item>
              )}
              <Descriptions.Item label="Created At">{currentComplaint.created_at}</Descriptions.Item>
            </Descriptions>
          )
        )}
      </Modal>
    </div>
  );
}