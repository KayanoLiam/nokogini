"use client";

import { NextLogo } from "./next-logo";
import { SupabaseLogo } from "./supabase-logo";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function Hero() {
  const router = useRouter(); // Router used for the Get Started button
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  // Navigate to sign-up page when clicking the button
  const handleGetStarted = async () => {
    const supabase = createClient();
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // 用户已登录，跳转到受保护页面
        router.push("/protected");
      } else {
        // 用户未登录，跳转到注册页面
        router.push("/auth/sign-up");
      }
    } catch (error) {
      console.error("Error checking user status:", error);
      // 出错时默认跳转到注册页面
      router.push("/auth/sign-up");
    }
  };

  // Determine which logo to use based on theme
  const getLogoSrc = () => {
    if (!mounted) return "/logo.png"; // Default logo during SSR
    
    // Use resolvedTheme to handle 'system' theme properly
    const currentTheme = resolvedTheme || theme;
    return currentTheme === "dark" ? "/logo_dark.jpg" : "/logo.png";
  };

  return (
    <div className="flex flex-col gap-16 items-center">
      <div className="flex gap-8 justify-center items-center">
        {/* <a
          href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
          target="_blank"
          rel="noreferrer"
        >
          <SupabaseLogo />
        </a>
        <span className="border-l rotate-45 h-6" />
        <a href="https://nextjs.org/" target="_blank" rel="noreferrer">
          <NextLogo />
        </a> */}
        {/* <span className="text-4xl font-bold">SparkByte  NoKoGiNi</span> */}
        <span className="text-4xl font-bold">
          <img src={getLogoSrc()} alt="SparkByte Logo" className="inline-block mr-2 w-12 h-12"  />
          SparkByte</span>
      </div>
      <h1 className="sr-only">Supabase and Next.js Starter Template</h1>
      <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center">
        Chat here, or Join us.
        {" "}
        {/* <a
          href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
          target="_blank"
          className="font-bold hover:underline"
          rel="noreferrer"
        >
          Supabase
        </a>{" "}
        and{" "}
        <a
          href="https://nextjs.org/"
          target="_blank"
          className="font-bold hover:underline"
          rel="noreferrer"
        >
          Next.js
        </a> */}
      </p>
      <span>

        <Button variant="outline" onClick={handleGetStarted}>Get Started</Button>

      </span>
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
    </div>
  );
}
