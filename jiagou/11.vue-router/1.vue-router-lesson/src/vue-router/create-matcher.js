import createRouteMap from './create-route-map'
export default function createMatcher(routes){
    // 将数据扁平化处理
    // pathList 表示所有的路径的集合 [/ /about /about/a /about/b]
    // pathMap {/:home,/about:about,/about/a:aboutA}
    let {pathList,pathMap} = createRouteMap(routes);
    function addRoute(routes){
        createRouteMap(routes,pathList,pathMap);
    }   

    function match(location){ // 匹配对应记录的

    }
    return {
        addRoute,
        match
    }
}