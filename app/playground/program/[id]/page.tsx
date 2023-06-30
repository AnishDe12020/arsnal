"use client"

import { useMemo } from "react"
import { notFound } from "next/navigation"
import { getProgram } from "@/utils/localdb"
import { BorshAccountsCoder } from "@project-serum/anchor"
import { useAsyncMemo } from "use-async-memo"

import AccountCard from "@/components/account-card"
import { Icons } from "@/components/icons"

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

  const accountsCoder = useMemo(() => {
    if (!program) {
      return null
    }

    return new BorshAccountsCoder(program.idl)
  }, [program])

  console.log(program?.idl)

  return (
    <>
      <h1 className="text-3xl font-semibold text-center">{program?.name}</h1>

      {program ? (
        <div className="flex flex-col w-full gap-4">
          {program.idl.accounts &&
            program.idl.accounts.map((account, index) => (
              <AccountCard
                key={index}
                account={account}
                accountsCoder={accountsCoder}
              />
            ))}
        </div>
      ) : (
        <Icons.spinner className="w-8 h-8 mx-auto animate-spin" />
      )}
    </>
  )
}

export default ProgramPlaygroundPage
