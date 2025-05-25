import React, { useState } from 'react';
import { Card, Row, Col, message, Alert } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PinInput from './PinInput';
import FlatNoInput from './FlatNoInput';
import ComplaintTextarea from './ComplaintTextarea';
import FileUpload from './FileUpload';
import SubmitButton from './SubmitButton';
import './complaintForm.css';
import LoadingAnalysis from './LoadingAnalysis';

export default function ComplaintForm() {
  const [pin, setPin] = useState('');
  const [flatNo, setFlatNo] = useState('');
  const [complaint, setComplaint] = useState('');
  const [proofFile, setProofFile] = useState(null);
  const [formError, setFormError] = useState('');

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!pin || !flatNo || !complaint) {
      setFormError("Please fill all required fields.");
      message.error("Please fill all required fields.");
      return;
    }
    setLoading(true);
    setFormError('');
    try {
      const formData = new FormData();
      formData.append("pin_no", pin);
      formData.append("flat_no", flatNo);
      formData.append("complaint", complaint);
      if (proofFile) formData.append("proof_image", proofFile);

      const res = await axios.post('http://127.0.0.1:5000/api/complaint', formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setLoading(false);
      setFormError('');
      navigate('/response', { state: res.data });
    } catch (error) {
      setLoading(false);
      const errMsg = error.response?.data?.error || "Something went wrong.";
      setFormError(errMsg);
      message.error(errMsg);
    }
  };

  return (
    <Card className="complaint-card" bordered={false}>
      {loading ? (
        <LoadingAnalysis />
      ) : (
        <>
          {formError && (
            <Alert message={formError} type="error" showIcon style={{ marginBottom: 20 }} />
          )}
          <form onSubmit={handleSubmit}>
            <Row gutter={[16, 16]}>
              <Col xs={24} md={8}>
                <PinInput value={pin} onChange={e => { setPin(e.target.value); setFormError(''); }} />
              </Col>
              <Col xs={24} md={8}>
                <FlatNoInput value={flatNo} onChange={e => { setFlatNo(e.target.value); setFormError(''); }} />
              </Col>
            </Row>
            <Row gutter={[16, 16]} style={{ marginTop: 10 }}>
              <Col xs={24} md={16}>
                <ComplaintTextarea value={complaint} onChange={e => { setComplaint(e.target.value); setFormError(''); }} />
              </Col>
              <Col xs={24} md={8}>
                <FileUpload file={proofFile} setFile={setProofFile} />
              </Col>
            </Row>
            <Row justify="center" style={{ marginTop: 24 }}>
              <Col>
                <SubmitButton />
              </Col>
            </Row>
          </form>
        </>
      )}
    </Card>
  );
}