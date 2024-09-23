const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Note = require("./models/Note");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection string
const mongoURI =
  "mongodb+srv://adnan:adnan@cluster0.fhwdeyh.mongodb.net/noteApp?retryWrites=true&w=majority";

mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Socket.IO real-time communication
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Broadcast note updates
  socket.on("noteUpdated", (note) => {
    io.emit("noteUpdated", note);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Create or Update Note
app.post("/note", async (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  try {
    let note = await Note.findOne({ title });

    if (note) {
      note.description = description;
      await note.save();
      io.emit("noteUpdated", note); // Emit update event
      return res.status(200).json({ message: "Updated successfully", note });
    } else {
      note = new Note({ title, description });
      await note.save();
      io.emit("noteCreated", note); // Emit creation event
      return res.status(201).json({ message: "Created successfully", note });
    }
  } catch (err) {
    console.error("Error saving note:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

// Get Note by Title
app.get("/note/:title", async (req, res) => {
  const { title } = req.params;

  try {
    const note = await Note.findOne({ title });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    return res.status(200).json(note);
  } catch (err) {
    console.error("Error fetching note:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
http.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
