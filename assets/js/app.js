var navbar, subbar;
$(function($) {
    navbar = $('.navbar-wrapper');
    subbar = $('.sub-nav');
    $(document).ready(function() {
        navbar.sticky({topSpacing: 0});
    });

    $(document).scroll(function() {
        refreshPies();
    });
    refreshPies();

    var sections = [], current_id, scrolled_id;
    $('a',subbar).each(function() {
        if (this.hash) {
            sections.push($(this.hash));
        }
    }).click(function(e) {
        if (this.hash) {
            e.preventDefault();
            activateLink($(this));
            return goTo(this.hash);
        }
    });
    
    $(window).scroll(function() {
        var scrollTop = $(this).scrollTop() + navbar.height() + subbar.height();
        for (var i in sections) {
            if (scrollTop > sections[i].offset().top) {
                scrolled_id = sections[i].attr('id');
            }
        }
        if (scrolled_id !== current_id) {
            current_id = scrolled_id;
            activateLink($('a[href="#' + current_id + '"]'));
        }
    });

    if ($('section#contact').length > 0) {
        var className = 'scrolloff', $map = $('#map'), $overlay = $('.map-area');

        $overlay.on('mouseup', function () {
            $map.addClass(className);
        });

        $overlay.on('mousedown', function () {
            $map.removeClass(className);
        });

        $map.on('mouseleave', function () {
            $map.addClass(className);
        });

        $map.addClass(className);
    }
});

function activateLink(link) {
    $('.sub-nav li.menuItem').removeClass('active');
    link.parent('li.menuItem').addClass('active');
}

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
            scrollTop: target.offset().top - navbar.height()
        }, 1000);
        return false;
    }
    return true;
}
