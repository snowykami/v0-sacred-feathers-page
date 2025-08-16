import { NextResponse } from 'next/server'
import sharp from 'sharp'
import { getMemberById } from '@/data/members-data'

function getStrokeColor(connectionRatio: number): string {
    // 定义多个层次的颜色
    const colors = [
        { r: 169, g: 169, b: 169 },     // #A9A9A9 - 深银灰色 (0-0.2)
        { r: 192, g: 192, b: 192 },     // #C0C0C0 - 银色 (0.2-0.4)
        { r: 205, g: 127, b: 50 },      // #CD7F32 - 青铜色 (0.4-0.6)
        { r: 192, g: 192, b: 192 },     // #C0C0C0 - 银色 (0.6-0.7)
        { r: 218, g: 165, b: 32 },      // #DAA520 - 金黄色 (0.7-0.8)
        { r: 255, g: 215, b: 0 },       // #FFD700 - 金色 (0.8-0.9)
        { r: 255, g: 223, b: 0 },       // #FFDF00 - 帝王金 (0.9-1.0)
    ]
    
    // 定义每个颜色区间的边界
    const thresholds = [0, 0.2, 0.4, 0.6, 0.7, 0.8, 0.9, 1.0]
    
    // 找到当前比率所在的区间
    let i = 0
    while (i < thresholds.length - 1 && connectionRatio > thresholds[i + 1]) {
        i++
    }
    
    // 如果是最后一个颜色，直接返回
    if (i === colors.length - 1) {
        return `rgb(${colors[i].r},${colors[i].g},${colors[i].b})`
    }
    
    // 计算在当前区间内的插值比例
    const intervalRatio = (connectionRatio - thresholds[i]) / (thresholds[i + 1] - thresholds[i])
    
    // 在相邻两个颜色之间进行插值
    const color1 = colors[i]
    const color2 = colors[i + 1]
    
    return `rgb(${
        Math.round(color1.r + (color2.r - color1.r) * intervalRatio)
    },${
        Math.round(color1.g + (color2.g - color1.g) * intervalRatio)
    },${
        Math.round(color1.b + (color2.b - color1.b) * intervalRatio)
    })`
}

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const id = await Promise.resolve(params.id);
        const member = getMemberById(id)
        
        if (!member) {
            return new NextResponse('Member not found', { status: 404 })
        }

        // 从 URL 获取连接比率参数
        const url = new URL(request.url)
        const connectionRatio = parseFloat(url.searchParams.get('ratio') || '0')
        const borderColor = getStrokeColor(connectionRatio)
        
        // 从URL获取图片
        const imageResponse = await fetch(member.avatar)
        if (!imageResponse.ok) {
            return new NextResponse('Failed to fetch image', { status: 500 })
        }
        const imageBuffer = await imageResponse.arrayBuffer()
        
        // 创建带有边框的圆形头像
        const size = 200
        const strokeWidth = 12
        const circularAvatar = await sharp(Buffer.from(imageBuffer))
            .resize(size, size)
            .composite([
                {
                    // 先应用圆形裁剪
                    input: Buffer.from(`<svg><circle cx="${size/2}" cy="${size/2}" r="${size/2}" /></svg>`),
                    blend: 'dest-in'
                },
                {
                    // 添加复杂渐变边框
                    input: Buffer.from(`<svg width="${size}" height="${size}">
                        <defs>
                            <linearGradient id="borderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style="stop-color:${borderColor};stop-opacity:1" />
                                <stop offset="50%" style="stop-color:${borderColor};stop-opacity:0.9" />
                                <stop offset="100%" style="stop-color:${borderColor};stop-opacity:0.8" />
                            </linearGradient>
                            <filter id="glow">
                                <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
                                <feColorMatrix in="blur" type="matrix" values="
                                    1 0 0 0 0
                                    0 1 0 0 0
                                    0 0 1 0 0
                                    0 0 0 15 -5"
                                />
                            </filter>
                        </defs>
                        <g>
                            <circle cx="${size/2}" cy="${size/2}" r="${(size-strokeWidth)/2}" 
                                stroke="${borderColor}" 
                                stroke-width="${strokeWidth-4}" 
                                stroke-opacity="0.3"
                                filter="url(#glow)"
                                fill="none" />
                            <circle cx="${size/2}" cy="${size/2}" r="${(size-strokeWidth)/2}" 
                                stroke="url(#borderGradient)" 
                                stroke-width="${strokeWidth}" 
                                fill="none" />
                        </g>
                    </svg>`),
                    blend: 'over'
                }
            ])
            .toFormat('png')
            .toBuffer()

        // 返回处理后的图片
        return new Response(new Uint8Array(circularAvatar), {
            headers: {
                'Content-Type': 'image/png',
                'Cache-Control': 'public, max-age=31536000, immutable'
            }
        })
    } catch (error) {
        console.error('Error processing image:', error)
        return new NextResponse('Error processing image', { status: 500 })
    }
}
