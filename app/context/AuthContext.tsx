import { useContext, createContext, useState, useEffect } from "react"
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
} from "firebase/auth"
import { auth } from "../firebase/config"
import { initUserDoc } from "../services/initServices"

const AuthContext = createContext<AuthContextInterface>({
  user: null,
  googleSignIn: null,
  logOut: null,
})

export const AuthContextProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState(null)

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider)

    const userTemp = result.user

    if (userTemp) {
      initUserDoc(userTemp.uid)
    }
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
