// src/components/flatowners/AddFlatOwnerModal.jsx
import React, { useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import axios from "axios";
import { useAdminAuth } from "../../context/AdminAuthContext";

export default function AddFlatOwnerModal({ open, onClose, onAdded }) {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const { authToken } = useAdminAuth();

  const handleSubmit = async (values) => {
    setSubmitting(true);
    try {
      const res = await axios.post(
        "http://127.0.0.1:5000/api/flat-owner",
        values,
        { headers: { Authorization: authToken } }
      );
      message.success(res.data.message || "Flat owner added successfully");
      onAdded();
      form.resetFields();
    } catch (error) {
      message.error(error.response?.data?.error || "Failed to add flat owner.");
    }
    setSubmitting(false);
  };

  return (
    <Modal
      open={open}
      title="Add New Flat Owner"
      onCancel={onClose}
      footer={null}
      centered
      destroyOnClose
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Flat No"
          name="flat_no"
          rules={[{ required: true, message: "Flat No is required" }]}
        >
          <Input placeholder="Eg: 13B" />
        </Form.Item>
        <Form.Item
          label="PIN No"
          name="pin_no"
          rules={[
            { required: true, message: "PIN No is required" },
            { min: 4, max: 6, message: "PIN should be 4-6 digits" }
          ]}
        >
          <Input placeholder="Eg: 5555" />
        </Form.Item>
        <Form.Item
          label="Contact No"
          name="contact_no"
          rules={[
            { required: true, message: "Contact No is required" },
            { len: 10, message: "Contact No should be 10 digits" }
          ]}
        >
          <Input placeholder="Eg: 0771234567" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={submitting}
            style={{ fontWeight: 700, fontSize: 16 }}
          >
            Add Flat Owner
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}