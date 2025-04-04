
import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  // Change navbar style on scroll
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const navLinks = [
    { name: "Cómo funciona", href: "#how-it-works" },
    { name: "Beneficios", href: "#benefits" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300",
        scrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        <a href="#" className="relative z-10 text-2xl font-bold tracking-tight">
          Naurat
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="link-underline text-sm font-medium tracking-wide">
              {link.name}
            </a>
          ))}

          <a
            href="https://calendly.com/team-naurat-kdlj/30min"
            target='_blank'
            className="btn-hover-effect px-5 py-2 rounded-md bg-[#312c86] text-white text-sm font-medium tracking-wide"
          >
            Comenzar Ahora
          </a>
        </nav>

        {/* Mobile Navigation */}
        {isMobile && (
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button 
                className="md:hidden relative z-10 p-2 rounded-full hover:bg-black/5 transition-colors" 
                aria-label="Toggle menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="p-0 border-none">
              <div className="flex flex-col h-full bg-gradient-to-b from-[#f8f8ff] to-white">
                <div className="flex justify-between items-center p-6 border-b">
                  <p className="text-xl font-bold text-[#312c86]">Naurat</p>
                  <SheetClose className="rounded-full p-2 hover:bg-black/5 transition-colors">
                    <X className="h-5 w-5" />
                  </SheetClose>
                </div>

                <nav className="flex flex-col p-6">
                  {navLinks.map((link, index) => (
                    <a 
                      key={link.href} 
                      href={link.href} 
                      className={cn(
                        "py-4 text-lg font-medium text-gray-800 transition-all hover:text-[#312c86]",
                        index < navLinks.length - 1 && "border-b border-gray-100"
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </a>
                  ))}
                  
                  <div className="mt-8">
                    <a
                      href="https://calendly.com/team-naurat-kdlj/30min"
                      target='_blank'
                      className="block w-full py-3 px-5 rounded-xl bg-[#312c86] text-white text-center font-medium transition-all transform hover:translate-y-[-2px] hover:shadow-lg"
                    >
                      Comenzar Ahora
                    </a>
                  </div>
                </nav>
                
                <div className="mt-auto p-6 text-center text-sm text-gray-500">
                  © 2025 Naurat. Todos los derechos reservados.
                </div>
              </div>
            </SheetContent>
          </Sheet>
        )}
      </div>
    </header>
  );
};

export default Navbar;
