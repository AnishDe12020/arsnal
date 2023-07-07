// there will bea programs array that stores the program id and program idl using local forage

import { Idl } from "@project-serum/anchor"
import localforage from "localforage"

import { LocalProgram } from "@/types/program"

export const addProgram = async (
  cuid: string,
  name: string,
  idl: Idl,
  programId?: string
) => {
  const programs = await getPrograms()
  programs.push({ id: cuid, name, programId, idl })
  await setPrograms(programs)
}

export const getProgram = async (id: string): Promise<LocalProgram | null> => {
  const programs = await getPrograms()
  const program = programs.find((program) => program.id === id)
  return program || null
}

export const editProgram = async (
  id: string,
  name: string,
  idl: Idl,
  programId?: string
) => {
  const programs = await getPrograms()
  const programIndex = programs.findIndex((program) => program.id === id)
  programs[programIndex] = {
    id,
    name,
    programId,
    idl,
  }
  await setPrograms(programs)
}

export const getPrograms = async (): Promise<LocalProgram[]> => {
  const programs = await localforage.getItem("programs")
  return (programs as LocalProgram[]) || []
}

export const setPrograms = async (programs: LocalProgram[]) => {
  await localforage.setItem("programs", programs)
}

export const removeProgram = async (id: string) => {
  const programs = await getPrograms()
  const filteredPrograms = programs.filter((program) => program.id !== id)
  await setPrograms(filteredPrograms)
}

export const clearPrograms = async () => {
  await localforage.removeItem("programs")
}
