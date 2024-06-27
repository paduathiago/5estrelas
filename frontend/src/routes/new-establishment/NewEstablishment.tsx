import React from 'react'

import { zodResolver } from "@hookform/resolvers/zod"
import { UseFormReturn, useForm } from "react-hook-form"
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
import { Textarea } from '@/components/ui/textarea'
import { TimePicker } from '@/components/time-picker/TimePicker'

const formSchema = z.object({
  username: z.string().min(2).max(50),
  description: z.string().min(5).max(300),
})

function renderNameField(form: any) {
  return <FormField
    control={form.control}
    name="username"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Nome do estabelecimento</FormLabel>
        <FormControl>
          <Input placeholder="Estabelecimento" {...field} />
        </FormControl>
        <FormDescription>
          Este nome aparecerá na sua página do estabelecimento
        </FormDescription>
        <FormMessage />
      </FormItem>
    )}
  />
}

function renderDescriptionField(form: any) {
  return <FormField
    control={form.control}
    name="description"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Descrição do estabelecimento</FormLabel>
        <FormControl>
        <Textarea placeholder="Estabelecimento" {...field} />
        </FormControl>
        <FormDescription>
          Esta é a descrição do estabelecimento
        </FormDescription>
        <FormMessage />
      </FormItem>
    )}
  />
}

function NewEstablishment() {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <div className='flex flex-col p-8 gap-6'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

          {renderNameField(form)}
          {renderDescriptionField(form)}

          <Button type="submit">Criar estabelecimento ou serviço</Button>
        </form>
      </Form>
    </div>
  )
}

export default NewEstablishment