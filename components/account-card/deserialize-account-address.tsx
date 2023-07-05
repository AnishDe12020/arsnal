import { useState } from "react"
import { AccountsCoder } from "@project-serum/anchor"
import { IdlAccountDef } from "@project-serum/anchor/dist/cjs/idl"
import { useConnection } from "@solana/wallet-adapter-react"
import { PublicKey } from "@solana/web3.js"
import ReactJson from "react-json-view"
import { toast } from "sonner"
import { useAsyncMemo } from "use-async-memo"

import { Input } from "../ui/input"

interface DeserializeAccountAddressProps {
  account: IdlAccountDef
  accountsCoder: AccountsCoder<string>
}

const DeserializeAccountAddress = ({
  account,
  accountsCoder,
}: DeserializeAccountAddressProps) => {
  const [address, setAddress] = useState<string>()

  const { connection } = useConnection()

  const decodedData = useAsyncMemo(async () => {
    if (!address) {
      return null
    }

    let publicKey

    try {
      publicKey = new PublicKey(address)
    } catch (error) {
      toast.error("Invalid address")
      return null
    }

    const accountInfo = await connection.getAccountInfo(publicKey)

    if (!accountInfo) {
      toast.error("Account not found")
      return null
    }

    const decodedData = accountsCoder.decode(account.name, accountInfo.data)

    return decodedData
  }, [address, account.name, connection, accountsCoder])

  return (
    <>
      <Input
        placeholder="Address of account you want to deserialize"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      {decodedData && (
        <ReactJson
          src={decodedData}
          theme="tomorrow"
          style={{
            borderRadius: "1rem",
            padding: "1rem",
            marginTop: "1rem",
          }}
          collapsed={1}
        />
      )}
    </>
  )
}

export default DeserializeAccountAddress
