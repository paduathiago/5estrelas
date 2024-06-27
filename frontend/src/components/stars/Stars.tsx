import React from 'react'
import { Star, StarHalf } from "lucide-react"

type StarsProps = {
    readonly score: number;
}

function Stars({ score }: StarsProps) {

    let fullStars = 5;
    let halfStar = false;
    if (score < 5) {
        fullStars = Math.floor(score);
        halfStar = score - fullStars >= 0.25;
    }
    return (
        <div className='p-2 rounded-md bg-secondary'>
        <div className="relative">
            <div className="flex gap-2">
                {Array.from({ length: 5 }, (_, index) => (
                    <Star key={index} fill="#111" strokeWidth={0} />
                ))}
            </div>
            <div className="flex gap-2 absolute top-0">

                {Array.from({ length: fullStars }, (_, index) => (
                    <Star key={index} fill="#FFBF00" strokeWidth={0} />
                ))}

                {halfStar && <StarHalf fill="yellow" strokeWidth={0} />}
            </div>
        </div>
        </div>
    )
}

export default Stars