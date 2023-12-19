import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import{createBrowserRouter,RouterProvider} from 'react-router-dom'

import Bitcoin from './routes/Bitcoin/Bitcoin'
import ErrorPage from './routes/ErrorPage'
import Convert from './routes/Convert/Convert'
import App from './App'

const router = createBrowserRouter([
    
  {
    path:"/",
    element:<App/>,
    errorElement: <ErrorPage/>,
    children:[
    {
      path:"bitcoin",
      element:<Bitcoin/>,
    },
    {
      path:"convert",
      element:<Convert/>,
    },
  ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
