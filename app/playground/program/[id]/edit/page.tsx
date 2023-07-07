"use client"

import { notFound, useRouter } from "next/navigation"
import { isValidIdl } from "@/utils/idl"
import { editProgram, getProgram } from "@/utils/localdb"
import { zodResolver } from "@hookform/resolvers/zod"
import { PublicKey } from "@solana/web3.js"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useAsyncMemo } from "use-async-memo"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const editProgramFormSchema = z.object({
  name: z.string(),
  idl: z.string(),
  programId: z.string().optional(),
})

interface ProgramPlaygroundPageProps {
  params: {
    id: string
  }
}

const PlaygroundEditPage = ({ params: { id } }: ProgramPlaygroundPageProps) => {
  const existingProgram = useAsyncMemo(
    async () => {
      const program = await getProgram(id)

      if (!program) {
        notFound()
      }

      form.reset({
        idl: JSON.stringify(program.idl, null, 2),
        name: program.name,
        programId: program.programId,
      })

      return program
    },
    [id],
    null
  )

  const form = useForm<z.infer<typeof editProgramFormSchema>>({
    resolver: zodResolver(editProgramFormSchema),
  })

  const router = useRouter()

  const handleEditProgramSubmit = form.handleSubmit(
    async (values: z.infer<typeof editProgramFormSchema>) => {
      if (!existingProgram) {
        return
      }

      let programId: PublicKey | undefined = undefined

      if (values.programId) {
        try {
          programId = new PublicKey(values.programId)
        } catch (error) {
          toast.error("Invalid program ID")
          return
        }
      }

      let idl

      try {
        idl = JSON.parse(values.idl)
      } catch (error) {
        toast.error("Invalid IDL")
        return
      }

      if (!isValidIdl(idl)) {
        toast.error("Invalid IDL")
        return
      }

      toast.promise(
        editProgram(
          existingProgram.id,
          values.name,
          idl,
          programId && programId.toBase58()
        ),
        {
          loading: "Updating program...",
          success: () => {
            router.push(`/playground/program/${existingProgram.id}`)
            return "Updated program"
          },
          error: "Failed to update program",
        }
      )
    }
  )

  return (
    <>
      <Form {...form}>
        <form
          className="flex flex-col max-w-xl gap-8"
          onSubmit={handleEditProgramSubmit}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Program Name</FormLabel>
                <FormControl>
                  <Input placeholder="Program Name" {...field} />
                </FormControl>
                <FormDescription>
                  Name of the program. Used just for reference
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="programId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Program ID</FormLabel>
                <FormControl>
                  <Input
                    placeholder="AF4ChbnZ2DfGTHdNxHkmdrZkvRBbHYq1WcmnLiFRxwkZ"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  The program ID of the program you want to interact with. You
                  can leave it blank but some features will be limited in that
                  case.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="idl"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Program IDL</FormLabel>
                <FormControl>
                  <Textarea
                    className="h-96"
                    placeholder="Program IDL"
                    onChange={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormDescription>
                  The IDL of the program you want to interact with. You can
                  leave it blank but some features will be limited in that case.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Update Program</Button>
        </form>
      </Form>
    </>
  )
}

export default PlaygroundEditPage
