import React from 'react'
import { Star, StarHalf } from "lucide-react"

function Stars() {
    return (
        <div className="relative">
            <div className="flex gap-2">
                {Array.from({ length: 5 }, () => (
                    <Star fill="#111" strokeWidth={0} />
                ))}
            </div>
            <div className="flex gap-2 absolute top-0">
                <Star fill="yellow" strokeWidth={0} />
                <Star fill="yellow" strokeWidth={0} />
                <StarHalf fill="yellow" strokeWidth={0} />
            </div>
        </div>
    )
}

export default Stars