"use strict";
(function(){

    // Creating innerhtml for Items in cart container.
    function displayCart() {
        var myCart,
            output,
            total,
            totalPrice;
        EPAM.sportShop.loadCart();
        total = EPAM.sportShop.totalCount();
        totalPrice = EPAM.sportShop.totalCost();
        myCart = EPAM.sportShop.listCart();
        if (myCart === null) {
            output = '<p><strong>Your cart is empty.</strong></p>';
        } else {
            output = '<p><strong>Your cart.</strong></p><ul>';
            for (var i in myCart) {
                output += '<li>' +
                    '<div>' +
                    '<p><strong>ID:</strong> ' + myCart[i].id + '</p>' +
                    '<p><strong>Count:</strong> ' + myCart[i].count + '</p>' +
                    '<p><strong>Price:</strong> ' + myCart[i].price + '</p>' +
                    '</div>' +
                    '<figure>' +
                    '<img src="' + myCart[i].url + '"/>' +
                    '<figurecaption><strong>Name:</strong> ' + myCart[i].name + '</figurecaption>' +
                    '</figure>' +
                    '<div>' +
                    '<div class="cartattrColor" style="background-color: ' + myCart[i].color + ';"></div>' +
                    '<p><strong>Gender:</strong> ' + myCart[i].gender + '</p>' +
                    '</div>' +
                    '<div>' +
                    '<a class="substract-item" data-id="' + myCart[i].id + '" href="#"><i class="fa fa-minus"></i></a>' +
                    '<a class="delete-item" data-id="' + myCart[i].id + '" href="#"><i class="fa fa-trash-o"></i></a>' +
                    '</div>' +
                    '</li>';
            }

            output += '</ul>' +
                '<hr/>' +
                '<div class="total">' +
                '<div>' +
                '<p><strong>Total price: </strong>' + totalPrice + '</p>' +
                '<p><strong>Total count: </strong>' + total + '</p>' +
                '</div>' +
                '<div class="confButtons">' +
                '<a class = "clear-cart" href="#"><i class="fa fa-times"></i></a>' +
                '<a class = "confirm-cart" href="#"><i class="fa fa-check"></i></a>' +
                '</div>' +
                '</div>';
        }
        $('#CART_CONTAINER').html(output);
        /*if (EPAM.sportShop.cart.length > 0) {
            $('.confirm-cart').fadeIn(0);
        } else {
            $('.confirm-cart').fadeOut(0);
        }*/
        window.scrollTo(0, 0);
    }

    // On ready loading data from local storage.
    $(function(){
        EPAM.sportShop.loadCart();
        displayCart();
    });

    // Cart mathods.
    $('main')
        // Delete All from this-type item.
        .on('click', '.delete-item', function () {
            var id = $(this).attr('data-id');
            EPAM.sportShop.removeAll(id);
            displayCart();
            if(EPAM.sportShop.cart.length === 0){
                $('.confirm-cart').css('display','none');
            }
        })
        // Delete One from this-type item.
        .on('click', '.substract-item', function () {
            var id = $(this).attr('data-id');
            EPAM.sportShop.remove(id);
            displayCart();
            if(EPAM.sportShop.cart.length === 0){
                $('.confirm-cart').css('display','none');
            }
        })
        // Clear order.
        .on('click', '.clear-cart', function (event) {
            EPAM.sportShop.clear();
            displayCart();
            if(EPAM.sportShop.cart.length === 0){
                location.assign('index.html');
            }
            EPAM.sportShop.utils.preStop(event);
        })
        // Confirm order.
        .on('click', '.confirm-cart', function () {
            location.assign('confirm_page.html');
            EPAM.sportShop.clear();
        });
}());