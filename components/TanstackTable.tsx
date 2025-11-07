import { useState, useEffect, useMemo } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
  ColumnDef,
} from "@tanstack/react-table";
import { useRouter } from "next/navigation";

type TableComponentProps<T> = {
  data: T[];
  columns: ColumnDef<T, any>[];
  sortable?: boolean; // Enable/Disable sorting
  navigateTo?: (row: T) => string | null; // Function to return navigation path
  filterColumn?: keyof T;
};

function TableComponent<T>({
  data,
  columns,
  sortable = true,
  navigateTo,
  filterColumn,
}: TableComponentProps<T>) {
  const router = useRouter();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filterText, setFilterText] = useState("");
  const [debouncedFilterText, setDebouncedFilterText] = useState("");

  // Debounce filterText -> debouncedFilterText
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFilterText(filterText);
    }, 300); // adjust debounce delay as needed
    return () => clearTimeout(timer);
  }, [filterText]);

  // Only recompute filtered data when dependencies change
  const filteredData = useMemo(() => {
    if (!filterColumn || !debouncedFilterText) return data;
    return data.filter((row) => {
      const value = row[filterColumn];
      if (value == null) return false;
      return String(value).toLowerCase().includes(debouncedFilterText.toLowerCase());
    });
  }, [data, filterColumn, debouncedFilterText]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: sortable ? getSortedRowModel() : undefined,
    state: { sorting },
    onSortingChange: setSorting,
  });

  useEffect(() => {
    console.log("TableComponent mounted. filterColumn:", filterColumn);
  }, [filterColumn]);

  return (
    <div className="p-4">
      <div className="overflow-x-auto">
        {filterColumn && (
          <div className="flex justify-end mb-2">
            <input
              type="text"
              placeholder={`Search By ${String(filterColumn)}`}
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none  dark:bg-background dark:border-gray-600 dark:text-white"
            />
          </div>
        )}

        <table className="w-full border-collapse border border-gray-300 shadow-md rounded-lg">
          <thead className="bg-primary">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={
                      sortable ? header.column.getToggleSortingHandler() : undefined
                    }
                    className={`px-4 py-1 text-center font-semibold text-white capitalize ${
                      sortable ? "cursor-pointer hover:bg-gray-200 hover:text-black transition-all" : ""
                    }`}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {sortable && (header.column.getIsSorted() === "asc" ? " 🔼" : "")}
                    {sortable && (header.column.getIsSorted() === "desc" ? " 🔽" : "")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => {
              const navigatePath = navigateTo ? navigateTo(row.original) : null;
              return (
                <tr
                  key={row.id}
                  className={`border-b transition-all duration-200 text-center ${
                    navigatePath ? "cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700" : ""
                  }`}
                  onClick={() => {
                    if (navigatePath) router.push(navigatePath);
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-4 py-1 text-gray-700 dark:text-white"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TableComponent;
