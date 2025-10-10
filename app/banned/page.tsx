import { Card, CardContent, CardHeader, CardTitle } from "@/component/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogoutButton } from "@/component/logout-button";

export default function BannedPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Account Restricted</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Your account has been banned. If you believe this is a mistake,
                please contact support.
              </p>
              <div className="mt-4 flex gap-2">
                <LogoutButton size="sm" />
                <Link href="/">
                  <Button size="sm">Home</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}