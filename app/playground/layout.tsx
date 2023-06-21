import { ReactNode } from "react"

const PlaygroundLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col items-center max-w-3xl gap-8 mx-auto mt-16">
      {children}
    </div>
  )
}

export default PlaygroundLayout
