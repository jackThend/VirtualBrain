import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ErrorBoundary } from './components/ErrorBoundary'
import './index.css'

try {
  const rootEl = document.getElementById('root')
  if (!rootEl) {
    document.body.innerHTML = '<h1 style="color:red;padding:40px">Root element not found</h1>'
  } else {
    const root = ReactDOM.createRoot(rootEl)
    root.render(
      <React.StrictMode>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </React.StrictMode>,
    )
  }
} catch (err) {
  document.body.innerHTML = `<pre style="color:red;padding:40px;background:#1a1a1a;white-space:pre-wrap">${err}</pre>`
}
