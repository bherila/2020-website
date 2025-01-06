type NavigationItem = {
  title: string
  href?: string
  requiresAuth?: boolean
  permission?: 'ax_spgp' | 'ax_phr'
  isProtected?: boolean
  subitems?: NavigationItem[]
}

type NavigationSection = {
  title: string
  items: NavigationItem[]
}

export const mainNavigation: NavigationItem[] = [
  { title: 'Recipes', href: '/recipes' },
  { title: 'Projects', href: '/projects' },
  {
    title: 'Tools',
    subitems: [
      { title: 'MaxMin 🔑', href: '/maxmin/MSFT', isProtected: true },
      { title: 'License Manager 🔑', href: '/keys', isProtected: true },
      { title: 'Finance - RSU 🔑', href: '/rsu', isProtected: true },
      { title: 'Finance - Payslips 🔑', href: '/payslip', isProtected: true },
      { title: 'Ski Pass Group Purchase 🔑', href: '/spgp', permission: 'ax_spgp', isProtected: true },
      { title: 'PHR 🔑', href: '/phr', permission: 'ax_phr', isProtected: true },
      { title: 'Accounts', href: '/finance' },
      { title: 'Bingo card generator', href: '/bingo' }
    ]
  }
]
