import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { TPrixProduit } from "@/types/TPrixProduit"
import moment from "moment";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

export const PricesChart = (props: Props) => {
    const chartConfig = {
		prix: {
			label: "Prix",
			color: "#32a852",
		}
	} satisfies ChartConfig;

    return (
		<Card className={props.className}>
			<CardHeader>
				<CardTitle>Prix du produit</CardTitle>
				<CardDescription>Variation des prix</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer config={chartConfig}>
					<AreaChart
						accessibilityLayer
						data={props.prices}
						margin={{
							left: 12,
							right: 12,
						}}
					>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="createdAt"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							tickFormatter={(value) => moment(value).format("MMM YYYY")}
						/>
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => {
                                const formatter = new Intl.NumberFormat('fr-FR')
                                return formatter.format(value)
                            }}
                        />
						<ChartTooltip
							cursor={false}
							content={
								<ChartTooltipContent
									labelFormatter={(label) => moment(label).format("DD MMM YYYY")}
								/>
							}
						/>
						<defs>
							<linearGradient
								id="fillPrix"
								x1="0"
								y1="0"
								x2="0"
								y2="1"
							>
								<stop
									offset="5%"
									stopColor="var(--color-prix)"
									stopOpacity={0.8}
								/>
								<stop
									offset="95%"
									stopColor="var(--color-prix)"
									stopOpacity={0.1}
								/>
							</linearGradient>
						</defs>
						<Area
							dataKey="prix"
							type="natural"
							fill="url(#fillPrix)"
							fillOpacity={0.4}
							stroke="var(--color-prix)"
							stackId="a"
						/>
					</AreaChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}

type Props = {
    prices: Array<TPrixProduit>
    className?: string
}