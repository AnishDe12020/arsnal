import { clusterApiUrl } from "@solana/web3.js"

import { Cluster } from "@/types/cluster"

export const getRpc = (cluster: string) => {
  switch (cluster) {
    case Cluster.MainnetBeta:
      return "https://solana-mainnet.rpc.extrnode.com"

    case Cluster.Devnet:
      return clusterApiUrl("devnet")

    case Cluster.Testnet:
      return clusterApiUrl("testnet")

    case Cluster.Localnet:
      return "http://localhost:8899"

    default:
      return "https://api.devnet.solana.com"
  }
}
