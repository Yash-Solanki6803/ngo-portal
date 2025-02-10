import { useState } from "react";
import { createCampaign } from "@/src/api/campaignService";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/src/components";
import { useNavigate } from "react-router";

function CreateCampaign() {
  const initialCampaignState = {
    name: "",
    description: "",
    location: "",
    startDate: "",
    endDate: "",
    status: "upcoming",
  };
  const [campaign, setCampaign] = useState(initialCampaignState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCampaign({ ...campaign, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(campaign);
    if (
      !campaign.name ||
      !campaign.description ||
      !campaign.location ||
      !campaign.startDate ||
      !campaign.endDate
    ) {
      setError("Please fill all the fields");
      setLoading(false);
      return;
    } else {
      try {
        const data = await createCampaign(campaign);
        console.log(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
        navigate("/dashboard");
      }
    }
  };

  return (
    <section className="w-full px-10 py-6 flex flex-col gap-6">
      <Card className="h-full shadow-2xl px-10 py-4">
        <form className=" h-full  flex flex-col ">
          <CardHeader className="flex-row justify-between border-b border-gray-400 relative">
            <h3 className="text-3xl font-semibold">Create Campaign</h3>
            <p className="text-red-500 text-lg absolute right-0 bottom-0">
              {error}
            </p>
          </CardHeader>
          <CardContent>
            <div className="w-full  py-4 flex flex-col gap-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={campaign.name}
                onChange={handleChange}
              />
            </div>
            <div className="w-full  py-4 flex flex-col gap-1.5">
              <Label htmlFor="description">Description</Label>
              <Textarea
                rows={10}
                id="description"
                name="description"
                value={campaign.description}
                onChange={handleChange}
              />
            </div>
            <div className="w-full  py-4 flex gap-1.5">
              <div className="w-1/2 flex flex-col gap-1.5">
                <Label htmlFor="location">Location</Label>
                <Input
                  type="text"
                  id="location"
                  name="location"
                  value={campaign.location}
                  onChange={handleChange}
                />
              </div>
              <div className="w-1/2 flex flex-col gap-1.5">
                <Label htmlFor="status">Status</Label>
                <Select
                  name="status"
                  onValueChange={(selection) => {
                    if (selection) {
                      handleChange({
                        target: { name: "status", value: selection },
                      });
                    }
                  }}
                  value={campaign.status}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="ongoing">Ongoing</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex  w-1/2">
              <div className="w-1/2 py-4 flex flex-col gap-1.5 ">
                <Label htmlFor="startDate">Start Date</Label>
                <DatePicker
                  name="startDate"
                  date={campaign.startDate}
                  setDate={handleChange}
                />
              </div>
              <div className="w-1/2  py-4 flex  flex-col gap-1.5">
                <Label htmlFor="endDate">End Date</Label>
                <DatePicker
                  name="endDate"
                  date={campaign.endDate}
                  setDate={handleChange}
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
              Create Campaign
            </Button>
          </CardFooter>
        </form>
      </Card>
    </section>
  );
}

export default CreateCampaign;
