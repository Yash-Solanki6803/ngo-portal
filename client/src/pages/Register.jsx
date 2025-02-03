import { useState } from "react";
import { registerUser } from "../api/authservice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { setUserInfo } from "../redux/slices/userSlice";

function Register() {
  const initialFormValues = {
    name: "",
    email: "",
    password: "",
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialFormValues);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await registerUser(
        formData.name,
        formData.email,
        formData.password
      );
      if (response.status == 201) {
        alert("User registered! Please login with your credentials");
        navigate("/login");
      } else {
      }
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="p-6 rounded shadow-md bg-white w-80"
      >
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        {error && <div className="text-red-500">{error}</div>}

        <input
          type="name"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 mb-4 w-full"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 mb-4 w-full"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="border p-2 mb-4 w-full"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 text-white p-2 rounded w-full"
        >
          {isLoading ? "Loading..." : "Register"}
        </button>
      </form>
    </div>
  );
}

export default Register;
