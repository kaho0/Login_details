import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err.message));

const app = express();
app.use(cors());
app.use(express.json());

// Route for root path
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define User Schema
const userSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  name: String,
  phone: String,
  company: String,
  isAgency: Boolean,
  description: String,
  email: String,
  updatedAt: Date,
});

const User = mongoose.model("User", userSchema);

// Route to get user profile
app.get("/user/:uid", async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.params.uid });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to update user profile
app.post("/user/update", async (req, res) => {
  try {
    const { uid, name, phone, company, isAgency, description, email } =
      req.body;
    const updatedUser = await User.findOneAndUpdate(
      { uid },
      {
        name,
        phone,
        company,
        isAgency,
        description,
        email,
        updatedAt: new Date(),
      },
      { new: true, upsert: true }
    );
    res.json({ message: "Profile updated successfully!", user: updatedUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
