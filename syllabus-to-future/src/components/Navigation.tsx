import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: "About", path: "/about" },
    { name: "Method", path: "/method" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 pt-4">
      <nav className="z-50 max-w-7xl mx-auto">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-[#FFC00D]">
                MUSTARD
              </span>
            </Link>

            {/* Desktop Navigation - Centered */}
            <div className="hidden lg:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-full shadow-sm px-8 py-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    isActive(item.path)
                      ? "text-primary"
                      : "text-foreground hover:text-primary"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Get Started Button - Right */}
            <div className="hidden lg:flex">
              <Button
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2"
                onClick={() => navigate("/contact")}
              >
                Get Started
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-700 hover:text-primary p-2"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="lg:hidden">
              <div className="px-4 pt-4 pb-6 space-y-2 bg-white border-t border-gray-200">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`block px-3 py-2 text-base font-medium transition-colors duration-200 ${
                      isActive(item.path)
                        ? "text-primary bg-primary/10"
                        : "text-foreground hover:text-primary hover:bg-muted"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="px-3 py-2">
                  <Button
                    className="w-full bg-[#FFC00D] hover:bg-[#FFC00D] text-white"
                    onClick={() => {
                      navigate("/contact");
                      setIsOpen(false);
                    }}
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
