import { Request, Response } from "express";
import { Ngo } from "../models/Ngo";
import { User } from "../models/User";

interface CreateNgoInterface extends Request {
  body: {
    name: string;
    description: string;
    location: string;
    contactEmail: string;
    contactPhone: string;
    website: string;
  };
}

interface DeleteNgoInterface extends Request {
  params: {
    ngoId: string;
  };
}

interface GetNgoByIdInterface extends Request {
  params: {
    ngoId: string;
  };
}

interface UpdateNgoInterface extends Request {
  params: {
    ngoId: string;
  };
  body: {
    name: string;
    description: string;
    location: string;
    contactEmail: string;
    contactPhone: string;
    website: string;
  };
}

export const createNgo = async (req: CreateNgoInterface, res: Response) => {
  try {
    const { name, description, location, contactEmail, contactPhone, website } =
      req.body;

    if (!name || !contactEmail) {
      res.status(400).json({ message: "Name and contact email are required" });
      return;
    }

    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const ngo = new Ngo({
      name,
      description: description || "",
      location: location || "",
      contactEmail,
      contactPhone: contactPhone || "",
      website: website || "",
      createdBy: req.user._id,
    });

    await ngo.save();

    //Update the user's role to "ngo" and associate the ngo with the user
    const user = await User.findById(req.user._id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    user.role = "ngo";
    user.ngoId = ngo._id;
    await user.save();

    res
      .status(201)
      .json({ message: "Ngo created successfully", ngo: ngo, user: user });
  } catch (err: any) {
    res.status(500).json({ message: err.message || "Server error" });
  }
};

export const deleteNgo = async (req: DeleteNgoInterface, res: Response) => {
  try {
    const { ngoId } = req.params;
    const ngo = await Ngo.findById(ngoId);
    if (!ngo) {
      res.status(404).json({ message: "Ngo not found" });
      return;
    }

    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    if (
      ngo.createdBy.toString() !== req.user._id.toString() &&
      req.user.role !== "dev"
    ) {
      res
        .status(403)
        .json({ message: "You are not authorized to delete this ngo" });
      return;
    }
    await Ngo.findByIdAndDelete(ngoId);
    // Update the user's role to "volunteer"
    const user = await User.findById(req.user._id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    user.role = "volunteer";
    user.ngoId = null;
    await user.save();

    res.status(200).json({ message: "Ngo deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ message: err.message || "Server error" });
  }
};

export const updateNgo = async (req: UpdateNgoInterface, res: Response) => {
  try {
    const { ngoId } = req.params;
    const ngo = await Ngo.findById(ngoId);
    if (!ngo) {
      res.status(404).json({ message: "Ngo not found" });
      return;
    }
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    if (
      ngo.createdBy.toString() !== req.user._id.toString() &&
      req.user.role !== "dev"
    ) {
      res
        .status(403)
        .json({ message: "You are not authorized to update this ngo" });
      return;
    }

    const { name, description, location, contactEmail, contactPhone, website } =
      req.body;

    ngo.name = name || ngo.name;
    ngo.description = description || ngo.description;
    ngo.location = location || ngo.location;
    ngo.contactEmail = contactEmail || ngo.contactEmail;
    ngo.contactPhone = contactPhone || ngo.contactPhone;
    ngo.website = website || ngo.website;

    await ngo.save();

    res.status(200).json({ message: "Ngo updated successfully", ngo: ngo });
  } catch (err: any) {
    res.status(500).json({ message: err.message || "Server error" });
  }
};

export const getAllNgos = async (req: Request, res: Response) => {
  try {
    const ngos = await Ngo.find();
    res.status(200).json({ ngos: ngos });
  } catch (err: any) {
    res.status(500).json({ message: err.message || "Server error" });
  }
};

export const getNgoById = async (req: GetNgoByIdInterface, res: Response) => {
  try {
    const { ngoId } = req.params;
    const ngo = await Ngo.findById(ngoId).populate("createdBy");
    if (!ngo) {
      res.status(404).json({ message: "Ngo not found" });
      return;
    }
    res.status(200).json({ ngo: ngo });
  } catch (err: any) {
    res.status(500).json({ message: err.message || "Server error" });
  }
};
