import React, { useState } from 'react';

export const LoginSignup = ({ setIsAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    let responseData;
    await fetch('http://localhost:4000/admin/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((resp) => resp.json())
      .then((data) => { responseData = data });

    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      setIsAuthenticated(true);
      window.location.replace("/");
    } else {
      alert(responseData.errors);
    }
  };

  return (
    <div className='w-full min-h-[90vh] bg-[#fce3fe] pt-[100px]'>
      <div className="w-[90%] max-w-[550px] bg-white mx-auto p-[30px_40px] box-border">
        <h1 className="text-[22px] md:text-[24px] mb-[15px]">Login</h1>

        <div className="flex flex-col gap-[25px] mt-[20px]">
          <input
            className="h-[60px] w-full pl-[20px] border border-[#c9c9c9] outline-none text-[#5c5c5c] text-[18px] box-border"
            type="email"
            placeholder='Email Address'
            name='email'
            value={formData.email}
            onChange={changeHandler}
            required
          />
          <input
            className="h-[60px] w-full pl-[20px] border border-[#c9c9c9] outline-none text-[#5c5c5c] text-[18px] box-border"
            type="password"
            placeholder='Password'
            name='password'
            value={formData.password}
            onChange={changeHandler}
            required
          />
        </div>

        <button
          className="w-full h-[60px] bg-[#ff4141] text-white mt-[30px] text-[22px] font-medium cursor-pointer border-none"
          onClick={login}
        >
          Continue
        </button>

        <div className="flex items-center mt-[18px] gap-[10px] text-[#5c5c5c] text-[15px] font-medium">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  );
};
