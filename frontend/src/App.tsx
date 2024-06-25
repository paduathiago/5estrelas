import { RouterProvider } from 'react-router-dom'
import { router } from './routes/router'

function App() {
    return (
        <div className='h-full flex flex-row'>
            <div className='h-full w-14 bg-black'></div>
            <RouterProvider router={router} />
        </div>
    )
}

export default App