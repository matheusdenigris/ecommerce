import Image from 'next/image'
import { api } from '@/data/api'
import { Product } from '@/types/products'
import { Metadata } from 'next'
import { AddToCartButton } from '@/components/add-to-cart-button'
interface ProductProps {
  params: {
    slug: string
  }
}
async function getProduct(slug: string): Promise<Product> {
  const response = await api(`/products/${slug}`, {
    next: {
      revalidate: 60 * 60, // 1 hour
    },
  })
  const product = await response.json()
  return product
}

export async function generateMetadata({
  params,
}: ProductProps): Promise<Metadata> {
  const product = await getProduct(params.slug)
  return {
    title: product.title,
  }
}

export default async function ProductPage({ params }: ProductProps) {
  const product = await getProduct(params.slug)
  return (
    <div className="relative grid max-h-[860px] grid-cols-3">
      <div className="col-span-2 overflow-hidden flex justify-center">
        <Image
          src={product.image}
          alt=""
          width={600}
          height={800}
          quality={100}
        />
      </div>
      <div className="flex flex-col justify-center px-12">
        <h1 className="text-3xl font-bold leading-tight">{product.title}</h1>
        <p className="mt-2 leading-relaxed text-zinc-400">
          {product.description}
        </p>
        <div className="mt-8 flex items-center gap-3">
          <span className="inline-block rounded-full bg-violet-500 px-5 py-2.5 font-semibold">
            {product.price.toLocaleString('us', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
          </span>
          <span className="text-sm text-zinc-400">
            12x/
            {(product.price / 12).toLocaleString('us', {
                style: 'currency',
                currency: 'USD',
              })}
          </span>
        </div>
        <div className="mt-8 space-y-4">
          <span className="block font-semibold">Extended warranty</span>
          <div className="flex gap-2">
            <button
              type="button"
              className="flex h-9 w-24 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold"
            >
              3 months
            </button>
            <button
              type="button"
              className="flex h-9 w-24 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold"
            >
              6 months
            </button>
            <button
              type="button"
              className="flex h-9 w-24 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold"
            >
              1 Year
            </button>
            <button
              type="button"
              className="flex h-9 w-24 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold"
            >
              2 Years
            </button>
          </div>
        </div>
        <AddToCartButton productId={product.id} />
      </div>
    </div>
  )
}