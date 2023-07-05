"use client"

import { useMemo } from "react"
import { notFound } from "next/navigation"
import { getProgram } from "@/utils/localdb"
import { AnchorProvider, Program } from "@project-serum/anchor"
import { useConnection } from "@solana/wallet-adapter-react"
import { Keypair, Transaction } from "@solana/web3.js"
import { useAsyncMemo } from "use-async-memo"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AccountCard from "@/components/account-card"
import Errors from "@/components/errors"
import { Icons } from "@/components/icons"

interface ProgramPlaygroundPageProps {
  params: {
    id: string
  }
}

const ProgramPlaygroundPage = ({
  params: { id },
}: ProgramPlaygroundPageProps) => {
  const { connection } = useConnection()

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

  const anchorProgram = useMemo(() => {
    if (!program) {
      return null
    }

    const anchorProvider = new AnchorProvider(
      connection,
      {
        publicKey: Keypair.generate().publicKey,
        signTransaction: async () => {
          return new Transaction()
        },
        signAllTransactions: async () => {
          return []
        },
      },
      {
        commitment: "confirmed",
      }
    )

    return new Program(program.idl, program.programId, anchorProvider)
  }, [program, connection])

  return (
    <>
      <h1 className="text-3xl font-semibold text-center">{program?.name}</h1>

      {program && anchorProgram ? (
        <Tabs defaultValue="accounts" className="w-full">
          <TabsList>
            <TabsTrigger value="accounts">Accounts</TabsTrigger>
            <TabsTrigger value="errors">Errors</TabsTrigger>
          </TabsList>
          <TabsContent value="accounts">
            <div className="flex flex-col w-full gap-4">
              {program.idl.accounts &&
                program.idl.accounts.map((account, index) => (
                  <AccountCard
                    key={index}
                    account={account}
                    anchorProgram={anchorProgram}
                  />
                ))}
            </div>
          </TabsContent>
          <TabsContent value="errors">
            {program.idl.errors && <Errors errors={program.idl.errors} />}
          </TabsContent>
        </Tabs>
      ) : (
        <Icons.spinner className="w-8 h-8 mx-auto animate-spin" />
      )}
    </>
  )
}

export default ProgramPlaygroundPage
