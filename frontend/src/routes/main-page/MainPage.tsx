import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import CategoryCard from "@/components/category-card/category-card";
import SearchBar from "@/components/search-bar/SearchBar";
import "./main-page.css";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

const categories = [
  {
    id: "1",
    name: "Medicos",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4S3i0Vv04eORM_5HpLDY87XJjBvgevpDzYA&s",
    href: "medicos",
  },
  {
    id: "2",
    name: "Restaurantes",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4S3i0Vv04eORM_5HpLDY87XJjBvgevpDzYA&s",
    href: "restaurantes",
  },
  {
    id: "3",
    name: "Academias",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4S3i0Vv04eORM_5HpLDY87XJjBvgevpDzYA&s",
    href: "academias",
  },
  {
    id: "4",
    name: "Bares",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4S3i0Vv04eORM_5HpLDY87XJjBvgevpDzYA&s",
    href: "bares",
  },
  {
    id: "5",
    name: "Salões de Beleza",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4S3i0Vv04eORM_5HpLDY87XJjBvgevpDzYA&s",
    href: "saloes",
  },
  {
    id: "6",
    name: "Barbearias",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4S3i0Vv04eORM_5HpLDY87XJjBvgevpDzYA&s",
    href: "barbearias",
  },
  {
    id: "7",
    name: "Farmácias",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4S3i0Vv04eORM_5HpLDY87XJjBvgevpDzYA&s",
    href: "farmacias",
  },
  {
    id: "8",
    name: "Eletricistas",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4S3i0Vv04eORM_5HpLDY87XJjBvgevpDzYA&s",
    href: "eletricistas",
  },
];

function MainPage() {
  const location = useLocation();
  const fullUrl = `${window.location.protocol}//${window.location.host}${location.pathname}${location.search}${location.hash}`;
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchSubmit = (search) => {
    setSearchTerm(search);
  };

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-container">
      <h1>Escolha uma Categoria de Serviço</h1>
      <div className="search-bar">
        <SearchBar
          placeholder="Busque por uma categoria"
          buttonLabel="Buscar"
          onSubmit={handleSearchSubmit}
        />
      </div>
      <div className="category-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredCategories.map((category) => (
          <a
            key={category.id}
            href={fullUrl + "establishments/" + category.href}
          >
            <CategoryCard
              id={category.id}
              img={category.img}
              name={category.name}
            />
          </a>
        ))}
      </div>
    </div>
  );
}

export default MainPage;
