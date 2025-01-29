import React from "react";

function Logout() {
  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    sessionStorage.clear();
    window.location.href = "/";
  };
  return <div onClick={handleLogout}>Logout</div>;
}

export default Logout;
