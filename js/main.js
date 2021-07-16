!function() {
    function e(e) {
        e = e || window.event,
        e.preventDefault && e.preventDefault(),
        e.returnValue = !1
    }
    function n(n) {
        for (var o = w.length; o--; )
            if (n.keyCode === w[o])
                return void e(n)
    }
    function o(n) {
        e(n)
    }
    function t(e) {}
    function i() {
        window.onmousewheel = document.onmousewheel = t,
        document.onkeydown = n,
        document.body.ontouchmove = o
    }
    function l() {
        window.onmousewheel = document.onmousewheel = document.onkeydown = document.body.ontouchmove = null
    }
    function s() {
        return window.pageYOffset || p.scrollTop
    }
    function r() {
        if (a = s(),
        u && !f) {
            if (0 > a)
                return !1;
            window.scrollTo(0, 0)
        }
        return classie.has(v, "notrans") ? (classie.remove(v, "notrans"),
        !1) : m ? !1 : void (0 >= a && c ? d(0) : a > 0 && !c && d(1))
    }
    function d(e) {
        m = !0,
        e ? classie.add(v, "modify") : (u = !0,
        i(),
        classie.remove(v, "modify")),
        setTimeout(function() {
            c = !c,
            m = !1,
            e && (u = !1,
            l())
        }, 600)
    }
    $(window).load(function() {
        $("#preloader").delay(1e3).fadeOut("slow")
    });
    var a, c, u, m, f = function() {
        var e, n = -1, o = window.navigator.userAgent, t = o.indexOf("MSIE "), i = o.indexOf("Trident/");
        if (t > 0)
            n = parseInt(o.substring(t + 5, o.indexOf(".", t)), 10);
        else if (i > 0) {
            var l = o.indexOf("rv:");
            n = parseInt(o.substring(l + 3, o.indexOf(".", l)), 10)
        }
        return n > -1 ? n : e
    }(), w = [32, 37, 38, 39, 40], p = window.document.documentElement, v = document.getElementById("cross-portfolio"), y = v.querySelector("button.trigger"), g = s();
    u = 0 === g,
    i(),
    g && (c = !0,
    classie.add(v, "notrans"),
    classie.add(v, "modify")),
    window.addEventListener("scroll", r),
    y.addEventListener("click", function() {
        d("reveal")
    }),
    $(".element").typed({
        strings: ["一名程序员", "一名PHP全栈开发"],
        typeSpeed: 1,
        backSpeed: 1,
        backDelay: 1e3,
        loop: !0
    }),
    $(".sub-title").typed({
        strings: ["程序员", "PHP全栈开发"],
        typeSpeed: 1,
        backSpeed: 1,
        backDelay: 1400,
        loop: !0
    }),
    $("#nav-icon").click(function() {
        $(this).toggleClass("open"),
        $("#menu-overlay").toggleClass("menu-show")
    }),
    $(".smooth-scroll").click(function() {
        $("#nav-icon").removeClass("open"),
        $("#menu-overlay").removeClass("menu-show")
    });
    new Waypoint({
        element: document.getElementById("count"),
        handler: function() {
            $(".count").countTo()
        },
        offset: 500
    });
    smoothScroll.init({
        speed: 1e3
    }),
    $(".carousel-inner").owlCarousel({
        navigation: !1,
        slideSpeed: 300,
        paginationSpeed: 400,
        singleItem: !0,
        autoPlay: 3e3
    }),
    window.sr = ScrollReveal().reveal(".animated"),
    /*$(".gmap").mobileGmap({
        markers: [{
            position: "center",
            info: "121 S Pinckney St",
            showInfo: !0
        }]
    })*/
    $(".whide").hide();
    //留言
    $(".post-msg").on("click touchstart",function(){
        var name = $(".ly-name").val();
        var contact = $(".ly-contact").val();
        var msg = $(".ly-msg").val();
        var pattern = new RegExp("[~'!@#$%^&*()-+_=:]");
        //验证不为空
        if (!name) {
            $(".ly-name").css("border-bottom","2px solid #f00");
            $(".ly-name").attr("placeholder","还没留下您的姓名呢");
        }
        if (!contact) {
            $(".ly-contact").css("border-bottom","2px solid #f00");
            $(".ly-contact").attr("placeholder","还没留下您的联系方式呢");
        }
        if (!msg) {
            $(".ly-msg").css("border-bottom","2px solid #f00");
            $(".ly-msg").attr("placeholder","还没对我说点什么呢");
        }
        if (name && contact && msg) {
            if (pattern.test(name)){ //过滤非法字符
                alert("您的姓名中含有非法字符哦~");
                $(".ly-name").val('');
                $(".ly-name").focus(); 
                return false; 
            } else if (pattern.test(contact)) { //过滤非法字符
                alert("您的联系方式中含有非法字符哦~");
                $(".ly-contact").val('');
                $(".ly-contact").focus(); 
                return false; 
            } else if (pattern.test(msg)) { //过滤非法字符
                alert("您的留言内容中含有非法字符哦~");
                $(".ly-msg").val('');
                $(".ly-msg").focus(); 
                return false; 
            } else {
                $.ajax({
                    url:"msg.php",
                    type:'POST',
                    data:{"name":name, "contact":contact, "msg":msg},
                    success: function(res){
                        if (res==200) {
                            $(".form-control").val('');
                            var html = $(".post-msg").html();
                            $(".post-msg").text('留言发送成功');
                            setTimeout(function(){$(".post-msg").html(html);},3000);
                        } else if (res==500) {
                            var html = $(".post-msg").html();
                            $(".post-msg").text('休息几秒钟再提交吧！');
                            setTimeout(function(){$(".post-msg").html(html);},3000);
                        }
                    }
                })
            }
        }
    })
    //获得焦点去除警告框
    $(".form-control").focus(function(){
        $(this).css("border-bottom","none");
    })

    //移动端查看简历/项目展示不跳转
    if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) {
        $(".cross-top").hide(); //隐藏博客
        $(".content").css("width","96%");
        $(".bg-img img").attr("src","img/m-bj.jpg");
        //移动端查看简历，pc端下载简历
        $(".down-jl").html("<i class='fa fa-file-text'></i>&nbsp查看简历");
        $(".down-jl").addClass("wxlook");
        $(".down-jl").attr("href","");
        $(".down-jl").attr("download","");
        //$("figcaption a").css("display","none");
    }

    //微信浏览查看简历/项目展示不跳转
    var ua = window.navigator.userAgent.toLowerCase(); 
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){ 
        $(".down-jl").html("<i class='fa fa-file-text'></i>&nbsp查看简历");
        $(".down-jl").addClass("wxlook");
        $("figcaption a").css("display","none");
    }
    $(".wxlook").on("touchstart", function(){
        window.location.href = "http://wansichao.com/down-jl.html";
    })
}();
