"use client"
import React, { ReactNode } from "react"

import styles from "./styles.module.css"

import { usePathname } from "next/navigation"
import Link from "next/link"

export default function Breadcrumbs() {
  const paths = usePathname()
  const pathNames = paths.split("/").filter((path) => path)

  const capitalizeLinks = true

  const separator = ">"

  return (
    <div className={styles.breadcrumbsContainer}>
      <ul className={styles.breadcrumbsList}>
        <li className={styles.breadcrumbsItem}>
          <Link href={"/"} className={styles.breadcrumbsLink}>
            Home
          </Link>
        </li>
        {pathNames.length > 0 && separator}
        {pathNames.map((link, index) => {
          const href = `/${pathNames.slice(0, index + 1).join("/")}`
          const itemClasses =
            paths === href
              ? `${styles.breadcrumbsItem} ${styles.active}`
              : styles.breadcrumbsItem
          const itemLink = capitalizeLinks
            ? link[0].toUpperCase() + link.slice(1, link.length)
            : link
          return (
            <React.Fragment key={index}>
              <li className={itemClasses}>
                <Link href={href} className={styles.breadcrumbsLink}>
                  {itemLink}
                </Link>
              </li>
              {pathNames.length !== index + 1 && separator}
            </React.Fragment>
          )
        })}
      </ul>
    </div>
  )
}
