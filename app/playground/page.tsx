"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { getPrograms, removeProgram } from "@/utils/localdb"
import { truncatePubkey } from "@/utils/truncate"
import { PlusIcon } from "lucide-react"
import { toast } from "sonner"

import { LocalProgram } from "@/types/program"
import { cn } from "@/lib/utils"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { buttonVariants } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const PlaygroundPage = () => {
  const [programs, setPrograms] = useState<LocalProgram[]>([])

  useEffect(() => {
    const asyncGetPrograms = async () => {
      const programsRes = await getPrograms()
      setPrograms(programsRes)
    }

    asyncGetPrograms()
  }, [])

  console.log(programs)

  return (
    <>
      <Link className={cn(buttonVariants())} href="/playground/new">
        <PlusIcon className="w-5 h-5 mr-2" />
        <span>New program</span>
      </Link>

      <div className="flex flex-col w-full gap-4">
        {programs.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {programs.map((program, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{program.name}</TableCell>
                  <TableCell>
                    {program.programId
                      ? truncatePubkey(program.programId)
                      : "-"}
                  </TableCell>
                  <TableCell className="flex gap-2">
                    <Link
                      href={`/playground/program/${program.id}`}
                      className={cn(buttonVariants({ size: "sm" }))}
                    >
                      View
                    </Link>

                    <Link
                      href={`/playground/program/${program.id}/edit`}
                      className={cn(buttonVariants({ size: "sm" }))}
                    >
                      Edit
                    </Link>

                    <AlertDialog>
                      <AlertDialogTrigger
                        className={buttonVariants({
                          variant: "destructive",
                          size: "sm",
                        })}
                      >
                        Remove
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you sure you want to remove this program?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This is an irreversible action.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className={buttonVariants({
                              variant: "destructive",
                            })}
                            onClick={async () => {
                              await removeProgram(program.id)
                              setPrograms(await getPrograms())
                              toast.success("Program removed")
                            }}
                          >
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
