import * as React from "react"

import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu"
import { HomeIcon } from "lucide-react"
import { Link } from "@inertiajs/react"

export interface BreadcrumbItem {
    href: string
    label: string
}

interface NavBreadcrumbProps {
    items: BreadcrumbItem[]
    itemsToDisplay: number
}

export function NavBreadcrumb({
    items,
    itemsToDisplay = 3,
}: NavBreadcrumbProps) {
    items = [{ href: "/", label: "Home" }, ...items];
    const shouldUseDropdown = items.length > itemsToDisplay
    const visibleItems = shouldUseDropdown
        ? items.slice(-itemsToDisplay + 1)
        : items.slice(1)

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {items.length == 0 && (
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/">
                                <HomeIcon />
                            </Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                )}
                {shouldUseDropdown && (
                    <>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <DropdownMenu>
                                <DropdownMenuTrigger
                                    className="flex items-center gap-1"
                                    aria-label="Toggle menu"
                                >
                                    <BreadcrumbEllipsis className="h-4 w-4" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start">
                                    {items.slice(1, -itemsToDisplay + 1).map((item, index) => (
                                        <DropdownMenuItem key={index}>
                                            <Link href={item.href ? item.href : "#"}>
                                                {item.label}
                                            </Link>
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </BreadcrumbItem>
                    </>
                )}
                {visibleItems.map((item, index) => (
                    <React.Fragment key={index}>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            {index != visibleItems.length - 1 ? (
                                <BreadcrumbLink
                                    asChild
                                    className="max-w-20 truncate md:max-w-none"
                                >
                                    <Link href={item.href}>{item.label}</Link>
                                </BreadcrumbLink>
                            ) : (
                                <BreadcrumbPage className="max-w-20 truncate md:max-w-none">
                                    {item.label}
                                </BreadcrumbPage>
                            )}
                        </BreadcrumbItem>
                    </React.Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    )
}
