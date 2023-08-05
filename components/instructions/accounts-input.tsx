import { getKnownAccount, isKnownAccount } from "@/utils/knownAccount"
import { Control, useFieldArray, UseFormSetValue } from "react-hook-form"

import { Button } from "../ui/button"
import { FormControl, FormField, FormItem } from "../ui/form"
import { Input } from "../ui/input"
import { Switch } from "../ui/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"

interface AccountsInputProps {
  control: Control
  name: string
  setValue: UseFormSetValue<any>
}

const AccountsInput = ({ control, name, setValue }: AccountsInputProps) => {
  const { fields } = useFieldArray({
    control,
    name,
  })

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Mutable</TableHead>
            <TableHead>Signer</TableHead>
            <TableHead>Address</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fields.map((account, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{account.name}</TableCell>
              <TableCell>
                <FormField
                  name={`accounts.${index}.isMut`}
                  control={control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={() => field.onChange(!field.value)}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </TableCell>
              <TableCell>
                <FormField
                  name={`accounts.${index}.isSigner`}
                  control={control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={() => field.onChange(!field.value)}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </TableCell>
              <TableCell>
                <FormField
                  name={`accounts.${index}.address`}
                  control={control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      {isKnownAccount(account.name) && (
                        <Button
                          className="w-full"
                          variant="secondary"
                          onClick={() =>
                            setValue(
                              `accounts.${index}.address`,
                              getKnownAccount(account.name).address
                            )
                          }
                        >
                          Autofill
                        </Button>
                      )}
                    </FormItem>
                  )}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}

export default AccountsInput
