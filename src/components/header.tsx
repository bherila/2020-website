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
import { mainNavigation } from '@/lib/navigationConfig'

interface HeaderProps {
  session: sessionType
}

export default function Header({ session }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false)

  const NavigationItems = () => (
    <>
      {mainNavigation.map((item) => (
        <NavigationMenuItem key={item.title}>
          {item.href ? (
            <Link href={item.href} className="text-sm font-medium text-muted-foreground hover:text-primary px-4 py-2">
              {item.title}
            </Link>
          ) : item.subitems ? (
            <>
              <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-4 w-[400px] md:w-[500px]">
                  {item.subitems.map((subitem) => {
                    if (subitem.permission && !session?.[subitem.permission]) return null
                    return (
                      <NavigationMenuLink key={subitem.href} asChild>
                        <Link
                          href={subitem.href!}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          {subitem.title}
                        </Link>
                      </NavigationMenuLink>
                    )
                  })}
                </div>
              </NavigationMenuContent>
            </>
          ) : null}
        </NavigationMenuItem>
      ))}
    </>
  )

  const AuthButtons = () =>
    !session?.uid ? (
      <div className="flex gap-4">
        <Button variant="ghost" asChild>
          <Link href="/auth/sign-in">Sign in</Link>
        </Button>
        <Button variant="ghost" asChild>
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
      <div className="container-fluid flex h-16 items-center justify-between px-4">
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

        <div className="flex items-center gap-4 ml-auto">
          <ThemeToggle />

          {/* Desktop Auth Buttons */}
          <div className="hidden md:block">
            <AuthButtons />
          </div>

          {/* Mobile Menu Button */}
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
                  {mainNavigation.map((item) =>
                    item.href ? (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="text-sm font-medium"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.title}
                      </Link>
                    ) : item.subitems ? (
                      <div key={item.title} className="space-y-4">
                        <h4 className="font-medium">{item.title}</h4>
                        <div className="grid gap-2">
                          {item.subitems.map((subitem) => {
                            if (subitem.permission && !session?.[subitem.permission]) return null
                            return (
                              <Link
                                key={subitem.href}
                                href={subitem.href!}
                                className="text-sm"
                                onClick={() => setIsOpen(false)}
                              >
                                {subitem.title}
                              </Link>
                            )
                          })}
                        </div>
                      </div>
                    ) : null,
                  )}
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
