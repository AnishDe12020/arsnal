"use client"

import { notFound, useRouter } from "next/navigation"
import { getProgram } from "@/utils/localdb"
import { useAsyncMemo } from "use-async-memo"

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

  return (
    <>
      <h1 className="text-2xl font-semibold text-center">{program?.name}</h1>
      <p>to be implemented</p>
    </>
  )
}

export default ProgramPlaygroundPage
