import { createFileRoute } from "@tanstack/react-router";
import { Storefront } from "@/components/site/Storefront";
import { pageHead } from "@/lib/seo";
export const Route = createFileRoute("/store/")({ head: () => pageHead("/store", "Illustrative everyday essentials", "Browse non-medicinal example items. Confirm all availability and prices with Kalahari Pharmacy; no online payments."), component: Storefront });