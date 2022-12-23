import classnames from 'classnames'
import { FunctionComponent } from 'preact'

import { NativeProps } from '@/utils'

type ItemProps = {
  title: string
} & NativeProps

const Item: FunctionComponent<ItemProps> = ({ title, className, style }) => (
  <li class={classnames('mx-4 cursor-pointer', className)} style={style}>
    {title}
  </li>
)

export default Item
