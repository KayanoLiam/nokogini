"use client";

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Send } from 'lucide-react';
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/component/ui/button";

interface Message {
  id: string;
  content: string;
  user_id: string;
  created_at: string;
  user_email?: string;
}

interface ChatComponentProps {
  currentUserId?: string;
  currentUserEmail?: string;
}

export function ChatComponent({ currentUserId, currentUserEmail }: ChatComponentProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const shouldScroll = useRef(true);
  const supabase = useMemo(() => createClient(), []);

  const scrollToBottom = () => {
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
    }
  };

  // 只在组件挂载和发送消息时滚动到底部
  
  useEffect(() => {
    if (shouldScroll.current) {
      scrollToBottom();
      shouldScroll.current = false;
    }
  }, [messages]);

  // 获取初始消息
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data, error } = await supabase
          .from("messages")
          .select("*")
          .order("created_at", { ascending: true });

        if (error) throw error;
        // 不再访问受限的 auth.users；仅对当前用户显示其邮箱
        const messagesWithUsers = (data || []).map((message) => ({
          ...message,
          user_email:
            message.user_id === currentUserId ? (currentUserEmail ?? "You") : undefined,
        }));
        setMessages(messagesWithUsers);
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();
  }, [supabase, currentUserId, currentUserEmail]);

  // 设置实时订阅
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
          // 不尝试查询受限表，直接构造显示名称
          const messageWithUser: Message = {
            ...(payload.new as Message),
            user_email:
              payload.new.user_id === currentUserId ? (currentUserEmail ?? "You") : undefined,
          };
          setMessages((currentMessages) => [...currentMessages, messageWithUser]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, currentUserId, currentUserEmail]);

  const handleSend = async () => {
    if (!inputText.trim()) return;
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        alert("请先登录");
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
      // 发送消息后滚动到底部
      shouldScroll.current = true;
      
    } catch (error) {
      console.error("Error sending message:", error);
      alert("发送消息失败，请重试");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">加载消息中...</div>
      </div>
    );
  }

  // 将消息按日期分组用于分隔
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
      {/* 消息列表（极简） */}
      <div ref={messagesContainerRef} className="flex-1 overflow-y-auto px-4 py-6 pb-24 space-y-6">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            还没有消息，快来发送第一条吧！
          </div>
        ) : (
          dateKeys.map((dateKey) => (
            <div key={dateKey} className="space-y-4">
              {/* 日期分隔线 */}
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-border" />
                <div className="text-xs text-muted-foreground">
                  {new Date(dateKey).toLocaleDateString('zh-CN', { month: 'long', day: 'numeric', year: 'numeric' })}
                </div>
                <div className="h-px flex-1 bg-border" />
              </div>

              {groupedByDate[dateKey].map((message) => {
                const time = new Date(message.created_at).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
                const name = message.user_email || `用户-${message.user_id.slice(0, 8)}`;
                return (
                  <div key={message.id} className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-lg">
                      {name.charAt(0).toUpperCase()}
                    </div>
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

      {/* 输入区域（极简，始终可见） */}
      <div className="sticky bottom-0 z-10 border-t border-border px-4 py-3 bg-background">
        <div className="flex items-end gap-3">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="输入消息..."
            rows={1}
            className="flex-1 px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            style={{ maxHeight: '120px' }}
          />
          <Button onClick={handleSend} disabled={!inputText.trim()} className="gap-2 flex-shrink-0">
            <Send className="w-5 h-5" />
            发送
          </Button>
        </div>
      </div>
    </div>
  );
}