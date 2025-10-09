import Link from "next/link";
import { Button } from "./ui/button";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "./logout-button";
import Avatar from "./avatar";

export async function AuthButton() {
  const supabase = await createClient();

  const { data: userData } = await supabase.auth.getUser();
  const user = userData?.user;

  if (!user) {
    return (
      <div className="flex gap-2">
        <Button asChild size="sm" variant={"outline"}>
          <Link href="/auth/login">Sign in</Link>
        </Button>
        <Button asChild size="sm" variant={"default"}>
          <Link href="/auth/sign-up">Sign up</Link>
        </Button>
      </div>
    );
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("nickname, avatar_url")
    .eq("id", user.id)
    .maybeSingle();

  const name = profile?.nickname || user.email || "User";
  const avatarUrl = profile?.avatar_url;
  return (
    <div className="flex items-center gap-3">
      <Avatar
        src={avatarUrl}
        alt={name}
        size="sm"
        fallbackText={name}
      />
      <span className="text-sm">Hey, {name}!</span>
      <LogoutButton />
    </div>
  );
}
