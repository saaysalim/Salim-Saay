import { useEffect, useState } from "react";
import { ExternalLink, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { trackGithubClick } from "../lib/analytics";

const GitHubMark = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-label="GitHub"
  >
    <path d="M12 2C6.477 2 2 6.484 2 12.012c0 4.418 2.867 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.157-1.11-1.465-1.11-1.465-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.529 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.919.678 1.852 0 1.336-.012 2.417-.012 2.747 0 .268.18.579.688.481C19.135 20.174 22 16.426 22 12.012 22 6.484 17.523 2 12 2z" />
  </svg>
);

interface GithubProfile {
  login: string;
  avatar_url: string;
  html_url: string;
  name: string | null;
  bio: string | null;
  followers: number;
  following: number;
  public_repos: number;
}

interface GithubRepo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
}

const username = "saaysalim";

export function GitHubIntegration() {
  const [profile, setProfile] = useState<GithubProfile | null>(null);
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadGithubData() {
      setLoading(true);
      setError(null);

      try {
        const [profileRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`),
        ]);

        if (!profileRes.ok || !reposRes.ok) {
          throw new Error("GitHub data could not be loaded right now.");
        }

        const profileData = (await profileRes.json()) as GithubProfile;
        const repoData = (await reposRes.json()) as GithubRepo[];

        if (!active) return;
        setProfile(profileData);
        setRepos(repoData);
      } catch (err) {
        if (!active) return;
        setError(err instanceof Error ? err.message : "Unexpected GitHub error.");
      } finally {
        if (active) setLoading(false);
      }
    }

    loadGithubData();

    return () => {
      active = false;
    };
  }, []);

  const handleGithubOpen = () => {
    trackGithubClick();
  };

  return (
    <section className="py-20 px-4 bg-background min-h-screen">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl mb-4">GitHub Integration</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Live GitHub profile data and recently updated repositories fetched directly from the GitHub public API.
          </p>
        </div>

        {loading && (
          <div className="text-center text-muted-foreground py-16">Loading GitHub profile and repositories...</div>
        )}

        {error && !loading && (
          <Card>
            <CardContent className="p-8 text-center text-muted-foreground">{error}</CardContent>
          </Card>
        )}

        {profile && !loading && !error && (
          <>
            <Card className="mb-8 overflow-hidden">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-[140px_1fr] gap-8 items-center">
                  <img
                    src={profile.avatar_url}
                    alt={profile.login}
                    className="w-32 h-32 rounded-full object-cover border border-border"
                  />
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <GitHubMark className="w-6 h-6" />
                      <h2 className="text-2xl font-semibold">{profile.name ?? profile.login}</h2>
                    </div>
                    <p className="text-muted-foreground mb-6">{profile.bio ?? 'GitHub profile for portfolio integration.'}</p>
                    <div className="flex flex-wrap gap-6 mb-6">
                      <div><span className="font-semibold">{profile.public_repos}</span> repositories</div>
                      <div><span className="font-semibold">{profile.followers}</span> followers</div>
                      <div><span className="font-semibold">{profile.following}</span> following</div>
                    </div>
                    <Button asChild onClick={handleGithubOpen}>
                      <a href={profile.html_url} target="_blank" rel="noopener noreferrer">
                        Open GitHub Profile
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {repos.map((repo) => (
                <Card key={repo.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-start justify-between gap-4">
                      <span>{repo.name}</span>
                      <Star className="w-5 h-5 text-muted-foreground" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 min-h-12">
                      {repo.description ?? 'No repository description provided.'}
                    </p>
                    <div className="flex items-center justify-between text-sm mb-4">
                      <span>{repo.language ?? 'Unknown'}</span>
                      <span>{repo.stargazers_count} stars</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        Updated {new Date(repo.updated_at).toLocaleDateString()}
                      </span>
                      <Button variant="outline" size="sm" asChild onClick={handleGithubOpen}>
                        <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                          View
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}