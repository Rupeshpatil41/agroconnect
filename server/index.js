const express =
  require("express");

const mongoose =
  require("mongoose");

const cors =
  require("cors");

const http =
  require("http");

const path =
  require("path");

const {
  Server,
} = require("socket.io");

const app = express();

const server =
  http.createServer(app);

// =====================================
// SOCKET IO
// =====================================
const io = new Server(
  server,
  {
    cors: {
      origin:
        "http://localhost:3000",

      methods: [
        "GET",
        "POST",
      ],
    },
  }
);

// =====================================
// MIDDLEWARE
// =====================================
app.use(cors());

app.use(express.json());

// =====================================
// STATIC UPLOADS
// =====================================
app.use(
  "/uploads",

  express.static(
    path.join(
      __dirname,
      "uploads"
    )
  )
);

// =====================================
// MONGODB
// =====================================
mongoose
  .connect(
    "mongodb+srv://Pandu:Rupesh123@cluster0.dms2z2i.mongodb.net/?appName=Cluster0"
  )
  .then(() => {

    console.log(
      "MongoDB Connected"
    );

  })
  .catch((err) => {

    console.log(err);
  });

// =====================================
// SOCKET CONNECTION
// =====================================
io.on(
  "connection",

  (socket) => {

    console.log(
      "User Connected"
    );

    // =====================================
    // REALTIME MESSAGE ONLY
    // =====================================
    socket.on(
      "sendMessage",

      async (data) => {

        try {

          console.log(
            "REALTIME MESSAGE:",
            data
          );

          // SEND TO ALL CLIENTS
          io.emit(
            "receiveMessage",

            {
              senderId:
                data.senderId,

              receiverId:
                data.receiverId,

              message:
                data.message,

              createdAt:
                new Date(),
            }
          );

        } catch (err) {

          console.log(
            "CHAT ERROR:",
            err
          );
        }
      }
    );

    // =====================================
    // DISCONNECT
    // =====================================
    socket.on(
      "disconnect",

      () => {

        console.log(
          "User Disconnected"
        );
      }
    );
  }
);

// =====================================
// MAKE IO AVAILABLE
// =====================================
app.set("io", io);

// =====================================
// ROUTES
// =====================================

// AUTH
app.use(
  "/api",
  require("./routes/auth")
);

// PROFILE
app.use(
  "/api",
  require("./routes/profile")
);

// PRODUCTS
app.use(
  "/api",
  require("./routes/product")
);

// ORDERS
app.use(
  "/api",
  require("./routes/order")
);

// USERS
app.use(
  "/api",
  require("./routes/user")
);

// CHAT
app.use(
  "/api",
  require("./routes/message")
);

// REVIEWS
app.use(
  "/api",
  require("./routes/review")
);

// NOTIFICATIONS
app.use(
  "/api",
  require("./routes/notification")
);

// CONTACT
app.use(
  "/api",
  require("./routes/contact")
);

// =====================================
// SERVER
// =====================================
app.get("/", (req, res) => {
  res.send("AgroConnect Backend Running ✅");
});
server.listen(
  5000,

  () => {

    console.log(
      "Server running on port 5000"
    );
  }
);