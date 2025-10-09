"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/component/ui/button";
import { Input } from "@/component/ui/input";
import { Send } from "lucide-react";

interface MessageInputProps {
  onMessageSent?: () => void;
}

export function MessageInput({ onMessageSent }: MessageInputProps) {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    setIsSending(true);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("User not authenticated");
      }

      const { error } = await supabase
        .from("messages")
        .insert({
          content: message.trim(),
          user_id: user.id
        });

      if (error) throw error;
      
      setMessage("");
      onMessageSent?.();
      
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 p-4 border-t">
      <Input
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        disabled={isSending}
        className="flex-1"
      />
      <Button type="submit" disabled={isSending || !message.trim()} size="icon">
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
}