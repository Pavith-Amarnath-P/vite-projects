import React, { useEffect, useRef, useState } from 'react'

export default function OtpInput({length = 4, onOtpSubmit}) {
    const [otp, setOtp] = useState(new Array(4).fill(""));
    const inputRefs = useRef([]);
    // console.log(otp);
    const handleChange = (index, e) => {
        const value = e.target.value;
        if(isNaN(value)) return
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // submit trigger
        
        const combinedOtp = newOtp.join("");
        if (combinedOtp.length === length) onOtpSubmit(combinedOtp);
        
        if (value && index < length - 1 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1].focus();
        }
        // console.log("OTP: " + otp);
        // console.log("NEW OTP: " + newOtp);
    }
    const handleClick = (index) => {
    }
    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
            inputRefs.current[index - 1].focus();
        }
    }

    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, [])
  return (
    <div>
        {otp.map((value, index) => (
            <input className='otp-input' maxLength={1} ref={input => inputRefs.current[index] = input} type="text" key={index} value={value} onChange={e => handleChange(index, e)} onClick={handleClick(index)} onKeyDown={e => handleKeyDown(index, e)} />
        ))}
    </div>
  )
}
