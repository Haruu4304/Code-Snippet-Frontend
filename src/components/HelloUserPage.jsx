import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const HelloUserPage = () => {
  const { userName } = useParams();
 console.log("-----------",userName);
 const [code,setCode] = useState([]);

//  api to display the user's input code in our card format -> calling an api

    const getCode = async () => {
    try {
        const response = await fetch(`http://localhost:8000/api/user/${userName}/getDataWithUsername`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (response.status === 200) {
            const data = await response.json();
            console.log("0000000", data.populateCode);
            const codes = data.populateCode.map((item) => item.code)
            console.log("-----------",codes);
            setCode(codes);
        }
    } catch (error) {
        console.error(error);
    }
}

  useEffect(() => {
    getCode()
  },[userName])

  return (
    <div className="card-div-userName">
    {code.map((input, index) => (
      <div key={index}>
        <div className="cardData">
          {input}
        </div>
      </div>
    ))}
  </div>
  );
};

export default HelloUserPage;
