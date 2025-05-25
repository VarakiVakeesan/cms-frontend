// src/components/flatowners/AdminFlatOwnerList.jsx
import React, { useEffect, useState } from "react";
import { Card, Table, Button, Spin, message, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useAdminAuth } from "../../context/AdminAuthContext";
import axios from "axios";
import AddFlatOwnerModal from "./AddFlatOwnerModal";
import "./AdminFlatOwnerList.css";

export default function AdminFlatOwnerList() {
  const { authToken } = useAdminAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal state for adding flat owner
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    fetchFlatOwners();
    // eslint-disable-next-line
  }, []);

  const fetchFlatOwners = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://127.0.0.1:5000/api/admin/flat-owners", {
        headers: { Authorization: authToken }
      });
      setData(res.data.flat_owners || []);
    } catch (err) {
      message.error("Failed to fetch flat owners.");
    }
    setLoading(false);
  };

  const columns = [
    { title: "Flat No", dataIndex: "flat_no", key: "flat_no" },
    { title: "Contact No", dataIndex: "contact_no", key: "contact_no" },
    { title: "Complaints", dataIndex: "complaint_count", key: "complaint_count" }
  ];

  return (
    <div className="flat-owner-list-bg">
      <Card className="flat-owner-list-card" bordered={false}>
        <div className="flat-owner-list-header">
          <h2>Flat Owners</h2>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setShowAddModal(true)}
            className="add-flat-owner-btn"
          >
            Add Flat Owner
          </Button>
        </div>
        {loading ? (
          <div style={{ textAlign: "center", padding: "2.5rem" }}>
            <Spin size="large" />
          </div>
        ) : (
          <Table
            dataSource={data}
            columns={columns}
            rowKey="id"
            pagination={{ pageSize: 8, showSizeChanger: false }}
            bordered
            size="middle"
          />
        )}
      </Card>
      <AddFlatOwnerModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdded={() => {
          setShowAddModal(false);
          fetchFlatOwners();
        }}
      />
    </div>
  );
}