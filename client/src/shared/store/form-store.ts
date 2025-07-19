import { FieldValues, UseFormReturn } from "react-hook-form"
import { z, ZodObject } from "zod"
import { create } from "zustand"

interface FormState<T extends z.infer<typeof ZodObject> & FieldValues> {
  methods?: UseFormReturn<T, any, T>
}

interface FormStateActions<T extends z.infer<typeof ZodObject> & FieldValues> {
  setMethods: (methods: UseFormReturn<T, any, T>) => void
}

export type FormStore<T extends z.infer<typeof ZodObject> & FieldValues> =
  FormState<T> & FormStateActions<T>

const defaultInitState = <
  T extends z.infer<typeof ZodObject> & FieldValues,
>(): FormState<T> => ({
  methods: undefined,
})

export const createFormStore = <
  T extends z.infer<typeof ZodObject> & FieldValues,
>(
  initState: FormState<T> = defaultInitState<T>()
) =>
  create<FormStore<T>>((set) => ({
    ...initState,
    setMethods: (methods: UseFormReturn<T, any, T>) => {
      set(() => ({ methods }))
    },
  }))
