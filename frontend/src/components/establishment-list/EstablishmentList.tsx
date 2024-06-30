import React from 'react'
import EstablishmentCard from '../establishment-card/EstablishmentCard'
import { EstablishmentType } from '@/backTypes';

type Props = {
    readonly establishments: EstablishmentType[]
}

function EstablishmentList({ establishments }: Props) {



    return (
        <div className='w-full grid gap-4 grid-cols-2 grid-rows-3'>

            {establishments.map(establishment => {
                return <EstablishmentCard
                    key={establishment.id}
                    {...establishment}
                />
            })}
        </div>
    )
}

export default EstablishmentList