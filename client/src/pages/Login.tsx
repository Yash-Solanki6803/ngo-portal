import { useState, ChangeEvent, FormEvent } from "react";
import { loginUser, AuthUserResponse } from "../api/authservice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { setUserInfo } from "../redux/slices/userSlice";
import { getNgoById } from "../api/ngoService";
import { setNgoInfo } from "../redux/slices/ngoSlice";
import { AppDispatch, RootState } from "../redux/store";
import { APIResponse } from "../types/api";

function Login() {
  const initialFormValues = {
    email: "",
    password: "",
  };
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(initialFormValues);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response: AuthUserResponse = await loginUser(
        formData.email,
        formData.password
      );
      // Store token or redirect
      if (
        response.status !== 200 ||
        !response.data.token ||
        !response.data.user
      ) {
        throw new Error(response.data.message);
      }
      localStorage.setItem("auth_token", response.data.token);
      dispatch(setUserInfo(response.data.user));

      if (response.data.user.ngoId) {
        const ngoResponse = await getNgoById(response.data.user.ngoId);
        dispatch(setNgoInfo(ngoResponse.data.ngo));
      }
      navigate("/");
    } catch (err: any) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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
