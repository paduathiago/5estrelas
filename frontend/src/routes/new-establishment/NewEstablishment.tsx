import React, { useRef, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { UseFormReturn, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import MultipleSelector from "@/components/ui/multi-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createEstablishment } from "@/api";

const daysOfWeek = [
  { value: "Sunday", label: "Domingo" },
  { value: "Monday", label: "Segunda-feira" },
  { value: "Tuesday", label: "Terça-feira" },
  { value: "Wednesday", label: "Quarta-feira" },
  { value: "Thursday", label: "Quinta-feira" },
  { value: "Friday", label: "Sexta-feira" },
  { value: "Saturday", label: "Sábado" },
];

const categories = [
  { value: "academia", label: "Academia" },
  { value: "medicos", label: "Medicos" },
  { value: "restaurantes", label: "Restaurantes" },
  { value: "academias", label: "Academias" },
  { value: "bares", label: "Bares" },
  { value: "saloes", label: "Salões de Beleza" },
  { value: "barbearia", label: "Barbearias" },
  { value: "farmácia", label: "Farmácias" },
  { value: "eletricista", label: "Eletricistas" },
];

const imageSchema = z.object({
  name: z.string(),
  type: z.string().startsWith("image/"),
  size: z.number(),
  base64: z.string(),
});

const dowSchema = z
  .array(
    z.enum([
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ])
  )
  .min(1, "Selecione pelo menos um dia da semana")
  .nonempty("Campo obrigatório");

const formSchema = z.object({
  name: z.string(),
  description: z.string(),
  phone: z.string(),
  address: z.string(),
  mainImage: imageSchema,
  images: z.array(imageSchema).optional(),
  daysOfWeek: dowSchema,
  category: z.string(),
});

const convertToBase64 = (file: any) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

function renderNameField(form: any) {
  return (
    <FormField
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
  );
}

function renderDescriptionField(form: any) {
  return (
    <FormField
      control={form.control}
      name="description"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Descrição do estabelecimento</FormLabel>
          <FormControl>
            <Textarea placeholder="Descrição" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function renderPhoneField(form: any) {
  return (
    <FormField
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
  );
}

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
      form.setValue("mainImage", imageData[0]);
      setImage(imageData);
    } catch (e) {
      if (!(e instanceof Error)) return;
      console.error("Dados inválidos:", e.message);
    }
  };
  return (
    <FormField
      control={form.control}
      name="mainImage"
      render={() => (
        <>
          <FormItem>
            <FormLabel>Logo</FormLabel>
            <Input
              name="images"
              className="none"
              type="file"
              placeholder="Imagens"
              accept="image/*"
              onChange={handleImageUpload}
            />
            <FormMessage />
          </FormItem>

          <div>
            <div className="flex flex-row gap-3 overflow-x-auto">
              {image.map((image: any, index: any) => (
                <img
                  key={"image-" + index}
                  src={image.base64}
                  alt={image.name}
                  width="300"
                />
              ))}
            </div>
          </div>
        </>
      )}
    />
  );
}

function renderImagesField(form: UseFormReturn<z.infer<typeof formSchema>>) {
  const [images, setImages] = useState<any>([]);

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
      form.setValue("images", imageData);
      setImages(imageData);
    } catch (e) {
      if (!(e instanceof Error)) return;
      console.error("Dados inválidos:", e.message);
    }
  };
  return (
    <FormField
      control={form.control}
      name="images"
      render={() => (
        <>
          <FormItem>
            <FormLabel>Imagens do local</FormLabel>
            <Input
              type="file"
              placeholder="Imagens"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
            />
            <FormMessage />
          </FormItem>

          <div>
            <div className="flex flex-row gap-3 overflow-x-auto">
              {images.map((image: any, index: any) => (
                <img
                  key={"image-" + index}
                  src={image.base64}
                  alt={image.name}
                  width="300"
                />
              ))}
            </div>
          </div>
        </>
      )}
    />
  );
}

function renderDaysOfWeekSelector(
  form: UseFormReturn<z.infer<typeof formSchema>>
) {
  function handleChange(e: any) {
    const dow = e.map((day: any) => day.value);
    form.setValue("daysOfWeek", dow);
  }

  return (
    <FormField
      control={form.control}
      name="daysOfWeek"
      render={() => (
        <FormItem>
          <FormLabel>Dias da semana</FormLabel>
          <FormControl>
            <MultipleSelector
              defaultOptions={daysOfWeek}
              onChange={handleChange}
            ></MultipleSelector>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function renderCategorySelector(
  form: UseFormReturn<z.infer<typeof formSchema>>
) {
  function handleChange(e: any) {
    form.setValue("category", e);
  }

  return (
    <FormField
      control={form.control}
      name="category"
      render={() => (
        <FormItem>
          <FormLabel>Categoria do estabelecimento</FormLabel>
          <FormControl>
            <Select onValueChange={handleChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecione categoria" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => {
                  const { value, label } = category;
                  return (
                    <SelectItem key={category.value} value={value}>
                      {label}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function NewEstablishment() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      phone: "",
      address: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    createEstablishment({
      name: values.name,
      description: values.description,
      address: values.address,
      category: values.category,
      mainImage: JSON.stringify(values.mainImage),
      images: JSON.stringify(values.images),
    });
  }

  return (
    <div className="flex flex-col p-8 gap-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {renderNameField(form)}
          {renderDescriptionField(form)}
          {renderPhoneField(form)}
          {renderImageField(form)}
          {renderImagesField(form)}
          {renderDaysOfWeekSelector(form)}
          {renderCategorySelector(form)}

          <Button type="submit">Criar estabelecimento ou serviço</Button>
        </form>
      </Form>
    </div>
  );
}

export default NewEstablishment;
