import React, { useState, useCallback, useEffect } from 'react';
import { type Column } from "@tanstack/react-table";
import { Search, SortAscIcon, SortDescIcon, ChevronsUpDownIcon, XIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { ScrollArea } from '../ui/scroll-area';

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState((column.getFilterValue() as string) ?? "")
  const [allUniqueValues, setAllUniqueValues] = useState<string[]>([])
  const [suggestions, setSuggestions] = useState<string[]>([])

  const sortInfo = column.getIsSorted();
  const sortIndex = column.getSortIndex();
  const isFiltered = column.getFilterValue() != null;

  const handleFilterChange = useCallback(
    (value: string) => {
      setValue(value);
      column.setFilterValue(value);
    },
    [column]  
  );
  useEffect(() => {
    const filtered = allUniqueValues.filter((suggestion) => 
      suggestion.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filtered);
  }, [value, allUniqueValues]);

  useEffect(() => {
    if (!column) return;

    const values = column.getFacetedRowModel().rows.map(row => {
      const value = row.getValue(column.id);
      return value != null ? String(value) : '';
    });
    const uniqueValues = Array.from(new Set(values));

    setAllUniqueValues(uniqueValues);
    setSuggestions(uniqueValues);
  }, [column.id, column, column.getFacetedRowModel().rows.length]);

  return (
    <div className={cn("group flex items-center justify-between space-x-2 px-1", className)}>
      {/* Column Title */}
      <div className="text-nowrap">
        {title}
      </div>

      <div className="flex items-center gap-1">
        {/* Sort Controls */}
        {column.getCanSort() && (
          <div className="relative">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-7"
                >
                  {column.getCanSort() && column.getIsSorted() === "desc" ? (
                    <SortAscIcon className='size-4' aria-hidden="true" />
                  ) : column.getIsSorted() === "asc" ? (
                    <SortDescIcon className='size-4' aria-hidden="true" />
                  ) : (
                    <ChevronsUpDownIcon className='size-4' aria-hidden="true" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => column.toggleSorting(false, true)}
                  className="flex items-center"
                >
                  <SortAscIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                  Asc
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => column.toggleSorting(true, true)}
                  className="flex items-center"
                >
                  <SortDescIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                  Desc
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => column.clearSorting()}
                  className="flex items-center"
                >
                  <XIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                  Clear
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {sortInfo && (
              <Badge
                variant="default"
                className="absolute -right-1 -top-1 size-3 justify-center rounded-full p-0 text-[0.5rem]"
              >
                {sortIndex + 1}
              </Badge>
            )}
          </div>
        )}

        {/* Search/Filter Controls */}
        {column.getCanFilter() && (
          <div className="relative">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-60 p-2" align="end">
                <div className="space-y-2">
                  <div className="relative">
                    <Input
                      placeholder={`Filter ${title.toLowerCase()}...`}
                      value={value}
                      onChange={(e) => handleFilterChange(e.target.value)}
                      className="h-8 pr-8"
                    />
                    {value && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-2"
                        onClick={() => handleFilterChange("")}
                      >
                        <XIcon className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <ScrollArea className='pr-3'>
                    <div className='max-h-40'>
                      {suggestions.map((suggestion) => (
                        <Button
                          key={suggestion}
                          variant="ghost"
                          size="sm"
                          className="text-left block w-full py-1"
                          onClick={() => handleFilterChange(suggestion)}
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </PopoverContent>
            </Popover>
            {isFiltered && (
              <Badge
                variant="default"
                className="absolute -right-1 -top-1 size-3 justify-center rounded-full p-0 text-[0.5rem]"
              />
            )}
          </div>
        )}

      </div>
    </div>
  )
}
