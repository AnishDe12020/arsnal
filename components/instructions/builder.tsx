import { zodResolver } from "@hookform/resolvers/zod"
import { Program } from "@project-serum/anchor"
import { Idl, IdlInstruction } from "@project-serum/anchor/dist/cjs/idl"
import { Keypair, PublicKey } from "@solana/web3.js"
import { X } from "lucide-react"
import { useForm } from "react-hook-form"
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

  console.log("e", form.formState.errors)

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

      console.log(
        args.map((arg) => {
          try {
            return JSON.parse(arg.value)
          } catch (e) {
            console.log(arg.value, e)
            return arg.value
          }
        })
      )

      console.log(
        accounts.reduce(
          (acc, curr) => ({
            ...acc,
            [curr.name]: new PublicKey(curr.address),
          }),
          {}
        )
      )

      console.log(
        anchorProgram.idl.instructions.filter(
          (i) => i.name === instruction.name
        )[0].accounts
      )

      const payerKeypair = Keypair.generate()

      console.log(
        accounts.reduce(
          (acc, curr) => ({
            ...acc,
            [curr.name]: curr.address,
          }),
          {}
        )
      )

      const ix = await anchorProgram.methods
        .createDid(
          args.map((arg) => {
            try {
              return JSON.parse(arg.value)
            } catch (e) {
              console.log(arg.value, e)
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
          // {
          //   payer: payerKeypair.publicKey,
          //   did: "GYjw1SGNqHkh6BckaECq6rneb9tAH8XtV4MX7Myvesd2",
          //   systemProgram: "Sysvar1nstructions1111111111111111111111111",
          //   ixSysvar: "Sysvar1nstructions1111111111111111111111111",
          // }
        )
        .instruction()

      console.log(ix)
    }
  )

  return (
    <Form {...form}>
      <form className="flex flex-col w-full gap-8" onSubmit={onSubmit}>
        {/* @ts-ignore */}
        <AccountsInput
          control={form.control}
          name="accounts"
          setValue={form.setValue}
        />
        {/* @ts-ignore */}
        <ArgsInput control={form.control} name="args" />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default IxBuilder
