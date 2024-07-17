import Stars from "@/components/stars/Stars";
import UserReview from "@/components/user-review/UserReview";
import { useEffect, useState } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { useParams } from "react-router-dom";
import { favoriteEstablishment, fetchEstablishment, getReviews } from "@/api";
import { EstablishmentType, Review } from "@/backTypes";
import useAsync from "@/hooks/useAsync";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import DialogAnswer from "@/components/dialog-answer/DialogAnswer";
import SendReview from "@/components/sendReview/sendReview";

function truncateToDecimals(number: number) {
  if (!number) return;
  const factor = Math.pow(10, 2);
  return Math.trunc(number * factor) / factor;
}

type Params = {
  id: string;
};

function Establishment() {
  const { id } = useParams<Params>();
  const [mustFetch, setMustFetch] = useState({ id: 2 });
  const { data: establishment } = useAsync<any>(async () => {
    const e = await fetchEstablishment(id);

    if (e.favorited) {
      setFav(true);
    }
    return e;
  }, [id, mustFetch]);
  const { data: reviews } = useAsync<Review[]>(
    () => getReviews(id),
    [id, mustFetch]
  );
  const [fav, setFav] = useState(false);

  function handleFavouriteCLick(
    ev: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    if (!id) return;
    ev.preventDefault();
    favoriteEstablishment(id, !fav);
    setFav(!fav);
  }

  const mainImage = establishment?.mainImage
    ? JSON.parse(establishment?.mainImage)
    : undefined;

  const images = establishment?.images
    ? JSON.parse(establishment?.images)
    : undefined;

  const daysOpen = establishment?.daysOpen
    ? JSON.parse(establishment?.daysOpen)
    : undefined;

  const daysOpenString = Array.isArray(daysOpen) ? daysOpen.join(", ") : "";

  return (
    <div className="flex flex-col p-8 gap-6">
      <div className="container mx-auto p-16 shadow-lg rounded-lg bg-card">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 flex justify-center items-center">
            <div className="w-72 h-72 overflow-hidden flex items-center justify-center rounded-lg">
              <img
                src={mainImage?.base64}
                alt="Estabelecimento"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="md:w-2/3 md:pl-6 mt-4 md:mt-0 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">{establishment?.name}</h1>
              <Button
                variant={"outline"}
                onClick={(ev) => handleFavouriteCLick(ev)}
                className="cursor-pointer gap-2"
              >
                <Star fill={fav ? "#FFBF00" : "white"}></Star>
                {fav ? "Favorito" : "Favoritar"}
              </Button>
            </div>
            <span className="text-gray-600">
              Aberto:{" " + establishment?.workingHours}
            </span>

            <p>{daysOpenString}</p>

            <div className="mt-2 flex items-center justify-between">
              <p className="text-gray-700">
                <span>
                  <strong>Telefone: </strong> {establishment?.phone}
                </span>
                {/* TODO: Inserir telefone no estabelecimento */}
              </p>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <p className="text-gray-800">
                <span>
                  <strong>Endereço: </strong> {establishment?.address}
                </span>
                {/* TODO: Inserir telefone no estabelecimento */}
              </p>
            </div>
            <p className=" text-gray-900">{establishment?.description}</p>
            <div className="flex items-center mt-4">
              <Stars score={establishment?.rating}></Stars>
              <span className="ml-2 text-gray-600">
                ({truncateToDecimals(establishment?.rating)}){" "}
                {establishment?.numberOfReviews === 0 && "Ainda não avaliado"}
              </span>
            </div>
          </div>
        </div>
      </div>
      <h1 className="text-2xl font-bold">Galeria de Imagens</h1>
      <div className="containermx-auto p-8 shadow-lg rounded-lg bg-card">
        <div className="w-full">
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full"
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
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Avaliações</h1>
        {!establishment?.isFromUser && (
          <SendReview
            establishmentId={establishment?.id}
            onSubmitReview={() => {
              const test = { ...mustFetch };
              setMustFetch(test);
            }}
          />
        )}
      </div>
      <div className="flex flex-col gap-4">
        {reviews?.map((review) => {
          return (
            <UserReview
              key={review.id}
              {...review}
              establishment={establishment}
            ></UserReview>
          );
        })}
      </div>
    </div>
  );
}

export default Establishment;
