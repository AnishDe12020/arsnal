import { parseFieldType } from "@/utils/idl"
import { ControllerRenderProps, FieldValues } from "react-hook-form"

import { Input } from "../ui/input"
import { Switch } from "../ui/switch"
import { Textarea } from "../ui/textarea"

interface ArgFieldProps {
  arg: Record<string, any>
  field: ControllerRenderProps<FieldValues>
}

const ArgField = ({ arg, field }: ArgFieldProps) => {
  if (parseFieldType(arg.type).defined) {
    return (
      <Textarea
        {...field}
        rows={4}
        placeholder={parseFieldType(arg.type).value}
      />
    )
  }

  if (parseFieldType(arg.type).value === "bool") {
    return <Switch checked={field.value} onCheckedChange={field.onChange} />
  }

  return <Input {...field} />
}

export default ArgField
