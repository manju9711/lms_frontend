// import React, { useState, useEffect } from 'react';
// import { FaCamera } from 'react-icons/fa';
// import axios from 'axios';

// const Settings = () => {
  
//   const [activeTab, setActiveTab] = useState('profile');
//   const [userData, setUserData] = useState({});
//   const [form, setForm] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//   });

// const [passwordForm, setPasswordForm] = useState({
//   currentPassword: '',
//   newPassword: '',
//   confirmPassword: '',
// });

// const [showPassword, setShowPassword] = useState({
//   current: false,
//   new: false,
//   confirm: false,
// });

// const [passwordErrors, setPasswordErrors] = useState({
//   currentPassword: '',
//   newPassword: '',
//   confirmPassword: '',
// });

// const [socialForm, setSocialForm] = useState({
//   facebook: '',
//   twitter: '',
//   linkedin: '',
//   website: '',
//   github: '',
// });


// const validateField = (name, value) => {
//   let error = '';

//   if (!value) {
//     error = 'This field is required';
//   } else {
//     if (name === 'newPassword' && value.length < 6) {
//       error = 'Password must be at least 6 characters';
//     }
//     if (name === 'confirmPassword' && value !== passwordForm.newPassword) {
//       error = 'Passwords do not match';
//     }
//   }

//   setPasswordErrors((prev) => ({ ...prev, [name]: error }));
// };


// const handlePasswordInputChange = (e) => {
//   const { name, value } = e.target;
//   setPasswordForm((prev) => ({ ...prev, [name]: value }));
// };

// // const handlePasswordReset = async (e) => {
// //   e.preventDefault();

// //   const { currentPassword, newPassword, confirmPassword } = passwordForm;

// //   if (newPassword !== confirmPassword) {
// //     alert('New passwords do not match ❌');
// //     return;
// //   }

// //   try {
// //     const res = await axios.patch(`http://localhost:5000/api/auth/change-password/${userData.id}`, {
// //       currentPassword,
// //       newPassword,
// //     });

// //     alert(res.data.message || 'Password changed successfully ✅');

// //     // Clear form
// //     setPasswordForm({
// //       currentPassword: '',
// //       newPassword: '',
// //       confirmPassword: '',
// //     });
// //   } catch (error) {
// //     alert(error.response?.data?.message || 'Password update failed ❌');
// //     console.error(error);
// //   }
// // };



//   // Load user data from localStorage
//   const handlePasswordReset = async (e) => {
//   e.preventDefault();

//   const errors = {};

//   if (!passwordForm.currentPassword) {
//     errors.currentPassword = 'Current password is required';
//   }
//   if (!passwordForm.newPassword || passwordForm.newPassword.length < 6) {
//     errors.newPassword = 'New password must be at least 6 characters';
//   }
//   if (passwordForm.confirmPassword !== passwordForm.newPassword) {
//     errors.confirmPassword = 'Passwords do not match';
//   }

//   setPasswordErrors(errors);

//   if (Object.keys(errors).length > 0) {
//     return;
//   }

//   try {
//     const res = await axios.patch(
//       `http://localhost:5000/api/auth/change-password/${userData.id}`,
//       {
//         currentPassword: passwordForm.currentPassword,
//         newPassword: passwordForm.newPassword,
//       }
//     );
//     alert(res.data.message || 'Password changed successfully ✅');

//     setPasswordForm({
//       currentPassword: '',
//       newPassword: '',
//       confirmPassword: '',
//     });
//     setPasswordErrors({});
//   } catch (error) {
//     alert(error.response?.data?.message || 'Password update failed ❌');
//     console.error(error);
//   }
// };

//   // useEffect(() => {
//   //   const storedUser = JSON.parse(localStorage.getItem('user'));
//   //   if (storedUser) {
//   //     setUserData(storedUser);
//   //     setForm({
//   //       firstName: storedUser.firstName || '',
//   //       lastName: storedUser.lastName || '',
//   //       email: storedUser.email || '',
//   //     });
//   //   }
//   // }, []);
// useEffect(() => {
//   const storedUser = JSON.parse(localStorage.getItem('user'));

//   if (storedUser) {
//     setUserData(storedUser);
//     setForm({
//       firstName: storedUser.firstName || '',
//       lastName: storedUser.lastName || '',
//       email: storedUser.email || '',
//     });

//     // 🔁 Load social profile from backend
//     axios
//       .get(`http://localhost:5000/api/socialprofile/${storedUser.id}`)
//       .then((res) => {
//         const socialData = {};
//         res.data.forEach((item) => {
//           const key = item.platform.toLowerCase(); // Facebook -> facebook
//           socialData[key] = item.url;
//         });
//         setSocialForm(socialData); // ⬅️ sets state for all fields
//       })
//       .catch((err) => {
//         console.error('Failed to load social profiles', err);
//       });
//   }
// }, []);


// const handleSocialChange = (e) => {
//   const { name, value } = e.target;
//   setSocialForm((prev) => ({ ...prev, [name]: value }));
// };


// const handleSocialSubmit = async (e) => {
//   e.preventDefault();

//   try {
//     const profiles = Object.entries(socialForm).map(([platform, url]) => ({
//       platform: platform.charAt(0).toUpperCase() + platform.slice(1),
//       url,
//     }));

//     await axios.post('http://localhost:5000/api/socialprofile', {
//       userId: userData.id,
//       profiles,
//     });

//     alert('Social profiles updated successfully ✅');
//   } catch (error) {
//     console.error(error);
//     alert('Failed to update social profiles ❌');
//   }
// };



//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.patch(`http://localhost:5000/api/auth/update/${userData.id}`, form);
//       alert('Profile updated successfully ✅');

//       // Update localStorage
//       localStorage.setItem('user', JSON.stringify(res.data.user));
//       setUserData(res.data.user);
//     } catch (error) {
//       alert('Profile update failed ❌');
//       console.error(error);
//     }
//   };

//   return (
//     <div className="p-6 max-w-5xl mx-auto">
//       <h2 className="text-xl font-semibold mb-4">Settings</h2>

//       {/* Tabs */}
//       <div className="flex gap-6 border-b mb-6">
//         {['profile', 'password', 'social'].map((tab) => (
//           <button
//             key={tab}
//             onClick={() => setActiveTab(tab)}
//             className={`pb-2 ${
//               activeTab === tab
//                 ? 'border-b-2 border-blue-600 text-blue-600 font-medium'
//                 : 'text-gray-500'
//             }`}
//           >
//             {tab === 'profile' && 'Profile'}
//             {tab === 'password' && 'Password'}
//             {tab === 'social' && 'Social Profile'}
//           </button>
//         ))}
//       </div>

//       {/* Profile Tab */}
//       {activeTab === 'profile' && (
//         <>
//           {/* Cover Photo */}
//           <div className="relative w-full h-52 bg-purple-700 rounded-lg overflow-hidden">
//             <img
//               src="https://www.transparenttextures.com/patterns/cubes.png"
//               alt="Cover"
//               className="object-cover w-full h-full"
//             />
//             <div className="absolute bottom-4 right-4">
//               <button className="bg-blue-600 text-white text-sm px-4 py-1 rounded hover:bg-blue-700">
//                 Upload Cover Photo
//               </button>
//             </div>

//             {/* Profile Photo */}
//             <div className="absolute left-6 -bottom-1">
//               <div className="relative w-24 h-24 rounded-full bg-gray-200 border-4 border-white">
//                 <FaCamera className="absolute inset-0 m-auto text-gray-500 text-xl" />
//               </div>
//             </div>
//           </div>

//           {/* Photo Size Info */}
//           <div className="flex justify-between text-xs text-gray-500 mt-14 mb-6 px-1">
//             <p>
//               Profile Photo Size: <b>200x200</b> pixels
//             </p>
//             <p>
//               Cover Photo Size: <b>700x430</b> pixels
//             </p>
//           </div>

//           {/* Profile Form */}
//           <form className="space-y-4" onSubmit={handleUpdate}>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block font-medium mb-1">First Name</label>
//                 <input
//                   type="text"
//                   name="firstName"
//                   value={form.firstName}
//                   onChange={handleChange}
//                   className="border w-full px-3 py-2 rounded"
//                 />
//               </div>
//               <div>
//                 <label className="block font-medium mb-1">Last Name</label>
//                 <input
//                   type="text"
//                   name="lastName"
//                   value={form.lastName}
//                   onChange={handleChange}
//                   className="border w-full px-3 py-2 rounded"
//                 />
//               </div>
//               <div>
//                 <label className="block font-medium mb-1">User Name</label>
//                 <input
//                   type="text"
//                   value={userData.username || ''}
//                   className="border w-full px-3 py-2 rounded bg-gray-100"
//                   disabled
//                 />
//               </div>
//               {/* <div>
//                 <label className="block font-medium mb-1">Phone Number</label>
//                 <input
//                   type="text"
//                   placeholder="Phone Number"
//                   className="border w-full px-3 py-2 rounded"
//                 />
//               </div> */}
//               <div>
//                 <label className="block font-medium mb-1">E-Mail</label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={form.email}
//                   onChange={handleChange}
//                   className="border w-full px-3 py-2 rounded"
//                 />
//               </div>
//             </div>

//             {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block font-medium mb-1">E-Mail</label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={form.email}
//                   onChange={handleChange}
//                   className="border w-full px-3 py-2 rounded"
//                 />
//               </div>
//               <div>
//                 <label className="block font-medium mb-1">Skill/Occupation</label>
//                 <input
//                   type="text"
//                   placeholder="UX Designer"
//                   className="border w-full px-3 py-2 rounded"
//                 />
//               </div>
//             </div> */}

//             {/* <div>
//               <label className="block font-medium mb-1">Bio</label>
//               <textarea
//                 rows="4"
//                 className="w-full border px-3 py-2 rounded"
//                 placeholder="Type your bio here..."
//               ></textarea>
//             </div> */}

//             <div>
//               <label className="block font-medium mb-1">Display name publicly as</label>
//               <select className="border w-full px-3 py-2 rounded">
//                 <option>
//                   {form.firstName && form.lastName
//                     ? `${form.firstName} ${form.lastName}`
//                     : 'Choose name'}
//                 </option>
//               </select>
//               <p className="text-xs text-gray-500 mt-1">
//                 The display name is shown in all public fields, such as the author name,
//                 instructor name, student name, and will be printed on the certificate.
//               </p>
//             </div>

//             <div>
//               <button
//                 type="submit"
//                 className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
//               >
//                 UPDATE PROFILE
//               </button>
//             </div>
//           </form>
//         </>
//       )}

//       {/* Password Tab */}
//       {activeTab === 'password' && (
//         // <form className="space-y-6 max-w-xl mt-6">
//         //   <div>
//         //     <label className="block font-medium mb-1">Current Password</label>
//         //     <input
//         //       type="password"
//         //       placeholder="Current Password"
//         //       className="border w-full px-3 py-2 rounded"
//         //     />
//         //   </div>
//         //   <div>
//         //     <label className="block font-medium mb-1">New Password</label>
//         //     <input
//         //       type="password"
//         //       placeholder="Type Password"
//         //       className="border w-full px-3 py-2 rounded"
//         //     />
//         //   </div>
//         //   <div>
//         //     <label className="block font-medium mb-1">Re-type New Password</label>
//         //     <input
//         //       type="password"
//         //       placeholder="Type Password"
//         //       className="border w-full px-3 py-2 rounded"
//         //     />
//         //   </div>
//         //   <button
//         //     type="submit"
//         //     className="bg-blue-800 hover:bg-blue-900 text-white px-6 py-2 rounded font-semibold tracking-wider"
//         //   >
//         //     RESET PASSWORD
//         //   </button>
//         // </form>
//      <form className="space-y-6 max-w-xl mt-6" onSubmit={handlePasswordReset}>
//   {[
//     { label: 'Current Password', name: 'currentPassword', toggleKey: 'current' },
//     { label: 'New Password', name: 'newPassword', toggleKey: 'new' },
//     { label: 'Re-type New Password', name: 'confirmPassword', toggleKey: 'confirm' },
//   ].map(({ label, name, toggleKey }) => (
//     <div key={name} className="relative">
//       <label className="block font-medium mb-1">{label}</label>
//       <input
//         type={showPassword[toggleKey] ? 'text' : 'password'}
//         name={name}
//         value={passwordForm[name]}
//         onChange={handlePasswordInputChange}
//         onBlur={(e) => validateField(name, e.target.value)}
//         className={`border w-full px-3 py-2 rounded ${
//           passwordErrors[name] ? 'border-red-500' : ''
//         }`}
//       />
//       <button
//         type="button"
//         className="absolute right-3 top-8 text-sm text-blue-600"
//         onClick={() =>
//           setShowPassword((prev) => ({ ...prev, [toggleKey]: !prev[toggleKey] }))
//         }
//       >
//         {showPassword[toggleKey] ? 'Hide' : 'Show'}
//       </button>
//       {passwordErrors[name] && (
//         <p className="text-sm text-red-600 mt-1">{passwordErrors[name]}</p>
//       )}
//     </div>
//   ))}

//   <button
//     type="submit"
//     className="bg-blue-800 hover:bg-blue-900 text-white px-6 py-2 rounded font-semibold tracking-wider"
//   >
//     RESET PASSWORD
//   </button>
// </form>


//       )}

//       {/* Social Tab */}
//       {/* {activeTab === 'social' && (
//         <form className="space-y-6 max-w-2xl mt-6">
//           <div>
//             <label className="block font-medium mb-4 text-gray-700">Social Profile Link</label>
//             {[
//               { label: 'Facebook', icon: 'fab fa-facebook-f', placeholder: 'https://facebook.com/username' },
//               { label: 'Twitter', icon: 'fab fa-twitter', placeholder: 'https://twitter.com/username' },
//               { label: 'Linkedin', icon: 'fab fa-linkedin-in', placeholder: 'https://linkedin.com/username' },
//               { label: 'Website', icon: 'fas fa-globe', placeholder: 'https://example.com' },
//               { label: 'Github', icon: 'fab fa-github', placeholder: 'https://github.com/username' },
//             ].map((social, idx) => (
//               <div key={idx} className="flex items-center gap-4 mb-8">
//                 <i className={`${social.icon} w-6 text-gray-700 text-lg`}></i>
//                 <span className="w-24">{social.label}</span>
//                 <input
//                   type="text"
//                   placeholder={social.placeholder}
//                   className="flex-1 border px-3 py-2 rounded w-full"
//                 />
//               </div>
//             ))}
//           </div>

//           <button
//             type="submit"
//             className="bg-blue-800 hover:bg-blue-900 text-white px-6 py-2 rounded font-semibold tracking-wider"
//           >
//             UPDATE PROFILE
//           </button>
//         </form>
//       )} */}
//       {activeTab === 'social' && (
//   <form className="space-y-6 max-w-2xl mt-6" onSubmit={handleSocialSubmit}>
//     <div>
//       <label className="block font-medium mb-4 text-gray-700">Social Profile Link</label>
//       {/* {[
//         { label: 'Facebook', icon: 'fab fa-facebook-f', name: 'facebook', placeholder: 'https://facebook.com/username' },
//         { label: 'Twitter', icon: 'fab fa-twitter', name: 'twitter', placeholder: 'https://twitter.com/username' },
//         { label: 'Linkedin', icon: 'fab fa-linkedin-in', name: 'linkedin', placeholder: 'https://linkedin.com/in/username' },
//         { label: 'Website', icon: 'fas fa-globe', name: 'website', placeholder: 'https://example.com' },
//         { label: 'Github', icon: 'fab fa-github', name: 'github', placeholder: 'https://github.com/username' },
//       ].map((social, idx) => (
//         <div key={idx} className="flex items-center gap-4 mb-8">
//           <i className={`${social.icon} w-6 text-gray-700 text-lg`}></i>
//           <span className="w-24">{social.label}</span>
//           <input
//             type="text"
//             name={social.name}
//             value={socialForm[social.name]}
//             onChange={handleSocialChange}
//             placeholder={social.placeholder}
//             className="flex-1 border px-3 py-2 rounded w-full"
//           />
//         </div>
//       ))} */}
//       {[
//   { label: 'Facebook', icon: 'fab fa-facebook-f', name: 'facebook', placeholder: 'https://facebook.com/username' },
//   { label: 'Twitter', icon: 'fab fa-twitter', name: 'twitter', placeholder: 'https://twitter.com/username' },
//   { label: 'Linkedin', icon: 'fab fa-linkedin-in', name: 'linkedin', placeholder: 'https://linkedin.com/in/username' },
//   { label: 'Website', icon: 'fas fa-globe', name: 'website', placeholder: 'https://example.com' },
//   { label: 'Github', icon: 'fab fa-github', name: 'github', placeholder: 'https://github.com/username' },
// ].map((social, idx) => (
//   <div key={idx} className="flex items-center gap-4 mb-8">
//     <i className={`${social.icon} w-6 text-gray-700 text-lg`}></i>
//     <span className="w-24">{social.label}</span>
//     <input
//       type="text"
//       name={social.name}
//       value={socialForm[social.name] || ''}
//       onChange={(e) =>
//         setSocialForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
//       }
//       placeholder={social.placeholder}
//       className="flex-1 border px-3 py-2 rounded w-full"
//     />
//   </div>
// ))}

//     </div>

//     <button
//       type="submit"
//       className="bg-blue-800 hover:bg-blue-900 text-white px-6 py-2 rounded font-semibold tracking-wider"
//     >
//       UPDATE PROFILE
//     </button>
//   </form>
// )}

//     </div>
//   );
// };

// export default Settings;
import React, { useState, useEffect } from 'react';
import { FaCamera } from 'react-icons/fa';
import axios from 'axios';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [userData, setUserData] = useState({});
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [passwordErrors, setPasswordErrors] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [socialForm, setSocialForm] = useState({
    facebook: '',
    twitter: '',
    linkedin: '',
    website: '',
    github: '',
  });

  const validateField = (name, value) => {
    let error = '';
    if (!value) {
      error = 'This field is required';
    } else {
      if (name === 'newPassword' && value.length < 6) {
        error = 'Password must be at least 6 characters';
      }
      if (name === 'confirmPassword' && value !== passwordForm.newPassword) {
        error = 'Passwords do not match';
      }
    }
    setPasswordErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    const errors = {};
    if (!passwordForm.currentPassword) {
      errors.currentPassword = 'Current password is required';
    }
    if (!passwordForm.newPassword || passwordForm.newPassword.length < 6) {
      errors.newPassword = 'New password must be at least 6 characters';
    }
    if (passwordForm.confirmPassword !== passwordForm.newPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setPasswordErrors(errors);
    if (Object.keys(errors).length > 0) return;

    try {
      const res = await axios.patch(
        `http://localhost:5000/api/auth/change-password/${userData.id}`,
        {
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        }
      );
      alert(res.data.message || 'Password changed successfully ✅');
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      setPasswordErrors({});
    } catch (error) {
      alert(error.response?.data?.message || 'Password update failed ❌');
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(
        `http://localhost:5000/api/auth/update/${userData.id}`,
        form
      );
      alert('Profile updated successfully ✅');
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setUserData(res.data.user);
    } catch (error) {
      alert('Profile update failed ❌');
      console.error(error);
    }
  };

  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setSocialForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSocialSubmit = async (e) => {
    e.preventDefault();
    try {
      const profiles = Object.entries(socialForm).map(([platform, url]) => ({
        platform: platform.charAt(0).toUpperCase() + platform.slice(1),
        url,
      }));

      // await axios.post('http://localhost:5000/api/socialprofile', {
      //   userId: userData.id,
      //   profiles,
      // });

      await axios.post('http://localhost:5000/api/socialprofile', {
  userId: userData.id,
  profiles: Object.entries(socialForm).map(([platform, url]) => ({
    platform: platform.charAt(0).toUpperCase() + platform.slice(1),
    url,
  })),
});

      alert('Social profiles updated successfully ✅');
    } catch (error) {
      console.error(error);
      alert('Failed to update social profiles ❌');
    }
  };

 useEffect(() => {
  const storedUser = JSON.parse(localStorage.getItem('user'));

  if (storedUser) {
    setUserData(storedUser);
    setForm({
      firstName: storedUser.firstName || '',
      lastName: storedUser.lastName || '',
      email: storedUser.email || '',
    });

    axios
      .get(`http://localhost:5000/api/socialprofile/${storedUser.id}`)
      .then((res) => {
        const socialData = {};
        // ✅ Fix: Use res.data.profiles
        res.data.profiles.forEach((item) => {
          const key = item.platform.toLowerCase(); // e.g. "facebook"
          socialData[key] = item.url;
        });
        setSocialForm(socialData);
      })
      .catch((err) => {
        console.error('Failed to load social profiles', err);
      });
  }
}, []);


  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Settings</h2>

      {/* Tabs */}
      <div className="flex gap-6 border-b mb-6">
        {['profile', 'password', 'social'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 ${
              activeTab === tab
                ? 'border-b-2 border-blue-600 text-blue-600 font-medium'
                : 'text-gray-500'
            }`}
          >
            {tab === 'profile' && 'Profile'}
            {tab === 'password' && 'Password'}
            {/* {tab === 'social' && 'Social Profile'} */}
          </button>
        ))}
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <>
          <div className="relative w-full h-52 bg-purple-700 rounded-lg overflow-hidden">
            <img
              src="https://www.transparenttextures.com/patterns/cubes.png"
              alt="Cover"
              className="object-cover w-full h-full"
            />
            <div className="absolute bottom-4 right-4">
              <button className="bg-blue-600 text-white text-sm px-4 py-1 rounded hover:bg-blue-700">
                Upload Cover Photo
              </button>
            </div>
            <div className="absolute left-6 -bottom-1">
              <div className="relative w-24 h-24 rounded-full bg-gray-200 border-4 border-white">
                <FaCamera className="absolute inset-0 m-auto text-gray-500 text-xl" />
              </div>
            </div>
          </div>

          <form className="space-y-4 mt-14" onSubmit={handleUpdate}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-1">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  className="border w-full px-3 py-2 rounded"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  className="border w-full px-3 py-2 rounded"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">User Name</label>
                <input
                  type="text"
                  value={userData.username || ''}
                  disabled
                  className="border w-full px-3 py-2 rounded bg-gray-100"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">E-Mail</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="border w-full px-3 py-2 rounded"
                />
              </div>
            </div>

            <div>
              <label className="block font-medium mb-1">Display name publicly as</label>
              <select className="border w-full px-3 py-2 rounded">
                <option>
                  {form.firstName && form.lastName
                    ? `${form.firstName} ${form.lastName}`
                    : 'Choose name'}
                </option>
              </select>
            </div>

            <div>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
              >
                UPDATE PROFILE
              </button>
            </div>
          </form>
        </>
      )}

      {/* Password Tab */}
      {activeTab === 'password' && (
        <form className="space-y-6 max-w-xl mt-6" onSubmit={handlePasswordReset}>
          {[
            { label: 'Current Password', name: 'currentPassword', toggleKey: 'current' },
            { label: 'New Password', name: 'newPassword', toggleKey: 'new' },
            { label: 'Re-type New Password', name: 'confirmPassword', toggleKey: 'confirm' },
          ].map(({ label, name, toggleKey }) => (
            <div key={name} className="relative">
              <label className="block font-medium mb-1">{label}</label>
              <input
                type={showPassword[toggleKey] ? 'text' : 'password'}
                name={name}
                value={passwordForm[name]}
                onChange={handlePasswordInputChange}
                onBlur={(e) => validateField(name, e.target.value)}
                className={`border w-full px-3 py-2 rounded ${
                  passwordErrors[name] ? 'border-red-500' : ''
                }`}
              />
              <button
                type="button"
                className="absolute right-3 top-8 text-sm text-blue-600"
                onClick={() =>
                  setShowPassword((prev) => ({ ...prev, [toggleKey]: !prev[toggleKey] }))
                }
              >
                {showPassword[toggleKey] ? 'Hide' : 'Show'}
              </button>
              {passwordErrors[name] && (
                <p className="text-sm text-red-600 mt-1">{passwordErrors[name]}</p>
              )}
            </div>
          ))}

          <button
            type="submit"
            className="bg-blue-800 hover:bg-blue-900 text-white px-6 py-2 rounded font-semibold tracking-wider"
          >
            RESET PASSWORD
          </button>
        </form>
      )}

      {/* Social Tab */}
      {activeTab === 'social' && (
        <form className="space-y-6 max-w-2xl mt-6" onSubmit={handleSocialSubmit}>
          <div>
            <label className="block font-medium mb-4 text-gray-700">Social Profile Link</label>
            {[
              { label: 'Facebook', icon: 'fab fa-facebook-f', name: 'facebook', placeholder: 'https://facebook.com/username' },
              { label: 'Twitter', icon: 'fab fa-twitter', name: 'twitter', placeholder: 'https://twitter.com/username' },
              { label: 'Linkedin', icon: 'fab fa-linkedin-in', name: 'linkedin', placeholder: 'https://linkedin.com/in/username' },
              { label: 'Website', icon: 'fas fa-globe', name: 'website', placeholder: 'https://example.com' },
              { label: 'Github', icon: 'fab fa-github', name: 'github', placeholder: 'https://github.com/username' },
            ].map((social, idx) => (
              <div key={idx} className="flex items-center gap-4 mb-8">
                <i className={`${social.icon} w-6 text-gray-700 text-lg`}></i>
                <span className="w-24">{social.label}</span>
                <input
                  type="text"
                  name={social.name}
                  value={socialForm[social.name] || ''}
                  onChange={handleSocialChange}
                  placeholder={social.placeholder}
                  className="flex-1 border px-3 py-2 rounded w-full"
                />
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="bg-blue-800 hover:bg-blue-900 text-white px-6 py-2 rounded font-semibold tracking-wider"
          >
            UPDATE PROFILE
          </button>
        </form>
      )}
    </div>
  );
};

export default Settings;
