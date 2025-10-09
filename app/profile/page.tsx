import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ProfileForm } from "@/component/profile-form";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data?.user) {
    redirect("/auth/login");
  }

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <div className="space-y-4">
        <Link href="/protected">
          <Button variant="outline" size="sm">
            ← Back to Chat
          </Button>
        </Link>
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">Profile</h1>
          <p className="text-muted-foreground">Set your display name for chat messages.</p>
        </div>
      </div>
      <ProfileForm />
    </div>
  );
}