import { useMemo, useState } from "react"
import { parseFieldType } from "@/utils/idl"
import { BorshAccountsCoder } from "@project-serum/anchor"
import { IdlAccountDef } from "@project-serum/anchor/dist/cjs/idl"
import ReactJson from "react-json-view"

import TypeBadge from "./type-badge"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table"
import { Textarea } from "./ui/textarea"

interface AccountCardProps {
  account: IdlAccountDef
  accountsCoder: BorshAccountsCoder<string>
}

const AccountCard = ({ account, accountsCoder }: AccountCardProps) => {
  const [dataToDeserialize, setDataToDeseriialize] = useState<string>()

  const decodedData = useMemo(() => {
    if (!dataToDeserialize) {
      return null
    }

    const decodedData = accountsCoder.decode(
      account.name,
      Buffer.from(dataToDeserialize, "base64")
    )

    return decodedData
  }, [dataToDeserialize])

  console.log(decodedData)

  return (
    <div className="w-full p-4 bg-card rounded-xl">
      <h2 className="text-xl font-bold">{account.name}</h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {account.type.fields.map((field, index) => (
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

      <Accordion type="single" collapsible className="border-none">
        <AccordionItem value="deserialize">
          <AccordionTrigger>Deserialize</AccordionTrigger>
          <AccordionContent>
            <Textarea
              placeholder="Account data in base64"
              onChange={(e) => setDataToDeseriialize(e.target.value)}
              value={dataToDeserialize}
            />

            {decodedData && (
              <ReactJson
                src={decodedData}
                theme="tomorrow"
                style={{
                  borderRadius: "1rem",
                  padding: "1rem",
                  marginTop: "1rem",
                }}
                collapsed
              />
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default AccountCard
