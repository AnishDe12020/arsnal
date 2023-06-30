"use client"

import { ReactJsonViewProps } from "react-json-view"

import { cn } from "@/lib/utils"

interface ReactJsonViewWrapperProps extends ReactJsonViewProps {
  className?: string
}

const ReactJSONViewWrapper = ({
  className,
  ...props
}: ReactJsonViewWrapperProps) => {
  return (
    // <div className={cn("p-4 rounded-xl bg-[#1D1F21]", className)}>
    <ReactJSONViewWrapper theme="tomorrow" {...props} />
    // </div>
  )
}

export default ReactJSONViewWrapper
