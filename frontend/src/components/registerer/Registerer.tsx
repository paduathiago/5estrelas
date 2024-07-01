import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { z } from "zod"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Avatar } from '../ui/avatar';
import { signup } from '@/api';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const imageSchema = z.object({
  name: z.string(),
  type: z.string().startsWith('image/'),
  size: z.number(),
  base64: z.string(),
});

const registerFormSchema = z.object({
  email: z.string().min(2).max(50),
  password: z.string().min(8),
  name: z.string(),
  image: imageSchema.optional(),
})

const convertToBase64 = (file: any) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

function renderImageField(form: any) {
  const [image, setImage] = useState<any>([]);

  const handleImageUpload = async (event: any) => {
    const files: any = Array.from(event.target.files);
    const base64Images = await Promise.all(files.map(convertToBase64));

    const imageData = base64Images.map((base64, index) => ({
      name: files[index].name,
      type: files[index].type,
      size: files[index].size,
      base64,
    }));

    try {
      form.setValue('image', imageData[0]);
      setImage(imageData);
    } catch (e) {
      if (!(e instanceof Error)) return;
      console.error("Dados inválidos:", e.message);
    }
  };
  return <FormField
    control={form.control}
    name="image"
    render={() => (
      <>
        <FormItem>
          <FormLabel>Foto de perfil</FormLabel>
          <Input name="image" className="none" type="file" placeholder="Foto de perfil" accept="image/*" onChange={handleImageUpload} />
          <FormMessage />
        </FormItem>

        <div>
          <div className='flex flex-row gap-3 overflow-x-auto justify-center'>
            {image.map((image: any, index: any) => (
              <Avatar className="h-30 w-30 border-4 border-primary" key={"image-" + index}>
                <img src={image.base64} alt={image.name} />
              </Avatar>

            ))}
          </div>
        </div>
      </>
    )}
  />
}


function Registerer() {
  const formSchema = registerFormSchema;

  const [cookies, setCookie] = useCookies();

  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const image = JSON.stringify(values.image);
    const input = {
      name: values.name,
      password: values.password,
      image: image,
      email: values.email
    }
    const signData = await signup(input);

    setCookie('AuthToken', signData.token);

    navigate('/');
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Registro</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="nome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="e-mail" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Senha" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {renderImageField(form)}
            <Button type="submit">Registrar-se</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default Registerer