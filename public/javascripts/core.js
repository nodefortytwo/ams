$(document).ready(function() {
    //editableInit();
    //$('body').prepend('<div id="edit-window"><h1>Edit</h1><form></form></div>');
});
function editableInit() {
    var editableItems = $('[data-editable="true"]');
    editableItems.each(function() {
        var editLink = $('<span class="edit">edit</span>').click(function() {
            edit($(this).parent());
            return false;
        });
        $(this).prepend(editLink);
        $(this).mouseenter(function() {
            $(this).children('.edit').show();
        });
        $(this).hover(function() {
            $(this).children('.edit').show();
        });
        $(this).mouseleave(function() {
            $(this).children('.edit').hide();
        });
    });
}

function edit(item) {
    var id = $(item).attr('data-editable-id');
    var attrs = $(item).attr('data-editable-attr').split(',');
    if($(item).attr('data-editable-types')) {
        var types = $(item).attr('data-editable-types').split(',');
    }
    var html = '';
    for(var i = 0; i < attrs.length; i++) {
        html += '<label for="' + attrs[i] + '">' + attrs[i] + '</label>';
        html += '<input type="text" name="' + attrs[i] + '" id="' + attrs[i] + '"/>';
    }
    var submit = $('<input type="submit" value="Submit" class="submit"/>').click(function() {
        $(this).parent('form').children('input').each(function(){
            if($(this).attr('type') != 'submit'){
                $(item).attr($(this).attr('name'), $(this).val());
            }
        })
        $('#edit-window').slideUp();
        return false;
    });
    $('#edit-window form').html(html);
    $('#edit-window form').append(submit);
    $('#edit-window').slideDown();
}