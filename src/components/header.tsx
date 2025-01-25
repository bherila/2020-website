'use client'
import Link from 'next/link'
import { type sessionType } from '@/lib/sessionSchema'
import { ThemeToggle } from './ThemeToggle'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import { useState } from 'react'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

interface HeaderProps {
  session: sessionType
}

export default function Header({ session }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false)

  const NavigationItems = () => (
    <>
      <NavigationMenuItem>
        <Link href="/recipes" className="text-sm font-medium text-muted-foreground hover:text-primary px-4 py-2">
          Recipes
        </Link>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <Link href="/projects" className="text-sm font-medium text-muted-foreground hover:text-primary px-4 py-2">
          Projects
        </Link>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuTrigger>Tools</NavigationMenuTrigger>
        <NavigationMenuContent>
          <div className="grid gap-3 p-4 w-[400px] md:w-[500px]">
            <NavigationMenuLink asChild>
              <Link
                href="/maxmin/MSFT"
                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
              >
                MaxMin 🔑
              </Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              <Link
                href="/keys/"
                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
              >
                License Manager 🔑
              </Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              <Link
                href="/rsu/"
                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
              >
                Finance - RSU 🔑
              </Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              <Link
                href="/payslip/"
                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
              >
                Finance - Payslips 🔑
              </Link>
            </NavigationMenuLink>
            {session?.ax_spgp && (
              <NavigationMenuLink asChild>
                <Link
                  href="/spgp"
                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                >
                  Ski Pass Group Purchase 🔑
                </Link>
              </NavigationMenuLink>
            )}
            {session?.ax_phr && (
              <NavigationMenuLink asChild>
                <Link
                  href="/phr"
                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                >
                  PHR 🔑
                </Link>
              </NavigationMenuLink>
            )}
            <NavigationMenuLink asChild>
              <Link
                href="/finance/"
                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
              >
                Accounts
              </Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              <Link
                href="/bingo/"
                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
              >
                Bingo card generator
              </Link>
            </NavigationMenuLink>
          </div>
        </NavigationMenuContent>
      </NavigationMenuItem>
    </>
  )

  const AuthButtons = () =>
    !session?.uid ? (
      <div className="flex gap-4">
        <Button variant="ghost" asChild>
          <Link href="/auth/sign-in">Sign in</Link>
        </Button>
        <Button asChild>
          <Link href="/auth/sign-up">Sign up</Link>
        </Button>
      </div>
    ) : (
      <div className="flex gap-4">
        <Button variant="ghost" asChild>
          <Link href="/my-account">My Account</Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link href="/api/sign-out">Sign out</Link>
        </Button>
      </div>
    )

  return (
    <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 fixed w-full top-0 z-50 border-b">
      <div className="container flex h-16 items-center justify-between px-4 mx-auto">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-lg font-semibold hover:text-primary">
            Ben Herila
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationItems />
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />

          <div className="hidden md:block">
            <AuthButtons />
          </div>

          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4">
                  <Link href="/recipes" className="text-sm font-medium" onClick={() => setIsOpen(false)}>
                    Recipes
                  </Link>
                  <Link href="/projects" className="text-sm font-medium" onClick={() => setIsOpen(false)}>
                    Projects
                  </Link>
                  <div className="space-y-4">
                    <h4 className="font-medium">Tools</h4>
                    <div className="grid gap-2">
                      <Link href="/maxmin/MSFT" className="text-sm" onClick={() => setIsOpen(false)}>
                        MaxMin 🔑
                      </Link>
                      <Link href="/keys/" className="text-sm" onClick={() => setIsOpen(false)}>
                        License Manager 🔑
                      </Link>
                      <Link href="/rsu/" className="text-sm" onClick={() => setIsOpen(false)}>
                        Finance - RSU 🔑
                      </Link>
                      <Link href="/payslip/" className="text-sm" onClick={() => setIsOpen(false)}>
                        Finance - Payslips 🔑
                      </Link>
                      {session?.ax_phr && (
                        <Link href="/phr" className="text-sm" onClick={() => setIsOpen(false)}>
                          PHR 🔑
                        </Link>
                      )}
                      <Link href="/finance/" className="text-sm" onClick={() => setIsOpen(false)}>
                        Accounts
                      </Link>
                      <Link href="/bingo/" className="text-sm" onClick={() => setIsOpen(false)}>
                        Bingo card generator
                      </Link>
                    </div>
                  </div>
                  <div className="mt-4">
                    <AuthButtons />
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
