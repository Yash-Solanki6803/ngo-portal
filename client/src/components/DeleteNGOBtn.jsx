import { deleteNgo } from "../api/ngoService";

function DeleteNGOBtn() {
  const handleDelete = async () => {
    try {
      await deleteNgo();
      alert("NGO deleted successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to delete NGO");
    }
  };
  return <button onClick={handleDelete}>DeleteNGOBtn</button>;
}

export default DeleteNGOBtn;
