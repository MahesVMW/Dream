import React from 'react';

const Profile = () => {
  const userName = localStorage.getItem('userName') || 'Guest'; // Default to 'Guest' if name is not set
  const userEmail = localStorage.getItem('userEmail') || 'Not Available'; // Default if email is not set

  return (
    <div>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores illo fuga ratione adipisci ex perspiciatis iusto omnis nisi in id reiciendis, ipsa non, quidem eius fugiat exercitationem ullam tenetur. Voluptatum.</p>
      <h1>Welcome, {userName}!</h1>
      <p>Email: {userEmail}</p>
    </div>
  );
};

export default Profile;
