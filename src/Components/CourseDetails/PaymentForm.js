// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Header from '../Header/Header';
// import Footer from '../Footer/Footer';

// import gpay from './images/gpay.jpg';
// import phonepay from './images/phonepay.jpg';
// import paytm from './images/paytm.jpg';

// const PaymentForm = () => {
//   const [method, setMethod] = useState('card');
//   const [isPaid, setIsPaid] = useState(false);
//   const [selectedWallet, setSelectedWallet] = useState('gpay');
//   const [codEnabled, setCodEnabled] = useState(false);

//   const navigate = useNavigate();
//   const location = useLocation();
//   const courseId = location.state?.courseId;
//   const user = JSON.parse(localStorage.getItem('user'));

//   const handlePayment = async () => {
//     if (!user || !courseId) {
//       toast.error("User or Course information missing!");
//       return;
//     }

//     // try {
//     //   toast.success("✅ Payment successful!");
//     //   localStorage.setItem(`paid_${user.id}_${courseId}`, 'true');
//     //   navigate(`/CourseDetails/${courseId}`);
//     // } catch (err) {
//     //   toast.error("❌ Something went wrong");
//     // }
//     try {
//   toast.success("Payment successful!");
  
//   setTimeout(() => {
//     localStorage.setItem(`paid_${user.id}_${courseId}`, 'true');
//     navigate(`/CourseDetails/${courseId}`);
//   }, 2500); // 2.5 seconds delay
// } catch (err) {
//   toast.error(" Something went wrong");
// }

//   };

//   useEffect(() => {
//     const paid = localStorage.getItem(`paid_${courseId}`) === 'true';
//     setIsPaid(paid);
//   }, [courseId]);

//   return (
//     <>
//       <Header />
//       <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-lg border mb-6">
//         <ToastContainer position="top-right" />
//         <h2 className="text-2xl font-bold mb-4">Payment</h2>
//         <hr className="mb-6" />

//         <p className="text-sm font-semibold mb-2">Pay With:</p>
//         <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
//           {['card', 'bank', 'online', 'cod'].map((type) => (
//             <label key={type} className="flex items-center gap-2 cursor-pointer">
//               <input
//                 type="radio"
//                 value={type}
//                 checked={method === type}
//                 onChange={() => setMethod(type)}
//                 className=""
//               />
//               {type === 'cod' ? 'Cash on Delivery' : type.charAt(0).toUpperCase() + type.slice(1)}
//             </label>
//           ))}
//         </div>

//         {/* CARD */}
//         {method === 'card' && (
//           <div>
//             <div className="mb-4">
//               <label className="text-sm font-medium">Card Number</label>
//               <input type="text" className="w-full border px-4 py-2 rounded text-sm mt-1" placeholder="5399 0000 0000 0000" />
//             </div>
//             <div className="flex gap-4 mb-4">
//               <div className="w-1/2">
//                 <label className="text-sm font-medium">Expiration Date</label>
//                 <input type="text" placeholder="MM/YY" className="w-full border px-4 py-2 rounded text-sm mt-1" />
//               </div>
//               <div className="w-1/2">
//                 <label className="text-sm font-medium">CVV</label>
//                 <input type="password" placeholder="***" className="w-full border px-4 py-2 rounded text-sm mt-1" />
//               </div>
//             </div>
//             <div className="mb-6 flex items-center gap-2">
//               <input type="checkbox" id="save" className="" />
//               <label htmlFor="save" className="text-sm text-gray-700">Save card details</label>
//             </div>
//           </div>
//         )}

//         {/* BANK */}
//         {method === 'bank' && (
//           <div className="space-y-4 mb-6">
//             <input type="text" placeholder="Account Holder Name" className="w-full border px-4 py-2 rounded" />
//             <input type="text" placeholder="Bank Name" className="w-full border px-4 py-2 rounded" />
//             <input type="text" placeholder="Account Number" className="w-full border px-4 py-2 rounded" />
//             <input type="text" placeholder="IFSC Code" className="w-full border px-4 py-2 rounded" />
//           </div>
//         )}

//         {/* ONLINE */}
//         {method === 'online' && (
//           <div className="mb-6">
//             <p className="text-sm text-gray-700 mb-3">Choose Payment Option:</p>
//             <div className="flex flex-wrap gap-6 mb-4">
//               {[
//                 { value: 'gpay', label: 'GPay', logo: gpay },
//                 { value: 'phonepe', label: 'PhonePe', logo: phonepay },
//                 { value: 'paytm', label: 'Paytm', logo: paytm }
//               ].map((wallet) => (
//                 <label key={wallet.value} className="flex items-center gap-2 cursor-pointer">
//                   <input
//                     type="radio"
//                     name="wallet"
//                     value={wallet.value}
//                     checked={selectedWallet === wallet.value}
//                     onChange={() => setSelectedWallet(wallet.value)}
//                     className=""
//                   />
//                   <img src={wallet.logo} alt={wallet.label} className="w-10" />
//                   <span className="text-sm">{wallet.label}</span>
//                 </label>
//               ))}
//             </div>
//             <input
//               type="text"
//               placeholder={`Enter ${selectedWallet.toUpperCase()} ID`}
//               className="w-full border px-4 py-2 rounded"
//             />
//           </div>
//         )}

//         {/* COD */}
//         {method === 'cod' && (
//           <div className="mb-6">
//             <div className="flex items-center justify-between mb-3">
//               <label htmlFor="codToggle" className="text-sm font-medium text-gray-700">
//                 Enable Cash on Delivery
//               </label>
//               <label className="inline-flex items-center cursor-pointer">
//                 <input
//                   type="checkbox"
//                   id="codToggle"
//                   className="sr-only"
//                   checked={codEnabled}
//                   onChange={() => setCodEnabled(!codEnabled)}
//                 />
//                 <span className={`relative w-10 h-5 rounded-full transition-all duration-300 ${codEnabled ? 'bg-green-500' : 'bg-gray-300'}`} >
//                   <span
//                     className={`absolute left-0 top-0 h-5 w-5 bg-white rounded-full shadow-md transition-transform duration-300 ${
//                       codEnabled ? 'translate-x-5' : ''
//                     }`}
//                   ></span>
//                 </span>
//               </label>
//             </div>
//             {codEnabled && (
//               <p className="text-sm text-gray-700">
//                 You have selected <strong>Cash on Delivery</strong>. Please keep the exact amount ready at the time of delivery.
//               </p>
//             )}
//           </div>
//         )}

//         <button
//           className="w-full bg-green-500 hover:bg-green-600 text-white py-2 font-semibold rounded mb-3"
//           onClick={handlePayment}
//         >
//           Pay Now
//         </button>

//         <p className="text-xs text-gray-500 leading-snug">
//           Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.
//         </p>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default PaymentForm;

//api
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import gpay from './images/gpay.jpg';
import phonepay from './images/phonepay.jpg';
import paytm from './images/paytm.jpg';

const PaymentForm = () => {
  const [method, setMethod] = useState('card');
  const [selectedWallet, setSelectedWallet] = useState('gpay');
  const [codEnabled, setCodEnabled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const courseId = location.state?.courseId;
  const user = JSON.parse(localStorage.getItem('user'));
  const userName = `${user.firstName} ${user.lastName}`;
const courseTitle = location.state?.courseTitle;
const amount = location.state?.amount;

  const handlePayment = async () => {
    if (!user || !courseId) {
      toast.error("User or Course information missing!");
      return;
    }

    // let payload = {
    //   userId: user.id,
    //   courseId,
    //   method,
    // };
let payload = {
  userId: user.id,
  userName,
  courseId,
  courseTitle,
  amount,
  method,
};
    if (method === 'card') {
      const cardNumber = document.querySelector('input[placeholder="5399 0000 0000 0000"]').value;
      const expiryDate = document.querySelector('input[placeholder="MM/YY"]').value;
      const cvv = document.querySelector('input[placeholder="***"]').value;
      if (!cardNumber || !expiryDate || !cvv) {
        toast.error("Please fill all card details");
        return;
      }
      payload = { ...payload, cardNumber, expiryDate, cvv };
    }

    if (method === 'bank') {
      const accountHolderName = document.querySelector('input[placeholder="Account Holder Name"]').value;
      const bankName = document.querySelector('input[placeholder="Bank Name"]').value;
      const accountNumber = document.querySelector('input[placeholder="Account Number"]').value;
      const ifscCode = document.querySelector('input[placeholder="IFSC Code"]').value;
      if (!accountHolderName || !bankName || !accountNumber || !ifscCode) {
        toast.error("Please fill all bank details");
        return;
      }
      payload = { ...payload, accountHolderName, bankName, accountNumber, ifscCode };
    }

    if (method === 'online') {
      const walletId = document.querySelector('input[placeholder^="Enter"]').value;
      if (!walletId) {
        toast.error("Please enter Wallet ID");
        return;
      }
      payload = { ...payload, walletType: selectedWallet, walletId };
    }

    if (method === 'cod') {
      if (!codEnabled) {
        toast.error("Please enable Cash on Delivery");
        return;
      }
      payload = { ...payload, isCodEnabled: true };
    }

    try {
      const res = await axios.post("http://localhost:5000/api/payment", payload);
      if (res.status === 201) {
        //  localStorage.setItem(`paid_${user.id}_${courseId}`, 'true');
        toast.success("✅ Payment successful!");
        setTimeout(() => {
          localStorage.setItem(`paid_${user.id}_${courseId}`, 'true');
          navigate(`/CourseDetails/${courseId}`);
        }, 1500);
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("❌ Payment failed");
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-lg border mb-6">
        <ToastContainer position="top-right" />
        <h2 className="text-2xl font-bold mb-4">Payment</h2>
        <hr className="mb-6" />

        <p className="text-sm font-semibold mb-2">Pay With:</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {['card', 'bank', 'online', 'cod'].map((type) => (
            <label key={type} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value={type}
                checked={method === type}
                onChange={() => setMethod(type)}
              />
              {type === 'cod' ? 'Cash on Delivery' : type.charAt(0).toUpperCase() + type.slice(1)}
            </label>
          ))}
        </div>

        {/* CARD */}
        {method === 'card' && (
          <div>
            <div className="mb-4">
              <label className="text-sm font-medium">Card Number</label>
              <input type="text" className="w-full border px-4 py-2 rounded text-sm mt-1" placeholder="5399 0000 0000 0000" />
            </div>
            <div className="flex gap-4 mb-4">
              <div className="w-1/2">
                <label className="text-sm font-medium">Expiration Date</label>
                <input type="text" placeholder="MM/YY" className="w-full border px-4 py-2 rounded text-sm mt-1" />
              </div>
              <div className="w-1/2">
                <label className="text-sm font-medium">CVV</label>
                <input type="password" placeholder="***" className="w-full border px-4 py-2 rounded text-sm mt-1" />
              </div>
            </div>
            <div className="mb-6 flex items-center gap-2">
              <input type="checkbox" id="save" />
              <label htmlFor="save" className="text-sm text-gray-700">Save card details</label>
            </div>
          </div>
        )}

        {/* BANK */}
        {method === 'bank' && (
          <div className="space-y-4 mb-6">
            <input type="text" placeholder="Account Holder Name" className="w-full border px-4 py-2 rounded" />
            <input type="text" placeholder="Bank Name" className="w-full border px-4 py-2 rounded" />
            <input type="text" placeholder="Account Number" className="w-full border px-4 py-2 rounded" />
            <input type="text" placeholder="IFSC Code" className="w-full border px-4 py-2 rounded" />
          </div>
        )}

        {/* ONLINE */}
        {method === 'online' && (
          <div className="mb-6">
            <p className="text-sm text-gray-700 mb-3">Choose Payment Option:</p>
            <div className="flex flex-wrap gap-6 mb-4">
              {[{ value: 'gpay', label: 'GPay', logo: gpay },
                { value: 'phonepe', label: 'PhonePe', logo: phonepay },
                { value: 'paytm', label: 'Paytm', logo: paytm }
              ].map((wallet) => (
                <label key={wallet.value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="wallet"
                    value={wallet.value}
                    checked={selectedWallet === wallet.value}
                    onChange={() => setSelectedWallet(wallet.value)}
                  />
                  <img src={wallet.logo} alt={wallet.label} className="w-10" />
                  <span className="text-sm">{wallet.label}</span>
                </label>
              ))}
            </div>
            <input
              type="text"
              placeholder={`Enter ${selectedWallet.toUpperCase()} ID`}
              className="w-full border px-4 py-2 rounded"
            />
          </div>
        )}

        {/* COD */}
        {method === 'cod' && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <label htmlFor="codToggle" className="text-sm font-medium text-gray-700">
                Enable Cash on Delivery
              </label>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  id="codToggle"
                  className="sr-only"
                  checked={codEnabled}
                  onChange={() => setCodEnabled(!codEnabled)}
                />
                <span className={`relative w-10 h-5 rounded-full transition-all duration-300 ${codEnabled ? 'bg-green-500' : 'bg-gray-300'}`} >
                  <span
                    className={`absolute left-0 top-0 h-5 w-5 bg-white rounded-full shadow-md transition-transform duration-300 ${
                      codEnabled ? 'translate-x-5' : ''
                    }`}
                  ></span>
                </span>
              </label>
            </div>
            {codEnabled && (
              <p className="text-sm text-gray-700">
                You have selected <strong>Cash on Delivery</strong>. Please keep the exact amount ready at the time of delivery.
              </p>
            )}
          </div>
        )}

        <button
          className="w-full bg-green-500 hover:bg-green-600 text-white py-2 font-semibold rounded mb-3"
          onClick={handlePayment}
        >
          Pay Now
        </button>

        <p className="text-xs text-gray-500 leading-snug">
          Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.
        </p>
      </div>
      <Footer />
    </>
  );
};

export default PaymentForm;



