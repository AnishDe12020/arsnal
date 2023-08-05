import { SystemProgram, SYSVAR_INSTRUCTIONS_PUBKEY } from "@solana/web3.js"

export interface KnownAccount {
  name: string
  address: string
}

export const knownAccounts: KnownAccount[] = [
  {
    name: "systemProgram",
    address: SystemProgram.programId.toBase58(),
  },
  {
    name: "ixSysvar",
    address: SYSVAR_INSTRUCTIONS_PUBKEY.toBase58(),
  },
]

export const isKnownAccount = (name: string) => {
  return knownAccounts.some((knownAccount) => knownAccount.name === name)
}

export const getKnownAccount = (name: string) => {
  const account = knownAccounts.find(
    (knownAccount) => knownAccount.name === name
  )
  if (!account) {
    throw new Error(`Unknown account: ${name}`)
  }
  return account
}
