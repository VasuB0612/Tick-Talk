const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();

const userRoutes = require("./Routes/userRoutes");
const chatRoutes = require("./Routes/chatRoutes");
const messageRoutes = require("./Routes/messageRoutes");

const port = process.env.PORT || 3000;
const uri = process.env.URI;

const cors = require("cors");
app.use(cors());

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(uri);
    console.log("Connection to database established successfully!");
  } catch (error) {
    console.error("Errow connecting: ", error.message);
  }
};

connectDB();

app.use(express.json());
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/messages", messageRoutes);

const server = app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: { origin: "http://localhost:3000" },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connection_setup");
  });
  socket.on("Join chat", (room) => {
    socket.join(room);
    console.log("User joined room: " + room);
  });

  socket.on("typing", (room) => {
    socket.in(room).emit("typing");
  });

  socket.on("stop typing", (room) => {
    socket.in(room).emit("not typing");
  });

  socket.on("message_sent", (data) => {
    var chat = data.chat;
    if (!chat.users) return console.log("users are not defined");
    chat.users.forEach((user) => {
      if (user._id === data.sender._id) return;
      socket.in(user._id).emit("Uusi viesti vastaanotettu", data);
    });
  });
});
