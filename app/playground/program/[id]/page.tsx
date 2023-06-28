"use client"

import { useMemo } from "react"
import { notFound, useRouter } from "next/navigation"
import { parseFieldType } from "@/utils/idl"
import { getProgram } from "@/utils/localdb"
import { AnchorProvider, Program, Wallet } from "@project-serum/anchor"
import {
  clusterApiUrl,
  Connection,
  Keypair,
  Transaction,
} from "@solana/web3.js"
import { useAsyncMemo } from "use-async-memo"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Icons } from "@/components/icons"
import TypeBadge from "@/components/type-badge"

interface ProgramPlaygroundPageProps {
  params: {
    id: string
  }
}

const ProgramPlaygroundPage = ({
  params: { id },
}: ProgramPlaygroundPageProps) => {
  const program = useAsyncMemo(
    async () => {
      const program = await getProgram(id)

      if (!program) {
        notFound()
      }

      return program
    },
    [id],
    null
  )

  // const anchorProgram = useMemo(() => {
  //   if (!program) {
  //     return null
  //   }

  //   const anchorProvider = new AnchorProvider(
  //     new Connection(clusterApiUrl("devnet")),
  //     {
  //       publicKey: Keypair.generate().publicKey,
  //       signTransaction: async () => {
  //         return new Transaction()
  //       },
  //       signAllTransactions: async () => {
  //         return []
  //       },
  //     },
  //     {
  //       commitment: "confirmed",
  //     }
  //   )

  //   return new Program(program.idl, program.programId, anchorProvider)
  // }, [program])

  console.log(program?.idl)

  return (
    <>
      <h1 className="text-3xl font-semibold text-center">{program?.name}</h1>

      {program ? (
        <div className="flex flex-col gap-4">
          {program.idl.accounts &&
            program.idl.accounts.map((account, index) => (
              <div key={index} className="p-4 bg-card rounded-xl">
                <h2 className="mb-4 text-lg font-semibold">{account.name}</h2>

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
              </div>
            ))}
        </div>
      ) : (
        <Icons.spinner className="w-8 h-8 mx-auto animate-spin" />
      )}
    </>
  )
}

export default ProgramPlaygroundPage
