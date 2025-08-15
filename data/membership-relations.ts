import { Member } from './members-data';

export interface RelationshipData {
  source: string;
  target: string;
  type: 'unidirectional' | 'bidirectional';
  label: string;
  color?: string;
}

export const relationships: RelationshipData[] = [
  {
    source: 'chengyza',
    target: 'snowykami',
    type: 'bidirectional',
    label: '帝国核心成员',
    color: '#FF69B4' // 粉色
  },
  {
    source: 'chengyza',
    target: 'synodriver',
    type: 'unidirectional',
    label: '皇家近卫军总管',
    color: '#4169E1' // 皇家蓝
  },
  {
    source: 'chengyza',
    target: 'redish101',
    type: 'bidirectional',
    label: '帝国公主',
    color: '#FFB6C1' // 浅粉色
  },
  {
    source: 'snowykami',
    target: 'XuanRikka',
    type: 'unidirectional',
    label: '摄政管理',
    color: '#32CD32' // 绿色
  },
  {
    source: 'snowykami',
    target: '3890p',
    type: 'bidirectional',
    label: '部长关系',
    color: '#FFD700' // 金色
  },
  {
    source: 'nanaloveyuki',
    target: 'chenxu233',
    type: 'bidirectional',
    label: '猫娘姐妹',
    color: '#FF69B4' // 粉色
  },
  {
    source: 'chenxu233',
    target: 'Twisuki',
    type: 'bidirectional',
    label: '猫娘姐妹',
    color: '#FF69B4' // 粉色
  },
  {
    source: 'chengyza',
    target: 'ChuranNeko',
    type: 'unidirectional',
    label: '帝国猫娘',
    color: '#DDA0DD' // 梅红色
  },
  {
    source: 'chengyza',
    target: 'GreatFood404',
    type: 'unidirectional',
    label: '帝国吉祥物',
    color: '#FFA500' // 橙色
  }
];
