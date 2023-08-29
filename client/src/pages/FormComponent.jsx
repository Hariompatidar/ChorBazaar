import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const FormComponent = () => {
    const navigate = useNavigate();
    const [address, setAddress] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [pinCode, setPinCode] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");

    const handleNext = () => {
        navigate("/scanner", {
            state:{
                address,
            mobileNumber,
            pinCode,
            city,
            state
            }
        });
    };

    return (
        <div className="form-con">
            <div className="form1-container">
                <h2>Add your complete address</h2>
                <form>
                    <input
                        type="text"
                        placeholder="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Mobile Number"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Pin Code"
                        value={pinCode}
                        onChange={(e) => setPinCode(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="State"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                    />
                    <button type="button" onClick={handleNext}>
                        Next
                    </button>
                </form>
            </div>
        </div>
    );
};

export default FormComponent;
