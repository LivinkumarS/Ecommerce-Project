import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { deleteProduct, fetchAllProducts } from "@/store/admin/products-slice";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export default function AdminProductTile({
  product,
  setIsEditing,
  setCreateNewProductData,
  setOpenCreateProducts,
  setEditId,
}) {
  const dispatch = useDispatch();
  return (
    <Card className="wfull max-w-sm mx-auto">
      <div>
        <div className="relative">
          <img
            className="w-full h-[200px] object-cover rounded-t-lg"
            src={product?.image?.[0]}
            alt={product?.title}
          />
        </div>
      </div>
      <CardContent>
        <h1 className="text-xl font-bold mb-2">{product?.title}</h1>
        <div className="flex items-center justify-between mb-2">
          <span
            className={`${
              product?.salePrice > 0 ? "line-through" : ""
            } text-lg font-semibold text-primary`}
          >
            ₹{product?.price}
          </span>
          {product?.salePrice > 0 && (
            <span className="text-lg font-bold">₹{product?.salePrice}</span>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <Button
          onClick={() => {
            setIsEditing(true);
            setOpenCreateProducts(true);
            setCreateNewProductData(product);
            setEditId(product?._id);
          }}
        >
          Edit
        </Button>
        <Button
          onClick={() => {
            toast(`Are you sure you want to delete "${product.title}"?`, {
              action: {
                label: "Yes",
                onClick: () => {
                  dispatch(deleteProduct(product._id)).then((data) => {
                    if (data?.payload?.success) {
                      dispatch(fetchAllProducts());
                      toast.success(
                        `Product "${product.title}" deleted successfully`
                      );
                    } else {
                      toast.error(
                        data?.payload?.message || "Failed to delete product"
                      );
                    }
                  });
                },
              },
              cancel: {
                label: "No",
                onClick: () => toast.info("Delete cancelled"),
              },
            });
          }}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
