// src/pages/ResponsePage.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ResponsePageComponent from "../components/responsePage/ResponsePageComponent";
import { Button } from "antd";

const ResponsePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const responseData = location.state;

  if (!responseData) {
    return (
      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
        <h2>No response data found.</h2>
        <Button onClick={() => navigate('/')}>Go to Home</Button>
      </div>
    );
  }
  return (
    <ResponsePageComponent responseData={responseData} />
  );
};

export default ResponsePage;