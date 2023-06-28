import { Idl } from "@project-serum/anchor"
import { IdlType } from "@project-serum/anchor/dist/cjs/idl"

import { colors, ITypeBadge } from "@/types/colors"

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

export const parseFieldType = (fieldType: IdlType): ITypeBadge => {
  if (typeof fieldType === "string") {
    return {
      color: colors.green,
      value: fieldType,
    }
  }

  if ("defined" in fieldType) {
    return {
      color: colors.green,
      value: fieldType.defined,
    }
  } else if ("option" in fieldType) {
    return {
      color: colors.blue,
      value: `Option<${parseFieldType(fieldType.option).value}>`,
    }
  } else if ("coption" in fieldType) {
    return {
      color: colors.blue,
      value: `COption<${parseFieldType(fieldType.coption).value}>`,
    }
  } else if ("vec" in fieldType) {
    return {
      color: colors.blue,
      value: `Vec<${parseFieldType(fieldType.vec).value}>`,
    }
  } else if ("array" in fieldType) {
    return {
      color: colors.blue,
      value: `[${parseFieldType(fieldType.array[0]).value}l; ${
        fieldType.array[1]
      }]`,
    }
  } else if ("name" in fieldType) {
    return {
      color: colors.purple,
      // @ts-ignore
      value: fieldType.name,
    }
  } else {
    return {
      color: colors.red,
      value: "unknown",
    }
  }
}
