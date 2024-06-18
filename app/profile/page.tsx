"use client"
import React, { useEffect, useState } from "react"
import { UserAuth } from "../context/AuthContext"
import { Spinner } from "../components/Util/Spinner"

export default function ProfilePage() {
  const { user } = UserAuth()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      await new Promise((resolve: any) => {
        setTimeout(resolve, 50)
        setLoading(false)
      })
    }
    checkAuth()
  }, [user])
  return (
    <div>
      {loading ? (
        <Spinner />
      ) : user ? (
        <p>Welcome, {user.displayName}</p>
      ) : (
        <p>You must be logged in to view this page</p>
      )}
    </div>
  )
}
