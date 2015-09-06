"use strict";
$(function(){
    EPAM.sportShop.loadCart();
    EPAM.sportShop.displayCart();
});

// Cart mathods.
$('main')
    .on('click', '.delete-item', function () {
        var id = $(this).attr('data-id');
        EPAM.sportShop.removeAll(id);
        EPAM.sportShop.displayCart();
        if(EPAM.sportShop.cart.length === 0){
            $('.confirm-cart').css('display','none');
        }
    })
    .on('click', '.substract-item', function () {
        var id = $(this).attr('data-id');
        EPAM.sportShop.remove(id);
        EPAM.sportShop.displayCart();
        if(EPAM.sportShop.cart.length === 0){
            $('.confirm-cart').css('display','none');
        }
    })
    .on('click', '.clear-cart', function (event) {
        EPAM.sportShop.clear();
        EPAM.sportShop.displayCart();
        if(EPAM.sportShop.cart.length === 0){
            location.assign('index.html');
        }
        EPAM.utils.preStop(event);
    })
    .on('click', '.confirm-cart', function () {
        location.assign('confirm_page.html');
    });