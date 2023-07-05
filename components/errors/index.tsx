import { IdlErrorCode } from "@project-serum/anchor/dist/cjs/idl"

import { colors } from "@/types/colors"

import TypeBadge from "../type-badge"
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
  return (
    <div className="flex flex-col w-full gap-4 p-4 bg-card rounded-xl">
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
          {errors.map((error, index) => (
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
