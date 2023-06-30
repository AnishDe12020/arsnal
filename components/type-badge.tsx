import { ITypeBadge } from "@/types/colors"
import { cn } from "@/lib/utils"

const TypeBadge = ({ type }: { type: ITypeBadge }) => {
  return (
    <div
      className={cn(
        "font-mono text-xs px-1 py-0.5 inline-flex items-center rounded-sm",
        "bg-purple-600/30 text-purple-300"
      )}
    >
      {type.value}
    </div>
  )
}

export default TypeBadge
