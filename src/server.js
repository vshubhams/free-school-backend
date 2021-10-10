const express = require("express");
const connect = require("./config/db");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const { register, login } = require("./controllers/auth.controller");
const Msg = require("./models/msg.model");
const Chatroom = require("./models/chatroom.model");

const userController = require("./controllers/user.controller");
const classController = require("./controllers/class.controller");
const childrenController = require("./controllers/children.controller");
const chatroomController = require("./controllers/chatroom.controller");
const donatorController = require("./controllers/donator.controller");
const msgController = require("./controllers/msg.controller");
const paymentController = require("./controllers/payment.controller")

app.post("/register", register);
app.post("/login", login);

app.use("/users", userController);
app.use("/classes", classController);
app.use("/children", childrenController);
app.use("/chatroom", chatroomController);
app.use("/donator", donatorController);
app.use("/msg", msgController);
app.use("/payment", paymentController);

const port = process.env.PORT || 3001;
const server = app.listen(port, async function () {
  try {
    await connect();
    console.log(`Listen to port ${port}`);
  } catch (error) {
    console.log("error", error);
  }
});

const io = require("socket.io")(server);

let user = [];
const addUser = (userId, socketId) => {
  !user.some((user) => user.userId === userId) && user.push({ userId, socketId });
};

const removeAddedUser = (socketId) => {
  user = user.filter((u) => u.socketId !== socketId);
};

const getUser = (userId) => {
  console.log(user, "user");
  return user.find((u) => u.userId === userId);
};

io.on("connection", (socket) => {
  //connected
  console.log("a user connected");
  io.emit("welcome", "hello user from socket");

  // take userId and socket from user
  socket.on("addedUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", user);
  });

  //send Message and get message
  socket.on("sendMessage", ({ senderId, receiverId, text, currentChatroomId }) => {
    const userParticular = getUser(receiverId);
    console.log(userParticular, "parit");
    console.log(senderId, receiverId, text, currentChatroomId, "msg");
    io.emit("getMessage", {
      senderId,
      text,
    });
  });

  socket.on("class", ({ senderId, text, lectureDetail }) => {
    console.log(senderId, text);
    io.emit("notifyClass", {
      senderId,
      text,
      lectureDetail,
    });
  });

  //disconnected
  socket.on("disconnect", () => {
    console.log("user disconected");
    removeAddedUser(socket.id);
    io.emit("getUsers", user);
  });
});
