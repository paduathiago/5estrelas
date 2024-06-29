import React from 'react'

import { zodResolver } from "@hookform/resolvers/zod"
import { UseFormReturn, useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from '@/components/ui/textarea'

const formSchema = z.object({
  name: z.string(),
  description: z.string(),
  phone: z.string(),
  openingHours: z.string(),
  address: z.string(),
  mainImage: z.string(),
});

function renderNameField(form: any) {
  return <FormField
    control={form.control}
    name="name"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Nome do estabelecimento</FormLabel>
        <FormControl>
          <Input placeholder="Estabelecimento" {...field} />
        </FormControl>
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
        <FormMessage />
      </FormItem>
    )}
  />
}

function renderPhoneField(form: any) {
  return <FormField
    control={form.control}
    name="phone"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Telefone do estabelecimento</FormLabel>
        <FormControl>
          <Textarea placeholder="Telefone" {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
}

function renderImageField(form: any) {
  return <FormField
    control={form.control}
    name="mainImage"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Imagem</FormLabel>
        <FormControl>
          <Input type="file" placeholder="Imagem" {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
}

function NewEstablishment() {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      phone: '',
      openingHours: '',
      address: '',
      mainImage: undefined,
      images: [],
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
          {renderPhoneField(form)}
          {renderImageField(form)}

          <Button type="submit">Criar estabelecimento ou serviço</Button>
        </form>
      </Form>
    </div>
  )
}

export default NewEstablishment