import { parseFieldType } from "@/utils/idl"
import { getKnownAccount, isKnownAccount } from "@/utils/knownAccount"
import { Control, useFieldArray } from "react-hook-form"

import { Button } from "../ui/button"
import { FormControl, FormField, FormItem } from "../ui/form"
import { Input } from "../ui/input"
import { Switch } from "../ui/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import { Textarea } from "../ui/textarea"
import ArgField from "./arg-field"

interface ArgsInputProps {
  control: Control
  name: string
}

const ArgsInput = ({ control, name }: ArgsInputProps) => {
  const { fields } = useFieldArray({
    control,
    name,
  })

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fields.map((arg, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{arg.name}</TableCell>
              <TableCell>
                <FormField
                  name={`args.${index}.value`}
                  control={control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        {/* @ts-ignore */}
                        <ArgField arg={arg} field={field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}

export default ArgsInput
