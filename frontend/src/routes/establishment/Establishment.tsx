import Stars from '@/components/stars/Stars'
import UserReview from '@/components/user-review/UserReview'
import React from 'react'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from '@/components/ui/card'


function Establishment() {
  return (
    <div className='flex flex-col p-8 gap-6'>
      <div className="container mx-auto p-16 shadow-lg rounded-lg bg-card">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 flex justify-center items-center">
          <div>
            <img src="https://www.ipropose.com.br/wp-content/uploads/2022/11/estabelecimento-comercial004.jpg" alt="Estabelecimento" className="w-full rounded-lg" />
          </div>
          </div>
          <div className="md:w-2/3 md:pl-6 mt-4 md:mt-0 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">Nome do Estabelecimento</h1>
            </div>
            <span className="text-gray-600">Aberto: 8h - 22h</span>
            <div className="mt-2 flex items-center justify-between">
              <p className="text-gray-700"><strong>Telefone:</strong> (00) 1234-5678</p>
            </div>
            <div className="flex items-center">
              <Stars score={5}></Stars>
              <span className="ml-2 text-gray-600">(5.0)</span>
            </div>
            <p className="mt-4 text-gray-700">Descrição do estabelecimento. Aqui você pode falar um pouco sobre o que o estabelecimento oferece e suas principais características.</p>
          </div>
        </div>
      </div>
      <div className="containermx-auto p-8 shadow-lg rounded-lg bg-card">
        <h2 className="text-2xl font-bold mb-2">Galeria de Imagens</h2>
        <div className='w-full'>
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <span className="text-3xl font-semibold">{index + 1}</span>
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
      <div className="">

        <UserReview></UserReview>
      </div>
    </div>)
}



export default Establishment