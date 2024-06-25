import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card'
import Stars from '../stars/Stars'
import ImageContainer from '../image-container/ImageContainer'

function StablishmentCard() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Título do estabelecimento</CardTitle>
            </CardHeader>
            <CardContent>
                <div className='flex flex-row'>
                    <ImageContainer />
                </div>
            </CardContent>
            <CardFooter>
                <Stars />
            </CardFooter>
        </Card>
    )
}

export default StablishmentCard