import { parseFieldType } from "@/utils/idl"
import { Program } from "@project-serum/anchor"
import {
  Idl,
  IdlAccountDef,
  IdlField,
  IdlType,
  IdlTypeDef,
} from "@project-serum/anchor/dist/cjs/idl"
import ReactJson from "react-json-view"

import { cn } from "@/lib/utils"

import TypeBadge from "../type-badge"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"

interface TypeCardProps {
  type: IdlTypeDef
  anchorProgram: Program<Idl>
}

const TypeCard = ({ type, anchorProgram }: TypeCardProps) => {
  console.log(type)

  return (
    <div className="w-full p-4 bg-card rounded-xl">
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
