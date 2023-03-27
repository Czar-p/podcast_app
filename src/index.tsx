import * as ReactDOMClient from 'react-dom/client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import App from './App'
import { persistor, store } from './store'

const container = document.getElementById('root') as HTMLElement

ReactDOMClient.createRoot(container).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
)
