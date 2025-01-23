import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Echo from "laravel-echo";
import Pusher from "pusher-js";

const BASE_URL = "http://127.0.0.1:8000/";

const AdminChat = () => {
  const { chatId } = useParams();
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedChatId, setSelectedChatId] = useState(chatId || null);
  const [loading, setLoading] = useState(false);

  // Fetch all chats (admin only)
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await fetch(`${BASE_URL}api/chats`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch chats");
        }

        const data = await response.json();
        setChats(data);
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };

    fetchChats();
  }, []);

  // Fetch messages for selected chat (chat participants or admins)
  const fetchMessages = async (chatId) => {
    if (!chatId) return;

    try {
      const response = await fetch(`${BASE_URL}api/chat/${chatId}/messages`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      });
      const data = await response.json();
      setMessages(data.messages || []);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // Call fetchMessages whenever the selectedChatId changes
  useEffect(() => {
    if (selectedChatId) {
      fetchMessages(selectedChatId);
    }

    // Set up real-time updates using Laravel Echo and Pusher
    const echo = new Echo({
      broadcaster: "pusher",
      key: "a5e943e8d897050be7ab", // Replace with your Pusher key
      cluster: "ap2", // Replace with your Pusher cluster
      forceTLS: true,
    });

    // Subscribe to the chat's channel for real-time updates
    const channel = echo.channel(`chat.${selectedChatId}`);

    // Listen for new messages and update the state
    channel.listen("MessageSent", (event) => {
      setMessages((prevMessages) => [...prevMessages, event.message]);
    });

    // Cleanup when the component unmounts or chatId changes
    return () => {
      echo.leaveChannel(`chat.${selectedChatId}`);
    };
  }, [selectedChatId]);

  // Function to send a message (chat participants or admins)
  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;

    setLoading(true);

    try {
      const response = await fetch(
        `${BASE_URL}api/chat/${selectedChatId}/message`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
          body: JSON.stringify({ content: newMessage }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setMessages((prevMessages) => [...prevMessages, data.message]);
        setNewMessage(""); // Clear input after sending
      } else {
        console.error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar - Chat List */}
      <div className="w-1/3 bg-white p-4 shadow-md overflow-y-auto border-r">
        <h2 className="text-2xl font-semibold mb-6 text-center">All Chats</h2>
        <ul>
          {chats.map((chat) => (
            <li
              key={chat.id}
              onClick={() => setSelectedChatId(chat.id)}
              className={`p-4 cursor-pointer rounded-lg mb-3 transition-colors hover:bg-gray-100 ${
                selectedChatId === chat.id ? "bg-gray-200" : "bg-white"
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="font-semibold">
                  Chat with {chat.participant || "Unknown User"}
                </span>
                <span className="text-sm text-gray-500">
                  {chat.latest_message || "No recent messages"}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Details Section */}
      <div className="flex-1 bg-white p-6 flex flex-col shadow-lg overflow-hidden">
        {selectedChatId ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-semibold">
                Chat with{" "}
                {chats.find((chat) => chat.id === selectedChatId)
                  ?.participant || "Unknown User"}
              </h2>
              <button
                onClick={() => setSelectedChatId(null)}
                className="text-red-500 hover:text-red-700 font-medium"
              >
                Close Chat
              </button>
            </div>

            <div className="flex-grow overflow-y-auto mb-6 max-h-[60vh]">
              {messages.length === 0 ? (
                <p className="text-center text-lg text-gray-500">
                  No messages yet.
                </p>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={`p-4 mb-4 rounded-lg max-w-[70%] ${
                      message.sender.id === 1
                        ? "bg-blue-100 ml-auto"
                        : "bg-gray-100"
                    }`}
                  >
                    <p>{message.content}</p>
                  </div>
                ))
              )}
            </div>

            {/* Message Input */}
            <div className="flex items-center mt-auto gap-3">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your reply..."
                className="w-full p-3 rounded-lg border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSendMessage}
                className={`bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 focus:outline-none ${
                  loading ? "cursor-not-allowed bg-gray-300" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Sending..." : "Send"}
              </button>
            </div>
          </>
        ) : (
          <p className="text-center text-lg text-gray-500">
            Select a chat to view details
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminChat;
