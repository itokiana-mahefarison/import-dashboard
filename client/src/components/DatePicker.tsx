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

export const DatePicker = (props: Props) => {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant={"outline"}
					className={cn(
						"w-full justify-start text-left font-normal",
						!props.value && "text-muted-foreground"
					)}
				>
					<CalendarIcon className="mr-2 h-4 w-4" />
					{props.value ? moment(props.value).format("DD MMMM YYYY") : <span>Choisir la date</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0">
				<Calendar
                    locale={fr}
					mode="single"
					selected={moment(props.value).toDate()}
					onSelect={(val) => props.onChange?.(moment(val).toISOString())}
					initialFocus
				/>
			</PopoverContent>
		</Popover>
	);
};

type Props = {
	value?: Date | string;
	onChange?: (val: string) => void;
};
