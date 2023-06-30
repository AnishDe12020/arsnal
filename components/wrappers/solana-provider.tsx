"use client"

import { useMemo } from "react"
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react"
import {
  BackpackWalletAdapter,
  GlowWalletAdapter,
  PhantomWalletAdapter,
} from "@solana/wallet-adapter-wallets"

import useCluster from "@/hooks/use-cluster"

export const SolanaProvider = ({ children }: { children: React.ReactNode }) => {
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new BackpackWalletAdapter(),
      new GlowWalletAdapter(),
    ],
    []
  )

  const { rpcUrl } = useCluster()

  return (
    <ConnectionProvider endpoint={rpcUrl}>
      <WalletProvider wallets={wallets} autoConnect>
        {children}
      </WalletProvider>
    </ConnectionProvider>
  )
}
