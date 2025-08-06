// Fil: src/components/product/AddToCart.tsx
"use client";

import { useEffect, useTransition } from "react";
import { useActionState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import addItem from "@/Actions/Cart/addItem";
import Button from "@/Components/UI/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/Components/UI/form";
import QuantitySelector from "./QuantitySelector";

const addToCartSchema = z.object({
  variantId: z.string().min(1),
  quantity: z.number().int().min(1, "Antall må være minst 1."),
});

type AddToCartFormValues = z.infer<typeof addToCartSchema>;

interface AddToCartProps {
  variantId: string;
}

function AddToCart({ variantId }: AddToCartProps) {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const [state, formAction] = useActionState(addItem, {
    success: false,
    message: "",
  });

  const form = useForm<AddToCartFormValues>({
    resolver: zodResolver(addToCartSchema),
    defaultValues: {
      variantId: variantId,
      quantity: 1,
    },
  });

  useEffect(() => {
    if (state.success) {
      router.refresh();
      form.reset({ variantId: variantId, quantity: 1 });
    }

    form.setError("root", { message: state.message });
  }, [state, router, form, variantId]);

  function onSubmit(data: AddToCartFormValues) {
    const formData = new FormData();
    formData.set("variantId", data.variantId);
    formData.set("quantity", data.quantity.toString());

    startTransition(() => {
      formAction(formData);
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="variantId"
          render={({ field }) => <input type="hidden" {...field} />}
        />

        <div className="flex items-start gap-4">
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <QuantitySelector
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isPending} className="flex-1">
            {isPending ? "Legger til..." : "Legg i kurv"}
          </Button>
        </div>

        {!state.success && state.message && (
          <p className="mt-2 text-xs text-center text-red-600">
            {state.message}
          </p>
        )}
      </form>
    </Form>
  );
}

export default AddToCart;
