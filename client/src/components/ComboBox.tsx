import * as React from "react";
import { cn } from "@/lib/utils";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ComboBox = (props: Props) => {
    const [open, setOpen] = React.useState<boolean>(false)
	const [suggestText, setSuggestText] = React.useState<string>()

	const handleOnInputChange = (value: string) => {
		setSuggestText(value)
		props.onInputChange?.(value)
	}

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                    >
                    {props.value
                        ? props?.options?.find((framework) => framework.value === props?.value)?.label
                        : "Sélectionner"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
			<PopoverContent className="w-auto p-0">
				<Command>
					<CommandInput placeholder="Sélectionner" value={suggestText} className="h-9" />
					<CommandEmpty>Aucune correspondance</CommandEmpty>
					<CommandGroup>
						{props.options?.map((item, index) => (
							<CommandItem
								key={index}
								value={item.value}
								onBlur={props.onBlur}
								onSelect={(currentValue) => {
									props.onSelectedOption?.(currentValue);
									setOpen(false)
								}}
							>
								{item.label}
								<Check
									className={cn(
										"ml-auto h-4 w-4",
										props.value !== undefined &&
											props.value === item.value
											? "opacity-100"
											: "opacity-0"
									)}
								/>
							</CommandItem>
						))}
					</CommandGroup>
				</Command>
			</PopoverContent>
		</Popover>
	);
};

type Props = Pick<React.ComponentProps<'div'>, 'className'> & {
	value?: any;
	options?: Array<OptionsItem>;
	onSelectedOption?: (val: any) => void;
	onInputChange?: (val: string) => void
	onBlur?: () => void
};

type OptionsItem = {
	label?: string;
	value?: any;
};
