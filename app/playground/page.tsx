"use client"

import { truncate } from "fs"
import Link from "next/link"
import { getPrograms } from "@/utils/localdb"
import { truncatePubkey } from "@/utils/truncate"
import { PlusIcon } from "lucide-react"
import { useAsyncMemo } from "use-async-memo"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

const PlaygroundPage = () => {
  const programs = useAsyncMemo(getPrograms, [], [])

  console.log(programs)

  return (
    <>
      <Link className={cn(buttonVariants())} href="/playground/new">
        <PlusIcon className="w-5 h-5 mr-2" />
        <span>New program</span>
      </Link>

      <div className="flex flex-col w-full gap-4">
        {programs.length > 0 ? (
          programs.map((program) => (
            <Link
              key={program.programId}
              className="flex justify-between w-full p-4 rounded-xl bg-secondary"
              href={`/playground/program/${program.programId}`}
            >
              <h3>{program.name}</h3>

              <p className="text-gray-400">
                {truncatePubkey(program.programId)}
              </p>
            </Link>
          ))
        ) : (
          <p className="text-lg text-center text-semibold">
            No programs yet. Create one by clicking the button above.
          </p>
        )}
      </div>
    </>
  )
}

export default PlaygroundPage
