import { render } from 'preact'

import App from './app'
import { TransactionsProvider } from './context/transcations'
import './index.css'
import reportWebVitals from './reportWebVitals'
import { sendToVercelAnalytics } from './vitals'

render(
  <TransactionsProvider>
    <App />
  </TransactionsProvider>,
  document.getElementById('app') as HTMLElement
)

reportWebVitals(sendToVercelAnalytics)
