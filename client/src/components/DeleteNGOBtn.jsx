import { Button } from "@/components/ui/button";
import { deleteNgo } from "../api/ngoService";
import { clearNgoInfo } from "../redux/slices/ngoSlice";
import { clearUserInfo } from "../redux/slices/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router";

function DeleteNGOBtn() {
  const ngoId = useSelector((state) => state.ngo._id);
  const dispatch = useDispatch();
  const navigate = Navigate();
  const handleDelete = async () => {
    try {
      const data = await deleteNgo(ngoId);
      console.log("deletedBtn:", data);
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
}

export default DeleteNGOBtn;
