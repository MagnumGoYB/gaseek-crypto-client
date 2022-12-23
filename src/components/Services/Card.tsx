import { FunctionComponent, ComponentChild } from 'preact'

type CardProps = {
  color?: string
  icon: ComponentChild
  title: string
  subtitle: string
}

const Card: FunctionComponent<CardProps> = ({
  color,
  title,
  icon,
  subtitle
}) => (
  <div className="flex flex-row justify-start items-center white-glassmorphism py-5 px-8 m-2 rounded-lg cursor-pointer hover:shadow-xl">
    <div
      className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}
    >
      {icon}
    </div>
    <div className="ml-8 flex flex-col flex-1">
      <h3 className="text-white text-lg">{title}</h3>
      <p className="mt-1 text-white text-sm md:w-9/12">{subtitle}</p>
    </div>
  </div>
)

export default Card
