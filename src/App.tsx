import { useState } from "react";
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

type PageType = 'about' | 'projects' | 'contact' | 'gallery' | 'blog' | 'video-gallery' | 'education' | 'post' | 'publications';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('post');

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
      default:
        return <Education />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onNavigate={setCurrentPage} />
      <main className="pt-16">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}