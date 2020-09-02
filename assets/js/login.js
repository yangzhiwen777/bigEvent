$(function() {
    //点击去注册按钮
    $("#link_reg").on("click", () => {
        $(".login-box").hide();
        $(".reg-box").show();
    });

    //点击去登录
    $("#link_login").on("click", () => {
        $(".login-box").show();
        $(".reg-box").hide();
    });

    //获取leiui表单元素
    var form = layui.form

    //获取弹出层对象
    var layer = layui.layer;
    form.verify({
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]

        //校验密码
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],

        //校验再次确认密码
        repwd: function(value) {
            var pwd = $('.reg-box [name=password]').val()
            if (value !== pwd) {
                return '两次输入密码不一致'
            }
        }


    })

    //注册表单 添加提交监听事件
    $('#form-reg').on('submit', function(e) {
        e.preventDefault()
            //发送ajax请求
        var data = {
            username: $('#form-reg [name=username]').val(),
            password: $('#form-reg [name=password]').val()
        }
        $.post('/api/reguser', data, function(res) {
            console.log(res);
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg('注册成功，请登录');
            $('#link_login').click()
        })
    })

    //登录表单 添加提交监听事件
    $('#form-login').on('submit', function(e) {
        //阻止表单默认行为
        e.preventDefault()

        //发起登录请求
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success(res) {
                if (res.status !== 0) {
                    // 显示错误提示信息
                    return layer.msg(res.message);
                }
                // console.log(res);
                // 显示成功提示信息
                layer.msg(res.message);
                //将token值保存到本地
                localStorage.setItem('token', res.token)
                    //自动页面跳转
                location.href = '/code/index.html'
            }
        })
    })
});