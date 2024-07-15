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
import { useNavigate } from "react-router-dom";
import ImageContainer from "@/components/image-container/ImageContainer";
import {
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Carousel,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const daysOfWeek = [
  { value: "Domingo", label: "Domingo" },
  { value: "Segunda-feira", label: "Segunda-feira" },
  { value: "Terça-feira", label: "Terça-feira" },
  { value: "Quarta-feira", label: "Quarta-feira" },
  { value: "Quinta-feira", label: "Quinta-feira" },
  { value: "Sexta-feira", label: "Sexta-feira" },
  { value: "Sábado", label: "Sábado" },
];

const hours = [
  { value: "00:00", label: "00:00" },
  { value: "01:00", label: "01:00" },
  { value: "02:00", label: "02:00" },
  { value: "03:00", label: "03:00" },
  { value: "04:00", label: "04:00" },
  { value: "05:00", label: "05:00" },
  { value: "06:00", label: "06:00" },
  { value: "07:00", label: "07:00" },
  { value: "08:00", label: "08:00" },
  { value: "09:00", label: "09:00" },
  { value: "10:00", label: "10:00" },
  { value: "11:00", label: "11:00" },
  { value: "12:00", label: "12:00" },
  { value: "13:00", label: "13:00" },
  { value: "14:00", label: "14:00" },
  { value: "15:00", label: "15:00" },
  { value: "16:00", label: "16:00" },
  { value: "17:00", label: "17:00" },
  { value: "18:00", label: "18:00" },
  { value: "19:00", label: "19:00" },
  { value: "20:00", label: "20:00" },
  { value: "21:00", label: "21:00" },
  { value: "22:00", label: "22:00" },
  { value: "23:00", label: "23:00" },
];

const categories = [
  { value: "academia", label: "Academia" },
  { value: "medico", label: "Medicos" },
  { value: "restaurante", label: "Restaurantes" },
  { value: "academia", label: "Academias" },
  { value: "bar", label: "Bares" },
  { value: "salao", label: "Salões de Beleza" },
  { value: "barbearia", label: "Barbearias" },
  { value: "farmacia", label: "Farmácias" },
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
      "Domingo",
      "Segunda-feira",
      "Terça-feira",
      "Quarta-feira",
      "Quinta-feira",
      "Sexta-feira",
      "Sábado",
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
  startHour: z.string(),
  endHour: z.string(),
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
          <FormLabel>Nome do estabelecimento ou serviço</FormLabel>
          <FormControl>
            <Input placeholder="Estabelecimento ou serviço" {...field} />
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
          <FormLabel>Descrição do estabelecimento ou serviço</FormLabel>
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
          <FormLabel>Telefone do estabelecimento ou serviço</FormLabel>
          <FormControl>
            <Input type="text" placeholder="Telefone" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function renderAddressField(form: any) {
  return (
    <FormField
      control={form.control}
      name="address"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Endereço:</FormLabel>
          <FormControl>
            <Input type="text" placeholder="Endereço" {...field} />
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
                <ImageContainer
                  key={"image-" + index}
                  src={image.base64}
                  alt={image.name}
                  className="min-w-72 h-72"
                ></ImageContainer>
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

          <div className="flex items-center justify-center">
            {images && (
              <Carousel
                opts={{
                  align: "start",
                }}
                className="w-10/12"
              >
                <CarouselContent>
                  {images?.map((image: any, index: any) => (
                    <CarouselItem
                      key={"image-" + index}
                      className="md:basis-1/2 lg:basis-1/3"
                    >
                      <div className="p-1">
                        <Card>
                          <CardContent className="flex aspect-square items-center justify-center">
                            <div className="w-full h-full overflow-hidden flex items-center justify-center rounded-lg">
                              <img
                                src={image.base64}
                                alt="Estabelecimento"
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                {images.length > 0 && <CarouselPrevious />}
                {images.length > 0 && <CarouselNext />}
              </Carousel>
            )}
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

function renderStartHourSelector(
  form: UseFormReturn<z.infer<typeof formSchema>>
) {
  function handleChange(e: any) {
    form.setValue("startHour", e);
  }

  return (
    <FormField
      control={form.control}
      name="category"
      render={() => (
        <FormItem>
          <FormLabel>Horário de início</FormLabel>
          <FormControl>
            <Select onValueChange={handleChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecione horário de início" />
              </SelectTrigger>
              <SelectContent>
                {hours.map((hour) => {
                  const { value, label } = hour;
                  return (
                    <SelectItem key={hour.value} value={value}>
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

function renderEndHourSelector(
  form: UseFormReturn<z.infer<typeof formSchema>>
) {
  function handleChange(e: any) {
    form.setValue("endHour", e);
  }

  return (
    <FormField
      control={form.control}
      name="category"
      render={() => (
        <FormItem>
          <FormLabel>Horário de fim</FormLabel>
          <FormControl>
            <Select onValueChange={handleChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecione horário de fim" />
              </SelectTrigger>
              <SelectContent>
                {hours.map((hour) => {
                  const { value, label } = hour;
                  return (
                    <SelectItem key={hour.value} value={value}>
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
          <FormLabel>Categoria</FormLabel>
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
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      phone: "",
      address: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const establishment = await createEstablishment({
      name: values.name,
      description: values.description,
      address: values.address,
      category: values.category,
      mainImage: JSON.stringify(values.mainImage),
      images: JSON.stringify(values.images),
      daysOpen: JSON.stringify(values.daysOfWeek),
      phone: values.phone,
      workingHours: `${values.startHour} às ${values.endHour}`,
    });

    if (establishment) {
      navigate("/establishments/" + establishment.category);
    }
  }

  return (
    <div className="flex flex-col p-8 gap-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {renderNameField(form)}
          {renderDescriptionField(form)}
          {renderPhoneField(form)}
          {renderAddressField(form)}
          {renderImageField(form)}
          {renderImagesField(form)}
          {renderDaysOfWeekSelector(form)}
          {renderCategorySelector(form)}
          {renderStartHourSelector(form)}
          {renderEndHourSelector(form)}

          <Button type="submit">Criar estabelecimento ou serviço</Button>
        </form>
      </Form>
    </div>
  );
}

export default NewEstablishment;