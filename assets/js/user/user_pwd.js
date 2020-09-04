$(function() {
    const form = layui.form
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        newPwd: function(value) {
            if (value === $('#oldMima').val()) {
                return '两次输入的密码不能一致'
            }
        },
        renewPwd: function(value) {
            if (value !== $('#newPwd').val()) {
                return '两次输入的新密码不一致'
            }
        }
    })



    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success(res) {
                console.log(res);
            }
        })
    })

})