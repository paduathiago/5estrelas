import EstablishmentList from "@/components/establishment-list/EstablishmentList";
import React from "react";
import CategoryCard from "@/components/category-card/category-card";
import InputForm from "@/components/search-bar/SearchBar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import "./main-page.css";

import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

const categories = [
  {
    id: "1",
    name: "Medicos",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4S3i0Vv04eORM_5HpLDY87XJjBvgevpDzYA&s",
  },
  {
    id: "2",
    name: "Restaurantes",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4S3i0Vv04eORM_5HpLDY87XJjBvgevpDzYA&s",
  },
  {
    id: "3",
    name: "Academias",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4S3i0Vv04eORM_5HpLDY87XJjBvgevpDzYA&s",
  },
  {
    id: "4",
    name: "Bares",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4S3i0Vv04eORM_5HpLDY87XJjBvgevpDzYA&s",
  },
  {
    id: "5",
    name: "Salões de Beleza",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4S3i0Vv04eORM_5HpLDY87XJjBvgevpDzYA&s",
  },
  {
    id: "6",
    name: "Barbearias",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4S3i0Vv04eORM_5HpLDY87XJjBvgevpDzYA&s",
  },
  {
    id: "7",
    name: "Farmácias",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4S3i0Vv04eORM_5HpLDY87XJjBvgevpDzYA&s",
  },
  {
    id: "7",
    name: "eletricistas",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4S3i0Vv04eORM_5HpLDY87XJjBvgevpDzYA&s",
  },
];

function MainPage() {
  return (
    <div className="page-container">
      <h1>Escolha uma Catégoria de Serviço</h1>
      <div className="search-bar">
        {/* <Input
          type="email"
          placeholder="Busque uma catégoria"
          className="flex h-9 w-full rounded-md border border-input bg-white px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        />
        <Button>
          <MagnifyingGlassIcon className="mr-2 h-4 w-4" /> Buscar
        </Button> */}
        <InputForm
          placeholder="Busque por uma catégoria"
          buttonLabel="Buscar"
        ></InputForm>
      </div>
      <div className="category-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            id={category.id}
            img={category.img}
            name={category.name}
          />
        ))}
      </div>
    </div>
  );
}

export default MainPage;
