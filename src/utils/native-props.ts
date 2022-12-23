import { JSX } from 'preact'

export type NativeProps<S extends string = never> = {
  className?: string
  style?: JSX.HTMLAttributes['style'] & Partial<Record<S, string>>
}
