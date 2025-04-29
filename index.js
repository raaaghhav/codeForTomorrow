const express = require("express");
const bodyParser = require("body-parser");
const { Server } = require("socket.io");
const session = require("express-session");
const { createServer } = require("node:http");
const app = express();
const httpServer = createServer(app);

const sessionMiddleware = session({
  secret: "changeit",
  resave: true,
  saveUninitialized: true,
});

app.use(sessionMiddleware);
app.use(bodyParser.json({ type: "application/json" }));

const io = new Server(httpServer);
app.use("/", require("./routes/router"));

io.engine.use(sessionMiddleware);

io.on("connection", (socket) => {
  const session = socket.request.session;
  console.log(session, ">>>>>>>>>>>>>>session");
});

app.listen(5000, () => {
  console.log("server is running on the port 5000");
});
