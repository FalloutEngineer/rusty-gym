import React from "react"
import Image from "next/image"

import styles from "./menuItem.module.css"

interface ITrainingMenuItemProps {
  isActive?: boolean
  iconURL?: string
  onClick?: () => void
}

export default function TrainingMenuItem({
  isActive = false,
  iconURL,
  onClick,
}: ITrainingMenuItemProps) {
  return (
    <div
      className={styles.item + " " + isActive ? styles.active : ""}
      onClick={onClick}
    >
      {iconURL && <Image src={iconURL} alt={""} />}
    </div>
  )
}
