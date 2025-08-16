import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import type { EChartsOption } from 'echarts';
import { relationships } from '@/data/membership-relations';
import { Member } from '@/data/members-data';
import { Slider } from "@/components/ui/slider";
import { useLanguage } from "@/contexts/language-context";

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
    onExport?: (dataUrl: string) => void;
}

const RelationshipGraph: React.FC<RelationshipGraphProps> = ({
    members,
    mode = 'circle',
    width = 800,
    height = 600,
    onNodeClick,
    onExport,
}) => {
    const { language } = useLanguage();
    const [zoom, setZoom] = useState<number>(100);
    const isInitialMount = useRef(true);
    const chartRef = useRef<HTMLDivElement>(null);
    const chartInstance = useRef<echarts.ECharts | null>(null);

    const updateChartSize = () => {
        if (chartInstance.current && chartRef.current) {
            const parentElement = chartRef.current?.parentElement;
            if (parentElement) {
                chartInstance.current.resize({
                    width: parentElement.clientWidth,
                    height: parentElement.clientHeight,
                });
            }
        }
    };

    useEffect(() => {
        // 确保DOM元素存在
        if (!chartRef.current) return;

        // 如果已存在实例，先销毁它
        if (chartInstance.current) {
            chartInstance.current.dispose();
        }
        
        // 重新初始化图表实例
        chartInstance.current = echarts.init(chartRef.current);

        // 创建 ResizeObserver 来监视容器大小变化
        const resizeObserver = new ResizeObserver(() => {
            updateChartSize();
        });

        // 监视容器大小变化
        if (chartRef.current) {
            resizeObserver.observe(chartRef.current);
        }

        // 计算每个节点的连接数
        const connectionCounts = new Map<string, number>();
        relationships.forEach(rel => {
            members.forEach(sourceMember => {
                if (rel.source(sourceMember as Member)) {
                    members.forEach(targetMember => {
                        if (rel.target(targetMember as Member) && 
                            (!rel.excludeSelfReference || sourceMember.id !== targetMember.id)) {
                            // 增加源节点的连接数
                            connectionCounts.set(sourceMember.id, 
                                (connectionCounts.get(sourceMember.id) || 0) + 1);
                            // 增加目标节点的连接数
                            connectionCounts.set(targetMember.id, 
                                (connectionCounts.get(targetMember.id) || 0) + 1);
                        }
                    });
                }
            });
        });

        // 找出最大连接数
        const maxConnections = Math.max(...Array.from(connectionCounts.values()));

        // 设置节点大小的范围
        const minSize = 30;  // 最小节点大小
        const maxSize = 80;  // 最大节点大小

        // 随机打乱成员列表的顺序（仅在circular模式下）
        const shuffledMembers = mode === 'circle' 
            ? [...members].sort(() => Math.random() - 0.5)
            : members;

        // 准备节点数据
        const nodes = shuffledMembers.map(member => ({
            id: member.id,
            name: member.name,
            value: member.name,
            symbol: `image:///members/${member.id}/circular?ratio=${(connectionCounts.get(member.id) || 0) / maxConnections}`,
            symbolSize: minSize + (maxSize - minSize) * 
                (connectionCounts.get(member.id) || 0) / maxConnections,
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

        // 计算合适的布局参数
        const calculateLayoutParams = () => {
            if (!chartRef.current) return null;

            const containerWidth = chartRef.current.clientWidth;
            const containerHeight = chartRef.current.clientHeight;
            const minDimension = Math.min(containerWidth, containerHeight);
            const nodeCount = nodes.length;
            const edgeCount = edges.length;
            const density = edgeCount / nodeCount;

            // 更保守的节点间距计算
            const idealSpacing = Math.min(
                minDimension / (Math.sqrt(nodeCount) + 1),
                Math.sqrt((containerWidth * containerHeight) / (nodeCount * 2))
            );

            // 减小斥力范围以获得更紧凑的布局
            const baseRepulsion = idealSpacing * 30;
            const repulsion = [baseRepulsion * 0.6, baseRepulsion * 0.8];

            // 更短的边长，让节点更靠近
            const edgeLength = [idealSpacing * 0.8, idealSpacing * 1.2];

            // 增加重力以防止节点飞出
            const gravity = 0.2 + (nodeCount > 15 ? 0.1 : 0);

            return {
                repulsion,
                edgeLength,
                gravity
            };
        };

        const layoutParams = calculateLayoutParams();

        // 配置图表选项
        const options: EChartsOption = {
            backgroundColor: 'transparent',
            tooltip: {
                show: false
            },
            animation: true,
            animationThreshold: 1000,
            animationDuration: 2000,
            animationEasing: 'elasticOut',
            animationDelay: (idx: number) => idx * 100,
            animationDurationUpdate: 500,
            animationEasingUpdate: 'cubicInOut',
            animationDelayUpdate: (idx: number) => idx * 50,
            series: [{
                type: 'graph',
                layout: mode === 'force' ? 'force' : mode === 'circle' ? 'circular' : 'force',
                data: nodes,
                links: edges,
                roam: true,
                draggable: true,
                legendHoverLink: true,
                focusNodeAdjacency: true,
                left: '10%',
                right: '10%',
                top: '10%',
                bottom: '10%',
                progressive: 50,  // 渐进式渲染
                progressiveThreshold: 100,
                force: layoutParams ? {
                    repulsion: layoutParams.repulsion,
                    edgeLength: layoutParams.edgeLength,
                    gravity: layoutParams.gravity,
                    layoutAnimation: true,
                    friction: 0.8,  // 增加摩擦力，使动画更平滑
                    initLayout: mode === 'force' ? 'circular' : undefined // 从环形布局开始，然后过渡到力导向布局
                } : undefined,
                circular: mode === 'circle' ? {
                    rotateLabel: true
                } : undefined,
                emphasis: {
                    focus: 'adjacency',
                    scale: 1.2,
                    itemStyle: {
                        borderColor: '#fff',
                        borderWidth: 6,
                        shadowBlur: 20,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    },
                    lineStyle: {
                        width: 4,
                        opacity: 1,
                        shadowBlur: 10,
                        shadowColor: 'rgba(0, 0, 0, 0.2)'
                    }
                },
                // 非选中状态的样式
                blendMode: 'source-over',
                select: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowColor: 'rgba(0, 0, 0, 0.3)'
                    }
                },
                // 默认边的样式
                lineStyle: {
                    opacity: 0.6,
                    curveness: 0.3,
                    width: 2,
                    color: '#999'
                },
                // 设置自适应的节点和边的大小
                nodeScaleRatio: 0.6,
                // 启用动画
                animation: true,
                animationDuration: 2000,
                animationEasing: 'elasticOut',
                animationDelay: (idx: number) => idx * 100,
                animationDurationUpdate: 500,
                animationEasingUpdate: 'cubicInOut',
                animationDelayUpdate: (idx: number) => idx * 50
            }]
        };

        // 设置图表选项
        chartInstance.current.setOption(options);

        // 添加导出方法到组件实例
        const exportGraph = async () => {
            if (!chartInstance.current) return;
            
            // 保存当前的状态
            const currentOption = chartInstance.current.getOption();
            
            // 临时禁用动画和交互
            chartInstance.current.setOption({
                animation: false,
                animationThreshold: 1,
                animationDuration: 0,
            });

            // 确保所有节点都在视图中
            if (mode === 'force') {
                chartInstance.current.setOption({
                    series: [{
                        zoom: 0.8, // 稍微缩小以确保所有内容可见
                        center: ['50%', '50%']
                    }]
                });
            }

            // 等待布局稳定
            await new Promise(resolve => setTimeout(resolve, 1000));

            // 添加水印
            const currentTime = new Date().toLocaleString('zh-CN', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            }).replace(/\//g, '-');

            const watermarkOption = {
                graphic: [{
                    type: 'text',
                    right: 20,
                    bottom: 20,
                    style: {
                        text: currentTime,
                        font: '14px Arial',
                        fill: 'rgba(255, 255, 255, 0.5)',
                        textAlign: 'right',
                        textBaseline: 'bottom',
                    },
                    z: 100
                }]
            };

            // 临时添加水印
            chartInstance.current.setOption(watermarkOption, { replaceMerge: ['graphic'] });

            // 获取图表的 base64 URL
            const url = chartInstance.current.getDataURL({
                type: 'png',
                pixelRatio: 2,
                backgroundColor: '#1a1b1e',
                excludeComponents: ['toolbox']
            });

            // 移除水印
            chartInstance.current.setOption({ graphic: [] }, { replaceMerge: ['graphic'] });

            // 回调导出的URL
            if (onExport) {
                onExport(url);
            }

            // 恢复原始状态
            chartInstance.current.setOption(currentOption);
        };

        // 将导出方法添加到ref上，这样外部组件可以调用
        if (chartRef.current) {
            (chartRef.current as any).exportGraph = exportGraph;
        }

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
            // 取消 ResizeObserver 监视
            if (chartRef.current) {
                resizeObserver.unobserve(chartRef.current);
            }
            resizeObserver.disconnect();

            // 清理图表实例
            if (chartInstance.current) {
                chartInstance.current.dispose();
                chartInstance.current = null;
            }
        };
    }, [members, mode, width, height]);

    // 添加缩放效果
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }
        
        if (chartInstance.current) {
            const zoomRatio = zoom / 100;
            chartInstance.current.setOption({
                series: [{
                    zoom: zoomRatio,
                }]
            });
        }
    }, [zoom]);

    return (
        <div className="relative">
            {/* 缩放控制器 */}
            <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-sm p-4 rounded-lg shadow-lg z-10 w-64">
                <div className="flex items-center mb-2">
                    <span className="text-white text-sm mr-2">
                        {language === "zh" ? "缩放" : language === "ja" ? "ズーム" : "Zoom"}: {zoom}%
                    </span>
                </div>
                <Slider
                    value={[zoom]}
                    onValueChange={(value) => setZoom(value[0])}
                    min={50}
                    max={200}
                    step={1}
                    className="my-2"
                />
            </div>
            
            <div
                ref={chartRef}
                data-export-graph
                className="w-full h-full"
                style={{
                    width: width,
                    height: height,
                    background: 'transparent',
                }}
            />
        </div>
    );
};

export default RelationshipGraph;
