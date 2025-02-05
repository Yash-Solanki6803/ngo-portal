import { useState } from "react";
import { createNgo } from "../../../api/ngoService";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../../../redux/slices/userSlice";
import { setNgoInfo } from "../../../redux/slices/ngoSlice";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Navigate } from "react-router";

function CreateNgo() {
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
  const navigate = Navigate();

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
        //Update the ngo state and user state in the redux store
        dispatch(setUserInfo(data.user));
        dispatch(setNgoInfo(data.ngo));
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
        setNgo(initialNgoState);
        navigate("/dashboard");
      }
    }
  };

  return (
    <section className="w-full  overflow-hidden px-10 py-6 flex flex-col gap-6">
      <Card className="h-full shadow-2xl px-10 py-4">
        <form className=" h-full  flex flex-col ">
          <CardHeader className="flex-row justify-between border-b border-gray-400 relative">
            <h3 className="text-3xl font-semibold">Create NGO</h3>
            <p className="text-red-500 text-lg absolute right-0 bottom-0">
              {error}
            </p>
          </CardHeader>
          <CardContent>
            <div className="w-full  py-4 flex flex-col gap-1.5">
              <Label htmlFor="name">Name your NGO</Label>
              <Input
                name="name"
                value={ngo.name}
                onChange={handleChange}
                id="name"
                placeholder="eg. Holding Hands"
              />
            </div>
            <div className="w-full  py-4 flex flex-col gap-1.5">
              <Label htmlFor="description">Description</Label>
              {/* <textarea
                className="px-6 py-2 w-4/5 text-xl font-light focus-within:outline-none rounded-md"
                rows={10}
                id="description"
                name="description"
                value={ngo.description}
                onChange={handleChange}
              /> */}
              <Textarea
                rows={10}
                id="description"
                name="description"
                value={ngo.description}
                onChange={handleChange}
                placeholder="Tell us about your NGO"
              />
            </div>

            <div className="w-full  py-4 flex  gap-20">
              <div className="flex flex-col w-1/2 gap-1.5">
                <Label htmlFor="location">Location</Label>
                <Input
                  type="text"
                  id="location"
                  name="location"
                  value={ngo.location}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col w-1/2 gap-1.5">
                <Label htmlFor="contactEmail">Email</Label>
                <Input
                  type="email"
                  id="contactEmail"
                  name="contactEmail"
                  value={ngo.contactEmail}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="w-full  py-4 flex  gap-20">
              <div className="flex flex-col w-1/2 gap-1.5">
                <Label htmlFor="contactPhone">Phone</Label>
                <Input
                  type="number"
                  maxLength="10"
                  id="contactPhone"
                  name="contactPhone"
                  value={ngo.contactPhone}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col w-1/2 gap-1.5">
                <Label htmlFor="website">Website</Label>
                <Input
                  type="text"
                  id="website"
                  name="website"
                  value={ngo.website}
                  onChange={handleChange}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t border-gray-400 h-full">
            <Button
              className="border bg-gray-900 text-white px-6 py-4 rounded-lg"
              type="submit"
              disabled={loading}
              onClick={handleSubmit}
            >
              Create NGO
            </Button>
          </CardFooter>
        </form>
      </Card>
    </section>
  );
}

export default CreateNgo;
