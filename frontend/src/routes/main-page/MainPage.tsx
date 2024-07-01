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
    img: "https://plus.unsplash.com/premium_photo-1661893870720-e2f6d09d96d7?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    href: "medico",
  },
  {
    id: "2",
    name: "Restaurantes",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4S3i0Vv04eORM_5HpLDY87XJjBvgevpDzYA&s",
    href: "restaurante",
  },
  {
    id: "3",
    name: "Academias",
    img: "https://plus.unsplash.com/premium_photo-1682435533755-273aec988f08?q=80&w=2045&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    href: "academia",
  },
  {
    id: "4",
    name: "Bares",
    img: "https://images.unsplash.com/photo-1575037614876-c38a4d44f5b8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    href: "bar",
  },
  {
    id: "5",
    name: "Salões de Beleza",
    img: "https://plus.unsplash.com/premium_photo-1682090995179-fcba95185bf5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    href: "salao",
  },
  {
    id: "6",
    name: "Barbearias",
    img: "https://plus.unsplash.com/premium_photo-1661420297394-a8a9590e93a8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    href: "barbearia",
  },
  {
    id: "7",
    name: "Farmácias",
    img: "https://plus.unsplash.com/premium_photo-1682130034617-ec94114384f5?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    href: "farmacia",
  },
  {
    id: "8",
    name: "Eletricistas",
    img: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    href: "eletricista",
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
