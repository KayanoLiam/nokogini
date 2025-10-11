export const revalidate = 1800;

type CommitItem = {
  sha: string;
  html_url: string;
  commit: {
    message: string;
    author: { name: string; date: string };
  };
};

async function fetchCommits(): Promise<CommitItem[]> {
  const url =
    "https://api.github.com/repos/KayanoLiam/nokogini/commits?per_page=12";
  const res = await fetch(url, {
    headers: { Accept: "application/vnd.github+json" },
    next: { revalidate: 1800 },
  });
  if (!res.ok) {
    throw new Error(`Failed to load commits: ${res.status}`);
  }
  return res.json();
}

const fallbackCommits: CommitItem[] = [
  {
    sha: "eae18627349df32fce845d29706dd7bbae070599",
    html_url:
      "https://github.com/KayanoLiam/nokogini/commit/eae18627349df32fce845d29706dd7bbae070599",
    commit: {
      message:
        "feat(protected): center content; mobile 100% width, desktop 70%",
      author: { name: "KayanoLiam", date: "2025-10-10T14:03:00Z" },
    },
  },
  {
    sha: "6e9150535bf552002c730ec0b0b670a3c5d1128a",
    html_url:
      "https://github.com/KayanoLiam/nokogini/commit/6e9150535bf552002c730ec0b0b670a3c5d1128a",
    commit: {
      message:
        "chore(chat): simplify message UI — remove bubble backgrounds, keep separators/hover",
      author: { name: "KayanoLiam", date: "2025-10-10T14:02:48Z" },
    },
  },
  {
    sha: "8e020e90970bda4a8972d1090efe790ed78f5ed7",
    html_url:
      "https://github.com/KayanoLiam/nokogini/commit/8e020e90970bda4a8972d1090efe790ed78f5ed7",
    commit: {
      message:
        "build(turbopack): set explicit root to project folder to fix workspace root warning",
      author: { name: "KayanoLiam", date: "2025-10-10T13:40:07Z" },
    },
  },
  {
    sha: "496ae0e599378a6423f8bdd97c51096dc7f61ce0",
    html_url:
      "https://github.com/KayanoLiam/nokogini/commit/496ae0e599378a6423f8bdd97c51096dc7f61ce0",
    commit: {
      message:
        "feat(auth): add GitHub OAuth login and callback route\n\n- Add GitHub login button using supabase.auth.signInWithOAuth\n- Implement /auth/callback route exchanging code for session\n- Redirect to /protected or error page with message\n- Ensure compatibility with @supabase/ssr server client",
      author: { name: "KayanoLiam", date: "2025-10-10T13:40:02Z" },
    },
  },
  {
    sha: "dfa9149aec0a7997a45c2a3053a1cd34cd90a127",
    html_url:
      "https://github.com/KayanoLiam/nokogini/commit/dfa9149aec0a7997a45c2a3053a1cd34cd90a127",
    commit: {
      message: "docs(ban): convert BANNED_USERS guide to English",
      author: { name: "KayanoLiam", date: "2025-10-10T12:58:26Z" },
    },
  },
];

function formatDate(date: string) {
  try {
    return new Date(date).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return date;
  }
}

export default async function NewsPage() {
  let commits: CommitItem[] = [];
  let usingFallback = false;
  try {
    commits = await fetchCommits();
  } catch (err) {
    commits = fallbackCommits;
    usingFallback = true;
  }

  return (
    <div className="w-full min-h-svh p-6">
      <div className="mb-4">
        <Link href="/">
          <Button variant="outline" size="sm">Back to Home</Button>
        </Link>
      </div>
      <h1 className="text-2xl font-bold mb-2">What's new</h1>
      <p className="text-gray-600 mb-6">
        Latest updates sourced from the project's Git commit history.
        {usingFallback && " (Temporary fallback shown due to API rate limits or network error.)"}
      </p>

      <ul className="space-y-4">
        {commits.map((c) => (
          <li key={c.sha} className="border-b pb-4">
            <div className="flex items-start justify-between gap-4">
              <a
                href={c.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-foreground/80"
              >
                {c.commit.message.split("\n")[0]}
              </a>
              <time className="text-gray-500 text-sm whitespace-nowrap">
                {formatDate(c.commit.author.date)}
              </time>
            </div>
            <div className="text-gray-500 text-sm mt-1">by {c.commit.author.name}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
import Link from "next/link";
import { Button } from "@/component/ui/button";