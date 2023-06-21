import { Idl } from "@project-serum/anchor"

export type LocalProgram = {
  name: string
  programId: string
  idl: Idl
}
