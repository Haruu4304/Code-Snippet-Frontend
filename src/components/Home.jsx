import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Sidebar from "../pages/Sidebar";
import { Link } from 'react-router-dom';

const Home = () => {
  const [userNames, setUserNames] = useState([]);

  const getUserName = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/user/getUserName", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (response.ok) {
        const data = await response.json();
        setUserNames(data.userNames);
      } else {
        throw new Error('Failed to fetch user names');
      }
    } catch (error) {
      console.error(error);
    } 
  };

  useEffect(() => {
    getUserName();
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar/>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <div className="card-div">
          {userNames.map((userName, index) => (
            <Link key={index} to={`/hello/${userName}`}>
              <div className="cardData">
                {userName}
              </div>
            </Link>
          ))}
        </div>
      </Box>
    </Box>
  )
}

export default Home;
