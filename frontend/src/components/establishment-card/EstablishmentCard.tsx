import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card'
import Stars from '../stars/Stars'
import ImageContainer from '../image-container/ImageContainer'
import { Star } from 'lucide-react'
import { useState } from 'react'
import { favoriteEstablishment } from '@/api'

type Props = {
    readonly id: string,
    readonly name: string,
    readonly address: string,
    readonly category: string,
    readonly description: string,
    readonly rating: number,
    readonly mainImage?: string
}

function EstablishmentCard({ id, name, address, category, description, rating, mainImage }: Props) {
    const href = `/establishments/${id}`

    const [fav, setFav] = useState(false);

    function handleFavouriteCLick(ev: React.MouseEvent<SVGSVGElement, MouseEvent>): void {
        ev.preventDefault();

        favoriteEstablishment(id, !fav);
        setFav(!fav);
    }

    const image = mainImage ? JSON.parse(mainImage) : undefined;

    return (
        <a href={href}>
            <Card>
                <CardHeader className='flex items-center justify-between flex-row'>
                    <CardTitle>{name}</CardTitle>
                    <Star fill={fav ? "#FFBF00" : "white"} onClick={(ev) => handleFavouriteCLick(ev)}></Star>
                </CardHeader>
                <CardContent>
                    <div className='flex flex-row gap-8'>
                        <div className='flex flex-row'>
                            <ImageContainer src={image.base64} alt="Estabelecimento" className='w-40 h-40' />
                        </div>
                        <div className='flex flex-col gap-4'>
                            <p>{description}</p>

                            <p>{address}</p>


                            <p>{category}</p>
                        </div>
                    </div>

                </CardContent>
                <CardFooter>
                    <Stars score={rating} />
                </CardFooter>
            </Card>
        </a>
    )
}

export default EstablishmentCard