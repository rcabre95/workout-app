import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { createContext, useState } from 'react'


export type TUser = {
  userId: string | null;
  userAccType: "clients" | "trainers" | null;
}

export const UserContext = createContext<any>(null);

export default function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<TUser>({ userId: null, userAccType: null })

  const setLoggedIn = (userData: TUser) => {
    setUser(userData)
  }

  const setLoggedOut = () => {
    setUser({
      userId: null,
      userAccType: null
    })
  }

  return (
    <UserContext.Provider value={{ user, setLoggedIn, setLoggedOut }}>
      <Component {...pageProps} />
    </UserContext.Provider>
  )
}
