import { Idl } from "@project-serum/anchor"

export type LocalProgram = {
  id: string
  name: string
  programId?: string
  idl: Idl
}
