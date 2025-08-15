import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import type { EChartsOption } from 'echarts';
import { relationships } from '@/data/membership-relations';
import { Member } from '@/data/members-data';

interface CustomNode {
    id: string;
    name: string;
    avatar: string;
}

interface RelationshipGraphProps {
    members: (Member | CustomNode)[];
    mode: 'force' | 'circle' | 'hierarchy';
    width?: number;
    height?: number;
    onNodeClick?: (id: string) => void;
}

const RelationshipGraph: React.FC<RelationshipGraphProps> = ({
    members,
    mode = 'circle',
    width = 800,
    height = 600,
    onNodeClick,
}) => {
    const chartRef = useRef<HTMLDivElement>(null);
    const chartInstance = useRef<echarts.ECharts | null>(null);

    useEffect(() => {
        // 确保DOM元素存在
        if (!chartRef.current) return;

        // 初始化或获取图表实例
        if (!chartInstance.current) {
            chartInstance.current = echarts.init(chartRef.current);
        }

        // 准备节点数据
        const nodes = members.map(member => ({
            id: member.id,
            name: member.name,
            value: member.name,
            symbol: `image://${member.avatar}`,
            symbolSize: 50,
            itemStyle: {
                borderWidth: 4,
                borderColor: 'rgba(255,255,255,0.8)',
                shadowBlur: 10,
                shadowColor: 'rgba(0,0,0,0.3)'
            },
            label: {
                show: true,
                position: [0, 30] as [number, number],
                color: '#fff',
                fontSize: 12,
                fontWeight: 700,
                formatter: member.name,
                textBorderColor: '#000',
                textBorderWidth: 3,
                textShadowBlur: 2,
                textShadowColor: '#000',
            },
        }));

        // 节点图片通过 symbol 直接加载


        // 处理关系定义并找出匹配的成员
        const expandedRelationships = relationships.flatMap(rel => {
            const sourceMembers = members.filter(m => rel.source(m as Member));
            const targetMembers = members.filter(m => rel.target(m as Member));

            return sourceMembers.flatMap(sourceMember => 
                targetMembers
                    .filter(targetMember => !rel.excludeSelfReference || sourceMember.id !== targetMember.id)
                    .map(targetMember => ({
                        source: sourceMember.id,
                        target: targetMember.id,
                        type: rel.type,
                        label: rel.label,
                        color: rel.color
                    }))
            );
        });

        // 将相同节点对之间的关系分组
        const edgeGroups = new Map<string, typeof expandedRelationships>();
        
        expandedRelationships.forEach(rel => {
            const key = [rel.source, rel.target].sort().join('-');
            if (!edgeGroups.has(key)) {
                edgeGroups.set(key, []);
            }
            edgeGroups.get(key)?.push(rel);
        });

        // 为每组关系设置不同的曲率
        const edges = Array.from(edgeGroups.values()).flatMap((group, groupIndex) => {
            return group.map((rel, index) => {
                // 根据组内关系数量计算曲率
                const baselineCurveness = 0.2;
                const curveness = group.length > 1 
                    ? baselineCurveness * (index - (group.length - 1) / 2) 
                    : 0;

                return {
                    source: rel.source,
                    target: rel.target,
                    label: {
                        show: true,
                        formatter: rel.label,
                        fontSize: 12,
                        color: rel.color || '#999',
                        textBorderColor: '#000',
                        textBorderWidth: 2,
                    },
                    lineStyle: {
                        color: rel.color || '#999',
                        width: 2,
                        type: 'solid' as const,
                        curveness: curveness,
                    },
                    symbol: rel.type === 'unidirectional' ? ['none', 'arrow'] : ['none', 'none'],
                    symbolSize: [8, 12],
                };
            });
        });

        // 配置图表选项
        const options: EChartsOption = {
            backgroundColor: 'transparent',
            tooltip: {
                show: false
            },
            series: [{
                type: 'graph',
                layout: mode === 'force' ? 'force' : mode === 'circle' ? 'circular' : 'force',
                data: nodes,
                links: edges,
                roam: true,
                draggable: true,
                legendHoverLink: true,
                focusNodeAdjacency: true,
                force: {
                    repulsion: [100, 1000],
                    edgeLength: [50, 200],
                    gravity: 0.1,
                    layoutAnimation: true,
                },
                circular: {
                    rotateLabel: true
                },
                emphasis: {
                    focus: 'adjacency',
                    scale: true,
                    lineStyle: {
                        width: 4
                    }
                }
            }]
        };

        // 设置图表选项
        chartInstance.current.setOption(options);

        // 添加节点点击事件
        chartInstance.current.on('click', (params: any) => {
            if (params.dataType === 'node' && onNodeClick) {
                onNodeClick(params.data.id);
            }
        });

        // 响应窗口大小变化
        const handleResize = () => {
            if (chartInstance.current) {
                const parentElement = chartRef.current?.parentElement;
                if (parentElement) {
                    chartInstance.current.resize({
                        width: parentElement.clientWidth,
                        height: parentElement.clientHeight,
                    });
                }
            }
        };
        window.addEventListener('resize', handleResize);
        // 初始调整大小
        handleResize();

        // 清理函数
        return () => {
            window.removeEventListener('resize', handleResize);
            chartInstance.current?.dispose();
            chartInstance.current = null;
        };
    }, [members, mode, width, height]);

    return (
        <div
            ref={chartRef}
            className="w-full h-full"
            style={{
                width: width,
                height: height,
                background: 'transparent',
            }}
        />
    );
};

export default RelationshipGraph;
