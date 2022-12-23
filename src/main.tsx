import { render } from 'preact'

import App from './app'
import { TransactionsProvider } from './context/transcations'
import './index.css'

render(
  <TransactionsProvider>
    <App />
  </TransactionsProvider>,
  document.getElementById('app') as HTMLElement
)
