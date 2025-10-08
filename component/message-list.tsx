"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { format } from "date-fns";

interface Message {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  users?: {
    email: string;
  };
}

interface MessageListProps {
  messages: Message[];
}

export function MessageList({ messages }: MessageListProps) {
  const supabase = createClient();
  const [messageWithUsers, setMessageWithUsers] = useState<Message[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const messagesWithUserData = await Promise.all(
        messages.map(async (message) => {
          // Fetch user info from auth.users (if accessible)
          const { data: userData } = await supabase
            .from("auth.users")
            .select("email")
            .eq("id", message.user_id)
            .single();

          return {
            ...message,
            users: userData || { email: "Unknown User" }
          };
        })
      );
      setMessageWithUsers(messagesWithUserData);
    };

    if (messages.length > 0) {
      fetchUserData();
    } else {
      setMessageWithUsers([]);
    }
  }, [messages, supabase]);

  const formatTime = (timestamp: string) => {
    return format(new Date(timestamp), "HH:mm");
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
      {messageWithUsers.length === 0 ? (
        <div className="text-center text-gray-500 mt-8">
          No messages yet. Send the first one!
        </div>
      ) : (
        messageWithUsers.map((message) => (
          <div key={message.id} className="flex flex-col space-y-1">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span className="font-medium">{message.users?.email}</span>
              <span>{formatTime(message.created_at)}</span>
            </div>
            <div className="bg-white rounded-lg p-3 shadow-sm border">
              <p className="text-gray-800">{message.content}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}