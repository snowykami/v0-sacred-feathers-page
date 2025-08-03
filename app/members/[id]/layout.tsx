import type { Metadata } from 'next'
import { getMemberById } from '@/data/members-data'

type Props = {
    params: Promise<{ id: string }>
    children: React.ReactNode
}

// 生成动态 metadata
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const resolvedParams = await params
    const member = getMemberById(resolvedParams.id)

    if (!member) {
        return {
            title: 'Member Not Found',
            description: 'The requested member profile could not be found.',
        }
    }

    return {
        title: `${member.name} - Citizen archive | 公民档案`,
        description: `${member.name} - ${member.bio.en}`,
        keywords: [member.name, member.role, ...member.specialties],
        openGraph: {
            title: `${member.name} - Sacred Feathers Empire`,
            description: member.bio.en,
            images: [
                {
                    url: member.avatar || '/placeholder.svg',
                    width: 400,
                    height: 400,
                    alt: `${member.name}'s avatar`,
                },
            ],
            type: 'profile',
        },
        twitter: {
            card: 'summary',
            title: `${member.name} - Sacred Feathers Empire`,
            description: member.bio.en,
            images: [member.avatar || '/placeholder.svg'],
        },
    }
}

export default function MemberLayout({ children }: Props) {
    return children
}
