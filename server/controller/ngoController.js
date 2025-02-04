import { Ngo, User } from "../models/index.js";

export const createNgo = async (req, res) => {
  try {
    const { name, description, location, contactEmail, contactPhone, website } =
      req.body;

    if (!name || !contactEmail) {
      throw new Error("Please fill in all required fields");
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
    user.role = "ngo";
    user.ngoId = ngo._id;
    await user.save();

    res
      .status(201)
      .json({ message: "Ngo created successfully", ngo: ngo, user: user });
  } catch (err) {
    res.status(500).json({ message: err.message || "Server error" });
  }
};

export const deleteNgo = async (req, res) => {
  try {
    const { ngoId } = req.params;
    const ngo = await Ngo.findById(ngoId);
    if (!ngo) {
      throw new Error("Ngo not found");
    }
    if (
      ngo.createdBy.toString() !== req.user._id.toString() &&
      req.user.role !== "dev"
    ) {
      throw new Error("You are not authorized to delete this ngo");
    }
    await Ngo.findByIdAndDelete(ngoId);
    // Update the user's role to "volunteer"
    const user = await User.findById(req.user._id);
    user.role = "volunteer";
    user.ngoId = null;
    await user.save();

    res.status(200).json({ message: "Ngo deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message || "Server error" });
  }
};

export const updateNgo = async (req, res) => {
  try {
    const { ngoId } = req.params;
    const ngo = await Ngo.findById(ngoId);
    if (!ngo) {
      throw new Error("Ngo not found");
    }
    if (
      ngo.createdBy.toString() !== req.user._id.toString() &&
      req.user.role !== "dev"
    ) {
      throw new Error("You are not authorized to update this ngo");
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
  } catch (err) {
    res.status(500).json({ message: err.message || "Server error" });
  }
};

export const getAllNgos = async (req, res) => {
  try {
    const ngos = await Ngo.find();
    res.status(200).json({ ngos: ngos });
  } catch (err) {
    res.status(500).json({ message: err.message || "Server error" });
  }
};

export const getNgoById = async (req, res) => {
  try {
    const { ngoId } = req.params;
    const ngo = await Ngo.findById(ngoId).populate("createdBy");
    if (!ngo) {
      throw new Error("Ngo not found");
    }
    res.status(200).json({ ngo: ngo });
  } catch (err) {
    res.status(500).json({ message: err.message || "Server error" });
  }
};
