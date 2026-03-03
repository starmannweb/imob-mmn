"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";

export function ImageGallery({ images }: { images: string[] }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevImage = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentIndex((curr) => (curr === 0 ? images.length - 1 : curr - 1));
    };

    const nextImage = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentIndex((curr) => (curr === images.length - 1 ? 0 : curr + 1));
    };

    const setDirectImage = (index: number) => {
        setCurrentIndex(index);
    };

    if (!images || images.length === 0) {
        images = [
            'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1600607687930-ceaf5a8c51de?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1600585154526-990dced4ea0d?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1200&q=80'
        ];
    }

    return (
        <div>
            <div className="relative w-full h-[400px] md:h-[500px] bg-slate-200 rounded-xl overflow-hidden mb-3 group cursor-pointer">
                {/* Main Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center transition-all duration-300"
                    style={{ backgroundImage: `url(${images[currentIndex]})` }}
                ></div>

                {/* Gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent"></div>

                {/* Overlay Heart */}
                <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm flex items-center justify-center text-white transition-all">
                    <Heart className="w-5 h-5" />
                </button>

                {/* Overlay Info Image Counter */}
                <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md rounded-full px-3 py-1 flex items-center gap-3 text-white text-xs font-bold">
                    <ChevronLeft className="w-4 h-4 cursor-pointer hover:text-blue-300 transition-colors" onClick={prevImage} />
                    {currentIndex + 1} / {images.length}
                    <ChevronRight className="w-4 h-4 cursor-pointer hover:text-blue-300 transition-colors" onClick={nextImage} />
                </div>

                {/* Fake Instagram icon from print */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 rounded-2xl flex items-center justify-center opacity-80 cursor-pointer hover:opacity-100 transition-opacity">
                    <div className="w-10 h-10 border-2 border-white rounded-lg flex items-center justify-center relative">
                        <div className="w-4 h-4 border-2 border-white rounded-full"></div>
                        <div className="w-1 h-1 bg-white rounded-full absolute top-1 right-1"></div>
                    </div>
                </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {images.map((img, i) => (
                    <div
                        key={i}
                        onClick={() => setDirectImage(i)}
                        className={`w-24 h-16 bg-cover bg-center rounded-lg shrink-0 cursor-pointer border-2 transition-colors ${i === currentIndex ? 'border-blue-600' : 'border-transparent hover:border-blue-300'}`}
                        style={{ backgroundImage: `url(${img})` }}
                    ></div>
                ))}
            </div>
        </div>
    );
}
