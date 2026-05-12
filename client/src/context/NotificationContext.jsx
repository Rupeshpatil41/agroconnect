import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import axios from "axios";

import { io } from "socket.io-client";

import {
  toast,
} from "react-toastify";

const NotificationContext =
  createContext();

export const useNotifications =
  () =>
    useContext(
      NotificationContext
    );

const socket = io(
  "https://agroconnect-1-hyi3.onrender.com"
);

export const NotificationProvider =
  ({ children }) => {

    const [
      notifications,
      setNotifications,
    ] = useState([]);

    const [
      unreadCount,
      setUnreadCount,
    ] = useState(0);

    const user =
      JSON.parse(
        localStorage.getItem(
          "user"
        )
      );

    // =====================================
    // LOAD NOTIFICATIONS
    // =====================================
    const loadNotifications =
      async () => {

        if (!user?._id) return;

        try {
          const res =
            await axios.get(
              `http://https://agroconnect-1-hyi3.onrender.com/api/notifications/${user._id}`
            );

          setNotifications(
            res.data
          );

          const unread =
            res.data.filter(
              (n) =>
                !n.isRead
            ).length;

          setUnreadCount(
            unread
          );

        } catch (err) {
          console.log(err);
        }
      };

    // =====================================
    // SOCKET LISTENER
    // =====================================
    useEffect(() => {

      loadNotifications();

      socket.on(
        "newNotification",

        (
          notification
        ) => {

          setNotifications(
            (
              prev
            ) => [
              notification,
              ...prev,
            ]
          );

          setUnreadCount(
            (
              prev
            ) => prev + 1
          );

          toast.success(
            notification.title
          );
        }
      );

      return () => {
        socket.off(
          "newNotification"
        );
      };

    }, []);

    return (
      <NotificationContext.Provider
        value={{
          notifications,
          unreadCount,
          loadNotifications,
          setUnreadCount,
        }}
      >
        {children}
      </NotificationContext.Provider>
    );
  };