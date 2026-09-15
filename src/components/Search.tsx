import { useMemo, useState } from "react";
import { Search as SearchIcon, ArrowRight } from "lucide-react";
import { pageDescriptors, PageType } from "../lib/navigation";
import { trackSearch } from "../lib/analytics";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface SearchProps {
  readonly onNavigate: (page: PageType) => void;
}

export function Search({ onNavigate }: SearchProps) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return pageDescriptors;

    return pageDescriptors.filter((entry) => {
      const haystack = [entry.label, entry.description, ...entry.keywords].join(" ").toLowerCase();
      return haystack.includes(normalized);
    });
  }, [query]);

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    trackSearch(query);
  };

  return (
    <section className="py-20 px-4 bg-background min-h-screen">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl mb-4">Search</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find sections, research content, media, and portfolio capabilities from one place.
          </p>
        </div>

        <Card className="mb-8 shadow-sm">
          <CardContent className="p-6">
            <form onSubmit={handleSearchSubmit} className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for publications, projects, videos, analytics, GitHub..."
                  className="pl-12 h-12 text-base"
                />
              </div>
              <Button type="submit" className="h-12 px-6">Search</Button>
            </form>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          {results.map((result) => (
            <Card key={result.page} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center justify-between gap-4">
                  <span>{result.label}</span>
                  <Button size="sm" onClick={() => onNavigate(result.page)}>
                    Open
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{result.description}</p>
                <div className="flex flex-wrap gap-2">
                  {result.keywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {results.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No matching sections were found for your search.
          </div>
        )}
      </div>
    </section>
  );
}