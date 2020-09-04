$(function() {
    //导入表单对象

    const layer = layui.layer
    const form = layui.form

    //表单验证规则
    form.verify({
        nickname: [
            /^[\S]{1,6}$/, '昵称必须1到6位，且不能出现空格'
        ]
    })



    //获取用户的基本信息
    initUserInfo()


    //获取用户的基本信息
    function initUserInfo() {
        $.ajax({
            type: 'GET',
            url: '/my/userinfo',
            success(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // console.log(res);
                form.val('formUserInfo', res.data)
            }
        })
    }

    //重置表单数据
    $('#btnReset').on('click', function(e) {
        e.preventDefault()
            //获取用户的基本信息
        initUserInfo()
    })

    //更新个人信息
    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success(res) {
                if (res.status !== 0) {
                    return layer.msg('修改用户信息失败')
                }
                console.log(res);
                window.parent.getUserInfo()

                return layer.msg('修改用户信息成功')

                // console.log(res);
            }
        })
    })
})