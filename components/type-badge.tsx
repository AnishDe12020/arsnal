import { ITypeBadge } from "@/types/colors"
import { cn } from "@/lib/utils"

const TypeBadge = ({ type }: { type: ITypeBadge }) => {
  console.log("type", type)

  return (
    <div
      className={cn(
        "font-mono text-xs px-1 py-0.5 inline-flex items-center rounded-lg",
        type.color
      )}
    >
      {type.value}
    </div>
  )
}

export default TypeBadge
