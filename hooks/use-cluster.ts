import { useMemo } from "react"
import { getRpc } from "@/utils/cluster"
import { useAtom } from "jotai"

import clusterAtom from "../state/cluster"

const useCluster = () => {
  const [cluster, setCluster] = useAtom(clusterAtom)

  const rpcUrl = useMemo(() => getRpc(cluster), [cluster])

  console.log(cluster, rpcUrl)

  return {
    cluster,
    setCluster,
    rpcUrl,
  }
}

export default useCluster
