$(document).ready(function() {
    $('.edit').click(function() {
        $.ajax('config').done(function(res) {
            edit(JSON.parse(res));
        });
        return false;
    });
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

function edit(data) {
    var html = '';
    for(section in data) {
        html += '<div id="' + section + '" class="section">';
        html += '<h2>' + section + '</h2>';
        for(field in data[section]) {
            var id = section + '.' + field;
            html += '<div id="' + id + '" class="field">';
            html += '<label for="' + id + '">' + field + '</label>';
            html += '<input type="text" name="' + id + '" id="' + id + '" value="' + data[section][field] + '"/>';
            html += '</div>';
        }
        html += '</div>';
    }
    var submit = $('<a href="#" class="submit">save</a>').click(function(){
        save(data);
        return false;
        });
    $('#edit-window form').html(html);
    $('#edit-window form').append(submit);
    $('#edit-window').slideDown();
}

function save(data) {
    
    $('#edit-window form input').each(function() {
        var id = $(this).attr('id').split('.');
        data[id[0]][id[1]] = $(this).val();
    });
    
    $.ajax({
      type: 'POST',
      url: 'config/save',
      data: data,
      success: function(){
          alert('dun');
      },
      dataType: 'JSON'
    });
    
    console.log(data);
}