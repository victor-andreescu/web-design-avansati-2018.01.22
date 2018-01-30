$('.jsAddForm').on("submit", function(event){
    event.preventDefault();
    
    var newValue = $(this).find('.jsAddField').val();
    var idValue = "item-" + ( $('.jsShoppingList').find('li').length + 1 );

    $('.jsShoppingList').append('<li><input type="checkbox" id="'+idValue+'"><label for="'+idValue+'">' + newValue + '</label></li>');

    $(this).find('.jsAddField').val('');

});