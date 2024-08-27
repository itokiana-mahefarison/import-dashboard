"use client";

import * as React from "react";
import {
	ColumnDef,
	ColumnFiltersState,
	PaginationState,
	SortingState,
	VisibilityState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

export const Datatable = ({
	data,
	columns,
	hideFilterInput,
	hideFitlerColumn,
	columnToFilter = "id",
	...props
}: Props<Record<string, any>>) => {
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] =
		React.useState<ColumnFiltersState>([]);
	const [pagination, setPagination] = React.useState<PaginationState>({
		pageIndex: 0,
		pageSize: props.pageSize || 10,
	});
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({});

	const table = useReactTable({
		data,
		columns,
		rowCount: data?.length,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: !props.noPagination
			? getPaginationRowModel()
			: undefined,
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onPaginationChange: !props.noPagination ? setPagination : undefined,
		meta: {
			updateData: (index, key, value) => {
				props.onUpdateRow?.(index, key, value);
			},
		},
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			pagination: !props.noPagination ? pagination : undefined,
		},
	});

	return (
		<div className="w-full">
			{!hideFilterInput && !hideFitlerColumn && (
				<div className="flex items-center justify-between py-4">
					{!hideFilterInput && (
						<Input
							placeholder="Rechercher..."
							value={
								(table
									.getColumn(columnToFilter)
									?.getFilterValue() as string) ?? ""
							}
							onChange={(event) =>
								table
									.getColumn(columnToFilter)
									?.setFilterValue(event.target.value)
							}
							className="max-w-sm"
						/>
					)}
					<div className="flex items-center gap-2">
					{!hideFitlerColumn && (
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="outline">
									Colonnes
									<ChevronDown className="ml-2 h-4 w-4" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								{table
									.getAllColumns()
									.filter((column) => column.getCanHide())
									.map((column) => {
										return (
											<DropdownMenuCheckboxItem
												key={column.id}
												className="capitalize"
												checked={column.getIsVisible()}
												onCheckedChange={(value) =>
													column.toggleVisibility(
														!!value
													)
												}
											>
												{column?.columnDef?.header as string}
											</DropdownMenuCheckboxItem>
										);
									})}
							</DropdownMenuContent>
						</DropdownMenu>
					)}
					{
						props.tools
					}
					</div>
					
				</div>
			)}
			<div className="rounded-md border">
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
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={
										row.getIsSelected() && "selected"
									}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id} className={(cell.column.columnDef.meta as any)?.className}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									Aucun résultat
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			{!props.noPagination && (
				<div className="flex items-center justify-end space-x-2 py-4">
					<div className="space-x-2">
						<Button
							variant="outline"
							size="sm"
							onClick={() => table.previousPage()}
							disabled={!table.getCanPreviousPage()}
						>
							Précédent
						</Button>
						<Button
							variant="outline"
							size="sm"
							onClick={() => table.nextPage()}
							disabled={!table.getCanNextPage()}
						>
							Suivant
						</Button>
					</div>
				</div>
			)}
		</div>
	);
};

type Props<T> = {
	data: Array<T>;
	columns: Array<ColumnDef<T>>;
	columnToFilter?: string;
	hideFilterInput?: boolean;
	hideFitlerColumn?: boolean;
	onUpdateRow?: (index: number, key: string, value: any) => any;
	noPagination?: boolean;
	pageSize?: number;
	tools?: React.ReactNode
};
