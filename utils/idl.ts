import { Idl } from "@project-serum/anchor"

export const isValidIdl = (idl: any): idl is Idl => {
  if (
    !idl.version ||
    !idl.name ||
    !idl.instructions ||
    !Array.isArray(idl.instructions)
  ) {
    return false
  }

  return true
}
