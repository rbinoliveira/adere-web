import * as avatar from './avatar'
import * as button from './button'
import * as card from './card'
import * as colorSwitcher from './color-switcher'
import * as dropdownMenu from './dropdown-menu'
import * as image from './image'
import * as inputText from './input-text'
import * as separator from './separator'
import * as sheet from './sheet'
import * as sidebar from './sidebar'
import * as skeleton from './skeleton'
import * as sonner from './sonner'
import * as tooltip from './tooltip'

export const UI = {
  ...avatar,
  ...button,
  ...colorSwitcher,
  ...image,
  ...inputText,
  ...separator,
  ...sidebar,
  ...skeleton,
  ...sonner,
}

export const PRIMITIVE = {
  ...card,
  ...dropdownMenu,
  ...sheet,
  ...tooltip,
}
