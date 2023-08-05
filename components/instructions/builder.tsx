import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Program } from "@project-serum/anchor"
import { Idl, IdlInstruction } from "@project-serum/anchor/dist/cjs/idl"
import { Keypair, PublicKey, TransactionInstruction } from "@solana/web3.js"
import { X } from "lucide-react"
import { useForm } from "react-hook-form"
import ReactJson from "react-json-view"
import { toast } from "sonner"
import { z } from "zod"

import { Button } from "../ui/button"
import { Form, FormField } from "../ui/form"
import AccountsInput from "./accounts-input"
import ArgsInput from "./args-input"

interface IxBuilderProps {
  instruction: IdlInstruction
  anchorProgram: Program<Idl>
}

const IxBuilder = ({ anchorProgram, instruction }: IxBuilderProps) => {
  const formSchema = z.object({
    accounts: z.array(
      z
        .object({
          name: z.string(),
          address: z.string(),
          isMut: z.boolean().optional(),
          isSigner: z.boolean().optional(),
        })
        .required()
    ),
    args: z.array(
      z
        .object({
          name: z.string(),
          value: z.string(),
        })
        .required()
    ),
  })

  const [ix, setIx] = useState<TransactionInstruction>()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      accounts: instruction.accounts.map((account) => ({
        name: account.name,
        // @ts-ignore
        isMut: account.isMut,
        // @ts-ignore
        isSigner: account.isSigner,
      })),
      args: instruction.args.map((arg) => ({
        name: arg.name,
        type: arg.type,
      })),
    },
  })

  const onSubmit = form.handleSubmit(
    async (values: z.infer<typeof formSchema>) => {
      const { accounts, args } = values

      accounts.forEach((account) => {
        if (!account.address) {
          toast.error(`Address missing for account: ${account.name}`)
          return
        }
      })

      args.forEach((arg) => {
        if (!arg.value) {
          toast.error(`Value missing for argument: ${arg.name}`)
          return
        }
      })

      const methodsBuilder = await anchorProgram.methods
        .createDid(
          ...args.map((arg) => {
            try {
              return JSON.parse(arg.value)
            } catch (e) {
              return arg.value
            }
          })
        )
        .accounts(
          accounts.reduce(
            (acc, curr) => ({
              ...acc,
              [curr.name]: curr.address,
            }),
            {}
          )
        )

      const builtIx = await methodsBuilder.instruction()
      setIx(builtIx)
    }
  )

  return (
    <div>
      <Form {...form}>
        <form className="flex flex-col w-full gap-8" onSubmit={onSubmit}>
          <AccountsInput
            // @ts-ignore
            control={form.control}
            name="accounts"
            setValue={form.setValue}
          />
          {/* @ts-ignore */}
          <ArgsInput control={form.control} name="args" />
          <Button type="submit">Submit</Button>
        </form>
      </Form>

      {ix && (
        <ReactJson
          src={ix}
          theme="tomorrow"
          style={{
            borderRadius: "1rem",
            padding: "1rem",
            marginTop: "1rem",
          }}
          collapsed={1}
        />
      )}
    </div>
  )
}

export default IxBuilder
