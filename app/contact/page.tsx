import Link from "next/link";
import { Button } from "@/component/ui/button";

export default function ContactPage() {
  return (
    <div className="w-full min-h-svh p-6">
      <div className="mb-4">
        <Link href="/">
          <Button variant="outline" size="sm">Back to Home</Button>
        </Link>
      </div>
      <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
      <p className="text-muted-foreground mb-6">
        For inquiries, please reach us via the emails below.
      </p>
      <div className="space-y-4">
        <div>
          <span className="font-semibold">Primary Email:</span>{" "}
          <a
            href="mailto:Sparkbyte@outlook.jp"
            className="text-foreground hover:text-foreground/80 no-underline"
          >
            Sparkbyte@outlook.jp
          </a>
        </div>
        <div>
          <span className="font-semibold">Team Member Emails:</span>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>
              <a
                href="mailto:xiaoilinyihai@gmail.com"
                className="text-foreground hover:text-foreground/80 no-underline"
              >
                xiaoilinyihai@gmail.com
              </a>
            </li>
            <li>
              <a
                href="mailto:kayano04@outlook.jp"
                className="text-foreground hover:text-foreground/80 no-underline"
              >
                kayano04@outlook.jp
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}