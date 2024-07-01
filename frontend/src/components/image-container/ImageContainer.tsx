import React from 'react'

type Props = {
    readonly src: string;
    readonly alt: string;
    readonly className: string;
}

function ImageContainer({ src, alt, className }: Props) {
    return (
        <div className={`overflow-hidden flex items-center justify-center rounded-lg ${className}`}>
            <img src={src} alt={alt} className="w-full h-full object-cover" />
        </div>
    )
}

export default ImageContainer