import React, { useEffect, useRef, useState } from "react";

interface InputOtpProps {
  otpLength: number;
}
const InputOtp = ({ otpLength }: InputOtpProps) => {
  const [otp, setOtp] = useState<(number | string)[]>(
    new Array(otpLength).fill("")
  );

  useEffect(() => {
    if (inputRefs.current[0]) inputRefs.current[0].focus();
  }, []);

  const inputRefs = useRef<HTMLInputElement[]>([]);

  const handleChange = (value: string, index: number) => {
    if (isNaN(+value)) return; // allow only digits
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1); // last digit only
    setOtp(newOtp);

    if (value && index < otpLength - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    const key = e.key;

    if (key === "ArrowLeft") {
      if (index > 0) inputRefs.current[index - 1].focus();
    }

    if (key === "ArrowRight") {
      if (index < otpLength - 1) inputRefs.current[index + 1].focus();
    }

    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  console.log(otp);
  return (
    <div className="container">
      <h1>Input OTP</h1>
      <div className="inputs-container">
        {otp.map((value, index) => (
          <input
            key={index}
            type="text"
            inputMode="numeric"
            value={value}
            onChange={e => handleChange(e.target.value, index)}
            onKeyDown={e => handleKeyDown(e, index)}
            ref={el => {
              if (el) inputRefs.current[index] = el;
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default InputOtp;
