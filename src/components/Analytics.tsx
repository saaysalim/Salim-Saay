import { useMemo } from "react";
import { BarChart3, MousePointerClick, MoonStar, Search as SearchIcon } from "lucide-react";
import { getAnalyticsSnapshot } from "../lib/analytics";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export function Analytics() {
  const snapshot = getAnalyticsSnapshot();

  const topPages = useMemo(
    () => Object.entries(snapshot.pageViews).sort((a, b) => b[1] - a[1]),
    [snapshot.pageViews],
  );

  const topSearches = useMemo(
    () => Object.entries(snapshot.searchTerms).sort((a, b) => b[1] - a[1]).slice(0, 8),
    [snapshot.searchTerms],
  );

  const totalPageViews = topPages.reduce((sum, [, count]) => sum + count, 0);

  return (
    <section className="py-20 px-4 bg-background min-h-screen">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl mb-4">Analytics</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Local portfolio usage insights captured in the browser, including page views, searches, theme toggles, and GitHub interactions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3"><BarChart3 className="w-5 h-5" /> Total Page Views</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold">{totalPageViews}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3"><SearchIcon className="w-5 h-5" /> Unique Searches</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold">{Object.keys(snapshot.searchTerms).length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3"><MoonStar className="w-5 h-5" /> Theme Changes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold">{snapshot.themeChanges}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3"><MousePointerClick className="w-5 h-5" /> GitHub Clicks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold">{snapshot.githubClicks}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Most Visited Sections</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {topPages.length === 0 && <p className="text-muted-foreground">No page activity recorded yet.</p>}
              {topPages.map(([page, count]) => (
                <div key={page} className="flex items-center justify-between border-b border-border pb-3 last:border-b-0">
                  <span className="capitalize">{page.replaceAll('-', ' ')}</span>
                  <span className="font-medium">{count}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Search Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {topSearches.length === 0 && <p className="text-muted-foreground">No search activity recorded yet.</p>}
              {topSearches.map(([term, count]) => (
                <div key={term} className="flex items-center justify-between border-b border-border pb-3 last:border-b-0">
                  <span>{term}</span>
                  <span className="font-medium">{count}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <p className="text-sm text-muted-foreground mt-8 text-center">
          Last updated: {snapshot.lastUpdated ? new Date(snapshot.lastUpdated).toLocaleString() : 'No activity yet'}
        </p>
      </div>
    </section>
  );
}