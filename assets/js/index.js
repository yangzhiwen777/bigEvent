$(function() {
    getUserInfo()
        // var
    var layer = layui.layer
        //点击退出
    $('#btnLogout').on('click', function() {
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
            //do something
            localStorage.removeItem('token')
                //跳转至登录页
            location.href = '/code/login.html'
            layer.close(index);
        });
    })
})


//获取用户信息
function getUserInfo() {
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success(res) {
            // console.log(res);
            if (res.status !== 0) {
                // return console.log('获取用户信息失败');
                return layer.msg(res.message)
            }
            //渲染头像信息
            renderAvatar(res.data)
        }
    })
}

//渲染用户头像
function renderAvatar(user) {
    //获取 用户名
    var uname = user.nickname || user.username
        //获取用户名的第一个字符串
    var first = uname[0].toUpperCase()

    $('.userinfo #welcome').html(`欢迎  ${uname}`)
        //判断显示头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.text-avatar').html(first).show()
        $('.layui-nav-img').hide()
    }
}