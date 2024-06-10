import { useContext, createContext, useState, useEffect } from "react"
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
} from "firebase/auth"
import { auth } from "../firebase/config"

const AuthContext = createContext<AuthContextInterface>({
  user: "Vlad",
  googleSignIn: null,
  logOut: null,
})

export const AuthContextProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState("Vlad")

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
  }

  const logOut = () => {
    signOut(auth)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser: any) => {
      setUser(currentUser)
    })

    return () => unsubscribe()
  }, [user])

  return (
    <AuthContext.Provider value={{ user, googleSignIn, logOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const UserAuth = () => {
  return useContext(AuthContext)
}
