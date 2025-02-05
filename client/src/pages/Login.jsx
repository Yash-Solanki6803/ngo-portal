import { useState } from "react";
import { loginUser } from "../api/authservice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { setUserInfo } from "../redux/slices/userSlice";
import { getNgoById } from "../api/ngoService";
import { setNgoInfo } from "../redux/slices/ngoSlice";

function Login() {
  const initialFormValues = {
    email: "",
    password: "",
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [formData, setFormData] = useState(initialFormValues);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const data = await loginUser(formData.email, formData.password);
      // Store token or redirect
      localStorage.setItem("auth_token", data.token);
      dispatch(setUserInfo(data.userWithoutPassword));
      if (data.userWithoutPassword.ngoId) {
        const ngoData = await getNgoById(data.userWithoutPassword.ngoId);
        dispatch(setNgoInfo(ngoData.ngo));
      }
      navigate("/");
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
        <h2 className="text-2xl font-bold mb-4">Login</h2>

        {error && <div className="text-red-500">{error}</div>}

        <input
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 mb-4 w-full"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="border p-2 mb-4 w-full"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 text-white p-2 rounded w-full"
        >
          {isLoading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;
