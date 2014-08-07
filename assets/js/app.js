$(function($) {
    $(document).ready(function() {
        var navbar = $('.navbar-wrapper'), parts = new Array();
        $('ul.nav a[href^="#"]', navbar).each(function() {
            parts.push(this.hash.replace('#', ''));
        });
        navbar.stickUp({
            parts: parts,
            itemClass: 'menuItem',
            itemHover: 'active',
            topMargin: 'auto'
        });
        goTo('body');
    });
});

$(function() {
    $(document).scroll(function() {
        refreshPies();
    });
    refreshPies();

    $('a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            if(this.hash==="#wrapper"){
                window.location.href = '/';
            }
            return goTo(this.hash);
        }
    });
});

var index = 0;
function refreshPies() {
    var top = $('#skill').height() - $(window).scrollTop();
    if (top < -300) {
        if (index === 0) {
            $('.chart').easyPieChart({
                barColor: '#D21F42',
                easing: 'easeOutBounce',
                onStep: function(from, to, percent) {
                    $(this.el).find('.percent').text(Math.round(percent));
                }
            });
        }
        index++;
    }
}

function goTo(hash) {
    var target = $(hash);
    target = target.length ? target : $('[name=' + hash.slice(1) + ']');
    if (target.length) {
        $('html,body').animate({
            scrollTop: target.offset().top - 60
        }, 1000);
        return false;
    }
    return true;
}
