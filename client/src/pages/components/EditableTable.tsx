import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useFormData } from "@/hooks/useFormData";
import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { v4 as uuid } from "uuid"
import _ from 'lodash'

export const EditableTable = <T=Record<string,any>>(props: Props<T>) => {
    const {formData, setFormData, reset} = useFormData<Array<T>>({
        formData: props?.defaultValue,
        id: props.id
    })

	const handleAddRow = useCallback(() => {
        setFormData((v) => ([
            ...v,
            { id: uuid() } as T
        ]))
    }, [formData])

    const handleRemoveRow = useCallback((index: number) => {
        const temp = _.clone(formData)
        temp.splice(index, 1)

        setFormData(temp)
    }, [formData])

    const handleInputChange = useCallback((rowIndex: number, key: string, val: any) => {
        setFormData((old) =>
			old.map((row, index) => {
				if (index === rowIndex) {
					return {
						...old[rowIndex]!,
						[key]: val,
					};
				}
				return row;
			})
		);
    }, [formData])

	const table = useReactTable({
		data: formData,
		columns: props.columns,
        defaultColumn: props.defaultColumn,
		getCoreRowModel: getCoreRowModel(),
		autoResetPageIndex: false,
		meta: {
			updateData: (index, key, value) => {
				handleInputChange(index, key, value);
			},
			addRow: handleAddRow,
			removeRow: handleRemoveRow
		},
	});

	return (
		<div className="w-full grid gap-3">
			<div className="rounded-md border overflow-auto">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef
															.header,
														header.getContext()
												  )}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows.map((row) => (
							<TableRow
								key={row.id}
								data-state={row.getIsSelected() && "selected"}
							>
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id}>
										{flexRender(
											cell.column.columnDef.cell,
											cell.getContext()
										)}
									</TableCell>
								))}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
            <div className="flex justify-end">
                <Button
                    variant="default"
					onClick={() => {
						const data = props?.onBeforeSaving?.(formData) || formData
						props.onSaving?.(data)
						reset()
					}}
                >
                    Sauvegarder
                </Button>
            </div>
		</div>
	);
};

type Props<T> = {
	columns: Array<ColumnDef<T>>;
	defaultValue?: Array<T>;
    id?: string
    defaultColumn?: Partial<ColumnDef<T>>
	onBeforeSaving?: (data: Array<T>) => Array<T>
	onSaving?: (data: Array<T>) => void
};
