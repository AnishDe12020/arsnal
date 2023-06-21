"use client"

import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export default function IndexPage() {
  return (
    <section className="flex flex-col items-center gap-8 mt-24">
      <div className="flex flex-col max-w-3xl gap-8 text-center">
        <h1 className="text-3xl font-extrabold md:text-4xl">
          Simplifying the Solana DX with a suite of debugging tools and a
          playground for interacting with programs
        </h1>
      </div>

      <Link
        href="/playground"
        className={cn(
          buttonVariants({
            size: "lg",
          }),
          "text-lg font-semibold"
        )}
      >
        Playground
        <ArrowRightIcon className="w-5 h-5 ml-2" />
      </Link>
    </section>
  )
}
