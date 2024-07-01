import { fetchEstablishments } from "@/api";
import { EstablishmentType } from "@/backTypes";
import EstablishmentList from "@/components/establishment-list/EstablishmentList";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import SearchBar from "@/components/search-bar/SearchBar";

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

  const [searchTerm, setSearchTerm] = useState("");

  const categoryEstablishments = establishments?.filter((establishment) => {
    if (establishment.category === category) {
      return establishment;
    }
  });

  const filteredEstablishments = categoryEstablishments?.filter(
    (establishment) => {
      return establishment.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    }
  );

  const handleSearchSubmit = (search) => {
    setSearchTerm(search);
  };

  return (
    <div className="flex flex-col w-full p-8 gap-2">
      <h1 className="mb-4">{formattedCategory}</h1>

      <SearchBar
        placeholder="Busque por um estabelecimento"
        buttonLabel="Buscar"
        onSubmit={handleSearchSubmit}
      />

      {filteredEstablishments && (
        <EstablishmentList establishments={filteredEstablishments} />
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
