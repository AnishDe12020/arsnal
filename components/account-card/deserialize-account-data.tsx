import { useMemo, useState } from "react"
import { AccountsCoder } from "@project-serum/anchor"
import { IdlAccountDef } from "@project-serum/anchor/dist/cjs/idl"
import ReactJson from "react-json-view"

import { Textarea } from "../ui/textarea"

interface DeserializeAccountData {
  account: IdlAccountDef
  accountsCoder: AccountsCoder<string>
}

const DeserializeAccountData = ({
  account,
  accountsCoder,
}: DeserializeAccountData) => {
  const [dataToDeserialize, setDataToDeseriialize] = useState<string>()

  const decodedData = useMemo(() => {
    if (!dataToDeserialize) {
      return null
    }

    const decodedData = accountsCoder.decode(
      account.name,
      Buffer.from(dataToDeserialize, "base64")
    )

    return decodedData
  }, [dataToDeserialize, account.name, accountsCoder])

  return (
    <>
      <Textarea
        placeholder="Account data in base64"
        onChange={(e) => setDataToDeseriialize(e.target.value)}
        value={dataToDeserialize}
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
          collapsed
        />
      )}
    </>
  )
}

export default DeserializeAccountData
