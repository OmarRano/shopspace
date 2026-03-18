import { Router, Route } from 'wouter'
import Auth from './pages/Auth'

function App() {
  return (
    <Router>
      <Route path="/" component={Auth} />
      <Route path="/auth" component={Auth} />
      {/* Add other routes as needed */}
    </Router>
  )
}

export default App