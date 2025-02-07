"use client";
import { Controller, Control } from "react-hook-form";

import { ProductFormData } from "@/types/schema/validationSchema";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface ProductFormFieldProps {
  label: string;
  id: keyof ProductFormData;
  control: Control<ProductFormData>;
  rules?: object;
  type?: string;
  placeholder: string;
  error?: string;
  isTextarea?: boolean;
  parseNumber?: boolean;
}

export function ProductFormField({
  label,
  id,
  control,
  rules,
  type = "text",
  placeholder,
  error,
  isTextarea = false,
  parseNumber = false,
}: ProductFormFieldProps) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <Controller
        name={id}
        control={control}
        rules={rules}
        render={({ field: { onChange, value, ...field } }) => {
          const safeValue =
            typeof value === "string" || typeof value === "number"
              ? value
              : "";

          return isTextarea ? (
            <Textarea
              {...field}
              id={id}
              placeholder={placeholder}
              value={safeValue}
              className="h-[96px]"
              onChange={(e) => onChange(e.target.value)}
            />
          ) : (
            <Input
              {...field}
              id={id}
              type={type}
              placeholder={placeholder}
              value={safeValue}
              className="!h-[52px] !text-[16px]"
              onChange={(e) =>
                onChange(parseNumber ? Number(e.target.value) : e.target.value)
              }
            />
          );
        }}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
