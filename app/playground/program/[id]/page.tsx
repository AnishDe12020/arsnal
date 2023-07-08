"use client"

import { useMemo } from "react"
import { notFound } from "next/navigation"
import { getProgram } from "@/utils/localdb"
import { AnchorProvider, Program } from "@project-serum/anchor"
import { useConnection } from "@solana/wallet-adapter-react"
import { Keypair, PublicKey, Transaction } from "@solana/web3.js"
import ReactJson from "react-json-view"
import { useAsyncMemo } from "use-async-memo"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AccountCard from "@/components/account-card"
import Errors from "@/components/errors"
import { Icons } from "@/components/icons"
import TypeCard from "@/components/type-card"

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

    return new Program(
      program.idl,
      program.programId || PublicKey.unique(),
      anchorProvider
    )
  }, [program, connection])

  return (
    <>
      <h1 className="text-3xl font-semibold text-center">{program?.name}</h1>

      {program && anchorProgram ? (
        <Tabs defaultValue="accounts" className="w-full">
          <TabsList>
            <TabsTrigger value="accounts">Accounts</TabsTrigger>
            <TabsTrigger value="types">Types</TabsTrigger>
            <TabsTrigger value="errors">Errors</TabsTrigger>
            <TabsTrigger value="raw-idl">Raw IDL</TabsTrigger>
          </TabsList>
          <TabsContent value="accounts">
            <div className="flex flex-col w-full gap-4">
              {program.idl.accounts && program.idl.accounts.length > 0 ? (
                program.idl.accounts.map((account, index) => (
                  <AccountCard
                    key={index}
                    account={account}
                    anchorProgram={anchorProgram}
                  />
                ))
              ) : (
                <p>No accounts found for this program</p>
              )}
            </div>
          </TabsContent>
          <TabsContent value="types">
            <div className="flex flex-col w-full gap-4">
              {program.idl.types && program.idl.types.length > 0 ? (
                program.idl.types.map((type, index) => (
                  <TypeCard
                    key={index}
                    type={type}
                    anchorProgram={anchorProgram}
                  />
                ))
              ) : (
                <p>No accounts found for this program</p>
              )}
            </div>
          </TabsContent>
          <TabsContent value="errors">
            {program.idl.errors && <Errors errors={program.idl.errors} />}
          </TabsContent>
          <TabsContent value="raw-idl">
            <ReactJson
              src={program.idl}
              theme="tomorrow"
              style={{
                borderRadius: "1rem",
                padding: "1rem",
                marginTop: "1rem",
              }}
              collapsed={1}
            />
          </TabsContent>
        </Tabs>
      ) : (
        <Icons.spinner className="w-8 h-8 mx-auto animate-spin" />
      )}
    </>
  )
}

export default ProgramPlaygroundPage
