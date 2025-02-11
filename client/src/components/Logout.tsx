import React from "react";

export const Logout: React.FC = () => {
  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    sessionStorage.clear();
    window.location.href = "/";
  };
  return (
    <div className="cursor-pointer" onClick={handleLogout}>
      Logout
    </div>
  );
};
