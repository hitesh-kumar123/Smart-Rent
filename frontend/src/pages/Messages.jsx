import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Messages = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // Conversations state with empty default
  const [conversations, setConversations] = useState([]);

  // Messages state with empty default
  const [messages, setMessages] = useState([]);

  const [newMessage, setNewMessage] = useState("");
  const [activeConversation, setActiveConversation] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // Load mock conversations for demo - in a real app, this would be an API call
  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      // Mock data for conversations - this would normally come from an API
      const mockConversations = [
        {
          id: 1,
          user: {
            name: "John Smith",
            avatar: "https://randomuser.me/api/portraits/men/32.jpg",
            isOnline: true,
          },
          property: "Luxury Apartment in Downtown",
          lastMessage:
            "Hi, is this property still available for the dates I mentioned?",
          timestamp: "10:23 AM",
          unread: 2,
        },
        {
          id: 2,
          user: {
            name: "Sarah Johnson",
            avatar: "https://randomuser.me/api/portraits/women/44.jpg",
            isOnline: false,
          },
          property: "Beachfront Villa with Pool",
          lastMessage: "Perfect! I will make the payment today.",
          timestamp: "Yesterday",
          unread: 0,
        },
        {
          id: 3,
          user: {
            name: "Michael Brown",
            avatar: "https://randomuser.me/api/portraits/men/67.jpg",
            isOnline: true,
          },
          property: "Modern Loft in Art District",
          lastMessage: "Is early check-in possible? My flight arrives at 9am.",
          timestamp: "2 days ago",
          unread: 0,
        },
      ];

      setConversations(mockConversations);
      setActiveConversation(1); // Set first conversation as active
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Load messages for active conversation
  useEffect(() => {
    if (activeConversation) {
      // Simulate API call to get messages
      const mockMessages = [
        {
          id: 1,
          sender: "them",
          text: "Hi, is this property still available for the dates I mentioned?",
          timestamp: "10:15 AM",
        },
        {
          id: 2,
          sender: "me",
          text: "Yes, it is! The apartment is available from June 15-20. Would you like to book it?",
          timestamp: "10:18 AM",
        },
        {
          id: 3,
          sender: "them",
          text: "That sounds great! What is the total price including all fees?",
          timestamp: "10:20 AM",
        },
        {
          id: 4,
          sender: "me",
          text: "The total comes to $850 including the cleaning fee and service fee.",
          timestamp: "10:22 AM",
        },
        {
          id: 5,
          sender: "them",
          text: "Perfect, thank you for the information!",
          timestamp: "10:23 AM",
        },
      ];

      setMessages(mockMessages);
    }
  }, [activeConversation]);

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (newMessage.trim() === "") return;

    const message = {
      id: messages.length + 1,
      sender: "me",
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages([...messages, message]);
    setNewMessage("");
  };

  const handleConversationClick = (id) => {
    // Mark conversation as read
    setConversations(
      conversations.map((conv) =>
        conv.id === id ? { ...conv, unread: 0 } : conv
      )
    );

    setActiveConversation(id);
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-neutral-800 mb-4">
            You must be logged in to view messages
          </h1>
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="text-center">
          <svg
            className="animate-spin h-10 w-10 text-primary-500 mx-auto mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <p className="text-neutral-600">Loading messages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold text-neutral-800 mb-6">Messages</h1>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
            {/* Conversations list */}
            <div className="border-r border-neutral-200 md:col-span-1">
              <div className="p-4 border-b border-neutral-200">
                <input
                  type="text"
                  placeholder="Search conversations"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-primary-500"
                />
              </div>

              <div className="overflow-y-auto h-[calc(100vh-250px)]">
                {conversations
                  .filter(
                    (conversation) =>
                      conversation.user.name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                      conversation.property
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                      conversation.lastMessage
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                  )
                  .map((conversation) => (
                    <div
                      key={conversation.id}
                      className={`p-4 border-b border-neutral-100 hover:bg-neutral-50 cursor-pointer ${
                        activeConversation === conversation.id
                          ? "bg-neutral-100"
                          : ""
                      }`}
                      onClick={() => handleConversationClick(conversation.id)}
                    >
                      <div className="flex items-start">
                        <div className="relative flex-shrink-0">
                          <img
                            src={conversation.user.avatar}
                            alt={conversation.user.name}
                            className="h-12 w-12 rounded-full object-cover"
                          />
                          {conversation.user.isOnline && (
                            <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-400 ring-2 ring-white"></span>
                          )}
                        </div>

                        <div className="ml-3 flex-1 overflow-hidden">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium text-neutral-900 truncate">
                              {conversation.user.name}
                            </h3>
                            <span className="text-xs text-neutral-500">
                              {conversation.timestamp}
                            </span>
                          </div>

                          <p className="text-xs text-neutral-600 truncate mt-1">
                            {conversation.property}
                          </p>

                          <div className="flex items-center justify-between mt-1">
                            <p className="text-xs text-neutral-500 truncate">
                              {conversation.lastMessage}
                            </p>

                            {conversation.unread > 0 && (
                              <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-primary-500 rounded-full">
                                {conversation.unread}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Chat area */}
            <div className="md:col-span-2 lg:col-span-3 flex flex-col">
              {/* Chat header */}
              <div className="p-4 border-b border-neutral-200 flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src={
                      conversations.find((c) => c.id === activeConversation)
                        ?.user.avatar
                    }
                    alt="User"
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div className="ml-3">
                    <h2 className="text-sm font-medium text-neutral-900">
                      {
                        conversations.find((c) => c.id === activeConversation)
                          ?.user.name
                      }
                    </h2>
                    <p className="text-xs text-neutral-500">
                      {
                        conversations.find((c) => c.id === activeConversation)
                          ?.property
                      }
                    </p>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button className="text-neutral-500 hover:text-neutral-700">
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </button>
                  <button className="text-neutral-500 hover:text-neutral-700">
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Chat messages */}
              <div
                className="flex-1 p-4 overflow-y-auto h-[calc(100vh-350px)]"
                id="messages"
              >
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.sender === "me"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.sender === "me"
                            ? "bg-primary-500 text-white"
                            : "bg-neutral-200 text-neutral-800"
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <span className="block text-xs mt-1 opacity-75 text-right">
                          {message.timestamp}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chat input */}
              <div className="border-t border-neutral-200 p-4">
                <form
                  onSubmit={handleSendMessage}
                  className="flex items-center"
                >
                  <button
                    type="button"
                    className="p-2 rounded-full text-neutral-500 hover:text-neutral-700"
                  >
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                      />
                    </svg>
                  </button>

                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 border-0 focus:ring-0 focus:outline-none px-3 py-2 text-sm"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />

                  <button
                    type="submit"
                    className="p-2 rounded-full text-primary-500 hover:text-primary-700"
                  >
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
