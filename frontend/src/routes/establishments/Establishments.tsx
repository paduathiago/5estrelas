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

  const [searchTerm, setSearchTerm] = useState("");

  const categoryEstablishments = establishments?.filter((establishment) => {
    if (category === undefined || establishment.category === category) {
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
      {category && <h1 className="mb-4">{category.charAt(0).toUpperCase() + category.slice(1)}</h1>}

      <SearchBar
        placeholder="Busque por um estabelecimento"
        buttonLabel="Buscar"
        onSubmit={handleSearchSubmit}
      />

      {filteredEstablishments && (
        <EstablishmentList establishments={filteredEstablishments} />
      )}

    </div>
  );
}

export default Establishments;
