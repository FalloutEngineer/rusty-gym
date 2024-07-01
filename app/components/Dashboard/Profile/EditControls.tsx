import React from "react"

import styles from "./editControls.module.css"

type EditControlsProps = {
  isEditMode: boolean
  enableEditModeFunc: () => void
  disableEditModeFunc: () => void
  saveResults: () => void
}

export default function EditControls({
  isEditMode,
  enableEditModeFunc,
  disableEditModeFunc,
  saveResults,
}: EditControlsProps) {
  return (
    <div className={styles.editControlsWrapper}>
      {isEditMode ? (
        <>
          <button
            className={styles.button + " " + styles.cancel}
            onClick={() => disableEditModeFunc()}
          >
            Cancel
          </button>
          <button
            className={styles.button + " " + styles.save}
            onClick={() => saveResults()}
          >
            Save
          </button>
        </>
      ) : (
        <button
          className={styles.button + " " + styles.edit}
          onClick={() => {
            enableEditModeFunc()
          }}
        >
          Edit
        </button>
      )}
    </div>
  )
}
