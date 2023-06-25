import React from 'react'
import ReactDOM from 'react-dom/client'

import Header from './components/Header'
import Router from './router'
import Footer from './components/Footer'

import './assets/styles/main.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Header />
        <Router />
        <Footer />
    </React.StrictMode>,
)
