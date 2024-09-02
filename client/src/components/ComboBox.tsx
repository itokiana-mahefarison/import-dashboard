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
import { Button, ButtonProps } from "@/components/ui/button";
import { useQuery } from "react-query";
import {v4 as uuid} from "uuid"
import { useDebounce } from "@/hooks/useDebounce";

export const ComboBox = <T=any>(props: Props<T>) => {
    const [open, setOpen] = React.useState<boolean>(false)
	const [options, setOptions] = React.useState<Array<OptionsItem> | undefined>(props.options)
	const [suggestText, setSuggestText] = React.useState<string>("")
	const id = React.useMemo(() => props?.id || uuid(), [props])
	const debounce = useDebounce()

	const {data, isSuccess} = useQuery<T>(
		[id, "ComboBox_fetch_options", suggestText, props.dependencies],
		(): Promise<T> => {
			if(props.fetchOptions !== undefined){
				return props.fetchOptions?.(suggestText)
			}

			return undefined as any
		},
		{
			enabled: props.fetchOptions !== undefined && props.options === undefined && (props?.onEnableFetch?.() ?? true),
			refetchOnMount: false,
			refetchOnWindowFocus: false
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

	const placeholder = React.useMemo(() => {
		return props.placeholder || "Sélectionner"
	}, [props])

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
                <Button
                    variant={props.buttonVariant || "outline"}
                    role="combobox"
                    aria-expanded={open}
                    className={cn("w-full justify-between gap-1", props.className)}
                    >
					<div className="w-full flex justify-between gap-1">
						<span className="overflow-hidden text-ellipsis">{props.value
							? options?.find((item) => item.value === props?.value)?.label || placeholder
							: placeholder}
						</span>
						{
							props.prefix
						}
					</div>
                    <ChevronsUpDown className="h-4 w-4 opacity-50" />
                </Button>
            </PopoverTrigger>
			<PopoverContent className="w-auto p-0">
				<Command shouldFilter={props.fetchOptions === undefined} onValueChange={(value) => {
					setOpen(false)
					props.onSelectedOption?.(value);
				}}>
					<CommandInput placeholder="Sélectionner" onValueChange={(value) => debounce(() => setSuggestText(value), 100)} className="h-9" />
					<CommandList>
						{
							props?.onRenderNoResult ?
							<CommandEmpty className="flex justify-center items-center pt-2">
								{props?.onRenderNoResult(suggestText, () => {
									setOpen(false)
									setSuggestText("")
								})}
							</CommandEmpty> : 
							<CommandEmpty>Aucune correspondance</CommandEmpty>
						}
						<CommandGroup>
							{options?.map((item, index) => (
								<CommandItem
									key={index}
									value={item.value}
									onSelect={() => {
										props.onSelectedOption?.(item?.value === props.value ? "": item?.value, item)
										setOpen(false)
									}}
								>
									{item?.renderLabel || item.label}
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
	id?: string
	value?: any;
	options?: Array<OptionsItem>;
	fetchOptions?: (suggest?: string) => Promise<T>
	onFetchOptionsSuccess?: (options: T) => Array<OptionsItem> | undefined
	onSelectedOption?: (val: any, options?: OptionsItem) => void;
	onEnableFetch?: () => boolean
	onRenderNoResult?: (suggest?: string, closeDialog?: () => void) => React.ReactNode
	onDefaultValue?: (options?: Array<OptionsItem>) => any
	placeholder?: string | React.ReactNode
	prefix?: React.ReactNode
	dependencies?: any
	buttonVariant?: ButtonProps['variant']
};

export type OptionsItem = {
	label?: string
	renderLabel?: React.ReactNode
	value?: any;
};
