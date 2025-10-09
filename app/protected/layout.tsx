import { EnvVarWarning } from "@/component/env-var-warning";
import { AuthButton } from "@/component/auth-button";
import { ThemeSwitcher } from "@/component/theme-switcher";
import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex flex-col bg-background">
      <div className="flex-1 w-full flex flex-col gap-12">
        {/* Header aligned with app/page.tsx */}
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
            <div className="flex gap-5 items-center font-semibold">
              <Link href={"/"}>SparkByte NoKoGiNi</Link>
            </div>
            {!hasEnvVars ? <EnvVarWarning /> : <AuthButton />}
          </div>
        </nav>

        <div className="flex-1 w-full flex flex-col gap-8 p-5">
          {children}
        </div>

        <footer className="w-full flex items-center justify-center border-t border-border bg-card mx-auto text-center text-xs gap-8 py-12">
          <p>
            Powered by{" "}
            {/* <a
              href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
              target="_blank"
              className="font-bold hover:underline"
              rel="noreferrer"
            >
              Supabase
            </a> */}
            SparkByte
          </p>
          <ThemeSwitcher />
        </footer>
      </div>
    </main>
  );
}
