import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card'
import Stars from '../stars/Stars'
import ImageContainer from '../image-container/ImageContainer'

function EstablishmentCard() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Título do estabelecimento</CardTitle>
            </CardHeader>
            <CardContent>
                <div className='flex flex-row gap-8'>
                <div className='flex flex-row'>
                    <ImageContainer />
                </div>
                <div className='flex flex-row'>
                    <ImageContainer />
                </div>
                </div>

            </CardContent>
            <CardFooter>
                <Stars score={2.4}/>
            </CardFooter>
        </Card>
    )
}

export default EstablishmentCard