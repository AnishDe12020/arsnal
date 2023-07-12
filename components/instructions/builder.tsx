import { zodResolver } from "@hookform/resolvers/zod"
import { Program } from "@project-serum/anchor"
import { Idl, IdlInstruction } from "@project-serum/anchor/dist/cjs/idl"
import { PublicKey } from "@solana/web3.js"
import { X } from "lucide-react"
import { useForm } from "react-hook-form"
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
          isMut: z.boolean(),
          isSigner: z.boolean(),
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      accounts: instruction.accounts.map((account) => ({
        name: account.name,
        isMut: account.isMut,
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

      console.log(accounts)
      console.log(args)
    }
  )

  return (
    <Form {...form}>
      <form className="flex flex-col w-full gap-8" onSubmit={onSubmit}>
        {/* @ts-ignore */}
        <AccountsInput control={form.control} name="accounts" />
        {/* @ts-ignore */}
        <ArgsInput control={form.control} name="args" />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default IxBuilder
