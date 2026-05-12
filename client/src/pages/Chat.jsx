// client/src/pages/Chat.jsx

import {
  useEffect,
  useRef,
  useState,
} from "react";

import axios from "axios";

import { io } from "socket.io-client";

import Sidebar from "../components/Sidebar";

import "../pages/styles.css";

const socket =
  io("https://agroconnect-1-hyi3.onrender.com");

function Chat() {

  const senderId =
    localStorage.getItem(
      "userId"
    );

  const role =
    localStorage.getItem(
      "role"
    );

  const [
    users,
    setUsers,
  ] = useState([]);

  const [
    selectedUser,
    setSelectedUser,
  ] = useState(null);

  const [
    message,
    setMessage,
  ] = useState("");

  const [
    messages,
    setMessages,
  ] = useState([]);

  const messagesEndRef =
    useRef(null);

  // =====================================
  // AUTO SCROLL
  // =====================================
  useEffect(() => {

    messagesEndRef.current?.scrollIntoView({
      behavior:
        "smooth",
    });

  }, [messages]);

  // =====================================
  // LOAD USERS
  // =====================================
  useEffect(() => {

    fetchUsers();

  }, []);

  const fetchUsers =
    async () => {

      try {

        const res =
          await axios.get(
            "https://agroconnect-1-hyi3.onrender.com/api/all-users"
          );

        let filtered =
          res.data.filter(
            (u) =>
              u._id !== senderId
          );

        // FARMER → COMPANY
        if (
          role === "farmer"
        ) {

          filtered =
            filtered.filter(
              (u) =>
                u.role ===
                "company"
            );
        }

        // COMPANY → FARMER
        if (
          role === "company"
        ) {

          filtered =
            filtered.filter(
              (u) =>
                u.role ===
                "farmer"
            );
        }

        // RECENT FIRST
        const sortedUsers =
          filtered.sort(
            (a, b) => {

              const aTime =
                a.updatedAt
                  ? new Date(
                      a.updatedAt
                    ).getTime()
                  : 0;

              const bTime =
                b.updatedAt
                  ? new Date(
                      b.updatedAt
                    ).getTime()
                  : 0;

              return (
                bTime - aTime
              );
            }
          );

        setUsers(
          sortedUsers
        );

      } catch (err) {

        console.log(err);
      }
    };

  // =====================================
  // RECEIVE MESSAGE
  // =====================================
  useEffect(() => {

    socket.on(
      "receiveMessage",

      (data) => {

        // REALTIME CHAT UPDATE
        if (
          selectedUser &&
          (
            (
              data.senderId ===
              senderId &&

              data.receiverId ===
              selectedUser._id
            ) ||

            (
              data.senderId ===
              selectedUser._id &&

              data.receiverId ===
              senderId
            )
          )
        ) {

          setMessages(
            (prev) => [
              ...prev,
              data,
            ]
          );
        }

        // MOVE ACTIVE CHAT TO TOP
        setUsers((prev) => {

          const targetUserId =
            data.senderId ===
            senderId
              ? data.receiverId
              : data.senderId;

          const targetUser =
            prev.find(
              (u) =>
                u._id ===
                targetUserId
            );

          if (!targetUser)
            return prev;

          const others =
            prev.filter(
              (u) =>
                u._id !==
                targetUserId
            );

          return [
            targetUser,
            ...others,
          ];
        });
      }
    );

    return () => {

      socket.off(
        "receiveMessage"
      );
    };

  }, [
    selectedUser,
    senderId,
  ]);

  // =====================================
  // OPEN CHAT
  // =====================================
  const openChat =
    async (user) => {

      setSelectedUser(
        user
      );

      try {

        const res =
          await axios.get(
            `https://agroconnect-1-hyi3.onrender.com/api/messages/${senderId}/${user._id}`
          );

        setMessages(
          res.data
        );

      } catch (err) {

        console.log(err);
      }
    };

  // =====================================
  // SEND MESSAGE
  // =====================================
  const sendMessage =
    async () => {

      try {

        if (
          !message.trim() ||
          !selectedUser
        ) {

          return;
        }

        const data = {
          senderId,

          receiverId:
            selectedUser._id,

          message,
        };

        // SAVE TO DATABASE
        await axios.post(
          "https://agroconnect-1-hyi3.onrender.com/api/messages",

          data
        );

        // SOCKET SEND
        socket.emit(
          "sendMessage",
          data
        );

        // MOVE USER TO TOP
        setUsers((prev) => {

          const updated =
            prev.filter(
              (u) =>
                u._id !==
                selectedUser._id
            );

          return [
            selectedUser,
            ...updated,
          ];
        });

        setMessage("");

      } catch (err) {

        console.log(
          "SEND ERROR:",
          err
        );
      }
    };

  return (
    <div
      style={{
        display: "flex",
      }}
    >

      <Sidebar />

      <div
        style={{
          marginLeft:
            "250px",

          width:
            "100%",

          height:
            "100vh",

          background:
            "#f5f7fb",

          padding:
            "25px",

          display:
            "flex",

          gap: "24px",

          boxSizing:
            "border-box",
        }}
      >

        {/* USERS */}
        <div
          style={{
            width:
              "340px",

            background:
              "white",

            borderRadius:
              "28px",

            padding:
              "24px",

            display:
              "flex",

            flexDirection:
              "column",

            boxShadow:
              "0 10px 25px rgba(0,0,0,0.06)",
          }}
        >

          <div
            style={{
              marginBottom:
                "24px",
            }}
          >

            <h1
              style={{
                fontSize:
                  "36px",

                marginBottom:
                  "8px",
              }}
            >
              💬 Chats
            </h1>

            <p
              style={{
                color:
                  "#666",

                fontSize:
                  "15px",
              }}
            >
              Connect with users
            </p>

          </div>

          <div
            style={{
              overflowY:
                "auto",

              flex: 1,
            }}
          >

            {users.map(
              (u) => (

                <div
                  key={u._id}

                  onClick={() =>
                    openChat(
                      u
                    )
                  }

                  style={{
                    display:
                      "flex",

                    alignItems:
                      "center",

                    gap: "15px",

                    padding:
                      "16px",

                    borderRadius:
                      "18px",

                    cursor:
                      "pointer",

                    marginBottom:
                      "14px",

                    background:
                      selectedUser?._id ===
                      u._id
                        ? "#dcfce7"
                        : "#f8fafc",

                    border:
                      selectedUser?._id ===
                      u._id
                        ? "2px solid #16a34a"
                        : "2px solid transparent",
                  }}
                >

                  <img
                    src={
                      u.image ||
                      "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    }

                    alt="user"

                    style={{
                      width:
                        "62px",

                      height:
                        "62px",

                      borderRadius:
                        "50%",

                      objectFit:
                        "cover",

                      border:
                        "2px solid #16a34a",
                    }}
                  />

                  <div>

                    <h3
                      style={{
                        margin:
                          0,

                        marginBottom:
                          "6px",
                      }}
                    >
                      {u.name}
                    </h3>

                    <p
                      style={{
                        margin: 0,

                        color:
                          "#666",

                        textTransform:
                          "capitalize",
                      }}
                    >
                      {u.role}
                    </p>

                  </div>

                </div>
              )
            )}

          </div>

        </div>

        {/* CHAT AREA */}
        <div
          style={{
            flex: 1,

            background:
              "white",

            borderRadius:
              "28px",

            display:
              "flex",

            flexDirection:
              "column",

            overflow:
              "hidden",

            boxShadow:
              "0 10px 25px rgba(0,0,0,0.06)",
          }}
        >

          {selectedUser ? (
            <>
              {/* HEADER */}
              <div
                style={{
                  padding:
                    "22px 30px",

                  display:
                    "flex",

                  alignItems:
                    "center",

                  gap: "16px",

                  background:
                    "#16a34a",

                  color:
                    "white",
                }}
              >

                <img
                  src={
                    selectedUser.image ||
                    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }

                  alt="user"

                  style={{
                    width:
                      "72px",

                    height:
                      "72px",

                    borderRadius:
                      "50%",

                    objectFit:
                      "cover",
                  }}
                />

                <div>

                  <h2>
                    {
                      selectedUser.name
                    }
                  </h2>

                  <p
                    style={{
                      textTransform:
                        "capitalize",
                    }}
                  >
                    {
                      selectedUser.role
                    }
                  </p>

                </div>

              </div>

              {/* MESSAGES */}
              <div
                style={{
                  flex: 1,

                  overflowY:
                    "auto",

                  padding:
                    "28px",

                  background:
                    "#f8fafc",
                }}
              >

                {messages.map(
                  (
                    m,
                    index
                  ) => (

                    <div
                      key={index}

                      style={{
                        display:
                          "flex",

                        justifyContent:
                          m.senderId ===
                          senderId
                            ? "flex-end"
                            : "flex-start",

                        marginBottom:
                          "18px",
                      }}
                    >

                      <div
                        style={{
                          background:
                            m.senderId ===
                            senderId
                              ? "#16a34a"
                              : "white",

                          color:
                            m.senderId ===
                            senderId
                              ? "white"
                              : "#111",

                          padding:
                            "15px 18px",

                          borderRadius:
                            "18px",

                          maxWidth:
                            "380px",
                        }}
                      >
                        {
                          m.message
                        }
                      </div>

                    </div>
                  )
                )}

                <div
                  ref={
                    messagesEndRef
                  }
                />

              </div>

              {/* INPUT */}
              <div
                style={{
                  padding:
                    "20px",

                  display:
                    "flex",

                  gap: "15px",

                  background:
                    "white",
                }}
              >

                <input
                  placeholder="Type message..."

                  value={
                    message
                  }

                  onChange={(
                    e
                  ) =>
                    setMessage(
                      e.target
                        .value
                    )
                  }

                  onKeyDown={(
                    e
                  ) => {

                    if (
                      e.key ===
                      "Enter"
                    ) {

                      sendMessage();
                    }
                  }}

                  style={{
                    flex: 1,

                    padding:
                      "16px",

                    borderRadius:
                      "16px",

                    border:
                      "1px solid #ddd",
                  }}
                />

                <button
                  onClick={
                    sendMessage
                  }

                  style={{
                    background:
                      "#16a34a",

                    color:
                      "white",

                    border:
                      "none",

                    borderRadius:
                      "16px",

                    padding:
                      "0 30px",

                    cursor:
                      "pointer",

                    fontWeight:
                      "700",
                  }}
                >
                  Send
                </button>

              </div>
            </>
          ) : (

            <div
              style={{
                flex: 1,

                display:
                  "flex",

                justifyContent:
                  "center",

                alignItems:
                  "center",

                flexDirection:
                  "column",
              }}
            >

              <h1>
                💬 Open a chat
              </h1>

              <p>
                Select user to start messaging
              </p>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}

export default Chat;