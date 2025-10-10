"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/component/ui/button";
import { useRouter } from "next/navigation";
import * as React from "react";

export function LogoutButton(
  props: React.ComponentProps<typeof Button>,
) {
  const router = useRouter();

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth/login");
  };

  return (
    <Button onClick={logout} {...props}>
      Logout
    </Button>
  );
}
