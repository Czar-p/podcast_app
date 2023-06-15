'use client'

import { Provider as RXProvider } from 'react-redux'
import { persistor, store } from '.'
import { PersistGate } from 'redux-persist/integration/react'

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <RXProvider store={store}>
      <PersistGate persistor={persistor}>{children}</PersistGate>
    </RXProvider>
  )
}

export default Provider
