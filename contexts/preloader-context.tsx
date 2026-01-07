"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface PreloaderContextType {
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
}

const PreloaderContext = createContext<PreloaderContextType>({
  isLoading: true,
  setIsLoading: () => {},
})

export function PreloaderProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)

  return <PreloaderContext.Provider value={{ isLoading, setIsLoading }}>{children}</PreloaderContext.Provider>
}

export function usePreloader() {
  return useContext(PreloaderContext)
}
