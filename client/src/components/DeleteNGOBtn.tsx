import { Button } from "@/components/ui/button";
import { deleteNgo } from "../api/ngoService";
import { clearNgoInfo } from "@/redux/slices/ngoSlice";
import { clearUserInfo } from "@/redux/slices/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { RootState } from "@/redux/store";
import React from "react";

export const DeleteNGOBtn: React.FC = () => {
  const ngoId = useSelector((state: RootState) => state.ngo.ngoInfo?._id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const data = await deleteNgo(ngoId);
      sessionStorage.clear();
      dispatch(clearNgoInfo());
      dispatch(clearUserInfo());
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Button className="bg-red-600 hover:bg-red-700" onClick={handleDelete}>
      Delete NGO
    </Button>
  );
};
