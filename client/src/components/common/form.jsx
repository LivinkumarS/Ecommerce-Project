import React from "react";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { SelectValue } from "@radix-ui/react-select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

export default function CommonForm({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttunText,
}) {
  const renderInputByComponentType = (controlItem) => {
    let element = null;
    let value = formData[controlItem.name];

    switch (controlItem.componentType) {
      case "input":
        element = (
          <Input
            name={controlItem.name}
            placeholder={controlItem.placeholder}
            id={controlItem.name}
            type={controlItem.type}
            value={value}
            onChange={(e) => {
              setFormData((prev) => {
                return { ...prev, [controlItem.name]: e.target.value };
              });
            }}
          />
        );
        break;
      case "textarea":
        element = (
          <Textarea
            name={controlItem.name}
            placeholder={controlItem.placeholder}
            id={controlItem.id}
            value={value}
            onChange={(e) => {
              setFormData((prev) => {
                return { ...prev, [controlItem.name]: e.target.value };
              });
            }}
          />
        );
        break;
      case "select":
        element = (
          <Select
            value={value}
            onValueChange={(value) => {
              setFormData((prev) => {
                return { ...prev, [controlItem.name]: value };
              });
            }}
          >
            <SelectTrigger className={"w-full"}>
              <SelectValue placeholder={controlItem.placeholder}></SelectValue>
            </SelectTrigger>
            <SelectContent>
              {controlItem.options && controlItem.options.length > 0
                ? controlItem.map((option) => (
                    <SelectItem key={option.id} value={option.id}>
                      {option.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );
        break;

      default:
        element = (
          <Input
            name={controlItem.name}
            placeholder={controlItem.placeholder}
            id={controlItem.name}
            type={controlItem.type}
            value={value}
            onChange={(e) => {
              setFormData((prev) => {
                return { ...prev, [controlItem.name]: e.target.value };
              });
            }}
          />
        );
        break;
    }
    return element;
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        {formControls.map((controlItem) => (
          <div key={controlItem.name} className="w-full grid gap-1.5">
            <label className="mb-1">
              {controlItem.label}
            </label>
            {renderInputByComponentType(controlItem)}
          </div>
        ))}
      </div>

      <Button type="submit" className={"mt-2 w-full"}>
        {buttunText || "Submit"}
      </Button>
    </form>
  );
}
