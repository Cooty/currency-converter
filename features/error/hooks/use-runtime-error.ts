import { useState } from 'react'

export function useRunTimeError() {
  const [error, setError] = useState<unknown>(null)
  if (error) {
    throw error instanceof Error ? error : new Error(String(error))
  }

  return {
    setRunTimeError: setError,
  }
}
