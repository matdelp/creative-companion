import React, { useEffect, useState } from "react";

export const ProfilePage: React.FC = () => {
  const [username, setUsername] = useState("");
  useEffect(() => {
    fetch("http://localhost:5000/artist/profile")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setUsername(data.username);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, []);
  return <div>Hello {username}</div>;
};
