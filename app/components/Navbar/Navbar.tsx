import Link from "next/link"
import React, { useEffect, useState } from "react"
import { UserAuth } from "../../context/AuthContext"
import { usePathname } from "next/navigation"

import styles from "./navbar.module.css"
import Logo from "./Logo"

import { useStore } from "../../store"

export default function Navbar() {
  const isMenuOpen = useStore((state) => state.isMenuOpen)
  const toggleMenu = useStore((state) => state.toggleMenu)

  const { user, googleSignIn, logOut } = UserAuth()

  const [loading, setLoading] = useState(true)

  const pathname = usePathname()

  const isActive = (href: string) => pathname.split("/").includes(href)

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
    <nav className={styles.navbar}>
      <div className={styles.section}>
        <Logo />
      </div>
      <div
        className={styles.mobileBody + " " + (isMenuOpen && styles.activeMenu)}
      >
        <div className={styles.section}>
          <ul className={styles.list}>
            <li className={styles.item}>
              <Link
                href="/"
                className={
                  styles.link + " " + (pathname === "/" ? styles.active : "")
                }
              >
                Home
              </Link>
            </li>
            {user ? (
              <li className={styles.item}>
                <Link
                  href="/dashboard"
                  className={
                    styles.link +
                    " " +
                    (isActive("dashboard") ? styles.active : "")
                  }
                >
                  Dashboard
                </Link>
              </li>
            ) : null}
            <li className={styles.item}>
              <Link
                href="/about"
                className={
                  styles.link + " " + (isActive("about") ? styles.active : "")
                }
              >
                About
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles.section}>
          {loading ? null : !user ? (
            <ul className={styles.authList}>
              <button
                className={styles.authButton}
                onClick={() => {
                  handleSignIn()
                }}
              >
                LogIn
              </button>
              <button
                className={styles.authButton}
                onClick={() => {
                  handleSignIn()
                }}
              >
                SignUp
              </button>
            </ul>
          ) : (
            <div className={styles.userBlock}>
              <Link className={styles.profileButton} href="profile">
                {user.displayName}
              </Link>
              <button
                className={styles.authButton}
                onClick={() => {
                  handleSignOut()
                }}
              >
                LogOut
              </button>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={toggleMenu}
        className={styles.burger + " " + (isMenuOpen && styles.activeBurger)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </nav>
  )
}
