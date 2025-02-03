import React from "react";

function Logout() {
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
}

export default Logout;
