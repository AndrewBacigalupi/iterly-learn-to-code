"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HamburgerMenu } from "@/components/ui/hamburger-menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Code, LogOut, User } from "lucide-react";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";

export function Navbar({ session }: { session: Session | null }) {
  // @ts-ignore - session.user may have isAdmin from database
  const isAdmin = session?.user?.isAdmin === true;

  const menuItems = [
    { title: "Home", href: "/" },
    { title: "Puzzles", href: "/puzzles/categories" },
    { title: "Learn", href: "/learn" },
    { title: "Contribute", href: "/contribute" },
    ...(session ? [{ title: "Profile", href: "/profile" }] : []),
    ...(isAdmin ? [{ title: "Admin", href: "/admin" }] : []),
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center mx-auto">
        {/* Mobile Hamburger Menu */}
        <div className="md:hidden">
          <HamburgerMenu menuItems={menuItems} />
        </div>

        {/* Desktop Navigation */}
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
              <img className="w-6 mr-4" src="/rocket2.svg"/>
            <span className="hidden text-xl font-bold sm:inline-block tracking-wide">
              Iter<span className="text-blue-300 text-xl font-style: italic">ly</span>
            </span>
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/puzzles/categories"
                  className={navigationMenuTriggerStyle()}
                >
                  Puzzles
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/learn"
                  className={navigationMenuTriggerStyle()}
                >
                  Learn
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/contribute"
                  className={navigationMenuTriggerStyle()}
                >
                  Contribute
                </NavigationMenuLink>
              </NavigationMenuItem>
              {isAdmin && (
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/admin"
                    className={navigationMenuTriggerStyle()}
                  >
                    Admin
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Mobile Logo (centered when hamburger is present) */}
        <div className="flex md:hidden flex-1 ml-2">
          <Link href="/" className="flex items-center space-x-2">
            <img className="w-6" src="/rocket2.svg" alt="Learn to Scode" />
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* This space is now used for mobile logo above */}
          </div>
          <nav className="flex items-center">
            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full cursor-pointer"
                  >
                    <Avatar className="h-8 w-8 mr-2 cursor-pointer">
                      <AvatarImage
                        src={session.user?.image || ""}
                        alt={session.user?.name || ""}
                      />
                      <AvatarFallback>
                        {session.user?.name?.charAt(0) ||
                          session.user?.email?.charAt(0) ||
                          "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      {session.user?.name && (
                        <p className="font-medium">{session.user.name}</p>
                      )}
                      {session.user?.email && (
                        <p className="w-[200px] truncate text-sm text-muted-foreground">
                          {session.user.email}
                        </p>
                      )}
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onSelect={(event) => {
                      event.preventDefault();
                      signOut();
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="ghost"
                onClick={() => signIn("github")}
                className="flex items-center gap-2 cursor-pointer"
              >
                Sign in
              </Button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
