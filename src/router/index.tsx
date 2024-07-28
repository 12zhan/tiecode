import {RouteProps} from 'react-router-dom'
import Index from '../page/index'

const router : RouteProps[] = [
    {
        path: "/",
        element: <Index/>,
    }
]

export default router