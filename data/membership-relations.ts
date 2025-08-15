import { Member } from './members-data';

// Define RelationshipData type
export type RelationshipData = {
    source: (member: Member) => boolean;
    target: (member: Member) => boolean;
    sourceType?: string;
    targetType?: string;
    type: 'unidirectional' | 'bidirectional';
    label: string;
    color: string;
    excludeSelfReference?: boolean;
};

export const idIs = (id: string) => (member: Member) => member.id === id;

export const roleIs = (role: string) => (member: Member) => member.role === role;

export const hasLabels = (...labels: string[]) => (member: Member) =>
    labels.every(label => member.labels?.includes(label));

export const specialtyIs = (specialty: string) => (member: Member) =>
    member.specialties?.includes(specialty);

export const joinDateIs = (date: string) => (member: Member) =>
    member.joinDate === date;

export const isActive = (active: boolean) => (member: Member) =>
    member.isActive === active;

export const statCompare = (stat: keyof Member['stats'], operator: 'gt' | 'lt' | 'eq' | 'gte' | 'lte', value: number) => (member: Member) => {
    const memberValue = member.stats?.[stat];
    if (typeof memberValue !== 'number') return false;
    switch (operator) {
        case 'gt': return memberValue > value;
        case 'lt': return memberValue < value;
        case 'eq': return memberValue === value;
        case 'gte': return memberValue >= value;
        case 'lte': return memberValue <= value;
        default: return false;
    }
};

export const isManagement = (member: Member) => (
    ['redish101', 'synodriver', '3890p', 'chengyza', 'xuanrikka'].includes(member.id)
);

const getMembersByField = (
    predicate: (member: Member) => boolean,
    members: Member[]
): string[] => members.filter(predicate).map(member => member.id);

// 展开关系
const expandRelationships = (relationships: RelationshipData[], members: Member[]): RelationshipData[] => {
    return relationships.flatMap(rel => {
        const sourceIds = getMembersByField(rel.source, members);
        const targetIds = getMembersByField(rel.target, members);

        return sourceIds.flatMap(sourceId =>
            targetIds
                .filter(targetId => !rel.excludeSelfReference || sourceId !== targetId)
                .map(targetId => ({
                    ...rel,
                    source: idIs(sourceId),
                    target: idIs(targetId),
                    sourceType: 'id' as const,
                    targetType: 'id' as const
                }))
        );
    });
};

// 关系定义
export const relationships: RelationshipData[] = [
    {
        source: idIs('chenxu233'),
        target: roleIs('catgirl'),
        targetType: 'role',
        type: 'unidirectional',
        label: '管理',
        color: '#69ebffff'
    },
    {
        source: idIs('chenxu233'),
        target: idIs('snowykami'),
        type: 'bidirectional',
        label: '小情侣',
        color: '#FF69B4'
    },
    {
        source: idIs('nanaloveyuki'),
        target: idIs('snowykami'),
        type: 'unidirectional',
        label: '主人',
        color: '#FF69B4'
    },
    {
        source: idIs('redish101'),
        target: idIs('snowykami'),
        type: 'unidirectional',
        label: '主人',
        color: '#FF69B4'
    },
    {
        source: idIs('chenxu233'),
        target: idIs('snowykami'),
        type: 'unidirectional',
        label: '主人',
        color: '#FF69B4'
    },
    {
        source: idIs('synodriver'),
        target: idIs('snowykami'),
        type: 'unidirectional',
        label: '主人',
        color: '#FF69B4'
    },
    {
        source: idIs('3890p'),
        target: idIs('snowykami'),
        type: 'unidirectional',
        label: '条件主人',
        color: '#69dfffff'
    },
    {
        source: isManagement,
        target: idIs('chengyza'),
        type: 'unidirectional',
        label: '效忠',
        color: '#69dfffff'
    },
    // 可继续添加更多关系
];