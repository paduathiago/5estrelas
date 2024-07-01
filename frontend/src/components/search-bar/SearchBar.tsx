import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type SearchBarProps = {
  placeholder: string;
  buttonLabel: string;
  onSubmit: (category: string) => void; // Função callback para o valor do input
};

function SearchBar({ placeholder, buttonLabel, onSubmit }: SearchBarProps) {
  const FormSchema = z.object({
    category: z.string(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      category: "",
    },
  });

  function handleFormSubmit(data: z.infer<typeof FormSchema>) {
    onSubmit(data.category); // Chama a função onSubmit recebida pelas props
  }

  return (
    <div className="flex justify-center items-center w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmit)}
          className="flex items-center space-x-2 w-full"
        >
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    placeholder={placeholder}
                    {...field}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="flex-shrink-0">
            {buttonLabel}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default SearchBar;
