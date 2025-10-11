import Link from "next/link";
import { Button } from "@/component/ui/button";

export default function Page() {
  return (
    <div className="w-full min-h-svh p-6 space-y-8">
      <div className="mb-4">
        <Link href="/">
          <Button variant="outline" size="sm">Back to Home</Button>
        </Link>
      </div>

      <div className="space-y-3">
        <h1 className="text-3xl font-bold">SparkByte Chat — FAQ</h1>
        <p className="text-muted-foreground">
          Welcome to SparkByte Chat! This page answers some of the most common
          questions about accounts, rules, and our open-source community.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">1. Accounts & Login</h2>
        <div className="space-y-3">
          <div>
            <p className="font-semibold">Q: How do I create an account?</p>
            <p>
              A: You can sign up directly on our chat site using your email.
              We’ll send a verification link to confirm your account.
            </p>
          </div>
          <div>
            <p className="font-semibold">
              Q: I didn’t receive my verification email. What should I do?
            </p>
            <p>
              A: Please check your spam folder first. If you still don’t see
              it, try resending the link from the login page or contact us
              through the “Contact” section below.
            </p>
          </div>
          <div>
            <p className="font-semibold">Q: Can I delete my account?</p>
            <p>
              A: Yes. You can request deletion anytime through your profile
              settings. Once deleted, your messages and data are permanently
              removed from our database.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">2. Rules & Account Suspension</h2>
        <div className="space-y-3">
          <div>
            <p className="font-semibold">
              Q: Why was my account banned or suspended?
            </p>
            <p>
              A: SparkByte aims to keep a friendly and respectful chat space.
              Accounts may be suspended for:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Harassment, hate speech, or spam</li>
              <li>Sharing harmful or illegal content</li>
              <li>Using automated bots or fake identities</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold">Q: Can I appeal a ban?</p>
            <p>
              A: Yes. You can contact us at
              {" "}
              <a
                href="https://nokogini.vercel.app"
                className="underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                nokogini.vercel.app
              </a>
              {" "}
              and include your account email and a short explanation. We review
              all appeals manually.
            </p>
          </div>
          <div>
            <p className="font-semibold">Q: How long does a suspension last?</p>
            <p>
              A: It depends on the case. Some are temporary (24–72 hours),
              while repeated violations can lead to permanent bans.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">3. Privacy & Data</h2>
        <div className="space-y-3">
          <div>
            <p className="font-semibold">
              Q: Does SparkByte store my chat messages?
            </p>
            <p>
              A: Yes, temporarily. Messages are stored securely to enable
              real-time chat and history sync, but we never sell or share your
              data.
            </p>
          </div>
          <div>
            <p className="font-semibold">Q: Can I download my data?</p>
            <p>
              A: We’re working on a self-service export feature. For now, you
              can contact us to request a copy.
            </p>
          </div>
          <div>
            <p className="font-semibold">
              Q: Do you use cookies or tracking?
            </p>
            <p>
              A: We only use essential cookies to keep you signed in — no ads,
              no third-party trackers.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">4. Feedback & Support</h2>
        <div className="space-y-3">
          <div>
            <p className="font-semibold">
              Q: I found a bug or issue. How can I report it?
            </p>
            <p>
              A: You can open an issue on our GitHub or send us a message
              through our website.
            </p>
          </div>
          <div>
            <p className="font-semibold">Q: How can I suggest new features?</p>
            <p>
              A: We love hearing from users! Feature ideas and feedback are
              always welcome on GitHub Discussions.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">5. Open-Source & Community</h2>
        <div className="space-y-3">
          <div>
            <p className="font-semibold">Q: Is SparkByte open-source?</p>
            <p>
              A: Yes! SparkByte Chat is built on open technologies like Next.js
              and Supabase, and our code is open on GitHub.
            </p>
          </div>
          <div>
            <p className="font-semibold">Q: Can I contribute?</p>
            <p>
              A: Absolutely. Whether you’re fixing a typo, improving UI, or
              adding features — contributions are always appreciated. Check out
              our repository and read the CONTRIBUTING.md guide.
            </p>
          </div>
          <div>
            <p className="font-semibold">Q: How do I join the community?</p>
            <p>
              A: Just chat, contribute, or connect with us! SparkByte is a
              small but passionate group of developers who believe in open
              communication and collaboration.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Contact</h2>
        <p>
          If you have any questions, appeals, or partnership requests, please
          reach us at
          {" "}
          <a
            href="https://nokogini.vercel.app"
            className="underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            nokogini.vercel.app
          </a>
          .
        </p>
      </section>
    </div>
  );
}