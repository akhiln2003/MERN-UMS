  import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import  Store  from './redux/Store.js'
import {Provider} from 'react-redux'


ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    < Provider store={Store} >
      <App />
    </Provider>
  </Router>,
)
