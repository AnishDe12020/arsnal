import { parseFieldType } from "@/utils/idl"
import { Program } from "@project-serum/anchor"
import { Idl, IdlTypeDef } from "@project-serum/anchor/dist/cjs/idl"
import ReactJson from "react-json-view"

import TypeBadge from "../type-badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"

interface TypeCardProps {
  type: IdlTypeDef
}

const TypeCard = ({ type }: TypeCardProps) => {
  return (
    <div className="w-full p-4 bg-card rounded-xl" id={`type-${type.name}`}>
      <h2 className="text-xl font-bold">{type.name}</h2>

      {type.type.kind === "struct" && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {type.type.fields.map((field, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{field.name}</TableCell>
                <TableCell>
                  <TypeBadge type={parseFieldType(field.type)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {type.type.kind === "enum" && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Variant</TableHead>
              <TableHead>Fields</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {type.type.variants.map((variant, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{variant.name}</TableCell>
                <TableCell>
                  {variant.fields ? (
                    <ReactJson
                      src={variant.fields}
                      theme="tomorrow"
                      style={{
                        borderRadius: "1rem",
                        padding: "1rem",
                        marginTop: "1rem",
                      }}
                      collapsed={1}
                    />
                  ) : (
                    <p>-</p>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}

export default TypeCard
