import StablishmentList from '@/components/stablishment-list/StablishmentList'
import { Input } from '@/components/ui/input'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import React from 'react'

function Stablishments() {
    return (
        <div className='flex flex-col items-center justify-center w-full px-8 gap-2'>

            <Input type="search" />

            <StablishmentList></StablishmentList>

            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext href="#" />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>


        </div>
    )
}

export default Stablishments