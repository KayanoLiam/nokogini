"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/component/ui/button";
import { Input } from "@/component/ui/input";
import AvatarUpload from "./avatar-upload";

export function ProfileForm() {
  const supabase = createClient();
  const [nickname, setNickname] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          setMessage("Please log in first");
          return;
        }
        setUserId(user.id);
        const { data } = await supabase
          .from("profiles")
          .select("nickname, avatar_url")
          .eq("id", user.id)
          .maybeSingle();
        if (data?.nickname) setNickname(data.nickname);
        if (data?.avatar_url) setAvatarUrl(data.avatar_url);
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, [supabase]);

  const save = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setMessage("Not logged in, cannot save");
        return;
      }
      // Upsert own profile
      const { error } = await supabase
        .from("profiles")
        .upsert({ id: user.id, nickname, avatar_url: avatarUrl })
        .select();
      if (error) throw error;
      setMessage("Nickname saved successfully");
    } catch (e) {
      console.error("Error saving nickname:", e);
      const errorMessage = e instanceof Error ? e.message : "Unknown error";
      setMessage(`Save failed: ${errorMessage}`);
    } finally {
      setSaving(false);
    }
  };

  const handleAvatarUpdate = (url: string) => {
    setAvatarUrl(url);
  };

  return (
    <div className="space-y-6">
      {userId && (
        <div>
          <label className="block text-sm mb-4 font-medium">Avatar</label>
          <AvatarUpload
            currentAvatarUrl={avatarUrl}
            onAvatarUpdate={handleAvatarUpdate}
            userId={userId}
          />
        </div>
      )}
      <div>
        <label className="block text-sm mb-2 font-medium">Nickname</label>
        <Input
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="Enter your nickname"
          disabled={loading}
        />
      </div>
      <Button onClick={save} disabled={saving || loading}>
        {saving ? "Saving..." : "Save"}
      </Button>
      {message && <p className="text-sm text-muted-foreground">{message}</p>}
    </div>
  );
}