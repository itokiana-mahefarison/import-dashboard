import * as React from "react";
import { cn } from "@/lib/utils";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "react-query";

export const ComboBox = <T=any>(props: Props<T>) => {
    const [open, setOpen] = React.useState<boolean>(false)
	const [options, setOptions] = React.useState<Array<OptionsItem> | undefined>(props.options)
	const [suggestText, setSuggestText] = React.useState<string | undefined>()

	const {data, isSuccess} = useQuery<T>(
		["ComboBox-fetch-options", suggestText],
		(): Promise<T> => {
			if(props.fetchOptions !== undefined){
				return props.fetchOptions?.(suggestText)
			}

			return undefined as any
		},
		{
			enabled: props.fetchOptions !== undefined && props.options === undefined,
		}
	)

	React.useEffect(() => {
		setOptions(props.options)
	}, [])

	React.useEffect(() => {
		if(isSuccess){
			const opts = props?.onFetchOptionsSuccess?.(data)
			setOptions(opts)
		}
	}, [props, isSuccess, data])

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
                        ? options?.find((item) => item.value === props?.value)?.label
                        : "Sélectionner"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
			<PopoverContent className="w-auto p-0">
				<Command shouldFilter={props.fetchOptions === undefined} onValueChange={(value) => {
					setOpen(false)
					props.onSelectedOption?.(value);
				}}>
					<CommandInput placeholder="Sélectionner" value={suggestText} onValueChange={setSuggestText} className="h-9" />
					<CommandList>
						<CommandEmpty>Aucune correspondance</CommandEmpty>
						<CommandGroup>
							{options?.map((item, index) => (
								<CommandItem
									key={index}
									value={item.value}
									onSelect={(value) => {
										props.onSelectedOption?.(value === props.value ? "": value)
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
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
};

type Props<T> = Pick<React.ComponentProps<'div'>, 'className'> & {
	value?: any;
	options?: Array<OptionsItem>;
	fetchOptions?: (suggest?: string) => Promise<T>
	onFetchOptionsSuccess?: (options: T) => Array<OptionsItem> | undefined
	onSelectedOption?: (val: string) => void;
};

export type OptionsItem = {
	label?: string;
	value?: any;
};
