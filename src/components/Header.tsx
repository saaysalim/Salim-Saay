import { Menu, X } from "lucide-react";
import { useState } from "react";
import profileImage from '../assets/SalimSaay.png';

type PageType = 'about' | 'projects' | 'contact' | 'gallery' | 'blog' | 'video-gallery' | 'education' | 'post' | 'publications';
interface HeaderProps {
  readonly onNavigate: (page: PageType) => void;
}

export function Header({ onNavigate }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigation = (page: PageType) => {
    onNavigate(page);
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50" style={{ backgroundColor: 'var(--header-bg)' }}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left side with profile and brand */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/20">
              <img
                src={profileImage}
                alt="Salim Saay Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden sm:block">
              <div className="text-white font-medium">Salim Saay</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <button
              onClick={() => handleNavigation('about')}
              className="text-white/90 hover:text-white transition-colors text-sm"
            >
              Home
            </button>
            <button
              onClick={() => handleNavigation('post')}
              className="text-white/90 hover:text-white transition-colors text-sm"
            >
              Post
            </button>
            <button
              onClick={() => handleNavigation('about')}
              className="text-white/90 hover:text-white transition-colors text-sm"
            >
              About
            </button>
            <button
              onClick={() => handleNavigation('projects')}
              className="text-white/90 hover:text-white transition-colors text-sm"
            >
              Project
            </button>
            <button
              onClick={() => handleNavigation('publications')}
              className="text-white/90 hover:text-white transition-colors text-sm"
            >
              Publications
            </button>
            <button
              onClick={() => handleNavigation('contact')}
              className="text-white/90 hover:text-white transition-colors text-sm"
            >
              Contact
            </button>
            <button
              onClick={() => handleNavigation('gallery')}
              className="text-white/90 hover:text-white transition-colors text-sm"
            >
              Gallery
            </button>
            <button
              onClick={() => handleNavigation('video-gallery')}
              className="text-white/90 hover:text-white transition-colors text-sm"
            >
              VideoGallery
            </button>
            <button
              onClick={() => handleNavigation('education')}
              className="text-white/90 hover:text-white transition-colors text-sm"
            >
              Education
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-white"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 border-t border-white/20 pt-4">
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => handleNavigation('about')}
                className="text-left text-white/90 hover:text-white transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => handleNavigation('post')}
                className="text-left text-white/90 hover:text-white transition-colors"
              >
                Post
              </button>
              <button
                onClick={() => handleNavigation('about')}
                className="text-left text-white/90 hover:text-white transition-colors"
              >
                About
              </button>
              <button
                onClick={() => handleNavigation('projects')}
                className="text-left text-white/90 hover:text-white transition-colors"
              >
                Project
              </button>
              <button
                onClick={() => handleNavigation('publications')}
                className="text-left text-white/90 hover:text-white transition-colors"
              >
                Publications
              </button>
              <button
                onClick={() => handleNavigation('contact')}
                className="text-left text-white/90 hover:text-white transition-colors"
              >
                Contact
              </button>
              <button
                onClick={() => handleNavigation('gallery')}
                className="text-left text-white/90 hover:text-white transition-colors"
              >
                Gallery
              </button>
              <button
                onClick={() => handleNavigation('video-gallery')}
                className="text-left text-white/90 hover:text-white transition-colors"
              >
                VideoGallery
              </button>
              <button
                onClick={() => handleNavigation('education')}
                className="text-left text-white/90 hover:text-white transition-colors"
              >
                Education
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}