import React, { useState, useEffect } from 'react';
import './ClickSpark.css';

interface Spark {
    id: number;
    x: number;
    y: number;
}

interface ClickSparkProps {
    sparkColor?: string;
    sparkSize?: number;
    sparkRadius?: number;
    sparkCount?: number;
    duration?: number;
    easing?: string;
    extraScale?: number;
}

const ClickSpark: React.FC<ClickSparkProps> = ({
    sparkColor = '#ffffff',
    sparkSize = 10,
    sparkRadius = 15,
    sparkCount = 8,
    duration = 400,
    easing = 'ease-out',
    extraScale = 1,
}) => {
    const [sparks, setSparks] = useState<Spark[]>([]);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const newSpark: Spark = {
                id: Date.now() + Math.random(),
                x: e.clientX,
                y: e.clientY,
            };

            setSparks((prev) => [...prev, newSpark]);

            setTimeout(() => {
                setSparks((prev) => prev.filter((spark) => spark.id !== newSpark.id));
            }, duration + 100);
        };

        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, [duration]);

    return (
        <div className="click-spark-container">
            {sparks.map((spark) => (
                <div
                    key={spark.id}
                    className="spark-burst"
                    style={{
                        left: `${spark.x}px`,
                        top: `${spark.y}px`,
                    }}
                >
                    {Array.from({ length: sparkCount }).map((_, i) => {
                        const angle = (360 / sparkCount) * i;
                        const radian = (angle * Math.PI) / 180;
                        const endX = Math.cos(radian) * sparkRadius;
                        const endY = Math.sin(radian) * sparkRadius;

                        return (
                            <div
                                key={i}
                                className="spark-particle"
                                style={{
                                    width: `${sparkSize * 3}px`,
                                    height: `${sparkSize / 3}px`,
                                    backgroundColor: sparkColor,
                                    left: '0',
                                    top: '0',
                                    borderRadius: `${sparkSize / 6}px`,
                                    // @ts-ignore
                                    '--end-x': `${endX}px`,
                                    '--end-y': `${endY}px`,
                                    '--scale': extraScale,
                                    '--rotation': `${angle}deg`,
                                    animation: `spark-burst-${i} ${duration}ms ${easing} forwards`,
                                }}
                            />
                        );
                    })}
                </div>
            ))}
        </div>
    );
};

export default ClickSpark;
