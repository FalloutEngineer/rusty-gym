import React from "react"

import styles from "./menuButton.module.css"
import Link from "next/link"
import Image from "next/image"

export default function MenuButton({
  title,
  href,
  image,
}: {
  title: string
  href: string
  image: string | undefined
}) {
  return (
    <Link href={href} className={styles.menuButton}>
      {image && (
        <div className={styles.imageWrapper}>
          <Image src={image} alt={title} className={styles.image} />
        </div>
      )}
      <p className={styles.title}>{title}</p>
    </Link>
  )
}