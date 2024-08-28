import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { TProductStats } from "@/types/TProduit";
import { Pie, Label, PieChart } from "recharts";
import randomColor from "randomcolor"
import { useMemo } from "react";
import { cn } from "@/lib/utils";

export const StocksBySitePieChart = (props: Props) => {
    const colors = randomColor({format: "hex", count: props.stocksBySite?.length, seed: "pie-chart", hue: "green"})

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

    console.log(chartConfig)

    return (
		<Card className={cn("flex flex-col", props.className)}>
			<CardHeader className="items-center pb-0">
				<CardTitle>Détails des stocks</CardTitle>
				<CardDescription>Nombre de stocks par site</CardDescription>
			</CardHeader>
			<CardContent className="flex-1 pb-0">
				<ChartContainer
					config={chartConfig}
					className="mx-auto aspect-square max-h-[250px]"
				>
					<PieChart>
						<Pie
							data={props?.stocksBySite}
							dataKey="stock"
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