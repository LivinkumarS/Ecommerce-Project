import { productFilterOptions } from "@/config";
import React, { Fragment } from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";

export default function ProductFilter({ filters, handleFilters }) {
  return (
    <div className="bg-background rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <h1 className="text-lg font-extrabold">Filters</h1>
      </div>
      <div className="p-4 space-y-4">
        {Object.keys(productFilterOptions).map((filterItem, ind) => (
          <Fragment key={ind}>
            <div className="text-base font-bold">
              {filterItem}
              <div className="grid gap-2 mt-2">
                {productFilterOptions[filterItem].map((item, ind) => (
                  <Label
                    key={ind}
                    className="flex font-medium items-center gap-2"
                  >
                    <Checkbox
                      checked={
                        filters && filters?.[filterItem]?.includes(item.id)
                      }
                      onCheckedChange={() => {
                        handleFilters(filterItem, item.id);
                      }}
                    />
                    {item.label}
                  </Label>
                ))}
              </div>
            </div>
            <Separator />
          </Fragment>
        ))}
      </div>

      <button
        className="px-4 py-2 text-sm bg-black text-white rounded-lg cursor-pointer"
        onClick={() => {
          handleFilters(0, 0);
        }}
      >
        Clear Filters
      </button>
    </div>
  );
}
