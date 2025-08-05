"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"

interface QRCodeModalProps {
    isOpen: boolean
    onClose: () => void
    title: string
    qrCodeUrl: string
    description?: string
    imageClassName?: string
    containerClassName?: string
}

export function QRCodeModal({ isOpen, onClose, title, qrCodeUrl, description, imageClassName, containerClassName }: QRCodeModalProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }

        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return

            if (e.key === 'Escape') {
                onClose()
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [isOpen, onClose])

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    if (!isOpen) return null

    return (
        <div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
            onClick={handleBackdropClick}
        >
            {/* Modal Content */}
            <div
                className="bg-gradient-to-br from-slate-900 to-slate-800 border border-amber-500/30 rounded-2xl shadow-2xl shadow-amber-500/20 max-w-lg w-full mx-4 relative overflow-hidden max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Decorative gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-blue-500/5 pointer-events-none"></div>

                {/* Close button */}
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        onClose()
                    }}
                    className="absolute top-4 right-4 z-30 bg-slate-800/90 hover:bg-slate-700/90 text-white rounded-full p-2 transition-colors shadow-lg border border-slate-600/50 hover:border-amber-400/50"
                    type="button"
                >
                    <X className="h-5 w-5" />
                </button>

                {/* Content */}
                <div className="p-6 sm:p-8 text-center relative z-5">
                    {/* Title */}
                    <h3 className="text-2xl font-bold text-transparent bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 bg-clip-text mb-4">
                        {title}
                    </h3>

                    {/* Description */}
                    {description && (
                        <p className="text-gray-300 mb-6 leading-relaxed">
                            {description}
                        </p>
                    )}

                    {/* QR Code */}
                    <div className={`bg-white p-3 sm:p-4 rounded-xl shadow-lg mb-6 mx-auto inline-block ${containerClassName || 'max-w-xs sm:max-w-sm'}`}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={qrCodeUrl}
                            alt="QR Code"
                            className={imageClassName || "max-w-full max-h-60 sm:max-h-80 mx-auto object-contain"}
                            draggable={false}
                        />
                    </div>

                    {/* Instructions */}
                    <p className="text-gray-400 text-sm">
                        扫描二维码加入我们的社区
                    </p>
                </div>

                {/* Animated border effect */}
                <div className="absolute inset-0 rounded-2xl border border-amber-400/20 pointer-events-none z-0">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-amber-400/20 to-transparent -skew-x-12 animate-pulse pointer-events-none"></div>
                </div>
            </div>
        </div>
    )
}
