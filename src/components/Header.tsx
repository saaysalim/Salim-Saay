import { Menu, Moon, Search, Sun, X } from "lucide-react";
import { useState } from "react";
import profileImage from '../assets/SalimSaay.png';
import { pageDescriptors, PageType, primaryNavItems } from "../lib/navigation";

interface HeaderProps {
  readonly onNavigate: (page: PageType) => void;
  readonly isDarkMode: boolean;
  readonly onToggleTheme: () => void;
}

export function Header({ onNavigate, isDarkMode, onToggleTheme }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigation = (page: PageType) => {
    onNavigate(page);
    setIsMenuOpen(false);
  };

  const navItems = primaryNavItems.map((page) => {
    const descriptor = pageDescriptors.find((entry) => entry.page === page);
    return { page, label: descriptor?.label ?? page };
  });

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
          <nav className="hidden xl:flex items-center space-x-5">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => handleNavigation(item.page)}
                className="text-white/90 hover:text-white transition-colors text-sm"
              >
                {item.page === 'search' ? (
                  <span className="inline-flex items-center gap-1.5"><Search className="w-4 h-4" /> {item.label}</span>
                ) : item.label}
              </button>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3 ml-4">
            <button
              onClick={onToggleTheme}
              className="inline-flex items-center justify-center rounded-full border border-white/20 p-2 text-white hover:bg-white/10 transition-colors"
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 xl:hidden">
            <button
              onClick={onToggleTheme}
              className="p-2 text-white border border-white/20 rounded-full"
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="xl:hidden p-2 text-white"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="xl:hidden mt-4 pb-4 border-t border-white/20 pt-4">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => handleNavigation(item.page)}
                  className="text-left text-white/90 hover:text-white transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}