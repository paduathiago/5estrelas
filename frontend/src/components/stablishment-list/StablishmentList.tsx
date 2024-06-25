import React from 'react'
import StablishmentCard from '../stablishment-card/StablishmentCard'

function StablishmentList() {
    return (
        <div className='w-full grid gap-4 grid-cols-2 grid-rows-3'>
            <StablishmentCard />
            <StablishmentCard />
            <StablishmentCard />
            <StablishmentCard />
            <StablishmentCard />
            <StablishmentCard />
        </div>
    )
}

export default StablishmentList