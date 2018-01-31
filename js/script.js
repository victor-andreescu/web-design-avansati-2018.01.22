$('.jsAddForm').on("submit", function (event) {
    event.preventDefault();

    var newValue = $(this).find('.jsAddField').val();

    if (newValue) {

        $(this).find('p').remove();

        if ($('.jsShoppingList li').length > 0) {
            var lastId = $('.jsShoppingList li:last-child').data('id');
        } else {
            var lastId = 0;
        }

        var newId = lastId + 1;
        var idValue = "item-" + newId;

        var newListItem = '<li data-id="' + newId + '"><input type="checkbox" id="' + idValue + '"><label for="' + idValue + '">' + newValue + '<a href="" class="edit-button jsEditButton"><i class="fa fa-pencil" aria-hidden="true"></i></a><a href="" class="delete-button jsDeleteButton"><i class="fa fa-trash" aria-hidden="true"></i></a></label></li>';

        // var newListItem = $('<li></li>')
        //                     .append(
        //                         $('<input>')
        //                             .attr('type', 'checkbox')
        //                             .attr('id', idValue)
        //                     )
        //                     .append(
        //                         $('<label></label>')
        //                             .attr('for', idValue)
        //                             .html(newValue)
        //                     );

        $('.jsShoppingList').append(newListItem);


        $(this).find('.jsAddField').val('');

    } else {
        if ( $(this).find('p').length == 0 ) {
            $('.jsAddItem').after('<p>Trebuie sa introduceti o valoare!</p>');
        }
    }


});


$('.jsShoppingList').on('click', '.jsDeleteButton', function (event) {
    event.preventDefault();

    console.log($(this).closest('li').remove());
});