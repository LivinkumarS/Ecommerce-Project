import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductElements } from "@/config";
import React, { useState } from "react";
import { toast } from "sonner";
import ImageUpload from "./imageUpload";

export default function AdminProducts() {
  const [createNewProductData, setCreateNewProductData] = useState({
    image: null,
    title: "",
    description: "",
    category: "",
    brand: "",
    price: "",
    saleprice: "",
    totalstock: "",
  });
  const [openCreateProducts, setOpenCreateProducts] = useState(false);

  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

  const controlFormSubmit = (e) => {
    e.preventDefault();
    setOpenCreateProducts(false);
    const loadToastId = toast.loading("Product Is getting Added!");

    setTimeout(() => {
      toast.success("product Is Added", { id: loadToastId });
    }, 7000);
  };

  return (
    <>
      <div className="flex w-full justify-end mb-5">
        <Button
          onClick={() => {
            setOpenCreateProducts(true);
          }}
        >
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4"></div>
      <Sheet open={openCreateProducts} onOpenChange={setOpenCreateProducts}>
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>Add New Product</SheetTitle>
          </SheetHeader>

          <ImageUpload
            file={imageFile}
            setFile={setImageFile}
            uploadImageUrl={uploadedImageUrl}
            setUploadImageUrl={setUploadedImageUrl}
          />

          <div className="py-6">
            <CommonForm
              formControls={addProductElements}
              formData={createNewProductData}
              setFormData={setCreateNewProductData}
              onSubmit={controlFormSubmit}
              buttunText={"Add Product"}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
