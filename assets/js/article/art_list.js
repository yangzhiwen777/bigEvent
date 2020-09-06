$(function() {
    //定义请求参数  p
    const form = layui.form
    const layer = layui.layer
    const laypage = layui.laypage;
    var p = {
        pagenum: '1', //页码值
        pagesize: '2', //每页显示多少条数据
        cate_id: '', //文章分类的 Id
        state: '' //文章的状态，可选值有：已发布、草稿
    }

    //渲染文章表格
    initTable()

    //筛选文章
    initCate()

    //渲染文章表格
    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: p,
            success(res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg('获取文章列表失败')
                }
                layer.msg('获取文章列表成功')
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
                    //渲染分页
                renderPage(res.total)
            }
        })
    }

    // 定义美化时间的过滤器
    template.defaults.imports.dataFormat = function(date) {
        const dt = new Date(date)

        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())

        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())

        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }

    // 定义补零的函数
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }



    // 渲染筛选文章分类的方法
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取分类数据失败！')
                }
                // 调用模板引擎渲染分类的可选项
                var htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)
                    // 通过 layui 重新渲染表单区域的UI结构
                form.render()
            }
        })
    }

    //    为筛选表单  绑定 事件
    $('#form-search').on('submit', function(e) {
        e.preventDefault()
            //获取表单项中的值
        var cate_id = $('[name=cate_id]').val()
        var state = $('[name=state]').val()
        p.cate_id = cate_id
        p.state = state

        initTable()
    })

    //渲染分页
    function renderPage(total) {
        console.log(total);
        laypage.render({
            elem: 'pageBox', //渲染的分页盒子
            count: total, //数据总数，从服务端得到，
            limit: p.pagesize, //每页显示的条数
            curr: p.pagenum, // 当前页码值
            layout: ['count', 'limit',
                'prev', 'page', 'next', 'skip'
            ],
            limits: [1, 2, 3, 5, 10],
            jump: function(obj, first) {
                // first 分页跳转的触发方式
                // true  是 laypage.render ()  触发
                // undefined  是手动触发方式 
                p.pagenum = obj.curr
                p.pagesize = obj.limit
                if (!first) {
                    initTable()
                }
            }

        })
    }

    //删除功能
    $('tbody').on('click', '.btn-delete', function() {
        // console.log('ok');
        const id = $(this).attr('data-id')
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
            //do something

            $.ajax({
                type: 'GET',
                url: '/my/article/delete/' + id,
                success(res) {
                    if (res.status !== 0) {
                        return layer.msg('删除失败')
                    }
                    layer.msg('删除成功')
                    initTable()
                }
            })
            layer.close(index);
        });

    })
})