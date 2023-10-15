import Home from "../pages/home/Home";
import User from "../pages/user";
import Catalogo from "../pages/catalogo/Catalogo";
import Creador from "../pages/creador/creador";
import LayoutHeaders from "../layouts/layoutHeaders";


const routes = [
    {
        path:"/",
        component:Home,
        layout:LayoutHeaders,
        exact:true
    },
    {
        path:"/perfil/:username",
        component:User,
        layout:LayoutHeaders,
        exact:true
    },
    {
        path:"/catalogo",
        component:Catalogo,
        layout:LayoutHeaders,
        exact:true
    },
    {
        path:"/creador",
        component:Creador,
        layout:LayoutHeaders,
        exact:true
    }
]

export default routes;