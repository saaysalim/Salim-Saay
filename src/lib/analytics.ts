const STORAGE_KEY = 'portfolio.analytics';

export interface AnalyticsSnapshot {
  pageViews: Record<string, number>;
  searchTerms: Record<string, number>;
  githubClicks: number;
  themeChanges: number;
  lastUpdated: string | null;
}

const defaultSnapshot = (): AnalyticsSnapshot => ({
  pageViews: {},
  searchTerms: {},
  githubClicks: 0,
  themeChanges: 0,
  lastUpdated: null,
});

export function getAnalyticsSnapshot(): AnalyticsSnapshot {
  if (typeof window === 'undefined') return defaultSnapshot();

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultSnapshot();
    return { ...defaultSnapshot(), ...JSON.parse(raw) } as AnalyticsSnapshot;
  } catch {
    return defaultSnapshot();
  }
}

function saveSnapshot(snapshot: AnalyticsSnapshot) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
}

export function trackPageView(page: string) {
  const snapshot = getAnalyticsSnapshot();
  snapshot.pageViews[page] = (snapshot.pageViews[page] ?? 0) + 1;
  snapshot.lastUpdated = new Date().toISOString();
  saveSnapshot(snapshot);
}

export function trackSearch(term: string) {
  const normalized = term.trim().toLowerCase();
  if (!normalized) return;

  const snapshot = getAnalyticsSnapshot();
  snapshot.searchTerms[normalized] = (snapshot.searchTerms[normalized] ?? 0) + 1;
  snapshot.lastUpdated = new Date().toISOString();
  saveSnapshot(snapshot);
}

export function trackGithubClick() {
  const snapshot = getAnalyticsSnapshot();
  snapshot.githubClicks += 1;
  snapshot.lastUpdated = new Date().toISOString();
  saveSnapshot(snapshot);
}

export function trackThemeChange() {
  const snapshot = getAnalyticsSnapshot();
  snapshot.themeChanges += 1;
  snapshot.lastUpdated = new Date().toISOString();
  saveSnapshot(snapshot);
}