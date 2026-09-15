import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { About } from "./components/About";
import { Projects } from "./components/Projects";
import { Contact } from "./components/Contact";
import { Education } from "./components/Education";
import { Footer } from "./components/Footer";
import { Blog } from "./components/Blog";
import { Gallery } from "./components/Gallery";
import { VideoGallery } from "./components/VideoGallery";
import { PostFeed } from "./components/PostFeed";
import { Publications } from "./components/Publications";
import { Search } from "./components/Search";
import { Analytics } from "./components/Analytics";
import { GitHubIntegration } from "./components/GitHubIntegration";
import { PageType } from "./lib/navigation";
import { trackPageView, trackThemeChange } from "./lib/analytics";

const THEME_STORAGE_KEY = 'portfolio.theme';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('post');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === 'dark') {
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    window.localStorage.setItem(THEME_STORAGE_KEY, isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  useEffect(() => {
    trackPageView(currentPage);
  }, [currentPage]);

  const handleThemeToggle = () => {
    setIsDarkMode((value) => !value);
    trackThemeChange();
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'about':
        return <About />;
      case 'projects':
        return <Projects />;
      case 'contact':
        return <Contact />;
      case 'gallery':
        return <Gallery />;
      case 'blog':
        return <Blog />;
      case 'video-gallery':
        return <VideoGallery />;
      case 'post':
        return <PostFeed />;
      case 'education':
        return <Education />;
      case 'publications':
        return <Publications />;
      case 'search':
        return <Search onNavigate={setCurrentPage} />;
      case 'analytics':
        return <Analytics />;
      case 'github':
        return <GitHubIntegration />;
      default:
        return <Education />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        onNavigate={setCurrentPage}
        isDarkMode={isDarkMode}
        onToggleTheme={handleThemeToggle}
      />
      <main className="pt-16">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}