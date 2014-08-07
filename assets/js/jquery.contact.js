(function($) {
    "use strict";
    jQuery(document).ready(function() {
        var form = $('#cform'),
                message = $('#message');
        form.submit(function() {
            $.post($(this).attr('action'), form.serialize(), function(data) {
                if (data.message) {
                    var messageBlock = $('<div></div>').hide().html(data.message).appendTo(message);
                    if (data.error) {
                        messageBlock.addClass('error_message');
                    } else {
                        messageBlock.addClass('success_message');
                        form.remove();
                    }
                    messageBlock.slideDown('slow');
                }
            }, 'json');
            return false;
        });
    });
}(jQuery));