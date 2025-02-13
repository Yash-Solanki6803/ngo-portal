import { Outlet, Link, useNavigate } from "react-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserFromToken } from "../api/authservice";
import { getNgoById } from "../api/ngoService";
import { setUserInfo } from "../redux/slices/userSlice";
import { setNgoInfo } from "../redux/slices/ngoSlice";
import { Logout, CustomAvatar } from "@/components";
import { AppDispatch, RootState } from "../redux/store";
import { AxiosError } from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CustomNavbar } from "../components/CustomNavbar";

export const HomeLayout: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const token = localStorage.getItem("auth_token");
  useEffect(() => {
    const fetchData = async () => {
      if (!isLoggedIn && token) {
        try {
          const response = await fetchUserFromToken();

          if (response.status !== 200 || !response.data.user) {
            throw new Error("User not found");
          }

          dispatch(setUserInfo(response.data.user));
          if (response.data.user.ngoId) {
            const ngoResponse = await getNgoById(response.data.user.ngoId);
            if (ngoResponse.status === 200 && ngoResponse.data.ngo)
              dispatch(setNgoInfo(ngoResponse.data.ngo));
          }
          //set data to redux store
        } catch (error: AxiosError | any) {
          if (error.response.data.message === "Token has expired") {
            localStorage.removeItem("auth_token");
            navigate("/login");
            return;
          }
          console.error("Error fetching user from token:", error);
        }
      }
    };

    fetchData();
  }, []);

  return (
    <main className="h-screen w-screen flex flex-col ">
      <CustomNavbar isLoggedIn={isLoggedIn} />
      <Outlet />
    </main>
  );
};
