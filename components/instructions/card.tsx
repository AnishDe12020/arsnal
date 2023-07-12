import { parseFieldType } from "@/utils/idl"
import { Idl, Program } from "@project-serum/anchor"
import { IdlInstruction } from "@project-serum/anchor/dist/cjs/idl"
import { AccordionItem } from "@radix-ui/react-accordion"

import TypeBadge from "../type-badge"
import { Accordion, AccordionContent, AccordionTrigger } from "../ui/accordion"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import IxBuilder from "./builder"

interface InstructionsProps {
  instruction: IdlInstruction
  anchorProgram: Program<Idl>
}

const InstructionsCard = ({
  instruction,
  anchorProgram,
}: InstructionsProps) => {
  return (
    <div
      className="p-4 w-fulAl bg-card rounded-xl"
      id={`instruction-${instruction.name}`}
    >
      <h2 className="text-xl font-bold">{instruction.name}</h2>

      <h3 className="mt-8 mb-4 text-lg font-semibold">Accounts</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Name</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {instruction.accounts.map((account, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{account.name}</TableCell>
              <TableCell className="flex gap-2">
                {account.isMut && (
                  <div className="font-mono text-xs px-1 py-0.5 inline-flex items-center rounded-sm bg-red-600/30 text-red-300">
                    Mutable
                  </div>
                )}

                {account.isSigner && (
                  <div className="font-mono text-xs px-1 py-0.5 inline-flex items-center rounded-sm bg-green-600/30 text-green-300">
                    Signer
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <h3 className="mt-8 mb-4 text-lg font-semibold">Arguments</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {instruction.args.map((argument, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{argument.name}</TableCell>
              <TableCell className="flex gap-2">
                <TypeBadge type={parseFieldType(argument.type)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Accordion type="single" collapsible className="border-none">
        <AccordionItem value="builder">
          <AccordionTrigger>Builder</AccordionTrigger>
          <AccordionContent>
            <IxBuilder
              anchorProgram={anchorProgram}
              instruction={instruction}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default InstructionsCard
