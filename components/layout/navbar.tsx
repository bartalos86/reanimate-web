"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CreditCard, Menu } from "lucide-react";
import { Search, BookOpen, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {logout} from "@/actions/logout"
import { useCurrentUser } from "@/hooks/use-current-user";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const user = useCurrentUser();
  const avatarUrl = user?.image;

  // Handle navbar transparency on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-sm shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <BookOpen className="h-8 w-8 text-orange-500" />
            <span className="text-xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              Reanimate
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/convert"
                    className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors"
                  >
                    Convert
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/study"
                    className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors"
                  >
                    Study
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/about"
                    className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors"
                  >
                    About
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center bg-orange-50 rounded-full px-3 py-1 border border-orange-200 hover:bg-orange-100 transition-colors">
                <CreditCard className="h-4 w-4 text-gray-500 mr-1.5" strokeWidth={1.5} />
                <span className="text-sm font-medium text-gray-700">
                  <span className="text-gray-600">{10}</span> Credits
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Credits</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-center gap-2 text-orange-600 cursor-pointer">
                  <CreditCard className="h-4 w-4" />
                  <span>Buy Credits</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2 text-gray-600 cursor-pointer">
                  <BookOpen className="h-4 w-4" />
                  <span>View History</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="focus:outline-none">
                  <Avatar className="h-8 w-8 border border-orange-200">
                    <AvatarImage src={avatarUrl || undefined} />
                    <AvatarFallback className="bg-orange-100 text-orange-700">US</AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/profile/settings" className="flex justify-center items-center">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <form action={() => logout()}>
                    <button type="submit">Log out</button>
                  </form>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-700">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-6 w-6 text-orange-500" />
                      <span className="text-xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                        Reanimate
                      </span>
                    </div>
                  </SheetTitle>
                  <SheetDescription>Digital book revitalization platform</SheetDescription>
                </SheetHeader>
                <div className="space-y-4">
                  <div className="px-3 py-2">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                      <Input placeholder="Search books..." className="pl-8" />
                    </div>
                  </div>
                  <nav className="flex flex-col space-y-1">
                    <Link
                      href="/convert"
                      className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                    >
                      Convert
                    </Link>
                    <Link
                      href="/study"
                      className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                    >
                      Study
                    </Link>
                    <Link
                      href="/about"
                      className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                    >
                      About
                    </Link>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Full-width search input (conditionally rendered) */}
        {searchOpen && (
          <div className="absolute left-0 right-0 top-full mt-1 p-4 bg-white shadow-lg rounded-b-lg border-t border-gray-100 animate-in fade-in">
            <div className="container mx-auto flex items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search for books, authors, or topics..."
                  className="pl-10 pr-16 py-6 w-full text-base"
                  autoFocus
                />
                <div className="absolute right-3 top-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSearchOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}