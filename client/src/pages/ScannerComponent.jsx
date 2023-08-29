import React, {useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";


const ScannerComponent = () => {
    const location = useLocation();
    const navigate= useNavigate()
    const { address, mobileNumber, pinCode, city, state } = location.state;

    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsButtonDisabled(false);
        }, 2 * 60 * 1000); // 2 minutes in milliseconds

        return () => {
            clearTimeout(timer);
        };
    }, []);

    const handleOrderDoneClick=()=>{
        toast.success("Your order will be placed automatically once we verify your payment")
        navigate('/')
    }

  return (
    <div className='scanner-container'>
      <h2>Scan Your Payment</h2>
      <p>Address: {address}</p>
      <p>Mobile Number: {mobileNumber}</p>
      <p>Pin Code: {pinCode}</p>
      <p>City: {city}</p>
      <p>State: {state}</p>
      {/* Display the scanner image here */}
      <img src='/images/scannerimage.jpg' alt="Scanner" className="scannerimage" />
    <button className='button'  disabled={isButtonDisabled} onClick={handleOrderDoneClick}>Payment completed</button>
    </div>
  );
};

export default ScannerComponent;
