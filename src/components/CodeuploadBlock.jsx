import React from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation hook
import UploadCode from './Uploadcode';

const CodeuploadBlock = () => {
  const location = useLocation(); // Use useLocation hook to access location
  const userId = location.state && location.state.userId; // Access userId from location state

  const code = `function helloWorld() {
    console.log('Hello, world!');
  }`;

  console.log("uiddd", userId);

  return (
    <UploadCode language="javascript" code={code} userId={userId}/>
  );
}

export default CodeuploadBlock;
