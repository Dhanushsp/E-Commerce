import React from 'react'
import logo from '../Assets/logo.png';
import instagram_icon from '../Assets/instagram_icon.png'
import pinterest_icon from '../Assets/pintester_icon.png'
import whatsapp_icon from '../Assets/whatsapp_icon.png'

export const Footer = () => {
    return (
        <div className='footer flex flex-col items-center gap-12'>
            <hr className='w-11/12 border-none rounded-md h-1 bg-gray-200 mx-auto' />
            <div className="footer-logo flex flex-col items-center gap-5">
            
                {/* Logo and Company Name - Centered on small screens */}
                <div className="nav-logo flex items-center gap-7 mx-auto md:mx-0">
                    <img src={logo} alt="Logo" />
                    <p className='text-slate-600 text-xl font-semibold'>DHANUSH E-COM</p>
                </div>
                <ul className='footer-links flex gap-10 md:gap-14 text-sm md:text-base text-gray-500'>
                    <li className='cursor-pointer'>Company</li>
                    <li className='cursor-pointer'>Products</li>
                    <li className='cursor-pointer'>Offices</li>
                    <li className='cursor-pointer'>Contact</li>
                </ul>

                <div className="footer-social-icons flex justify-center">
                    <div className="footer-icons-container p-3 pb-2 bg-white">
                        <img className='w-5' src={instagram_icon} alt="" />
                    </div>
                    <div className="footer-icons-container p-3 pb-2 bg-white">
                        <img className='w-5' src={pinterest_icon} alt="" />
                    </div>
                    <div className="footer-icons-container p-3 pb-2 bg-white">
                        <img className='w-5' src={whatsapp_icon} alt="" />
                    </div>
                </div>

                <div>
                    <div className="footer-copyright flex flex-col items-center gap-7 mb-7 text-gray-400 text-sm ">
                        <hr className='w-4/5 border-none rounded-md h-1 bg-gray-300' />
                        <p>Copyright@2023 - All Right Reserved</p>
                    </div>
                </div>


            </div>
        </div>
    )
}
