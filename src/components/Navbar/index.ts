import { attachPropertiesToComponent } from '@/utils'

import NavbarItem from './Item'
import Navbar from './Navbar'

export default attachPropertiesToComponent(Navbar, { Item: NavbarItem })
export { NavbarItem }
