
import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu, X } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";

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
          <Drawer open={isOpen} onOpenChange={setIsOpen}>
            <DrawerTrigger asChild>
              <button className="md:hidden relative z-10 p-2" aria-label="Toggle menu">
                <Menu className="h-6 w-6" />
              </button>
            </DrawerTrigger>
            <DrawerContent className="h-[60vh] rounded-t-3xl bg-white p-6">
              <div className="flex justify-between items-center mb-6">
                <p className="text-xl font-bold">Menú</p>
                <DrawerClose asChild>
                  <button className="p-2" aria-label="Close menu">
                    <X className="h-5 w-5" />
                  </button>
                </DrawerClose>
              </div>

              <nav className="flex flex-col space-y-6">
                {navLinks.map((link) => (
                  <a 
                    key={link.href} 
                    href={link.href} 
                    className="text-lg font-medium border-b border-gray-100 pb-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </a>
                ))}
                
                <a
                  href="https://calendly.com/team-naurat-kdlj/30min"
                  target='_blank'
                  className="btn-hover-effect mt-4 px-5 py-3 rounded-md bg-[#312c86] text-white text-base font-medium tracking-wide text-center"
                >
                  Comenzar Ahora
                </a>
              </nav>
            </DrawerContent>
          </Drawer>
        )}
      </div>
    </header>
  );
};

export default Navbar;
