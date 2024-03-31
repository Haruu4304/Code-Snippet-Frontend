import React, { useEffect, useState } from 'react';

const Dashboard = () => {
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
        console.log(data);
        setUserNames(data.userNames);
      } else {
        throw new Error('Failed to fetch user names');
      }
    } catch (error) {
      console.error(error);
      setError(error.message);
    } 
  };

  useEffect(() => {
    getUserName();
  }, []);
  return (
    <div className="card-div">
      {userNames.map((userName, index) => (
        <div className="cardData" key={index}>
          {userName}
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
