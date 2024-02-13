import React, { useState } from 'react'
import OtpInput from './OtpInput';

export default function OtpCard() {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [showOtpField, setShowOtpField] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    const handlePhoneNumber = (event) => {
        setPhoneNumber(event.target.value);
    }
    const handlePhoneNumberSubmit = (event) => {
        event.preventDefault();
        const regex = /[^0-9]/g;
        if (phoneNumber.length < 10 || regex.test(phoneNumber)) {
            alert("Invalid Phone Number");
            return;
        }
        // Call the API
        // Show OTP Page
        setShowOtpField(true);

    }
    const onOtpSubmit = (otp) => {
        if (otp === "1233") {
            setIsComplete(true);
            return;
        } else {
            alert("Enter a valid OTP");
        }
        console.log("Login Successful", otp);
    }
  return (
    <div>
        {
            !showOtpField ? 
        <form onSubmit={handlePhoneNumberSubmit}>
            <input type="text" placeholder='Enter phone number...' value={phoneNumber} onChange={handlePhoneNumber} />
            <button type='submit'>Submit</button>
        </form> : ( !isComplete ? <div>
            <p>OTP sent to {phoneNumber}</p>
            <OtpInput length={4} onOtpSubmit={onOtpSubmit} />
        </div> : (
            <div>
                Login Successful!
            </div>
        )) 
        }
    </div>
  )
}
