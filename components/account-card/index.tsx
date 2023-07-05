import { parseFieldType } from "@/utils/idl"
import { Program } from "@project-serum/anchor"
import { Idl, IdlAccountDef } from "@project-serum/anchor/dist/cjs/idl"

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
import DeserializeAccountAddress from "./deserialize-account-address"
import DeserializeAccountData from "./deserialize-account-data"

interface AccountCardProps {
  account: IdlAccountDef
  anchorProgram: Program<Idl>
}

const AccountCard = ({ account, anchorProgram }: AccountCardProps) => {
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
            <Tabs defaultValue="account-address">
              <TabsList>
                <TabsTrigger value="account-address">
                  Account Address
                </TabsTrigger>
                <TabsTrigger value="account-data">Account Data</TabsTrigger>
              </TabsList>

              <TabsContent value="account-address">
                <DeserializeAccountAddress
                  account={account}
                  accountsCoder={anchorProgram.coder.accounts}
                />
              </TabsContent>

              <TabsContent value="account-data">
                <DeserializeAccountData
                  account={account}
                  accountsCoder={anchorProgram.coder.accounts}
                />
              </TabsContent>
            </Tabs>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default AccountCard
