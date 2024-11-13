import React, { useState } from 'react'

export const LoginSignup = () => {

  const [state, setState] = useState("Login")
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: ''
  })

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const login = async () => {
    console.log("Login function executed!", formData);
  
    let responseData;
    await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((resp) => resp.json())
      .then((data) => { responseData = data });

    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace("/");
    }
    else {
      alert(responseData.errors)
    }
  };
  

  const signup = async () => {
    let responseData;
    await fetch('http://localhost:4000/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((resp) => resp.json())
      .then((data) => { responseData = data });

    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace("/");
    }
    else {
      alert(responseData.errors)
    }
  }



  return (
    <div className='w-full min-h-[90vh] bg-[#fce3fe] pt-[100px]'>
      <div className="w-[90%] max-w-[550px] bg-white mx-auto p-[30px_40px] box-border">
        <h1 className="text-[22px] md:text-[24px] mb-[15px]">{state}</h1>

        <div className="flex flex-col gap-[25px] mt-[20px]">
          {state === "Sign Up" ? <input
            className="h-[60px] w-full pl-[20px] border border-[#c9c9c9] outline-none text-[#5c5c5c] text-[18px] box-border"
            type="text" placeholder='Your Name' name='username' value={formData.username} onChange={changeHandler}
          /> : <></>}
          <input
            className="h-[60px] w-full pl-[20px] border border-[#c9c9c9] outline-none text-[#5c5c5c] text-[18px] box-border"
            type="email" placeholder='Email Address' name='email' value={formData.email} onChange={changeHandler}
          />
          <input
            className="h-[60px] w-full pl-[20px] border border-[#c9c9c9] outline-none text-[#5c5c5c] text-[18px] box-border"
            type="password" placeholder='Password' name='password' value={formData.password} onChange={changeHandler}
          />
        </div>

        <button className="w-full h-[60px] bg-[#ff4141] text-white mt-[30px] text-[22px] font-medium cursor-pointer border-none" onClick={() => { state === "Login" ? login() : signup() }}>
          Continue
        </button>

        {state === "Sign Up" ? <p className="mt-[20px] text-[#5c5c5c] text-[16px] font-medium">
          Already have an account? <span className="text-[#ff4141] font-semibold cursor-pointer" onClick={() => { setState("Login") }}>Login here</span>
        </p> : <p className="mt-[20px] text-[#5c5c5c] text-[16px] font-medium">
          Create an account? <span className="text-[#ff4141] font-semibold cursor-pointer" onClick={() => { setState("Sign Up") }}>Click here</span>
        </p>}


        <div className="flex items-center mt-[18px] gap-[10px] text-[#5c5c5c] text-[15px] font-medium">
          <input type="checkbox" name='' id='' />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  )
}
