// import React from 'react';


// const Profile = () => {
//   return (
//     <>
//     <div className="p-10 min-h-screen bg-gray-50 flex flex-col justify-between">
//             <div>
             
//     <div className="p-6">
//   <h2 className="text-xl font-semibold mb-4">My Profile</h2>
//   <div className="flex flex-col gap-6 ml-4">
//     <p><span className="font-semibold inline-block w-40">Registration Date:</span> June 4, 2025 7:09 AM</p>
//     <p><span className="font-semibold inline-block w-40">First Name:</span> magi</p>
//     <p><span className="font-semibold inline-block w-40">Last Name:</span> j</p>
//     <p><span className="font-semibold inline-block w-40">Username:</span> magi</p>
//     <p><span className="font-semibold inline-block w-40">Email:</span> manjusivacj@gmail.com</p>
//     <p><span className="font-semibold inline-block w-40">Phone Number:</span> 7373869011</p>
//   </div>
// </div>

//     </div>
//     </div>
//     </>
//   );
// };

// export default Profile;
import React, { useEffect, useState } from 'react';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [registeredDate, setRegisteredDate] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');  // Must match key in login
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      if (parsedUser.createdAt) {
        const date = new Date(parsedUser.createdAt).toLocaleDateString();
        setRegisteredDate(date);
      }
    }
  }, []);

  return (
    <div className="p-10 min-h-screen bg-gray-50 flex flex-col justify-between">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">My Profile</h2>

        {user ? (
          <div className="flex flex-col gap-6 ml-4">
            <p>
              <span className="font-semibold inline-block w-40">Registered On:</span> {registeredDate}
            </p>
            <p>
              <span className="font-semibold inline-block w-40">First Name:</span> {user.firstName}
            </p>
            <p>
              <span className="font-semibold inline-block w-40">Last Name:</span> {user.lastName}
            </p>
            <p>
              <span className="font-semibold inline-block w-40">Username:</span> {user.username}
            </p>
            <p>
              <span className="font-semibold inline-block w-40">Email:</span> {user.email}
            </p>
            <p>
              <span className="font-semibold inline-block w-40">Phone Number:</span> Not Provided
            </p>
          </div>
        ) : (
          <p className="text-gray-600">Loading user data...</p>
        )}
      </div>
    </div>
  );
};

export default Profile;

