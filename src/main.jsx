// import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import Gallery from './Gallery/Gallery.jsx'
import { NextUIProvider } from '@nextui-org/react'
// import Demo from './Gallery/Demo.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(

<NextUIProvider>
  
   <Gallery></Gallery>
   {/* <Demo></Demo> */}

</NextUIProvider>
)
