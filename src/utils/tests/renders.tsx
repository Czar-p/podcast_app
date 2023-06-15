import { render } from '@testing-library/react'
import Provider from '@/store/provider'

import { AppRouterContext } from 'next/dist/shared/lib/app-router-context'
import mockRouter from 'next-router-mock'

export const renderWithRedux = (children: React.ReactNode) => {
  return render(
    // @ts-ignore
    <AppRouterContext.Provider value={mockRouter}>
      <Provider>{children}</Provider>
    </AppRouterContext.Provider>
  )
}
