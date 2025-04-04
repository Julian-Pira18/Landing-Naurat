
import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Globe, Menu, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("ES");
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

  const changeLanguage = (lang: string) => {
    setCurrentLanguage(lang);
    console.log(`Language changed to: ${lang}`);
  };

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

          {/* Desktop Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className="rounded-full border-[#312c86]/20 hover:bg-[#312c86]/5 hover:border-[#312c86]/30 flex items-center gap-1 px-3"
              >
                <Globe className="h-4 w-4 text-[#312c86]" />
                <span className="font-medium text-[#312c86]">{currentLanguage}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-24">
              <DropdownMenuItem 
                className="flex justify-center cursor-pointer hover:bg-[#312c86]/5 hover:text-[#312c86]"
                onClick={() => changeLanguage("ES")}
              >
                Español
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="flex justify-center cursor-pointer hover:bg-[#312c86]/5 hover:text-[#312c86]"
                onClick={() => changeLanguage("EN")}
              >
                English
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

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
            <div className="flex items-center gap-3 md:hidden">
              {/* Mobile Language Selector */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="rounded-full border-[#312c86]/20 hover:bg-[#312c86]/5 hover:border-[#312c86]/30 p-2"
                  >
                    <Globe className="h-5 w-5 text-[#312c86]" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-24">
                  <DropdownMenuItem 
                    className="flex justify-center cursor-pointer hover:bg-[#312c86]/5 hover:text-[#312c86]"
                    onClick={() => changeLanguage("ES")}
                  >
                    Español
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="flex justify-center cursor-pointer hover:bg-[#312c86]/5 hover:text-[#312c86]"
                    onClick={() => changeLanguage("EN")}
                  >
                    English
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <SheetTrigger asChild>
                <button 
                  className="relative z-10 p-2 rounded-full hover:bg-black/5 transition-colors" 
                  aria-label="Toggle menu"
                >
                  <Menu className="h-6 w-6" />
                </button>
              </SheetTrigger>
            </div>
            <SheetContent side="right" className="p-0 border-none w-full h-full">
              <div className="flex flex-col h-full bg-gradient-to-b from-[#f8f8ff] to-white">
                <div className="flex justify-between items-center p-6 border-b">
                  <p className="text-xl font-bold text-[#312c86]">Naurat</p>
                  <SheetClose className="rounded-full p-2 hover:bg-black/5 transition-colors">
                    <X className="h-5 w-5" />
                  </SheetClose>
                </div>

                <nav className="flex flex-col p-6 flex-grow">
                  {navLinks.map((link, index) => (
                    <a 
                      key={link.href} 
                      href={link.href} 
                      className={cn(
                        "py-6 text-xl font-medium text-gray-800 transition-all hover:text-[#312c86]",
                        index < navLinks.length - 1 && "border-b border-gray-100"
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </a>
                  ))}
                  
                  {/* Mobile Language Switcher in Menu */}
                  <div className="mt-6 border-b border-gray-100 pb-6">
                    <p className="text-gray-500 mb-4 text-lg">Idioma</p>
                    <div className="flex gap-4">
                      <button
                        onClick={() => changeLanguage("ES")}
                        className={cn(
                          "px-4 py-2 rounded-xl border font-medium text-lg transition-all",
                          currentLanguage === "ES" 
                            ? "bg-[#312c86] text-white border-[#312c86]" 
                            : "border-gray-200 text-gray-700 hover:border-[#312c86]/30"
                        )}
                      >
                        Español
                      </button>
                      <button
                        onClick={() => changeLanguage("EN")}
                        className={cn(
                          "px-4 py-2 rounded-xl border font-medium text-lg transition-all",
                          currentLanguage === "EN" 
                            ? "bg-[#312c86] text-white border-[#312c86]" 
                            : "border-gray-200 text-gray-700 hover:border-[#312c86]/30"
                        )}
                      >
                        English
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-auto mb-8">
                    <a
                      href="https://calendly.com/team-naurat-kdlj/30min"
                      target='_blank'
                      className="block w-full py-4 px-5 rounded-xl bg-[#312c86] text-white text-center font-medium text-lg transition-all transform hover:translate-y-[-2px] hover:shadow-lg"
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
