import React from 'react';
import Image from 'next/image';

interface CircularAvatarProps {
    src: string;
    size: number;
    alt: string;
}

const CircularAvatar: React.FC<CircularAvatarProps> = ({ src, size, alt }) => {
    return (
        <div
            style={{
                width: size,
                height: size,
                borderRadius: '50%',
                overflow: 'hidden',
                position: 'relative',
                backgroundColor: '#fff',
                boxShadow: '0 0 10px rgba(0,0,0,0.3)',
                border: '4px solid rgba(255,255,255,0.8)'
            }}
        >
            <Image
                src={src}
                alt={alt}
                width={size}
                height={size}
                style={{
                    objectFit: 'cover',
                    width: '100%',
                    height: '100%'
                }}
            />
        </div>
    );
};

export default CircularAvatar;
