import React, { useRef, useEffect, useState } from 'react';
import Sidebar from '../pages/Sidebar';
import Box from '@mui/material/Box';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UploadCode = ({ language, code, userId }) => {
  const codeRef = useRef();
  console.log("uid", userId);
  useEffect(() => {
    if (codeRef.current && language) {
      hljs.highlightElement(codeRef.current);
    }
  }, [code, language]);

  const [input, setInput] = useState("");

  const copyToClipboard = () => {
    navigator.clipboard.writeText(input)
      .then(() => {
        toast.success('Code copied to clipboard');
      })
      .catch((error) => {
        console.error('Unable to copy:', error);
        toast.error('Failed to copy code');
      });
  };

  const uploadCode = async () => {
    if (!userId) {
      console.error("userId is undefined");
      return;
    }

    const response = await fetch(`http://localhost:8000/api/user/${userId}/postData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        code: input
      })
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      toast.success(data);
    } else {
      console.log("error");
    }
  }

  return (
    <>
      <Box height={40} />
      <ToastContainer/>
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <pre>
            <textarea
              className={`language-${language}`}
              ref={codeRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter your code here"
              style={{ width: '100%', height: '300px', marginTop: '5%' }}
            />
            <div>
              <button onClick={copyToClipboard}>
                Copy code
              </button>
            </div>
          </pre>
          <button onClick={uploadCode}>
            Upload
          </button>
        </Box>
      </Box>
    </>
  );
};

export default UploadCode;
