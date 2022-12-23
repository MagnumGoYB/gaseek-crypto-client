import { FunctionComponent, JSX } from 'preact'

type InputProps = {
  placeholder: string
  name: string
  type: JSX.HTMLAttributes<HTMLInputElement>['type']
  value?: JSX.HTMLAttributes<HTMLInputElement>['value']
  handleChange: (
    e: JSX.TargetedEvent<HTMLInputElement, Event>,
    name: string
  ) => void
}

const Input: FunctionComponent<InputProps> = ({
  placeholder,
  name,
  type,
  value,
  handleChange
}) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
    className="my-2 w-full rounded p-3 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
  />
)

export default Input
