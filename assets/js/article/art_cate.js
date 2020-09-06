$(function() {
    const layer = layui.layer
    const form = layui.form
    var index = null

    //获取文章分类列表
    getArticleList()

    //获取文章分类列表
    function getArticleList() {
        $.ajax({
            type: 'GET',
            url: '/my/article/cates',
            success(res) {
                // console.log(res);
                //渲染文章列表
                var htmlStr = template('tpl', res)
                $('tbody').html(htmlStr)
            }
        })
    }

    //添加分类
    $('#btnAddCate').on('click', function() {
        index = layer.open({
            type: 1,
            area: ['500px'],
            title: '添加类别',
            content: $('#tanchuceng').html()
        });
    })

    //提交弹出层表单 
    //不存在的元素   采用事件委托的方式
    $('body').on('submit', '.cate_add_form', function(e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success(res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg('添加文章分类列表失败')
                }
                //获取文章分类列表
                getArticleList()
                    //关闭弹出层
                layer.close(index);
            }
        })
    })

    //编辑按钮  事件委托
    $('tbody').on('click', '#edit', function() {
        index = layer.open({
            type: 1,
            area: ['500px'],
            title: '修改文章类别',
            content: $('#edit_tanchuceng').html()
        });

        var Id = $(this).attr('data-id')
        console.log(Id);

        //根据id  查找信息
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + Id,
            success(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('获取信息失败')
                }
                //渲染  表单
                form.val('form-edit', res.data)
                layer.msg('获取信息成功')
            }
        })
    })

    //点击删除  删除
    $('tbody').on('click', '#del', function() {
        var id = $(this).attr('data-id')
        console.log(id);
    })
})