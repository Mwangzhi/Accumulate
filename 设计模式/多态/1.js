/* 
多态的思想实际上是把“做什么”和“谁去做”分离开来
*/
//--------------------------------传统做法
var googleMap = {
    show: function () {
        console.log('开始渲染谷歌地图');
    }
};

var baiduMap = {
    show: function () {
        console.log('开始渲染百度地图');
    }
};

var renderMap = function (type) {
    if (type === 'google') {
        googleMap.show();
    } else if (type === 'baidu') {
        baiduMap.show();
    }
};
renderMap('google');    // 输出：开始渲染谷歌地图  renderMap( 'baidu' );     // 输出：开始渲染百度地图 



//--------------------------------运用多态思想做法
var googleMap = {
    show: function () {
        console.log('开始渲染谷歌地图');
    }
};

var baiduMap = {
    show: function () {
        console.log('开始渲染百度地图');
    }
};

var sosoMap = {
    show: function () {
        console.log('开始渲染搜搜地图');
    }
};
var renderMap = function (map) {
    if (map.show instanceof Function) {
        map.show();
    }
};

renderMap(sosoMap);     // 输出：开始渲染搜搜地图  
在




