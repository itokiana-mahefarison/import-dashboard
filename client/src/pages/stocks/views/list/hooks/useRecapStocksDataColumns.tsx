import { useSitesQuery } from "@/pages/hooks/useSitesQuery";
import { ColumnDef } from "@tanstack/react-table";

export const useRecapStocksDataColumns = () => {
	const { data: sites } = useSitesQuery();

	const columns: ColumnDef<Record<string, any>>[] = [
    {
      id: "id",
      accessorKey: "id",
      header: "Code produit",
      cell: ({row}) => {
        return (
          <div className="min-w-[150px]">
            <span>{row.getValue('id')}</span>
          </div>
        )
      },
    },
    {
      id: "label",
      accessorKey: "label",
      header: "Nom produit",
      cell: ({row}) => (
        <div className="min-w-[150px] max-w-[180px] text-nowrap overflow-hidden text-ellipsis">
          <span>{row.getValue('label')}</span>
        </div>
      )
    },
    {
      id: "class",
      accessorKey: "class",
      header: "Classe produit",
      cell: ({row}) => (
        <div className="min-w-[100px] max-w-[120px] text-nowrap overflow-hidden text-ellipsis">
          <span>{row.getValue('class')}</span>
        </div>
      )
    },
    ...(sites?.data as Array<any>)?.map((item): ColumnDef<Record<string, any>> => ({
      id: item?.name,
      header: (item?.name as string).toUpperCase(),
      accessorKey: item?.name,
      cell: ({row}) => <span>{row.getValue(item?.name)}</span>
    })),
    {
      id: "totalAmount",
      accessorKey: "totalAmount",
      header: "Prix total",
      cell: ({row}) => {
        const currencyFormatter = new Intl.NumberFormat('fr-FR')

        return (
          <div className="min-w-[100px] max-w-[120px] text-nowrap overflow-hidden text-ellipsis">
            <span>{currencyFormatter.format(row.getValue("totalAmount"))} Ar</span>
          </div>
        )
      }
    }
  ];
	return columns;
};
