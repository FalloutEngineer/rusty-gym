import Link from "next/link"
import React, { useEffect, useState } from "react"
import { UserAuth } from "../context/AuthContext"

export default function Navbar() {
  const { user, googleSignIn, logOut } = UserAuth()

  const [loading, setLoading] = useState(true)

  const handleSignIn = async () => {
    try {
      await googleSignIn()
    } catch (e) {
      console.log(e)
    }
  }

  const handleSignOut = async () => {
    try {
      await logOut()
    } catch (e) {
      console.log(e)
    }
  }

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
    <nav className="navbar__home">
      <ul className="navbar__list">
        <li className="navbar__item">
          <Link href="/" className="navbar__link">
            Home
          </Link>
          <Link href="/about" className="navbar__link">
            About
          </Link>
          {!user ? null : (
            <Link href="/profile" className="navbar__link">
              Profile
            </Link>
          )}
        </li>
      </ul>
      {loading ? null : !user ? (
        <ul className="navbar__list">
          <li
            className="navbar__item"
            onClick={() => {
              handleSignIn()
            }}
          >
            LogIn
          </li>
          <li
            className="navbar__item"
            onClick={() => {
              handleSignIn()
            }}
          >
            SignUp
          </li>
        </ul>
      ) : (
        <div className="userBlock">
          <h4>Hello, {user.displayName}</h4>
          <p
            onClick={() => {
              handleSignOut()
            }}
          >
            LogOut
          </p>
        </div>
      )}
    </nav>
  )
}
