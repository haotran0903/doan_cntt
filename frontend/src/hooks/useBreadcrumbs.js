import { useLocation } from 'react-router-dom'
import routeConfig from './routesBreadcrumbs.json'

export { routeConfig }

const useBreadcrumbs = (routeConfig) => {
    var paths = []
    const route = useLocation().pathname
    const name = routeConfig
    var position = 1;
    while (position !== -1) {
        paths.push(route.slice(0, position))
        position = route.indexOf('/', position + 1)
        if (position === -1 && route !== "/")
            paths.push(route)
    }
    paths = paths.map(route => {
        const breadcrumb = name.find(breadcrumb => breadcrumb.path === route)
        if (breadcrumb !== undefined)
            return breadcrumb
        else {
            const routeName = route.slice(route.lastIndexOf('/') + 1)
            return {
                path: route,
                name: routeName
            }
        }
    })
    return paths
}

export default useBreadcrumbs