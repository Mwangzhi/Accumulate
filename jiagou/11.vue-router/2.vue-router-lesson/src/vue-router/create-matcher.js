import createRouteMap from './create-route-map';
import {createRoute} from './history/base'
export default function createMatcher(routes){
    // 将数据扁平化处理
    // pathList 表示所有的路径的集合 [/ /about /about/a /about/b]
    // pathMap {/:home:about,/about/a:aboutA}
    let {pathList,pathMap} = createRouteMap(routes);

    function addRoute(routes){
        createRouteMap(routes,pathList,pathMap);
    }   
    function match(location){ // 匹配对应记录的
        // todo...
        let record = pathMap[location];
        return createRoute(record,{
            path:location
        })
    }
    return {
        addRoute,
        match
    }
}