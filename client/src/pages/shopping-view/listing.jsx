import ProductFilter from "@/components/shopping-view/filter";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { sortOptions } from "@/config";
import { fetchFilteredProducts } from "@/store/shop/product-slice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { ArrowUpDown, FilterIcon, Key, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

function createsearchParamHelper(filters, searchTerm) {
  const queryList = [];
  for (const [filtKey, filtvalue] of Object.entries(filters)) {
    if (Array.isArray(filtvalue) && filtvalue.length > 0) {
      const str = `${filtKey}=${filtvalue.join(",")}`;
      queryList.push(str);
    }
  }

  if (searchTerm) {
    if (queryList.length > 0) {
      return queryList.join("&") + `&search=${searchTerm}`;
    } else {
      return `search=${searchTerm}`;
    }
  }

  return queryList.join("&");
}

export default function ShoppingListing() {
  const dispatch = useDispatch();
  const { productList, isLoading } = useSelector((state) => state.shopProducts);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");

  function handleSort(value) {
    setSort(value);
  }

  function handleFilter(getSelectionId, getCurrentOptions) {
    if (getSelectionId === 0) {
      return setFilters({ category: [], brand: [] });
    }

    let copyFilters = structuredClone(filters);

    const indexOfCurrentSection =
      Object.keys(copyFilters).includes(getSelectionId);
    if (!indexOfCurrentSection) {
      copyFilters = {
        ...copyFilters,
        [getSelectionId]: [getCurrentOptions],
      };
    } else {
      const indexOfCurrentElement =
        copyFilters[getSelectionId].indexOf(getCurrentOptions);
      if (indexOfCurrentElement === -1) {
        copyFilters[getSelectionId].push(getCurrentOptions);
      } else {
        copyFilters[getSelectionId].splice(indexOfCurrentElement, 1);
      }
    }
    setFilters(copyFilters);
  }

  useEffect(() => {
    const cat = searchParams.get("category") || "";
    const brand = searchParams.get("brand") || "";
    if (cat) {
      setFilters((prev) => {
        return {
          ...prev,
          category: cat.split(","),
        };
      });
    }
    if (brand) {
      setFilters((prev) => {
        return {
          ...prev,
          brand: brand.split(","),
        };
      });
    }
    setSort("price-lowtohigh");
    setSearchTerm(searchParams.get("search") || "");
  }, []);

  // Fetching List Of Products

  useEffect(() => {
    if (sort) {
      dispatch(
        fetchFilteredProducts({ filterParams: filters, sortParams: sort, search:searchTerm })
      );
    }
  }, [dispatch, filters, sort, searchTerm]);

  useEffect(() => {
    if ((filters && Object.keys(filters).length > 0) || searchTerm) {
      const queryString = createsearchParamHelper(filters, searchTerm);
      setSearchParams(new URLSearchParams(queryString));
    }
  }, [filters, searchTerm]);

  return (
    <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-[200px_1fr] lg:grid-cols-[300px_1fr]">
      <div className="hidden sm:block">
        <ProductFilter filters={filters} handleFilters={handleFilter} />
      </div>

      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex-col flex gap-4 md:flex-row items-center justify-between">
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 justify-center">
            <Sheet>
              <SheetTrigger asChild={true}>
                <button className="flex sm:hidden items-center cursor-pointer px-2 py-1 hover:bg-gray-300 rounded-lg justify-center gap-2 shadow-xl border-[.5px] border-black">
                  <FilterIcon className="w-4 h-4" />
                  <span>Filter</span>
                </button>
              </SheetTrigger>
              <SheetContent side="left">
                <ProductFilter filters={filters} handleFilters={handleFilter} />
              </SheetContent>
            </Sheet>
            <h2 className="text-lg font-extrabold text-nowrap">All Products</h2>
            <input
              className="flex shadow-lg h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base outline-0"
              placeholder="Search products"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
            {searchTerm && (
              <X className="cursor-pointer" onClick={() => setSearchTerm("")} />
            )}
          </div>
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            <span className="text-muted-foreground">
              {productList?.length} Products
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild={true}>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ArrowUpDown className="h-4 w-4" />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-[200px] z-10 bg-white shadow-md rounded-lg"
              >
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((item) => (
                    <DropdownMenuRadioItem value={item.id} key={item.id}>
                      {item.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid gap-4 p-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {isLoading &&
            Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="w-full max-w-sm mx-auto h-[270px]" />
            ))}

          {productList &&
            productList.length > 0 &&
            productList.map((item) => (
              <ShoppingProductTile key={item._id} product={item} />
            ))}
        </div>
      </div>
    </div>
  );
}
