// there will bea programs array that stores the program id and program idl using local forage

import { Idl } from "@project-serum/anchor"
import localforage from "localforage"

import { LocalProgram } from "@/types/program"

export const addProgram = async (name: string, programId: string, idl: Idl) => {
  const programs = await getPrograms()
  programs.push({ name, programId, idl })
  await setPrograms(programs)
}

export const getProgram = async (
  programId: string
): Promise<LocalProgram | null> => {
  const programs = await getPrograms()
  const program = programs.find((program) => program.programId === programId)
  return program || null
}

export const getPrograms = async (): Promise<LocalProgram[]> => {
  const programs = await localforage.getItem("programs")
  return (programs as LocalProgram[]) || []
}

export const setPrograms = async (programs: LocalProgram[]) => {
  await localforage.setItem("programs", programs)
}

export const removeProgram = async (programId: string) => {
  const programs = await getPrograms()
  const filteredPrograms = programs.filter(
    (program) => program.programId !== programId
  )
  await setPrograms(filteredPrograms)
}

export const clearPrograms = async () => {
  await localforage.removeItem("programs")
}
