import { NextResponse } from 'next/server'
import sharp from 'sharp'
import { getMemberById } from '@/data/members-data'

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

        // 从URL获取图片
        const imageResponse = await fetch(member.avatar)
        if (!imageResponse.ok) {
            return new NextResponse('Failed to fetch image', { status: 500 })
        }
        const imageBuffer = await imageResponse.arrayBuffer()

        // 处理图片
        const circularAvatar = await sharp(Buffer.from(imageBuffer))
            .resize(200, 200)  // 调整大小
            .composite([{
                input: Buffer.from(`<svg><circle cx="100" cy="100" r="100" /></svg>`),
                blend: 'dest-in'
            }])
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
