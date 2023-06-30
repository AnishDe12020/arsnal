"use client"

import { Cluster } from "@/types/cluster"
import useCluster from "@/hooks/use-cluster"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"

const Bar = () => {
  const { cluster, setCluster } = useCluster()

  return (
    <div className="flex items-center justify-end w-full h-12 px-4 border-2 border-t-secondary">
      <Select value={cluster} onValueChange={(e) => setCluster(e as Cluster)}>
        <SelectTrigger className="h-8 w-28">
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="mainnet-beta">Mainnet</SelectItem>
          <SelectItem value="testnet">Testnet</SelectItem>
          <SelectItem value="devnet">Devnet</SelectItem>
          <SelectItem value="localnet">Localnet</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

export default Bar
