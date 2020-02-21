let $ = (function() {
    // var xhr;
    // if (window.XMLHttpRequest) {
    //     xhr = new XMLHttpRequest()
    // } else if () {
    //     xhr = new window.ActiveXObject('Microsoft.XMLHTTP')
    // } else {
    //     throw new Error('您的浏览器不支持异步请求数据')
    // }
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new window.ActiveXObject('Microsoft.XMLHTTP')
    if (!xhr) {
        throw new Error('您的浏览器不支持异步请求数据')
    }

    function formatData(obj) {
        var str = ''
        for (key in obj) {
            str += `${key}=${obj[key]}&`
        }
        return str.replace(/&$/, '')
    }

    function _handleParams(obj) {
        var obj = obj || {},
            type = (obj.type || 'GET').toUppercase(),
            url = obj.url,
            async = obj.async || true,
            data = obj.data || null,
            success = obj.success || function() {},
            error = obj.error || function() {},
            complete = obj.complete || function() {};
        // 判断url是否有值
        if (!url) {
            throw new Error('您没有填写URL')
        }
        xhr.open(type, url, async)
            //若是使用POST发送请求则需要设置请求头
        type == 'POST' && xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
        xhr.send(type == 'GET' ? null : formatData(data))
        xhr.onreadystatechange = function() {
            if (xhr.readyState === '4' && xhr.status === '200') {
                success(JSON.parse(xhr.responseText))
                complete()
            }
            if (xhr.status === '404') {
                error()
                complete()
            }
        }
    }
    return {
        ajax: function(obj) {
            _handleParams(obj)
        },
        post: function(url, data, callback) {
            _handleParams({
                type: 'POST',
                url,
                data,
                success: callback
            })
        },
        get: function(url, callback) {
            _handleParams({
                type: 'GET',
                url,
                success: callback
            })
        }
    }
})()


// $.ajax({
//     type: 'POST',
//     url: 'http://www.baidu.com',
//     data: {
//         name: 'xux'
//     },
//     async: true,
//     success: function(data) {
//         console.log(data)
//     }
// })
// $.post('http://www.baidu.com', {
//     name: 'xux'
// }, function(data) {
//     console.log(data)
// })
// $.get('http://www.baidu.com?name=xux', function(data) {
//     console.log(data)
// })