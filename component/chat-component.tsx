"use client";

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Send } from 'lucide-react';
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import Avatar from "./avatar";

interface Message {
  id: string;
  content: string;
  user_id: string;
  created_at: string;
  display_name?: string;
  avatar_url?: string;
}

interface ChatComponentProps {
  currentUserId?: string;
}

export function ChatComponent({ currentUserId }: ChatComponentProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isBanned, setIsBanned] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const shouldScroll = useRef(true);
  const supabase = useMemo(() => createClient(), []);

  const scrollToBottom = () => {
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
    }
  };

  // Only scroll to bottom on mount and after sending a message
  
  useEffect(() => {
    if (shouldScroll.current) {
      scrollToBottom();
      shouldScroll.current = false;
    }
  }, [messages]);

  // Fetch initial messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        // Check banned status for current user
        const { data: authData } = await supabase.auth.getUser();
        const userId = authData?.user?.id;
        if (userId) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("is_banned")
            .eq("id", userId)
            .single();
          setIsBanned(!!profile?.is_banned);
        }

        const { data, error } = await supabase
          .from("messages")
          .select("*")
          .order("created_at", { ascending: true });

        if (error) throw error;
        // Load nicknames and avatars from profiles table in one shot
        const userIds = (data || []).map((m) => m.user_id);
        const uniqueUserIds = Array.from(new Set(userIds));
        const { data: profiles } = await supabase
          .from("profiles")
          .select("id, nickname, avatar_url")
          .in("id", uniqueUserIds);

        const profileMap = new Map<string, { nickname?: string; avatar_url?: string }>();
        (profiles || []).forEach((p: { id: string; nickname: string | null; avatar_url: string | null }) => {
          profileMap.set(p.id, {
            nickname: p.nickname || undefined,
            avatar_url: p.avatar_url || undefined
          });
        });

        const messagesWithNames = (data || []).map((message) => {
          const profile = profileMap.get(message.user_id);
          return {
            ...message,
            display_name: profile?.nickname || `User-${message.user_id.slice(0, 8)}`,
            avatar_url: profile?.avatar_url,
          };
        });
        setMessages(messagesWithNames);
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();
  }, [supabase, currentUserId]);

  // Set up realtime subscription
  useEffect(() => {
    const channel = supabase
      .channel("public:messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        async (payload) => {
          console.log("New message received:", payload);
          // Fetch nickname and avatar for the sender
          let displayName = `User-${(payload.new as any).user_id.slice(0, 8)}`;
          let avatarUrl: string | undefined;
          const { data: profile } = await supabase
            .from("profiles")
            .select("nickname, avatar_url")
            .eq("id", (payload.new as any).user_id)
            .single();
          if (profile?.nickname) displayName = profile.nickname;
          if (profile?.avatar_url) avatarUrl = profile.avatar_url;

          const messageWithName: Message = {
            ...(payload.new as Message),
            display_name: displayName,
            avatar_url: avatarUrl,
          };
          setMessages((current) => [...current, messageWithName]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, currentUserId]);

  const handleSend = async () => {
    if (!inputText.trim()) return;
    if (isBanned) {
      alert("You are banned and cannot send messages.");
      return;
    }
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        alert("Please sign in first");
        return;
      }

      const { error } = await supabase
        .from("messages")
        .insert({
          content: inputText.trim(),
          user_id: user.id
        });

      if (error) throw error;
      
      setInputText('');
      // After sending a message, scroll to bottom
      shouldScroll.current = true;
      
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again.");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!isBanned) {
        handleSend();
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading messages...</div>
      </div>
    );
  }

  // Group messages by date for separators
  const groupedByDate = messages.reduce((acc: Record<string, Message[]>, msg) => {
    const d = new Date(msg.created_at);
    const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    acc[key] = acc[key] || [];
    acc[key].push(msg);
    return acc;
  }, {});
  const dateKeys = Object.keys(groupedByDate).sort();

  return (
    <div className="flex-1 w-full flex flex-col min-w-0">
      {/* Message list (minimal) */}
      <div ref={messagesContainerRef} className="flex-1 overflow-y-auto px-4 py-6 pb-24 space-y-6">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            No messages yet. Send the first one!
          </div>
        ) : (
          dateKeys.map((dateKey) => (
            <div key={dateKey} className="space-y-4">
              {/* Date separator */}
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-border" />
                <div className="text-xs text-muted-foreground">
                  {new Date(dateKey).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </div>
                <div className="h-px flex-1 bg-border" />
              </div>

              {groupedByDate[dateKey].map((message) => {
                const time = new Date(message.created_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
                const name = message.display_name || `User-${message.user_id.slice(0, 8)}`;
                return (
                  <div key={message.id} className="flex items-start gap-3">
                    <Avatar
                      src={message.avatar_url}
                      alt={name}
                      size="md"
                      fallbackText={name}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2">
                        <span className="font-medium text-foreground">{name}</span>
                        <span className="text-xs text-muted-foreground">{time}</span>
                      </div>
                      <div className="mt-1 text-foreground break-words whitespace-pre-wrap">{message.content}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))
        )}
      </div>

      {/* Input area (minimal, always visible) */}
      <div className="sticky bottom-0 z-10 border-t border-border px-4 py-3 bg-background">
        <div className="flex items-end gap-3">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            rows={1}
            className="flex-1 px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            style={{ maxHeight: '120px' }}
            disabled={isBanned}
          />
          <Button onClick={handleSend} disabled={isBanned || !inputText.trim()} className="gap-2 flex-shrink-0">
            <Send className="w-5 h-5" />
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}