import { fetchEstablishments } from "@/api";
import { EstablishmentType } from "@/backTypes";
import EstablishmentList from "@/components/establishment-list/EstablishmentList";
import { Input } from "@/components/ui/input";
import { useLocation } from "react-router-dom";
import { useState } from "react";

import InputForm from "@/components/search-bar/SearchBar";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import useAsync from "@/hooks/useAsync";
import React from "react";

function Establishments() {
  const { data: establishments } = useAsync<EstablishmentType[]>(
    () => fetchEstablishments(),
    []
  );

  const location = useLocation();
  const category = location.pathname.split("/")[2];
  const formattedCategory =
    category.charAt(0).toUpperCase() + category.slice(1);

  const categoryEstablishments = establishments?.filter((establishment) => {
    if (establishment.category === category) {
      return establishment;
    }
  });

  console.log(categoryEstablishments);
  return (
    <div className="flex flex-col w-full p-8 gap-2">
      <h1 className="mb-4">{formattedCategory}</h1>

      <InputForm
        placeholder="Busque por uma catégoria"
        buttonLabel="Buscar"
      ></InputForm>
      {establishments && (
        <EstablishmentList
          establishments={establishments.filter((establishment) => {
            return establishment.category === category;
          })}
        ></EstablishmentList>
      )}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default Establishments;
