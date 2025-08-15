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

export const filterAnd = (...predicates: Array<(member: Member) => boolean>) => {
    return (member: Member) => predicates.every(predicate => predicate(member));
};

export const filterOr = (...predicates: Array<(member: Member) => boolean>) => {
    return (member: Member) => predicates.some(predicate => predicate(member));
};

export const filterNot = (...predicates: Array<(member: Member) => boolean>) => {
    return (member: Member) => !predicates.some(predicate => predicate(member));
};

export const allMembers = (member: Member) => true;

export const idEqualTo = (id: string) => (member: Member) => member.id === id;

export const roleEqualTo = (role: string) => (member: Member) => member.role === role;

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
    member.labels?.includes('management') || member.role === 'emperor' || member.role === 'minister'
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
                    source: idEqualTo(sourceId),
                    target: idEqualTo(targetId),
                    sourceType: 'id' as const,
                    targetType: 'id' as const
                }))
        );
    });
};

const colorDepartment = 'rgba(242, 103, 255, 1)'

// 关系定义
export const relationships: RelationshipData[] = [
    {
        source: idEqualTo('chenxu233'),
        target: filterAnd(roleEqualTo('catgirl'), filterNot(idEqualTo('chenxu233'))),
        targetType: 'role',
        type: 'unidirectional',
        label: '猫协管理',
        color: '#8ad6ffff'
    },
    {
        source: isManagement,
        target: idEqualTo('chengyza'),
        type: 'unidirectional',
        label: '效忠',
        color: '#ff9305ff'
    },
    {
        source: hasLabels('belongToSnowykami'),
        target: idEqualTo('snowykami'),
        type: 'unidirectional',
        label: '主人',
        color: '#e89dffff'
    },
    {
        source: idEqualTo('floating-point'),
        target: idEqualTo('snowykami'),
        type: 'bidirectional',
        label: '牵引力',
        color: '#f2ff9dff'
    },
    {
        source: hasLabels('standalone'),
        target: idEqualTo('floating-point'),
        type: 'unidirectional',
        label: '游离挂载',
        color: '#5c5cff'
    },
    {
        source: idEqualTo('yuxindidetudi'),
        target: idEqualTo('kaosan4621'),
        type: 'unidirectional',
        label: '徒弟',
        color: '#3d87ffff'
    },
    {
        source: idEqualTo('ruoyu'),
        target: idEqualTo('3890p'),
        type: 'unidirectional',
        label: '外交府小女儿',
        color: '#2fff6dff'
    },
    {
        source: idEqualTo('yunyu'),
        target: idEqualTo('3890p'),
        type: 'unidirectional',
        label: '外交府明珠',
        color: '#2fff55ff'
    },
    {
        source: idEqualTo('daiyu'),
        target: idEqualTo('chengyza'),
        type: 'unidirectional',
        label: '教育司',
        color: colorDepartment
    },
    {
        source: idEqualTo('ariasaka'),
        target: idEqualTo('chengyza'),
        type: 'unidirectional',
        label: '交通署',
        color: colorDepartment
    },
    {
        source: idEqualTo('2968136830'),
        target: idEqualTo('chengyza'),
        type: 'unidirectional',
        label: '迪克尚书',
        color: colorDepartment
    },
    {
        source: idEqualTo('shayu'),
        target: idEqualTo('chengyza'),
        type: 'unidirectional',
        label: '选帝公主',
        color: colorDepartment
    },
    {
        source: idEqualTo('yichunyu'),
        target: idEqualTo('chengyza'),
        type: 'unidirectional',
        label: '真理部',
        color: colorDepartment
    },
    {
        source: idEqualTo('snowykami'),
        target: idEqualTo('chengyza'),
        type: 'unidirectional',
        label: '工业和信息化部',
        color: colorDepartment
    },
    {
        source: idEqualTo('synodriver'),
        target: idEqualTo('chengyza'),
        type: 'unidirectional',
        label: '馒头山部',
        color: colorDepartment
    },
    // 小型团队
    {
        source: filterAnd(hasLabels('liteyuki')),
        target: idEqualTo('liteyuki'),
        type: 'unidirectional',
        label: '工作室',
        color: '#d0e9ff'
    },
    {
        source: filterAnd(hasLabels('crazy-thursdio')),
        target: idEqualTo('crazy-thursdio'),
        type: 'unidirectional',
        label: '工作室',
        color: '#ffbc7dff'
    },
    {
        source: filterAnd(hasLabels('cat-island')),
        target: idEqualTo('cat-island'),
        type: 'unidirectional',
        label: '属地管辖',
        color: '#ffc7feff'
    },
];