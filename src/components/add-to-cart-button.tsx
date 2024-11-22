'use client'

import { useCart } from "@/contexts/card-context"

export interface AddToCartButtonProps {
  productId: number
}
export function AddToCartButton({ productId }: AddToCartButtonProps) {
  const { addToCart } = useCart()
  function handleAddProductToCart() {
    addToCart(productId)
  }
  return (
    <button
      type="button"
      onClick={handleAddProductToCart}
      className="mt-8 flex h-12 items-center justify-center rounded-full bg-emerald-600 font-semibold text-white"
    >
      Add to cart
    </button>
  )
}