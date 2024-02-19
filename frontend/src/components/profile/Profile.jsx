import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const user = await axios.get("http://localhost:3310/api/user/profile", {
        withCredentials: true,
      });
      setUser(user.data);
    };
    getUser();
  }, []);

  return (
    user && (
      <div>
        <h1>Profile</h1>
        <h3>{user.name}</h3>
        <p>{user.email}</p>
      </div>
    )
  );
}
