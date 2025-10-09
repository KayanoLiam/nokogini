import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ChatComponent } from "@/component/chat-component";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/auth/login");
  }

  const currentUser = data.user;

  return (
    <div className="flex-1 w-full flex h-[calc(100vh-8rem)] md:h-[calc(100vh-9rem)]">
      <section className="flex-1 flex flex-col min-w-0">
        <ChatComponent currentUserId={currentUser.id} />
      </section>
    </div>
  );
}
