// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'About Me',
      icon: HomeOutline,
      path: '/'
    },
    {
      title: 'Projects',
      icon: AccountCogOutline,
      path: '/projects/'
    },
    {
      sectionTitle: 'Tools'
    },
    {
      title: 'MaxMin Stock Analysis',
      icon: FormatLetterCase,
      path: '/maxmin/MSFT'
    },
    {
      title: 'EV Database',
      path: '/ev-database',
      icon: GoogleCirclesExtended
    },
    {
      title: 'Transaction Tracer',
      icon: CreditCardOutline,
      path: '/transaction-tracer'
    },
    {
      title: 'Tax Planner',
      icon: Table,
      path: '/tax-planner'
    },
    {
      sectionTitle: 'Other'
    },
    {
      title: 'Login',
      icon: Login,
      path: '/pages/login',
      openInNewTab: true
    },
    {
      title: 'Register',
      icon: AccountPlusOutline,
      path: '/pages/register',
    },
  ]
}

export default navigation
