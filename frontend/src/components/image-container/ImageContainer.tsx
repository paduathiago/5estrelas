import React from 'react'

function ImageContainer() {
    return (
        <div className='w-24 h-24 bg-secondary rounded-lg flex justify-center items-center'>
        <div className='w-20 h-20'>
            <img  src="https://www.ipropose.com.br/wp-content/uploads/2022/11/estabelecimento-comercial004.jpg" alt="Estabelecimento" className="w-full h-full object-cover rounded-lg" />
        </div>
        </div>
    )
}

export default ImageContainer