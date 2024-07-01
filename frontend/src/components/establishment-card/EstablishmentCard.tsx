import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";
import Stars from "../stars/Stars";
import ImageContainer from "../image-container/ImageContainer";
import { Star } from "lucide-react";
import { useState } from "react";
import { favoriteEstablishment } from "@/api";
import { useLocation } from "react-router-dom";
import { EstablishmentType } from "@/backTypes";

function truncateToDecimals(number: number) {
    if (!number) return;
    const factor = Math.pow(10, 2);
    return Math.trunc(number * factor) / factor;
}

function EstablishmentCard({ ...props }: EstablishmentType) {
    const href = `/establishments/${props.category}/${props.id}`;

    const [fav, setFav] = useState(props.favorited);

    function handleFavouriteCLick(
        ev: React.MouseEvent<SVGSVGElement, MouseEvent>
    ): void {
        ev.preventDefault();

        favoriteEstablishment(props.id, !fav);
        setFav(!fav);
    }

    const image = props.mainImage ? JSON.parse(props.mainImage) : undefined;
    return (
        <a href={href}>
            <Card>
                <CardHeader className='flex items-center justify-between flex-row'>
                    <CardTitle>{props.name}</CardTitle>
                    <Star fill={fav ? "#FFBF00" : "white"} onClick={(ev) => handleFavouriteCLick(ev)}></Star>
                </CardHeader>
                <CardContent>
                    <div className='flex flex-row gap-8'>
                        <div className='flex flex-row'>
                            <ImageContainer src={image?.base64} alt="Estabelecimento" className='w-40 h-40' />
                        </div>
                        <div className='flex flex-col gap-4'>
                            <p>{props.description}</p>
                            <p>{props.category}</p>
                            <p>{props.description}</p>
                        </div>
                    </div>

                </CardContent>
                <CardFooter>
                    <Stars score={props.rating} /> ({truncateToDecimals(props.rating)}) {props.numberOfReviews === 0 && 'Ainda não avaliado'}
                </CardFooter>
            </Card>
        </a>
    );
}

export default EstablishmentCard;
