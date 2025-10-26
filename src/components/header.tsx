'use client'
import Link from 'next/link'
import { ThemeToggle } from './ThemeToggle'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import CustomLink from './link'
import authClient from '@/lib/auth-client'

interface HeaderProps {
  session: any
}

const navigationItems = [
  { label: 'Recipes', href: '/recipes' },
  { label: 'Projects', href: '/projects' },
  {
    label: 'Tools',
    subItems: [
      { label: 'MaxMin 🔑', href: '/maxmin/MSFT' },
      { label: 'License Manager 🔑', href: '/keys/' },
      { label: 'Finance - RSU 🔑', href: '/rsu/' },
      { label: 'Finance - Payslips 🔑', href: '/payslip/' },
      { label: 'PHR 🔑', href: '/phr', condition: 'ax_phr' },
      { label: 'Accounts', href: '/finance/' },
      { label: 'Bingo card generator', href: '/bingo/' },
      { label: 'Capital Loss Carryover Worksheet', href: '/irs-schedule-d-capital-loss-carryover-worksheet/' },
    ],
    href: '#',
  },
]

export default function Header({ session }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false)

  const NavigationItems = () => (
    <>
      {navigationItems.map((item) => (
        <NavigationMenuItem key={item.label}>
          {item.subItems ? (
            <>
              <NavigationMenuTrigger className="flex items-center justify-between w-full">
                {item.label}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-4 w-[400px] md:w-[500px]">
                  {item.subItems.map(
                    (subItem) =>
                      (!subItem.condition || session?.[subItem.condition]) && (
                        <NavigationMenuLink asChild key={subItem.label}>
                          <CustomLink
                            noUnderline
                            href={subItem.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            {subItem.label}
                          </CustomLink>
                        </NavigationMenuLink>
                      ),
                  )}
                </div>
              </NavigationMenuContent>
            </>
          ) : (
            <CustomLink
              noUnderline
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary px-4 py-2"
            >
              {item.label}
            </CustomLink>
          )}
        </NavigationMenuItem>
      ))}
    </>
  )
  const pathname = usePathname()
  const AuthButtons = () =>
    !session?.uid ? (
      <div className="flex gap-4">
        <Button variant="ghost" asChild>
          <CustomLink href="/sign-in-chooser" noUnderline>
            Sign in
          </CustomLink>
        </Button>
        <Button asChild>
          <CustomLink href="/auth/sign-up" noUnderline>
            Sign up
          </CustomLink>
        </Button>
      </div>
    ) : (
      <div className="flex gap-4">
        <Button variant="ghost" asChild>
          <CustomLink href="https://ac.bherila.net" target="_blank" noUnderline>
            ActiveCollab
          </CustomLink>
        </Button>
        <Button variant="ghost" asChild>
          <CustomLink href="/my-account" noUnderline>
            My Account
          </CustomLink>
        </Button>
        <Button variant="ghost" asChild>
          <CustomLink
            href="/"
            noUnderline
            onClick={async (e) => {
              e.preventDefault()
              await authClient.signOut()
              window.location.href = '/?signedOut=true'
            }}
          >
            Sign out
          </CustomLink>
        </Button>
      </div>
    )

  return (
    <header
      aria-label="Main navigation"
      className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 fixed w-full top-0 z-50 border-b"
    >
      <div className="container flex h-16 items-center justify-between px-4 mx-auto">
        <div className="flex items-center gap-6">
          <CustomLink noUnderline href="/" className="text-lg font-semibold hover:text-primary">
            Ben Herila
          </CustomLink>

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
                  {navigationItems.map((item) => (
                    <div key={item.label}>
                      <CustomLink href={item.href} className="text-sm font-medium" onClick={() => setIsOpen(false)}>
                        {item.label}
                      </CustomLink>
                      {item.subItems && (
                        <div className="space-y-4">
                          <h4 className="font-medium">{item.label}</h4>
                          <div className="grid gap-2">
                            {item.subItems.map(
                              (subItem) =>
                                (!subItem.condition || session?.[subItem.condition]) && (
                                  <CustomLink
                                    key={subItem.label}
                                    href={subItem.href}
                                    className="text-sm"
                                    onClick={() => setIsOpen(false)}
                                  >
                                    {subItem.label}
                                  </CustomLink>
                                ),
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
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
