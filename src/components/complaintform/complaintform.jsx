// src/components/complaintform/ComplaintForm.jsx

import React, { useState } from 'react';
import { Card, Row, Col, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NICInput from './NICInput';
import ApartmentInput from './ApartmentInput';
import TypeDropdown from './TypeDropdown';
import ComplaintTextarea from './ComplaintTextarea';
import FileUpload from './FileUpload';
import SubmitButton from './SubmitButton';
import './complaintForm.css';
import LoadingAnalysis from './LoadingAnalysis'; // We'll create this component

export default function ComplaintForm() {
  const [nic, setNic] = useState('');
  const [apartmentNo, setApartmentNo] = useState('');
  const [complaint, setComplaint] = useState('');
  // File upload and type can be added if needed

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nic || !apartmentNo || !complaint) {
      message.error("Please fill all required fields.");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post('http://127.0.0.1:5000/api/complaint', {
        nic,
        apartment_no: apartmentNo,
        complaint,
      });
      setLoading(false);
      // Navigate to response page and pass the data
      navigate('/response', { state: res.data });
    } catch (error) {
      setLoading(false);
      message.error(error.response?.data?.error || "Something went wrong.");
    }
  };

  return (
    <Card className="complaint-card" bordered={false}>
      {loading ? (
        <LoadingAnalysis />
      ) : (
        <form onSubmit={handleSubmit}>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={8}>
              <NICInput value={nic} onChange={e => setNic(e.target.value)} />
            </Col>
            <Col xs={24} md={8}>
              <ApartmentInput value={apartmentNo} onChange={e => setApartmentNo(e.target.value)} />
            </Col>
            <Col xs={24} md={8}>
              <TypeDropdown /> {/* Not sent to backend for now */}
            </Col>
          </Row>
          <Row gutter={[16, 16]} style={{ marginTop: 10 }}>
            <Col xs={24} md={16}>
              <ComplaintTextarea value={complaint} onChange={e => setComplaint(e.target.value)} />
            </Col>
            <Col xs={24} md={8}>
              <FileUpload /> {/* Optional */}
            </Col>
          </Row>
          <Row justify="center" style={{ marginTop: 24 }}>
            <Col>
              <SubmitButton />
            </Col>
          </Row>
        </form>
      )}
    </Card>
  );
}