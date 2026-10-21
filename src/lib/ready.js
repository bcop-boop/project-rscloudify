import { createContext, useContext } from 'react'

// true once the preloader has finished, so hero animations don't play hidden behind it
export const ReadyContext = createContext(true)
export const useReady = () => useContext(ReadyContext)
