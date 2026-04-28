import { createContext, useContext } from 'react'

type AppContextType = {
  isLoggedIn: boolean,
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>,
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