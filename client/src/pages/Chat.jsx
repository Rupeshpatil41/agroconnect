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
  io(
    "https://agroconnect-1-hyi3.onrender.com"
  );

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

        setUsers(
          filtered
        );

      } catch (err) {

        console.log(
          "USER FETCH ERROR:",
          err
        );
      }
    };

  // =====================================
  // RECEIVE MESSAGE
  // =====================================
  useEffect(() => {

    socket.on(
      "receiveMessage",

      (data) => {

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

        console.log(
          "MESSAGE ERROR:",
          err
        );
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

        // SAVE MESSAGE
        await axios.post(
          "https://agroconnect-1-hyi3.onrender.com/api/messages",

          data
        );

        // SOCKET
        socket.emit(
          "sendMessage",
          data
        );

        // LOCAL UPDATE
        setMessages(
          (prev) => [
            ...prev,
            data,
          ]
        );

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

            overflowY:
              "auto",
          }}
        >

          <h1>
            💬 Chats
          </h1>

          <h3>
            Total Users:
            {" "}
            {users.length}
          </h3>

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

                  marginBottom:
                    "12px",

                  borderRadius:
                    "14px",

                  cursor:
                    "pointer",

                  background:
                    selectedUser?._id ===
                    u._id
                      ? "#dcfce7"
                      : "#f1f5f9",
                }}
              >

                {/* USER IMAGE */}
                <img
                  src={
                    u.image
                      ? `https://agroconnect-1-hyi3.onrender.com/${u.image}`
                      : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }

                  alt="profile"

                  style={{
                    width:
                      "55px",

                    height:
                      "55px",

                    borderRadius:
                      "50%",

                    objectFit:
                      "cover",
                  }}
                />

                <div>

                  <h3>
                    {u.name}
                  </h3>

                  <p>
                    {u.role}
                  </p>

                </div>

              </div>
            )
          )}

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
          }}
        >

          {selectedUser ? (
            <>
              {/* HEADER */}
              <div
                style={{
                  padding:
                    "20px",

                  borderBottom:
                    "1px solid #eee",

                  display:
                    "flex",

                  alignItems:
                    "center",

                  gap: "15px",
                }}
              >

                {/* SELECTED USER IMAGE */}
                <img
                  src={
                    selectedUser.image
                      ? `https://agroconnect-1-hyi3.onrender.com/${selectedUser.image}`
                      : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }

                  alt="profile"

                  style={{
                    width:
                      "65px",

                    height:
                      "65px",

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

                  <p>
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
                    "20px",
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
                        textAlign:
                          m.senderId ===
                          senderId
                            ? "right"
                            : "left",

                        marginBottom:
                          "15px",
                      }}
                    >

                      <span
                        style={{
                          background:
                            m.senderId ===
                            senderId
                              ? "#16a34a"
                              : "#e2e8f0",

                          color:
                            m.senderId ===
                            senderId
                              ? "white"
                              : "black",

                          padding:
                            "12px 16px",

                          borderRadius:
                            "16px",

                          display:
                            "inline-block",
                        }}
                      >
                        {
                          m.message
                        }
                      </span>

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
                }}
              >

                <input
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

                  placeholder="Type message..."

                  style={{
                    flex: 1,

                    padding:
                      "14px",

                    borderRadius:
                      "14px",

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

                    padding:
                      "0 25px",

                    borderRadius:
                      "14px",

                    cursor:
                      "pointer",
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
              }}
            >

              <h2>
                Select a user to chat
              </h2>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}

export default Chat;