import { deleteNgo } from "../api/ngoService";
import { clearNgoInfo } from "../redux/slices/ngoSlice";
import { clearUserInfo } from "../redux/slices/userSlice";
import { useSelector, useDispatch } from "react-redux";

function DeleteNGOBtn() {
  const ngoId = useSelector((state) => state.ngo._id);
  const dispatch = useDispatch();
  const handleDelete = async () => {
    try {
      const data = await deleteNgo(ngoId);
      console.log("deletedBtn:", data);
      sessionStorage.clear();
      dispatch(clearNgoInfo());
      dispatch(clearUserInfo());
    } catch (error) {
      console.error(error);
    }
  };
  return <button onClick={handleDelete}>DeleteNGOBtn</button>;
}

export default DeleteNGOBtn;
