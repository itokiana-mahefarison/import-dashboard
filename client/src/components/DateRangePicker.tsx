import { fr } from "date-fns/locale"
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import moment from "moment";
import { useState } from "react";

export const DateRangePicker = (props: Props) => {
	const [open, setOpen] = useState<boolean>(false)
	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant={"outline"}
					className={cn(
						"justify-start text-left font-normal",
						!props.value && "text-muted-foreground"
					)}
				>
					<CalendarIcon className="mr-2 h-4 w-4" />
					{
						props.value?.from && props.value?.to && 
							`${props.value?.from ? moment(props.value?.from).format("DD MMM YYYY") :"Date début"} - ${props.value?.to ? moment(props.value?.to).format("DD MMM YYYY") : "Date fin"}`
							|| "Choisir la plage de date"
					}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0" align="end">
				<Calendar
                    locale={fr}
					mode="range"
					selected={{
						from: props.value?.from !== undefined ? moment(props.value?.from).toDate() : undefined,
						to: props.value?.to !== undefined ? moment(props.value?.to).toDate() : undefined
					}}
					onSelect={(val) => {
						const from = val?.from && moment(val?.from)
						const to = val?. to && moment(val?.to)

						props.onChange?.({
							from: from?.toISOString(true),
							to: to?.toISOString(true)
						})
					}}
					initialFocus
					numberOfMonths={2}
				/>
			</PopoverContent>
		</Popover>
	);
};

type Props = {
	value?: RangeValue;
	onChange?: (val: RangeValue) => void;
};

export type RangeValue = {
	from?: Date | string
	to?: Date | string
}
