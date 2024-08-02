import {RouteProps} from 'react-router-dom'
import Index from '../page/index'
import { Editor } from '../page/edit'

const router : RouteProps[] = [
    {
        path: "/",
        element: <Index/>,
        children:[
        ]
    },{
        path: "/edit/:path",
        element:<Editor/>
    }
]

export default router