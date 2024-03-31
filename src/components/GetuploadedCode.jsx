import React, { useState } from "react";
import Box from '@mui/material/Box';
import Sidebar from "../pages/Sidebar";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const GetuploadedCode = () => {
  const [otp, setOtp] = useState("");
  const [data, setData] = useState("");

  // API 
  const getDataasOtp = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/user/getDataWithOtp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          otp: otp
        })
      });
      if (response.ok) {
        const resData = await response.json();
        setData(resData.getCodes); 
        console.log(resData);
      } else {
        console.log("Error:", response.statusText);
      }
    } catch (error) { 
      console.error(error);
      toast.error("Failed to Register")
    }
  }

  const handleSubmit = (e) => {
    console.log("dataaa");
    e.preventDefault(); 
    getDataasOtp()
  }

  return (
    <>
      <Box height={40} />
      <ToastContainer/>
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <label htmlFor="otp" className="form-label" style={{ marginTop: "7%" }}>Enter OTP</label>
          <input type="number" className="form-control" id="otp" style={{ width: "30%" }} value={otp} onChange={(e) => setOtp(e.target.value)} />
          <div className="btn-otp" style={{marginTop:"3%"}}>
            <button onClick={handleSubmit}>Get Data</button>
          </div>
          <div className="to-show-output" style={{ margin: "6%","width": "30%"}}>
            {data && (
              <div className="output" style={{border:"2px solid black", padding:"5%"}}>
                {data}
              </div>
            )}
          </div>
        </Box>
      </Box>
    </>
  );
};

export default GetuploadedCode;
