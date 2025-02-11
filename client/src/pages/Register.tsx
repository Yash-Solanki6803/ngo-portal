import { useState, FormEvent, ChangeEvent } from "react";
import { AuthUserResponse, registerUser } from "../api/authservice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setUserInfo } from "../redux/slices/userSlice";
import { setNgoInfo } from "../redux/slices/ngoSlice";
import { getNgoById } from "../api/ngoService";

export const Register: React.FC = () => {
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response: AuthUserResponse = await registerUser(
        formData.name,
        formData.email,
        formData.password
      );
      console.log(response.data);
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
        if (ngoResponse.status !== 200 || !ngoResponse.data.ngo) {
          throw new Error(ngoResponse.data.message);
        }
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
};
