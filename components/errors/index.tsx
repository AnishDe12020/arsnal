import { useMemo, useState } from "react"
import { IdlErrorCode } from "@project-serum/anchor/dist/cjs/idl"

import { colors } from "@/types/colors"

import TypeBadge from "../type-badge"
import { Input } from "../ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"

interface ErrorsProps {
  errors: IdlErrorCode[]
}

const Errors = ({ errors }: ErrorsProps) => {
  const [filterTerm, setFilterTerm] = useState<string>("")

  const filteredError = useMemo(() => {
    return errors.filter((error) => {
      return (
        error.name.toLowerCase().includes(filterTerm.toLowerCase()) ||
        error.code.toString().includes(filterTerm) ||
        error.code.toString(16).includes(filterTerm)
      )
    })
  }, [filterTerm])

  return (
    <div className="flex flex-col w-full gap-4 p-4 bg-card rounded-xl">
      <Input
        placeholder="Error name/code (e.g. 'AccountNotFound', '6001', '1771', '71')"
        value={filterTerm}
        onChange={(e) => setFilterTerm(e.target.value)}
      />

      <p className="px-2 mt-2 text-xs">
        The error name is a string, while the error code is a number. The error
        code is often encoded in different formats (decimal, hexadecimal, etc),
        we support decimal and hexadecimal formats
      </p>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Code</TableHead>
            <TableHead>Message</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredError.map((error, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{error.name}</TableCell>
              <TableCell>
                <TypeBadge
                  type={{
                    color: colors.purple,
                    value: error.code.toString(),
                  }}
                />
              </TableCell>
              <TableCell>{error.msg ?? "-"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default Errors
