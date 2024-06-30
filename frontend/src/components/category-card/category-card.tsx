import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import ImageContainer from "../image-container/ImageContainer";
import { Star } from "lucide-react";

type CategoryCard = {
  readonly id: string;
  readonly name: string;
  img: string;
};

function CategoryCard({ id, name, img }: CategoryCard) {
  const href = `/establishments/${id}`; //Isso deve ser mudado para entrar na pagina

  const [fav, setFav] = useState(false);

  function handleFavouriteClick(
    ev: React.MouseEvent<SVGSVGElement, MouseEvent>
  ): void {
    ev.preventDefault();
    setFav(!fav);
  }

  return (
    <a href={href}>
      <Card className="w-[227px] h-[255px] flex flex-col">
        <div className="flex-grow">
          <CardContent className="h-full">
            <div className="h-full flex items-center justify-center pt-[18px]">
              <img
                src={img}
                alt={name}
                className="object-cover w-full h-full"
              />
            </div>
          </CardContent>
        </div>
        <CardFooter className="mt-auto flex items-center justify-center">
          <CardTitle>{name}</CardTitle>
        </CardFooter>
      </Card>
    </a>
  );
}

export default CategoryCard;
