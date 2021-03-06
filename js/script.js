// var pidTimeout;
var pidInterval;


// $(document).on('load', function() {
    $.ajax({
        url: '/list-index.php',
        method: 'get',
        dataType: 'json',
        beforeSend: function() {
            $('.loader').slideDown();
        },
        success: function(data) {
            $(data).each(function() {
                console.log(this.name);
                var $newListItem = $('<li data-id=""><input type="checkbox" id=""><label for=""><span class="jsItemValue"></span><a href="" class="edit-button jsEditButton"><i class="fa fa-pencil" aria-hidden="true"></i></a><a href="" class="delete-button jsDeleteButton"><i class="fa fa-trash" aria-hidden="true"></i></a></label></li>');

                $newListItem.attr('data-id', this.id);
                $newListItem.find('input[type="checkbox"]').attr('id', 'item-'+this.id);
                $newListItem.find('label').attr('for', 'item-'+this.id);
                $newListItem.find('.jsItemValue').text(this.name);

                $('.jsShoppingList').append($newListItem);
            });
            
            
            // console.log(data);
        },
        complete: function() {
            $('.loader').slideUp();
        }
    })
// });



// Event Listener pentru adaugare unui item in lista
// Il aplicam pe formularul din partea de jos listei
// cu declansare la evenimentul "submit"
$('.jsAddForm').on("submit", function (event) {
    // impiedicam comportamentul default al browserelor in
    // momentul in care se trimite un formular
    // (sa nu faca refresh / sa nu urmeze linkul de la action="")
    event.preventDefault();

    // preluam valoarea introdusa in singurul input al formularului
    // si o salvam intr-o variabila pentru a o accesa mai usor
    // cuvantul cheie this se refera la elementul care a declansat evenimentul
    var newValue = $(this).find('.jsAddField').val();

    // verificam daca a fost introdusa o valoare in campul respectiv
    // nu uitati stringul vid '' evalueaza ca false
    if (newValue) {

        // daca avem afisata eroarea de la o trimitere precedenta o stergem
        // ne bazam pe faptul ca este singurul paragraf din cazul formularului
        $(this).find('p').remove();

        // verificam daca exista itemi in lista pentru a ne asigura
        // ca ii vom numerota corect
        if ($('.jsShoppingList li').length > 0) {
            // daca avem itemi in lista il cautam pe ultimul
            // si preluam valoarea atributului data-id="" intr-o variabila noua.
            var lastId = $('.jsShoppingList li:last-child').data('id');
        } else {
            // daca nu exista itemi vor incepe numaratoarea de la 0
            var lastId = 0;
        }

        // calculam valoarea id-ului pentru item-ul pe care il vom introduce
        var newId = lastId + 1;

        // construim string-un necesar pentru atributele id="", for=""
        // folosite pentru a face legatura dintre label si checkbox
        // altfel nu se bifeaza elementele din lista
        var idValue = "item-" + newId;

        // construim string-ul ce contine codul pentru crearea item-ului
        // avem grija sa inlocuim valorile noi
        var $newListItem = $('<li data-id=""><input type="checkbox" id=""><label for=""><span class="jsItemValue"></span><a href="" class="edit-button jsEditButton"><i class="fa fa-pencil" aria-hidden="true"></i></a><a href="" class="delete-button jsDeleteButton"><i class="fa fa-trash" aria-hidden="true"></i></a></label></li>');
        
    //     var $newListItem = $(`
    // <li data-id="1">
    //     <input type="checkbox" id="item-1">
    //     <label for="item-1">
    //         <span class="jsItemValue">Cartofi</span>
    //         <a href="" class="edit-button jsEditButton">
    //             <i class="fa fa-pencil" aria-hidden="true"></i>
    //         </a>
    //         <a href="" class="delete-button jsDeleteButton">
    //             <i class="fa fa-trash" aria-hidden="true"></i>
    //         </a>
    //     </label>
    // </li>`)

        $newListItem.attr('data-id', newId);
        $newListItem.find('input[type="checkbox"]').attr('id', idValue);
        $newListItem.find('label').attr('for', idValue);
        $newListItem.find('.jsItemValue').text(newValue);

        // a doua modalitate de a crea elemente HTML cu ajutorul jQuery
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

        // adaugam elementul creat mai sus la sfarsitul listei de cumparaturi
        $('.jsShoppingList').append($newListItem);

        // golim campul formularului de adaugare
        $(this).find('.jsAddField').val('');

        $('.jsShoppingList').trigger('list-modified');

    } else {
        // daca nu am introdus o valoare in formularul de adaugare
        // verificam daca avem deja afisat mesajul de eroare
        // daca nu este fisat atunci afisam mesajul
        // ne bazam iar pe utilizarea unui singur paragraf in cadrul formularului
        // altfel am fi avut nevoie de clase.
        if ( $(this).find('p').length == 0 ) {
            // afisam mesajul de eroare
            $('.jsAddItem').after('<p>Trebuie sa introduceti o valoare!</p>');
        }
    }


});


// event listener pentru stergerea unui element din lista
// de data aceasta atasam event listener-ul pe lista de cumparaturi
// dar il declansam cu un descendent (butonul care contine cosul de gunoi)
// folosim aceasta forma a event listener-ului deoarece trebuie sa 
// putem activa event listener-ul si pentru itemii adaugati post incarcare
$('.jsShoppingList').on('click', '.jsDeleteButton', function (event) {
    // prevenim actiunea default a elementului <a> pe care am dat click
    event.preventDefault();

    // stergem elementul din lista cu ajutorul metodei jQuery remove()
    // cuvantul cheie this se refera la elementul care a declansat event listener-ul
    $(this).closest('li').remove();

    $('.jsShoppingList').trigger('list-modified');
});


if( $('.jsEditButton').length > 0 ) {

    var $selectedItem = null;
    // Event listener incepere editare
    $('.jsShoppingList').on('click', '.jsEditButton', function(event) {
        event.preventDefault();

        $('.jsEditOverlay').addClass('is-visible');

        $selectedItem = $(this).closest('li');

        var textToEdit =  $selectedItem.find('.jsItemValue').text();

        $('.jsEditField').val( textToEdit );
    });

    $('.jsEditForm').on('submit', function(event) {
        event.preventDefault();
        
        // var newValue = $('.jsEditField').val();
        var newValue = $(this).find('.jsEditField').val();

        $selectedItem.find('.jsItemValue').text(newValue);

        $(this).closest('.overlay').removeClass('is-visible');

    })
}


// Event listener inchidere modal
$('.jsOverlayClose').on('click', function(event) {
    event.preventDefault();
    $(this).closest('.overlay').removeClass('is-visible');

    if ( $(this).closest('.jsClearOverlay').length > 0 ) {
        // clearTimeout(pidTimeout);
        clearInterval(pidInterval);
        $('.jsClearList').prop('disabled', true);
    }
});


$(window).on('keyup', function(event) {
    if (event.which == 27 && $('.overlay.is-visible').length > 0) {
        $('.overlay.is-visible').find('.jsOverlayClose').trigger('click');
    }
});




$('.jsClearButton').on('click', function(event) {
    event.preventDefault();

    $('.jsClearOverlay').addClass('is-visible');

    // pidTimeout = setTimeout(function() {
    //     $('.jsClearList').prop('disabled', false);
    // }, 5000);
    var time = 2;

    $('.jsCountdown').fadeIn().text(time);

    pidInterval = setInterval(function(){
        time--;
        $('.jsCountdown').text(time);

        if (time == 0) {
            clearInterval(pidInterval);
            $('.jsClearList').prop('disabled', false).find('.jsCountdown').fadeOut();   

        }

    }, 1000);

});


$('.jsClearList').on('click', function(event) {
    event.preventDefault();

    $('.jsShoppingList').html('');
    $('.jsShoppingList').trigger('list-modified');

    $(this).closest('.overlay').find('.jsOverlayClose').trigger('click');
    
});


$('.jsShoppingList').on('list-modified', function(event) {
    // console.log('am modificat lista')
    $('.jsListLength').text( $(this).find('li').length );
});

$('.jsListLength').text( $('.jsShoppingList li').length );
// $(window).on('load', function(event) {
// });