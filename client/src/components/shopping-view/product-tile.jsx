import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { fetchProductDetails } from "@/store/shop/product-slice";
import { toast } from "sonner";

export default function ShoppingProductTile({ product }) {
  const dispatch = useDispatch();

  async function handleGetProductDetails(id) {
    dispatch(fetchProductDetails(id)).then((data) => {
      if (data?.payload?.success) return;
      else toast.error(data?.payload?.message);
    });
  }

  return (
    <Card className="w-full max-w-sm mx-auto">
      <div
        className="relative cursor-pointer"
        onClick={() => {
          handleGetProductDetails(product._id);
        }}
      >
        <img
          src={product?.image[0]}
          alt={product.title}
          className="w-full h-[250px] object-cover rounded-tl-lg"
        />
        {product?.salePrice > 0 ? (
          <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
            Sale
          </Badge>
        ) : null}
      </div>

      <CardContent className="p-4">
        <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm text-muted-foreground">
            {product?.category
              ? product.category[0].toUpperCase() + product.category.slice(1)
              : ""}
          </span>

          <span className="text-sm text-muted-foreground">
            {product?.brand
              ? product.brand[0].toUpperCase() + product.brand.slice(1)
              : ""}
          </span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span
            className={`text-lg text-primary font-semibold ${
              product?.salePrice > 0 ? "line-through" : ""
            }`}
          >
            {product?.price}
          </span>
          {product?.salePrice > 0 && (
            <span className="text-lg text-primary font-semibold">
              {product?.salePrice}
            </span>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Add to cart</Button>
      </CardFooter>
    </Card>
  );
}
