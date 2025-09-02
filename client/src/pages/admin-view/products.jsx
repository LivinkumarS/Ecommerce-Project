import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductElements } from "@/config";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import ImageUpload from "../../components/admin-view/imageUpload";
import { UploadCloudIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewProduct,
  editProduct,
  fetchAllProducts,
} from "@/store/admin/products-slice";
import AdminProductTile from "@/components/admin-view/product-tile";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminProducts() {
  const dispatch = useDispatch();
  const { productList, isLoading } = useSelector(
    (state) => state.adminProducts
  );
  const [createNewProductData, setCreateNewProductData] = useState({
    image: [],
    title: "",
    description: "",
    category: "",
    brand: "",
    price: "",
    salePrice: "",
    totalStock: "",
  });

  const [openCreateProducts, setOpenCreateProducts] = useState(false);
  const [imageFiles, setImageFiles] = useState([]);
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  // Editing States
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const controlFormSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      const toadtId = toast.loading("Product is being updated!");

      dispatch(
        editProduct({ productId: editId, formData: createNewProductData })
      ).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllProducts());
          toast.success(
            `Product "${createNewProductData.title}" is updated successfully`,
            {
              id: toadtId,
            }
          );
          setCreateNewProductData({
            image: [],
            title: "",
            description: "",
            category: "",
            brand: "",
            price: "",
            salePrice: "",
            totalStock: "",
          });
          setEditId(null);
          setIsEditing(false);
          setOpenCreateProducts(false);
        } else {
          toast.error(data?.payload?.message);
        }
      });
    } else {
      if (createNewProductData.image.length == 0) {
        return toast.error("Please upload product image!");
      }

      const toadtId = toast.loading("Product is getting added!");

      dispatch(addNewProduct(createNewProductData)).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllProducts());
          toast.success(
            `Product "${createNewProductData.title}" is added successfully`,
            {
              id: toadtId,
            }
          );
          setCreateNewProductData({
            image: [],
            title: "",
            description: "",
            category: "",
            brand: "",
            price: "",
            salePrice: "",
            totalStock: "",
          });
          setImageFiles([]);
          setOpenCreateProducts(false);
        } else {
          toast.error(data?.payload?.message);
        }
      });
    }
  };

  const handleImageFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    if (selectedFiles.length > 0) {
      setImageFiles((prev) => {
        return [...prev, ...selectedFiles];
      });
    }
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };
  function handleDragOver(e) {
    setDragging(true);
    e.preventDefault();
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles) {
      setImageFiles((prev) => {
        return [...prev, ...droppedFiles];
      });
    }
  }

  function isValid() {
    return Object.keys(createNewProductData)
      .map((key) => createNewProductData[key] !== "")
      .every((key) => key);
  }

  useEffect(() => {
    if (!openCreateProducts) {
      setCreateNewProductData({
        image: [],
        title: "",
        description: "",
        category: "",
        brand: "",
        price: "",
        salePrice: "",
        totalStock: "",
      });
      setEditId(null);
      setIsEditing(false);
    }
  }, [openCreateProducts]);

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
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {isLoading ? (
          <>
            <Skeleton className="w-full max-w-sm h-[300px] bg-gray-400 mx-auto" />
            <Skeleton className="w-full max-w-sm h-[300px] bg-gray-400 mx-auto" />
            <Skeleton className="w-full max-w-sm h-[300px] bg-gray-400 mx-auto" />
            <Skeleton className="w-full max-w-sm h-[300px] bg-gray-400 mx-auto" />
            <Skeleton className="w-full max-w-sm h-[300px] bg-gray-400 mx-auto" />
            <Skeleton className="w-full max-w-sm h-[300px] bg-gray-400 mx-auto" />
            <Skeleton className="w-full max-w-sm h-[300px] bg-gray-400 mx-auto" />
            <Skeleton className="w-full max-w-sm h-[300px] bg-gray-400 mx-auto" />
            <Skeleton className="w-full max-w-sm h-[300px] bg-gray-400 mx-auto" />
          </>
        ) : (
          productList?.length > 0 &&
          productList.map((product, ind) => (
            <AdminProductTile
              setIsEditing={setIsEditing}
              setEditId={setEditId}
              setCreateNewProductData={setCreateNewProductData}
              setOpenCreateProducts={setOpenCreateProducts}
              product={product}
              key={product?._id}
            />
          ))
        )}
      </div>

      <Sheet open={openCreateProducts} onOpenChange={setOpenCreateProducts}>
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {isEditing ? "Edit Product" : "Add New Product"}
            </SheetTitle>
          </SheetHeader>

          <div
            hidden={isEditing}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onDragLeave={() => {
              setDragging(false);
            }}
            className="border-2  border-dashed rounded-lg p-4"
          >
            <input
              disabled={isEditing}
              ref={inputRef}
              onChange={handleImageFileChange}
              type="file"
              className="hidden"
              id="image-upload"
            />

            <label
              className={`flex flex-col items-center justify-center h-32 cursor-pointer ${
                dragging
                  ? "text-blue-500 border-blue-500 opacity-75 bg-gray-300"
                  : ""
              }`}
              htmlFor="image-upload"
            >
              <UploadCloudIcon className="w-10 h-10" />{" "}
              <span className="text-center">
                Drag and Drop or Click to Upload Image
              </span>
            </label>
          </div>

          <div hidden={isEditing}>
            {!imageFiles.length == 0 &&
              imageFiles.map((item, ind) => (
                <ImageUpload
                  key={ind}
                  file={item}
                  setCreateNewProductData={setCreateNewProductData}
                  setImageFiles={setImageFiles}
                />
              ))}
          </div>

          <div className="py-6">
            <CommonForm
              formControls={addProductElements}
              formData={createNewProductData}
              setFormData={setCreateNewProductData}
              onSubmit={controlFormSubmit}
              buttunText={isEditing ? "Update" : "Add Product"}
              noSubmit={!isValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
