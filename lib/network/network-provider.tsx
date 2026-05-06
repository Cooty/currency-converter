import { useNetInfo } from '@react-native-community/netinfo'

import { createContext, useContext, type PropsWithChildren } from 'react'

type NetworkContextValue = {
  isOnline: boolean | null
  isConnected: boolean | null
  isInternetReachable: boolean | null
}

const NetworkContext = createContext<NetworkContextValue | undefined>(undefined)
NetworkContext.displayName = 'NetworkContext'

export function useNetwork() {
  const context = useContext(NetworkContext)

  if (!context) {
    throw new Error('useNetwork must be used within NetworkProvider')
  }

  return context
}

export type NetworkProviderProps = PropsWithChildren

export function NetworkProvider({ children, ...props }: NetworkProviderProps) {
  const { isConnected, isInternetReachable } = useNetInfo()

  const isOnline = isInternetReachable === true

  return (
    <NetworkContext
      value={{ isOnline, isConnected, isInternetReachable }}
      {...props}
    >
      {children}
    </NetworkContext>
  )
}
