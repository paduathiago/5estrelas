import React from 'react'
import EstablishmentCard from '../establishment-card/EstablishmentCard'

function EstablishmentList() {
    return (
        <div className='w-full grid gap-4 grid-cols-2 grid-rows-3'>
            <EstablishmentCard />
            <EstablishmentCard />
            <EstablishmentCard />
            <EstablishmentCard />
            <EstablishmentCard />
            <EstablishmentCard />
        </div>
    )
}

export default EstablishmentList