import { createContext, useContext } from 'react'

type AppContextType = {
  isLoggedIn: boolean,
  isInitialized: boolean,
  syncAuthState: () => void,
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const useAppContext = () => {
  const context = useContext(AppContext)

  if (context === undefined) {
    throw new Error("Context not defined")
  }

  return context
}

export default AppContext