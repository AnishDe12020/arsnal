"use client"

import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { PublicKey } from "@solana/web3.js"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
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

import { isValidIdl } from "../../../utils/idl"
import { addProgram } from "../../../utils/localdb"

const newProgramFormSchema = z.object({
  name: z.string(),
  idl: z.string(),
  programId: z.string().optional(),
})

const PlaygroundNewPage = () => {
  const form = useForm<z.infer<typeof newProgramFormSchema>>({
    resolver: zodResolver(newProgramFormSchema),
  })

  const router = useRouter()

  const handleNewProgramSubmit = form.handleSubmit(
    async (values: z.infer<typeof newProgramFormSchema>) => {
      let programId: PublicKey

      if (values.programId) {
        try {
          programId = new PublicKey(values.programId)
        } catch (error) {
          toast.error("Invalid program ID")
          return
        }
      } else {
        programId = PublicKey.unique()
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

      toast.promise(addProgram(values.name, programId.toBase58(), idl), {
        loading: "Adding program...",
        success: () => {
          router.push(`/playground/program/${programId.toBase58()}`)
          return "Program added"
        },
        error: "Failed to add program",
      })
    }
  )

  return (
    <>
      <Form {...form}>
        <form
          className="flex flex-col max-w-xl gap-8"
          onSubmit={handleNewProgramSubmit}
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

          <Button type="submit">Add Program</Button>
        </form>
      </Form>
    </>
  )
}

export default PlaygroundNewPage
