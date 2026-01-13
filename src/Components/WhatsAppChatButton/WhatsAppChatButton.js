import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const WhatsAppChatButton = () => {
  const [showPopup, setShowPopup] = useState(false);
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
  console.log("Logged in user (from localStorage):", user);

  const navigate = useNavigate();

  const handleClick = () => {
    if (!token || !user) {
      setShowPopup(!showPopup);
      return;
    }

    // const adminNumber = '917373869011';
    // const message = `Hi Admin, I am ${user.username}. I need help regarding the LMS platform.`;
    // const whatsappURL = `https://wa.me/${adminNumber}?text=${encodeURIComponent(message)}`;
    // window.open(whatsappURL, '_blank');
    const adminNumber = '918012612933';
const message = `Hi Admin, I am ${user.username}. I need help regarding the LMS platform. Time: ${new Date().toLocaleTimeString()}`;
const whatsappURL = `https://wa.me/${adminNumber}?text=${encodeURIComponent(message)}`;
window.open(whatsappURL, '_blank');

  };

  const handleLoginRedirect = () => {
    setShowPopup(false);
    navigate('/LoginForm');
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {/* Login popup */}
        {showPopup && (
          <div className="bg-white rounded-2xl shadow-xl w-80 p-6 border border-gray-200 animate-fadeIn">
            <p className="text-gray-700 text-base font-medium mb-6 text-center">
              You are not logged in,<br /> please login first
            </p>
            <div className="flex justify-center">
              <button
                onClick={handleLoginRedirect}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-2 rounded-full transition-all duration-300 shadow-md text-sm font-semibold"
              >
                CLICK HERE TO LOGIN
              </button>
            </div>
          </div>
        )}

        {/* WhatsApp Button */}
        {/* <button
          onClick={handleClick}
          className="w-14 h-14 bg-[#25D366] hover:bg-[#1EBE5D] text-white flex items-center justify-center rounded-full shadow-lg transition-transform duration-300 hover:scale-110"
          title="Chat with Admin"
        >
         
          <svg viewBox="0 0 32 32" width="28" height="28" fill="currentColor">
            <path d="M16.001 2.001a14 14 0 0 0-12.177 20.95l-1.417 5.188a1 1 0 0 0 1.217 1.217l5.188-1.417A14 14 0 1 0 16.001 2.001zm0 2a12 12 0 1 1-6.211 22.286 1.001 1.001 0 0 0-.74-.088l-3.956 1.082 1.05-3.844a1 1 0 0 0-.087-.74A12 12 0 0 1 16 4.001zm-3.5 6.999c-.297 0-.623.016-.993.325-.37.31-1.232 1.168-1.232 2.872s1.262 3.926 1.486 4.33c.223.404 2.456 3.805 6.014 3.805s5.296-2.205 5.595-3.172c.3-.967.349-1.601.019-1.786s-2.09-.996-2.412-1.11c-.322-.114-.557-.174-.776.173-.22.347-.894 1.112-1.094 1.336-.2.224-.4.253-.74.075-.339-.178-1.431-.558-2.728-1.776-1.002-.897-1.679-2.008-1.877-2.367s-.021-.542.16-.743c.18-.2.408-.47.615-.708.207-.239.275-.401.41-.667.137-.266.069-.504-.034-.698-.102-.194-.919-2.177-1.24-2.812-.321-.635-.662-.721-1.02-.721z"/>
          </svg>
        </button> */}
        <button
          onClick={handleClick}
          className="w-14 h-14 bg-[#25D366] hover:bg-[#1EBE5D] text-white flex items-center justify-center rounded-full shadow-lg transition-transform duration-300 animate-bounce hover:scale-110 "
          title="Chat with Admin"
        >
         
          <i className="fa fa-whatsapp" aria-hidden="true" style={{fontSize:'30px'}}></i>
        </button>
      </div>
    </>
  );
};

export default WhatsAppChatButton;





