"use client"

import { useEffect, useState } from "react"

export default function RainEffect() {
    const [rainDrops, setRainDrops] = useState([])

    useEffect(() => {
        const drops = []
        for (let i = 0; i < 50; i++) {
            drops.push({
                id: i,
                left: Math.random() * 100,
                animationDuration: Math.random() * 5 + 2,
                animationDelay: Math.random() * 2,
            })
        }
        setRainDrops(drops)
    }, [])

    return (
        <div className="rain-container">
            {rainDrops.map((drop) => (
                <div
                    key={drop.id}
                    className="rain-drop"
                    style={{
                        left: `${drop.left}%`,
                        animationDuration: `${drop.animationDuration}s`,
                        animationDelay: `${drop.animationDelay}s`,
                        animation: `rain ${drop.animationDuration}s linear infinite`,
                    }}
                />
            ))}
        </div>
    )
}
