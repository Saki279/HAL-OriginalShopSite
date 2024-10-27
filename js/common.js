



$(document).ready(function() {
  //==================================
  // #Slideshow with jQuery
  //==================================

  // id generator
  function idGenerator() {
    $(".slides__img").each(function(index, el) {
      $(this).attr("id", "slide_" + index);
    });
    $(".dots__single").each(function(index, el) {
      $(this).attr("id", "dot_" + index);
    });
  }

  // id extractor
  // at the end it focuses the current dot
  function dotsFocus() {
    $("[id^='dot_']").removeClass("dots__current");
    var id = $(".slides__img:eq(1)").attr("id");
    var n = Number(id.substr(-1));
    if (n === 0) {
      n = $(".slides__img").length;
    }
    $("#dot_" + (n - 1)).addClass("dots__current");
  }

  // slide up caption
  function captionSlideUp(d, e) {
    var $cap1 = $(".slide__caption:eq(1)");
    $cap1.animate(
      {
        bottom: "10%",
        opacity: 1
      },
      {
        duration: d,
        easing: e,
        complete: dotsFocus()
      }
    );
  }

  // slide down caption
  function captionSlideDown(d, e) {
    $(".slide__caption").animate(
      {
        bottom: "5%",
        opacity: 0
      },
      {
        duration: d,
        easing: e
      }
    );
  }

  // slide movement
  function slideMove(t) {
    if (t === "prev") {
      return $(".slides__img")
        .first()
        .before($(".slides__img").last());
    }
    if (t === "next") {
      return $(".slides__img")
        .last()
        .after($(".slides__img").first());
    }
  }

  // slide images
  function slideIt(l, d, e, t) {
    var $slides = $(".slides");
    captionSlideDown(150, "linear");
    $slides.animate(
      {
        left: l
      },
      {
        duration: d,
        easing: e,
        complete: function() {
          $slides.css("left", "-100%");
          slideMove(t);
          captionSlideUp(1700, "swing");
        }
      }
    );
  }

  // slide with dots
  function dotsControl(d, e) {
    $(".dots__single").click(function() {
      var currentId = parseInt(
        $(".dots__current")
          .attr("id")
          .substr(-1)
      );
      var clickId = parseInt(
        $(this)
          .attr("id")
          .substr(-1)
      );
      var max = $(".dots__single").length - 1;
      var half = Math.floor($(".dots__single").length / 2);
      var diff;
      if (currentId > clickId) {
        diff = currentId - clickId;
        if (diff === max) {
          diff = 1;
          l = "-200%";
          t = "next";
        } else if (diff <= half) {
          l = "0%";
          t = "prev";
        } else {
          diff--;
          l = "-200%";
          t = "next";
        }
      }
      if (currentId < clickId) {
        diff = clickId - currentId;
        if (diff === max) {
          diff = 1;
          l = "0%";
          t = "prev";
        } else if (diff <= half) {
          l = "-200%";
          t = "next";
        } else {
          diff--;
          l = "0%";
          t = "prev";
        }
      }
      for (var i = 0; i < diff; i++) {
        slideIt(l, d, e, t);
      }
    });
  }

  // slideshow
  function slideShow(d, e) {
    $("#prev").click(function() {
      var t = $(this).attr("id");
      slideIt("0%", d, e, t);
    });
    $("#next").click(function() {
      var t = $(this).attr("id");
      slideIt("-200%", d, e, t);
    });
    dotsControl(d, e);
  }

  idGenerator();
  captionSlideUp(1700, "swing");
  slideShow(800, "swing");
});







// ページトップリンク
//スクロールした際の動きを関数でまとめる
function PageTopAnime() {
  var scroll = $(window).scrollTop();
  if (scroll >= 100){//上から100pxスクロールしたら
    $('#page-top').removeClass('DownMove');//#page-topについているDownMoveというクラス名を除く
    $('#page-top').addClass('UpMove');//#page-topについているUpMoveというクラス名を付与
  }else{
    if($('#page-top').hasClass('UpMove')){//すでに#page-topにUpMoveというクラス名がついていたら
      $('#page-top').removeClass('UpMove');//UpMoveというクラス名を除き
      $('#page-top').addClass('DownMove');//DownMoveというクラス名を#page-topに付与
    }
  }
}

// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function () {
  PageTopAnime();/* スクロールした際の動きの関数を呼ぶ*/
});

// ページが読み込まれたらすぐに動かしたい場合の記述
$(window).on('load', function () {
  PageTopAnime();/* スクロールした際の動きの関数を呼ぶ*/
});


// #page-topをクリックした際の設定
$('#page-top').click(function () {
  var scroll = $(window).scrollTop(); //スクロール値を取得
  if(scroll > 0){
    $(this).addClass('floatAnime');//クリックしたらfloatAnimeというクラス名が付与
        $('body,html').animate({
            scrollTop: 0
        }, 2000,function(){//スクロールの速さ。数字が大きくなるほど遅くなる
            $('#page-top').removeClass('floatAnime');//上までスクロールしたらfloatAnimeというクラス名を除く
        }); 
  }
    return false;//リンク自体の無効化
});



$(function () {
  var
    $slider7 = $('#js-slider-7'),
    $nowcnt = $('.slick_count .num .nowcnt'),
    $allcnt = $('.slick_count .num .allcnt');
 
  /*--- 枚数カウント設定 -----------------------*/
  // スライダーが初期化された時、再初期化、切り替え後に発火
  $slider7.on('init reInit afterChange', function (event, slick) {
    $nowcnt.text(slick.currentSlide + 1);
    $allcnt.text(slick.slideCount);
  })
  // スライド切り替え前に発火
  $slider7.on("beforeChange", function (event, slick, currentSlide, nextSlide) {
    $nowcnt.text(nextSlide + 1);
  });
 
  $slider7.slick({
    arrows: true, // 前・次のボタンを表示する
    dots: false, // ドットナビゲーションを表示しない
    fade: true, // スライド切り替えをフェード
    autoplay: false, //自動再生させない
    slidesToShow: 1, // 表示させるスライド数
  });
 
});


$('#page-link a[href*="#"]').click(function () {//全てのページ内リンクに適用させたい場合はa[href*="#"]のみでもOK
  var elmHash = $(this).attr('href'); //ページ内リンクのHTMLタグhrefから、リンクされているエリアidの値を取得
  var pos = $(elmHash).offset().top;  //idの上部の距離を取得
  $('body,html').animate({scrollTop: pos}, 500); //取得した位置にスクロール。500の数値が大きくなるほどゆっくりスクロール
  return false;
});


// フェードイン
$(function() {
  $(window).on('scroll resize', function() {
    var setHeight = 100;
    var wHeight = $(window).height();
    var scrollTop = $(window).scrollTop();
    $('.product-card').each(function() {
      var targetPosition = $(this).offset().top;
      if(scrollTop > targetPosition - wHeight + setHeight) {
        $(this).addClass('show');
      }
    })
  });
});


//上部画像の設定
$('.gallery').slick({
  infinite: true, //スライドをループさせるかどうか。初期値はtrue。
  fade: true, //フェードの有効化
  arrows: true,//左右の矢印あり
  prevArrow: '<div class="slick-prev"></div>',//矢印部分PreviewのHTMLを変更
  nextArrow: '<div class="slick-next"></div>',//矢印部分NextのHTMLを変更
});

//選択画像の設定
$('.choice-btn').slick({
  infinite: true, //スライドをループさせるかどうか。初期値はtrue。
  slidesToShow: 3, //表示させるスライドの数
  focusOnSelect: true, //フォーカスの有効化
  asNavFor: '.gallery', //連動させるスライドショーのクラス名
});
  
//下の選択画像をスライドさせずに連動して変更させる設定。
$('.gallery').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
  var index = nextSlide; //次のスライド番号
  //サムネイルのslick-currentを削除し次のスライド要素にslick-currentを追加
  $(".choice-btn .slick-slide").removeClass("slick-current").eq(index).addClass("slick-current");
});