import Link from "next/link";
import { TutorialStep } from "./tutorial-step";
import { ArrowUpRight } from "lucide-react";

export function SignUpUserSteps() {
  return (
    <ol className="flex flex-col gap-6">
      <TutorialStep title="Register your account and follow our guidelines for chatting.">
        <p>
          Before{" "}
          <Link
            href="auth/sign-up"
            className="font-bold hover:underline text-foreground/80"
          >
            Sign up
          </Link>{" "}
          you can check our guidelines elsewhere. However, please note that these guidelines may be updated at any time.
        </p>
      </TutorialStep>
    </ol>
  );
}
