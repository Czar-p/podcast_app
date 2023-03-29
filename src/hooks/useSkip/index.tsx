import React from 'react'
import { useAppSelector } from '../../store'

const useSkip = (data: string | number): boolean => {
  const lastUpdated = useAppSelector((state) => state?.system?.lastUpdated)
  return Boolean(data) && lastUpdated !== null && Date.now() - lastUpdated < 24 * 60 * 60 * 1000
}

export default useSkip
