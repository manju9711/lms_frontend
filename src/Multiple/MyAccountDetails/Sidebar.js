import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ selected, setSelected }) => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUsername(user.username || `${user.firstName} ${user.lastName}`);
    }
  }, []);

  const handleClick = (item) => {
    if (item === 'Logout') {
      // ✅ Clear token and user info
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      // ✅ Redirect to login page
      navigate('/LoginForm');
    } else {
      setSelected(item);
    }
  };

  const menu = [
    'Dashboard',
    'My Profile',
    'Enrolled Courses',
    'Reviews',
    'Settings',
    'Logout',
  ];

  return (
    <div className="w-64 bg-white border-r min-h-screen p-4">
      <div className="text-center mb-8">
        <div className="w-24 h-24 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto">
          {username ? username[0].toUpperCase() : 'U'}
        </div>
        <p className="mt-2 text-gray-800 font-semibold">Hello,</p>
        <p className="text-blue-600 font-semibold">{username || 'User'}</p>
      </div>

      <ul>
        {menu.map((item) => (
          <li
            key={item}
            onClick={() => handleClick(item)}
            className={`cursor-pointer flex items-center gap-2 py-2 px-3 rounded hover:bg-blue-100 transition mb-4  ${
              selected === item ? 'bg-blue-600 text-white' : 'text-gray-700'
            }`}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
