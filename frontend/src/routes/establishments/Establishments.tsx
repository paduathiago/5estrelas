import EstablishmentList from '@/components/establishment-list/EstablishmentList'
import { Input } from '@/components/ui/input'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import React from 'react'

function Establishments() {
    return (
        <div className='flex flex-col w-full p-8 gap-2'>
            <Input type="search" className='border-2-primary bg-background' />
            <EstablishmentList></EstablishmentList>
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

export default Establishments