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
        var newListItem = '<li data-id="' + newId + '"><input type="checkbox" id="' + idValue + '"><label for="' + idValue + '">' + newValue + '<a href="" class="edit-button jsEditButton"><i class="fa fa-pencil" aria-hidden="true"></i></a><a href="" class="delete-button jsDeleteButton"><i class="fa fa-trash" aria-hidden="true"></i></a></label></li>';

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
        $('.jsShoppingList').append(newListItem);

        // golim campul formularului de adaugare
        $(this).find('.jsAddField').val('');

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
});