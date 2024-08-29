import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { TProductStats } from "@/types/TProduit";
import { Pie, Label, PieChart } from "recharts";
import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { useGenerateColor } from "../utils/useGenerateColor";
import * as d3 from "d3"

export const StocksBySitePieChart = (props: Props) => {
    const colors = useGenerateColor({
		dataLength: props?.stocksBySite.length,
		colorRangeInfo: {
			colorStart: 0,
			colorEnd: 1,
			useEndAsStart: true
		},
		colorScale: d3.interpolateRainbow
	})

    const chartConfig = useMemo(() => {
        const config = {} as any
        props?.stocksBySite?.forEach((item, index) => {
            const key = item?.site
            config[key] = {
                label: key,
                color: colors[index]
            }
        })

        return config satisfies ChartConfig
    }, [props, colors])

    return (
		<Card className={cn("flex flex-col", props.className)}>
			<CardHeader className="items-center pb-0">
				<CardTitle>Détails des stocks</CardTitle>
				<CardDescription>Nombre de stocks par site</CardDescription>
			</CardHeader>
			<CardContent className="flex-1 pb-0">
				<ChartContainer
					config={chartConfig}
					className="mx-auto aspect-square max-h-[300px] [&_.recharts-pie-label-text]:fill-foreground [&_.recharts-pie-label-text]:text-md [&_.recharts-pie-label-line]:stroke-2"
				>
					<PieChart>
						<Pie
							data={props?.stocksBySite.map((item) => ({
								...item,
								fill: `var(--color-${item.site})`
							}))}
							dataKey="stock"
							nameKey="site"
							label
							innerRadius={60}
							strokeWidth={5}
						>
							<Label
								content={({ viewBox }) => {
									if (
										viewBox &&
										"cx" in viewBox &&
										"cy" in viewBox
									) {
										return (
											<text
												x={viewBox.cx}
												y={viewBox.cy}
												textAnchor="middle"
												dominantBaseline="middle"
											>
												<tspan
													x={viewBox.cx}
													y={viewBox.cy}
													className="fill-foreground text-3xl font-bold"
												>
													{props.totalStocks.toLocaleString()}
												</tspan>
												<tspan
													x={viewBox.cx}
													y={(viewBox.cy || 0) + 24}
													className="fill-muted-foreground"
												>
													Kilogramme{props.totalStocks > 1? 's' : ""}
												</tspan>
											</text>
										);
									}
								}}
							/>
						</Pie>
						<ChartLegend
							content={<ChartLegendContent nameKey="site" />}
							className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
							/>
					</PieChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}

type Props = {
    stocksBySite: TProductStats['stockBySite']
    totalStocks: number
    className?: string
}