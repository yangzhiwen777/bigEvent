$.ajaxPrefilter(function(options) {
    // console.log(options);

    //拼接根路径
    options.url = 'http://ajax.frontend.itheima.net' + options.url
        // http: //ajax.frontend.itheima.net'


    //统一为有权限的接口设置请求头
    if (options.url.indexOf('/my') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    //设置访问权限
    options.complete = function(res) {
        // console.log(res);
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {

            //清空本地token信息
            localStorage.removeItem('token')

            //跳转至登录页
            location.href = '/code/login.html'

        }
    }

})