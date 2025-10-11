import { EnvVarWarning } from "@/component/env-var-warning";
import { AuthButton } from "@/component/auth-button";
import { Hero } from "@/component/hero";
import { ThemeSwitcher } from "@/component/theme-switcher";
import { ConnectSupabaseSteps } from "@/component/tutorial/connect-supabase-steps";
import { SignUpUserSteps } from "@/component/tutorial/sign-up-user-steps";
// import { hasEnvVars } from "@/lib/utils";
import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";
// Button no longer used in footer links

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
            <div className="flex gap-5 items-center font-semibold">
              <Link href={"/"}>SparkByte NoKoGiNi</Link>
            </div>
            <div className="flex items-center gap-4">
              {!hasEnvVars ? <EnvVarWarning /> : <AuthButton />}
              <Link href="/profile" className="text-sm underline text-foreground/80">
                Profile
              </Link>
            </div>
          </div>
        </nav>
        <div className="flex-1 flex flex-col gap-20 max-w-5xl p-5">
          <Hero />
          <main className="flex-1 flex flex-col gap-6 px-4">
            <h2 className="font-medium text-xl mb-4">Next steps</h2>
            {hasEnvVars ? <SignUpUserSteps /> : <ConnectSupabaseSteps />}
          </main>
        </div>
        
        <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
          <p>
            Powered by{" "}
            <a
              href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
              target="_blank"
              className="font-bold"
              rel="noreferrer"
            >
              SparkByte
            </a>
          </p>
          <div className="flex items-center gap-3">
            <Link href="/news" className="text-sm text-foreground/80">
              What&apos;s new
            </Link>
            <Link href="/contact" className="text-sm text-foreground/80">
              Contact Us
            </Link>
            <Link href="/qa" className="text-sm text-foreground/80">
              Q&amp;A
            </Link>
          </div>
          <ThemeSwitcher />
        </footer>
      </div>
    </main>
  );
}
