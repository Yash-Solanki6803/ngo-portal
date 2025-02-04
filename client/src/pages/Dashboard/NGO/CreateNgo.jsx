import { useState } from "react";
import { createNgo } from "../../../api/ngoService";
import { useSelector, useDispatch } from "react-redux";
import { setUserInfo } from "../../../redux/slices/userSlice";
import { setNgoInfo } from "../../../redux/slices/ngoSlice";

function CreateNgo() {
  const ngoInfo = useSelector((state) => state.ngo);
  const dispatch = useDispatch();
  const initialNgoState = {
    name: "",
    description: "",
    location: "",
    contactEmail: "",
    contactPhone: "",
    website: "",
  };
  const [ngo, setNgo] = useState(initialNgoState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setNgo({ ...ngo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(ngo);
    if (
      !ngo.name ||
      !ngo.description ||
      !ngo.location ||
      !ngo.contactEmail ||
      !ngo.contactPhone ||
      !ngo.website
    ) {
      setError("Please fill all the fields");
      setLoading(false);
      return;
    } else {
      try {
        const data = await createNgo(ngo);
        console.log("NGO data:", data.ngo);
        //Update the ngo state and user state in the redux store
        dispatch(setUserInfo(data.user));
        dispatch(setNgoInfo(data.ngo));
        console.log("Ngo in State", ngoInfo);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <section className="w-full px-10 py-6 flex flex-col gap-6">
      <div className="flex justify-between items-end">
        <h3 className="text-3xl font-semibold">Create NGO</h3>
        <p className="text-red-500 text-lg -mb-4">{error}</p>
      </div>
      <form className=" h-full bg-gray-200 shadow-xl rounded-xl px-10 py-4 flex flex-col items-end">
        <div className="w-full border-b py-4 flex  items-center">
          <label className="w-1/5 text-xl font-light" htmlFor="name">
            Name
          </label>
          <input
            className="px-6 py-2 w-4/5 text-xl font-light focus-within:outline-none rounded-md"
            type="text"
            id="name"
            name="name"
            value={ngo.name}
            onChange={handleChange}
          />
        </div>
        <div className="w-full border-b py-4 flex  items-start">
          <label className="w-1/5 text-xl font-light" htmlFor="description">
            Description
          </label>
          <textarea
            className="px-6 py-2 w-4/5 text-xl font-light focus-within:outline-none rounded-md"
            rows={10}
            id="description"
            name="description"
            value={ngo.description}
            onChange={handleChange}
          />
        </div>
        <div className="w-full border-b py-4 flex  items-center">
          <label className="w-1/5 text-xl font-light" htmlFor="location">
            Location
          </label>
          <input
            className="px-6 py-2 w-4/5 text-xl font-light focus-within:outline-none rounded-md"
            type="text"
            id="location"
            name="location"
            value={ngo.location}
            onChange={handleChange}
          />
        </div>
        <div className="flex  w-full border-b">
          <div className="w-1/2 py-4 flex items-center ">
            <label className="w-2/5 text-xl font-light" htmlFor="startDate">
              Email
            </label>
            <input
              className="px-6 py-2 w-3/5 text-xl font-light focus-within:outline-none rounded-md"
              type="email"
              id="contactEmail"
              name="contactEmail"
              value={ngo.contactEmail}
              onChange={handleChange}
            />
          </div>
          <div className="w-1/2  py-4 flex items-center">
            <label className="w-2/5 ml-10 text-xl font-light" htmlFor="endDate">
              Phone
            </label>
            <input
              className="px-6 py-2 w-3/5 text-xl font-light focus-within:outline-none rounded-md"
              type="text"
              id="contactPhone"
              name="contactPhone"
              value={ngo.contactPhone}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="w-full border-b py-4 flex  items-center">
          <label className="w-1/5 text-xl font-light" htmlFor="website">
            Website
          </label>
          <input
            className="px-6 py-2 w-4/5 text-xl font-light focus-within:outline-none rounded-md"
            type="text"
            id="website"
            name="website"
            value={ngo.website}
            onChange={handleChange}
          />
        </div>
        <button
          className="border bg-gray-900 text-white px-6 py-4 rounded-lg"
          type="submit"
          disabled={loading}
          onClick={handleSubmit}
        >
          Create NGO
        </button>
      </form>
    </section>
  );
}

export default CreateNgo;
