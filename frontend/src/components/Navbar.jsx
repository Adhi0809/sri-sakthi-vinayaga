import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Wrench } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
    { name: "Achievements", href: "#achievements" },
    { name: "Enroll", href: "#enroll" },
  ];

  const scrollToSection = (href) => {
    setIsOpen(false);
    if (location.pathname !== "/") {
      window.location.href = "/" + href;
      return;
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      data-testid="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-md bg-white/90 border-b border-slate-200/50 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            to="/"
            data-testid="logo-link"
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/25 group-hover:shadow-orange-500/40 transition-shadow duration-300">
              <Wrench className="w-5 h-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-slate-900 tracking-tight leading-none">
                Sri Sakthi Vinayaga
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                Mobile Services & Institute
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                data-testid={`nav-${link.name.toLowerCase()}`}
                onClick={() => scrollToSection(link.href)}
                className="text-slate-600 hover:text-orange-600 font-medium transition-colors duration-200 relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <Button
              data-testid="contact-quote-btn"
              onClick={() => scrollToSection("#enroll")}
              className="bg-orange-600 hover:bg-orange-700 text-white shadow-lg shadow-orange-600/20 hover:shadow-orange-600/30 transition-all duration-300 rounded-lg px-6"
            >
              <Phone className="w-4 h-4 mr-2" />
              Contact for Quote
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            data-testid="mobile-menu-btn"
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-slate-600 hover:text-orange-600 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-slate-100 shadow-lg"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  data-testid={`mobile-nav-${link.name.toLowerCase()}`}
                  onClick={() => scrollToSection(link.href)}
                  className="block w-full text-left text-slate-600 hover:text-orange-600 font-medium py-2 transition-colors"
                >
                  {link.name}
                </button>
              ))}
              <Button
                data-testid="mobile-contact-btn"
                onClick={() => scrollToSection("#enroll")}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white mt-4"
              >
                <Phone className="w-4 h-4 mr-2" />
                Contact for Quote
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
