"use strict";
var EPAM = Object.create(null);
EPAM.sportShop = (function () {
    var categories = {
            filter: [0, 0, 0, 0, 0, 0, 0, 0]
        },
        color = {
            filter: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            colorArray: ['#003D71', '#C42C39', '#F4BC08', '#02882C', '#000', '#F9E7B6', '#EF8A07', '#5A433F', '#2C2C2C', '#8C56A9', '#AAE7FC', '#CACCCE', '#fff']
        },
        utils = {
            addListener: null,
            removeListener: null,
            preStop: null,
            pre: null,
            stop: null
        },
        db = JSON.parse(localStorage.getItem('db')),
        err_msg = '',
        output,
        cart,
        i,
        Item = function (o) {
            this.name = o.name;
            this.price = o.price;
            this.color = o.color;
            this.gender = o.gender;
            this.type = o.type;
            this.description = o.description;
            this.count = o.count;
            this.url = o.url;
            this.id = o.id;
        },
        addItemToTheCart = function (o) {
            for (var i in cart) {
                if (cart[i].name === o.name) {
                    cart[i].count += o.count;
                    saveCart();
                    return;
                }
            }
            if (cart) {
                cart.push(new Item(o));
            } else {
                cart = [];
                cart.push(new Item(o));
            }
            saveCart();
        },
        removeItemFromCart = function (id) {
            for (var i in cart) {
                if (Object.prototype.hasOwnProperty.call(cart, i)) {
                    if (cart[i].id === id) {
                        cart[i].count = cart[i].count - 1;
                        if (cart[i].count === 0) {
                            cart.splice(i, 1);
                        }
                        break;
                    }
                }
            }
            saveCart();
        },
        removeItemsFromCartAll = function (id) {
            for (var i in cart) {
                if (Object.prototype.hasOwnProperty.call(cart, i)) {
                    if (cart[i].id === id) {
                        cart.splice(i, 1);
                        break;
                    }
                }
            }
            saveCart();
        },
        clearCart = function () {
            localStorage.removeItem('shoppingCart');
        },
        totalCount = function () {
            var count = 0;
            for (var i in cart) {
                if (Object.prototype.hasOwnProperty.call(cart, i)) {
                    count += cart[i].count;
                }
            }
            return count;
        },
        totalCost = function () {
            var cost = 0;
            for (var i in cart) {
                if (Object.prototype.hasOwnProperty.call(cart, i)) {
                    cost += cart[i].price * cart[i].count;
                }
            }
            return cost.toFixed(2);
        },
        listCart = function () {
            if (cart) {
                return cart.slice();
            } else return null;
        },
        saveCart = function () {
            localStorage.setItem('shoppingCart', JSON.stringify(cart));
        },
        loadCart = function () {
            cart = JSON.parse(localStorage.getItem('shoppingCart'));
        },
        setCountForItem = function (name, count) {
            for (var i in cart) {
                if (Object.prototype.hasOwnProperty.call(cart, i)) {
                    if (cart[i].name === name) {
                        cart[i].count = count;
                        break;
                    }
                }
            }
            saveCart();
        };

    // Initialise util properties.
    (function () {
        // utils.addLitener, utils.removeListener.
        if (typeof window.addEventListener === 'function') {
            utils.addListener = function (el, type, fn) {
                el.addEventListener(type, fn, false);
            };
            utils.removeListener = function (el, type, fn) {
                el.removeEventListener(type, fn, false);
            };
        } else if (typeof document.attachEvent === 'function') {
            // IE
            utils.addListener = function (el, type, fn) {
                el.attachEvent('on' + type, fn);
            };
            utils.removeListener = function (el, type, fn) {
                el.detachEvent('on' + type, fn);
            };
        } else { // Old Browsers
            utils.addListener = function (el, type, fn) {
                el['on' + type] = fn;
            };
            utils.removeListener = function (el, type) {
                el['on' + type] = null;
            };
        }

        // Normal browsers: utils.stop, utils.pre, utils.preStop.
        if (typeof Event.prototype.preventDefault === 'function') {
            utils.pre = function (e) {

                e.preventDefault();
            };
            if (typeof Event.prototype.stopPropagation === 'function') {
                utils.stop = function (e) {

                    e.stopPropagation();
                };
                utils.preStop = function (e) {

                    e.preventDefault();
                    e.stopPropagation();
                }
            }
        } else {

            // IE: utils.stop, utils.pre, utils.preStop.
            if (typeof Event.prototype.returnValue === 'boolean') {
                utils.pre = function (e) {

                    e.preventDefault();
                };
                if (typeof Event.prototype.cancelBubble === 'boolean') {
                    utils.stop = function (e) {

                        e.stopPropagation();
                    };
                    utils.preStop = function (e) {

                        e.preventDefault();
                        e.stopPropagation();
                    }
                }
            }
        }

    }());

    // Window , document.onReady , Header - module.
    (function () {
        // onReady.
        $(function () {
            // Not for mobile devices.
            if ($(window).innerWidth() > 550) {
                $('.ABOVE_HEADER').toggleClass('show');
            }
            // Create in body to <img> for menu animation.
            var imgLong = document.createElement('img'),
                imgShort = document.createElement('img');
            $(imgShort)
                .css('position', 'fixed')
                .css('display', 'none')
                .css('z-index', 3000)
                .attr('src', '../content/svg/menu-choose-short.svg')
                .addClass('menu_choose')
                .insertAfter($('footer'));
            $(imgLong)
                .css('position', 'fixed')
                .css('display', 'none')
                .css('z-index', 3000)
                .attr('src', '../content/svg/menu-choose-long.svg')
                .addClass('menu_choose')
                .insertAfter($('footer'));
            windowResizeHeader();

            $('[type="number"]').keydown(function (event) {
                // Allow: backspace, delete, tab, escape, enter and .
                if ($.inArray(event.keyCode, [46, 8, 13, 27, 9, 110, 190]) !== -1 ||
                        // Allow: Ctrl+A
                    (event.keyCode == 65 && event.ctrlKey === true) ||
                        // Allow: Ctrl+C
                    (event.keyCode == 67 && event.ctrlKey === true) ||
                        // Allow: Ctrl+X
                    (event.keyCode == 88 && event.ctrlKey === true) ||
                        // Allow: home, end, left, right
                    (event.keyCode >= 35 && event.keyCode <= 39)) {
                    // let it happen, don't do anything
                    return;
                }
                // Ensure that it is a number and stop the keypress
                if ((event.shiftKey || (event.keyCode < 48 || event.keyCode > 57)) && (event.keyCode < 96 || event.keyCode > 105)) {
                    event.preventDefault();
                }
            });

            // blocking links.
            /*
             $('a').click(function (event) {
             utils.pre(event);
             });
             */
        });

        // When screenTop U see abovemenu. When scrollOver abovemenu disapear's.
        $(window)
            .scroll(function () {
                if ($(window).scrollTop() === 0 && $(this).innerWidth() > 550) {
                    $('.ABOVE_HEADER.collapse').fadeIn(function () {
                        $(this).css('display', 'flex');
                    });
                    windowResizeHeader();
                } else {
                    if (window.innerWidth > 550) {
                        $('.ABOVE_HEADER.collapse').fadeOut();
                        windowResizeHeader();
                    }
                }
            })
            .resize(windowResizeHeader)
            .mousemove(function (event) {
                if (event.clientY === 0 && $(this).innerWidth() > 550) {
                    $('.ABOVE_HEADER.collapse').fadeToggle();
                    windowResizeHeader();
                }
            });

        // Navigation.
        $('#LOGO').click(function () {
            $('.BELOW_HEADER').toggleClass('collapse');
            $('.ABOVE_HEADER').toggleClass('collapse');
            windowResizeHeader();
        });

        // Menu transition.
        $('.BELOW_HEADER')
            .on('mousemove', function (event) {
                var helperParam = {
                    target: null,
                    targetImg: null,
                    img: null,
                    a: null,
                    e: event
                };
                switch (event.target) {
                    // Links.
                    case $('.MEN').find('a')[0]:
                    {
                        helperParam = {
                            target: $('.MEN')[0],
                            targetImg: $('.menu_choose')[1],
                            img: $('.menu_choose')[0],
                            a: $('.MEN').find('>a')[0],
                            e: event
                        };
                        headerOnMouseMoveHelper(helperParam);
                        break;
                    }
                    case $('.WOMAN').find('a')[0]:
                    {
                        helperParam = {
                            target: $('.WOMAN')[0],
                            targetImg: $('.menu_choose')[0],
                            img: $('.menu_choose')[1],
                            a: $('.WOMAN').find('>a')[0],
                            e: event
                        };
                        headerOnMouseMoveHelper(helperParam);
                        break;
                    }
                    case $('.KIDS').find('a')[0]:
                    {
                        helperParam = {
                            target: $('.KIDS')[0],
                            targetImg: $('.menu_choose')[1],
                            img: $('.menu_choose')[0],
                            a: $('.KIDS').find('>a')[0],
                            e: event
                        };
                        headerOnMouseMoveHelper(helperParam);
                        break;
                    }
                    case $('.SPORTS').find('a')[0]:
                    {
                        helperParam = {
                            target: $('.SPORTS')[0],
                            targetImg: $('.menu_choose')[0],
                            img: $('.menu_choose')[1],
                            a: $('.SPORTS').find('>a')[0],
                            e: event
                        };
                        headerOnMouseMoveHelper(helperParam);
                        break;
                    }
                    case $('.CATALOG').find('a')[0]:
                    {
                        helperParam = {
                            target: $('.CATALOG')[0],
                            targetImg: $('.menu_choose')[0],
                            img: $('.menu_choose')[1],
                            a: $('.CATALOG').find('>a')[0],
                            e: event
                        };
                        headerOnMouseMoveHelper(helperParam);
                        break;
                    }
                    // Span.
                    case $('.MEN').find('span')[0]:
                    {
                        helperParam = {
                            target: $('.MEN')[0],
                            targetImg: $('.menu_choose')[1],
                            img: $('.menu_choose')[0],
                            a: $('.MEN').find('>a')[0],
                            e: event
                        };
                        headerOnMouseMoveHelper(helperParam);
                        break;
                    }
                    case $('.WOMAN').find('span')[0]:
                    {
                        helperParam = {
                            target: $('.WOMAN')[0],
                            targetImg: $('.menu_choose')[0],
                            img: $('.menu_choose')[1],
                            a: $('.WOMAN').find('>a')[0],
                            e: event
                        };
                        headerOnMouseMoveHelper(helperParam);
                        break;
                    }
                    case $('.KIDS').find('span')[0]:
                    {
                        helperParam = {
                            target: $('.KIDS')[0],
                            targetImg: $('.menu_choose')[1],
                            img: $('.menu_choose')[0],
                            a: $('.KIDS').find('>a')[0],
                            e: event
                        };
                        headerOnMouseMoveHelper(helperParam);
                        break;
                    }
                    case $('.SPORTS').find('span')[0]:
                    {
                        helperParam = {
                            target: $('.SPORTS')[0],
                            targetImg: $('.menu_choose')[0],
                            img: $('.menu_choose')[1],
                            a: $('.SPORTS').find('>a')[0],
                            e: event
                        };
                        headerOnMouseMoveHelper(helperParam);
                        break;
                    }
                    case $('.CATALOG').find('span')[0]:
                    {
                        helperParam = {
                            target: $('.CATALOG')[0],
                            targetImg: $('.menu_choose')[0],
                            img: $('.menu_choose')[1],
                            a: $('.CATALOG').find('>a')[0],
                            e: event
                        };
                        headerOnMouseMoveHelper(helperParam);
                        break;
                    }

                    case $('.BLOG').find('span')[0] && $('.BLOG').find('span')[0]:
                    {
                        helperParam = {
                            target: header.bNav.menu.blog,
                            targetImg: $('.menu_choose')[1],
                            img: $('.menu_choose')[0],
                            a: document.querySelector('.BLOG>a'),
                            e: event
                        };
                        headerOnMouseMoveHelper(helperParam);
                        break;
                    }
                    default :
                    {
                        $('.dropmenu').slideUp(200);
                        break;
                    }
                }
            })
            .on('mouseout', function (event) {
                switch (event.target) {
                    case $('#MENU'):
                    {
                        $('.dropmenu').slideUp(200);
                        break;
                    }
                    case $('hedear'):
                    {
                        $('.dropmenu').toggleClass('upper');
                        break;
                    }
                }
                $('.menu_choose').css('display', 'none');
                $('.menu_choose').css('margin', 0);
            });

        function headerOnMouseMoveHelper(o) {
            $(o.targetImg)
                .css('top', o.target.offsetTop + o.target.offsetHeight - 6)
                .css('left', o.target.offsetLeft)
                .css('width', o.target.offsetWidth)
                .css('height', 8)
                .css('margin', 0)
                .css('display', 'block');
            $(o.img).css('display', 'none');
            // For All exept BLOG
            if (o.target !== $('.BLOG')) {
                $('.dropmenu').slideDown(200);
                $('dropmenu').toggleClass('upper');
            }
            $(o.a).toggleClass('hover');
            $('.BELOW_HEADER').find('a').not(o.a).toggleClass('hover')
        }

        // Dropmenu fadeIn fadeOut.
        $('body')
            .on('mousemove', '.ABOVE_HEADER', hideDropmenu)
            .on('mousemove', 'main', hideDropmenu)
            .on('mousemove', 'footer', hideDropmenu)
            .on('mousemove', '.dropmenu', function () {
                $('dropmenu').toggleClass('upper');
            });

        function hideDropmenu() {
            $('.dropmenu').slideUp(200);
            $('.BELOW_HEADER').find('a').toggleClass('hover');
        }


        // Show to track menu.
        $('#TO_TRACK').on('click', 'a', function (event) {
            location.assign('order.html');
            utils.preStop(event);
        });
        // Show shoping cart.
        $('#SHOPING_CART').on('click', 'a', function (event) {
            location.assign('cart.html');
            utils.preStop(event);
        });
        // Show catalog.
        $('#MENU').on('click', 'dt', function (event) {
            location.assign('index.html');
            utils.preStop(event);
        });
        $('#LOGO').on('click', function (event) {
            location.assign('index.html');
            if (window.innerWidth > 550) {
                showCatalog();
            }
            utils.preStop(event);
        });
        $('footer').find('.PRODUCTS').on('click', 'a', showCatalog);
        function showCatalog(event) {
            location.assign('index.html');
            windowResizeHeader();
            utils.preStop(event);
        }

    }());

    // Filter - module.
    (function (color) {
        // Filter generate color.
        for (output = '', i = 0; i < 13; i += 1) {
            output += '<li><a href="#" style="'
                + 'background-color:' + color.colorArray[i] + '; '
                + 'box-shadow: 0 0 0 1px ' + color.colorArray[i] + ', 0 0 0 3px ' + color.colorArray[i] + ';" ' +
                'data-type = "' + color.colorArray[i] + '"></a></li>';
        }

        // Filter events .
        $('#colors').html(output)
            .on('click', 'a', function (event) {
                var tmp = $('#colors').find('a'),
                    attrColor = $(this).attr('data-type');
                $('#grid').find('.selected').removeClass('selected');
                for (i in tmp) {
                    if (Object.prototype.hasOwnProperty.call(tmp, i)) {
                        if ($(this)[0] === tmp[i]) {
                            break;
                        }
                    }
                }
                if (!$(this).hasClass('selected')) {
                    if (attrColor === 'rgb(255, 255, 255)') {
                        $(this).css('box-shadow', '0 0 0 1px #fff, 0 0 0 3px rgb(42, 56, 55)');
                    } else {
                        $(this).css('box-shadow', '0 0 0 1px #fff, 0 0 0 3px rgb(42, 56, 55)');
                    }
                    $(this).addClass('selected');
                    color.filter[i] = $(this).attr('data-type');
                } else {
                    if (attrColor === 'rgb(255, 255, 255)') {
                        $(this).css('box-shadow', '0 0 0 2px #fff, 0 0 0 3px #CACCCE');
                    } else {
                        $(this).css('box-shadow', '0 0 0 1px ' + attrColor + ', 0 0 0 3px ' + attrColor);
                    }
                    $(this).removeClass('selected');
                    color.filter[i] = 0;
                }
                toFilter(color.filter);
                utils.preStop(event);
            })
            .find('li:last-child a').css('box-shadow', '0 0 0 2px #fff, 0 0 0 3px #CACCCE');
        $('#categories')
            .find('li').css('border', '2px solid rgb(229, 235, 241)')
            .on('click', 'a', function () {
                var tmp = $('#categories').find('a');
                $('#grid').find('.selected').removeClass('selected');
                for (i in tmp) {
                    if (Object.prototype.hasOwnProperty.call(tmp, i)) {
                        if ($(this)[0] === tmp[i]) {
                            break;
                        }
                    }
                }
                if (!$(this).hasClass('selected')) {
                    $(this).parent().css('border', '2px solid rgb(42, 56, 55)');
                    $(this).addClass('selected');
                    categories.filter[i] = $(this).attr('data-type');
                } else {
                    $(this).parent().css('border', '2px solid rgb(229, 235, 241)');
                    $(this).removeClass('selected');
                    categories.filter[i] = 0;
                }
                toFilter(categories.filter);
            });

        // Filtering items.
        function toFilter(arr) {
            for (var tmp = 0, i = 0; i < arr.length - 1; i += 1) {
                tmp += arr[i];
            }
            // Iff arr is empty -> show all.
            if (tmp === 0) {
                $('#grid').find('li').css('display', 'flex');
            } else {
                $('#grid').find('li').css('display', 'none');
                for (i = 0; i < arr.length - 1; i += 1) {
                    $('#grid').find('[data-type=' + arr[i] + ']').css('display', 'flex');
                    $('#grid').find('[data-color=' + arr[i] + ']').css('display', 'flex');
                }
            }
        }
    }(color));

    // Main.
    (function (db) {
        // Get data from JSON.
        $.ajax({
            url: '../js/goods.json',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                localStorage.setItem('db', JSON.stringify(data));
            }
        });

        output = '';
        // Grid render Items.
        for (i in db) {
            if (Object.prototype.hasOwnProperty.call(db, i)) {
                output += '<li'
                    + ' data-color = ' + db[i].color
                    + ' data-type = ' + db[i].type + '>' +
                    '<a href="#"'
                    + ' data-id = ' + i + ' >' +
                    '<img src = ' + db[i].url + '>' +
                    '</a><div class="container">' +
                    '<p class="name">' + db[i].name + '</p>' +
                    '<div><span class="price">' + db[i].price + '€</span>' +
                    '<input  class="item-count" type="number" value="1" min="1">' +
                    '<a href="#" class="add-item" data-id="' + i + '">' +
                    '<i class="fa fa-cart-plus"></i>' +
                    '</a></div>' +
                    '<p class="description">' + db[i].description + '</p>' +
                    '</li>';
            }
        }
        $('#grid').find('>ul').html(output);
        $('#grid').on('click', 'a', function () {
            var i;
            for (i in db) {
                if (Object.prototype.hasOwnProperty.call(db, i)
                    && i === $(this).attr('data-id')) {
                    if (!$(this).parent().hasClass('selected')) {
                        $('#grid').find('.selected').removeClass('selected');
                        var offset = $(this).offset();
                        $(this).parent().addClass('selected');
                        $(this).parent()
                            .css('top', offset.top)
                            .css('left', offset.left);
                        window.scrollTo(0, offset.top - 100);
                    } else {
                        $('#grid').find('.selected').removeClass('selected');
                    }
                }
            }
        });
    }(db));

    // login.
    $('#LOGIN')
        .on('blur', '[type="email"]', function () {
            $(this)[0].required = true;
            if ($(this)[0].validity.valueMissing) {
                helper.error.hesh.login.email = helper.error.generate(
                    {
                        target: login.have_account.email,
                        message: 'Email required.'
                    });
                $('.error_msg').html(helper.error.hesh.login.email.message);
                $(this)[0].toggleClass('incorrect');
            }
            if ((this)[0].validity.typeMismatch) {
                helper.error.hesh.login.email = helper.error.generate(
                    {
                        target: login.have_account.email,
                        message: 'Incorrect email.'
                    });
                $('.error_msg').html(helper.error.hesh.login.email.message);
                $(this)[0].toggleClass('incorrect');
            }
            if (login.have_account.email.validity.valid) {
                helper.error.hesh.login.email = null;
                $(this)[0].toggleClass('incorrect');
                $(this)[0].required = false;
                $('.error_msg').html('');
            }
        })
        .on('blur', '[type="password"]', function () {
            helper.error.hesh.login.password = helper.error.generate({

                target: login.have_account.password,
                message: helper.passwordValidation(login.have_account.password)
            });
            if (helper.error.hesh.login.password.message !== '') {
                $('.error_msg').html(helper.error.hesh.login.password.message);
                $(this)[0].toggleClass('incorrect');
            } else {
                $(this)[0].toggleClass('incorrect');
                $(this)[0].validity.patternMismatch = true;
                helper.error.hesh.login.password = null;
                $('.error_msg').html('');
            }
        })
        .on('click', 'a', function () {
            $('.POPIN_LOGIN').fadeIn(0, function () {
                $(this).css('display', 'flex');
            });
            $('main').addClass('modal');
            $('header').addClass('modal');
            $('footer').addClass('modal');
        });

    $('.POPIN_LOGIN')
        .on('click', '#register', function (event) {
            $('.CREATE_ACCAUNT').fadeIn(0, function () {
                $(this).css('display', 'flex');
            });
            $('.POPIN_LOGIN').fadeOut(200);
            $('main').addClass('modal');
            $('header').addClass('modal');
            $('footer').addClass('modal');
            utils.preStop(event);
        })
        .on('click', function () {
            $('.POPIN_LOGIN').fadeOut(200);
            $('main').removeClass('modal');
            $('header').removeClass('modal');
            $('footer').removeClass('modal');
        });

    $('#ORDER_TRACKING')
        .on('blur', '.HAVE_ACCOUNT [type="password"]', function () {
            passwordValidate($(this).val());
            if (err_msg.length > 0) {
                $('.have.error_msg').html(err_msg);
            } else {
                $('.have.error_msg').html('');
            }
        })
        .on('blur', '.DONT_HAVE_ACCOUNT [type="password"]', function () {
            passwordValidate($(this).val());
            if (err_msg.length > 0) {
                $('.dont_have.error_msg').html(err_msg);
            } else {
                $('.dont_have.error_msg').html('');
            }
        });

    // createAccount.
    $('.CREATE_ACCAUNT')
        .on('click', function () {
            $(this).fadeOut(200);
            $('main').removeClass('modal');
            $('header').removeClass('modal');
            $('footer').removeClass('modal');
        })
        .on('click', '[type="submit"]', function () {
            var arr = $('.CREATE_ACCAUNT [type="text"]');
            for (var i in arr) {
                if (arr[i].validity.valueMissing) {
                    arr[i].focus();
                }
            }
            postValidate();
            emailValidate();
            confEmail();
            passwordValidate();
            confPassword();
            telValidate();
        })
        .on('click', 'form', function (event) {
            utils.stop(event);
        })
        .on('blur', '#postcode', postValidate)
        .on('blur', '#Tel', telValidate)
        .on('blur', '#createEmail', emailValidate)
        .on('blur', '#createPassword', passwordValidate)
        .on('blur', '#confirmCreateEmail', confEmail)
        .on('blur', '#confirmCreatePassword', confPassword);

    $('#grid').on('click', '.add-item', function () {
        var name,
            price,
            gender,
            type,
            description,
            count,
            url,
            color,
            id;
        for (i in db) {
            if (Object.prototype.hasOwnProperty.call(db, i)) {
                if ($(this).attr('data-id') === i) {
                    name = db[i].name;
                    price = db[i].price;
                    gender = db[i].gender;
                    type = db[i].type;
                    description = db[i].description;
                    count = +$(this).parent().find('.item-count').val();
                    url = db[i].url;
                    id = i;
                    color = db[i].color;
                }
            }
        }
        addItemToTheCart(new Item({
            name: name,
            price: price,
            gender: gender,
            type: type,
            description: description,
            count: count,
            url: url,
            id: id,
            color: color
        }));
        $('.fa-cart-arrow-down').fadeToggle('show');
        $('.fa-shopping-cart').fadeToggle('show');
    });


    function telValidate() {
        $('#Tel').attr('required', true);
        if ($('#Tel')[0].validity.valueMissing) {
            helper.error.hesh.createAccount.tel = helper.error.generate({
                target: $('#Tel')[0],
                message: 'Must not be empty.'
            });
            $('#Tel').toggle('incorrect');
        }
        if ($('#Tel')[0].validity.patternMismatch) {
            helper.error.hesh.createAccount.tel = helper.error.generate({
                target: createAccount.tel,
                message: 'Must be 10 digits.'
            });
            $('#Tel').toggle('incorrect');
        } else {
            helper.error.hesh.createAccount.tel = null;
            $('#Tel').toggle('incorrect');
        }
    }

    function confPassword() {
        if ($(this).val() !== $('#createPassword').val()) {
            helper.error.hesh.createAccount.confirmPassword = helper.error.generate({
                target: $(this)[0],
                message: 'Duplicate password, please.'
            });
            $(this).toggle('incorrect');
        } else {
            helper.error.hesh.createAccount.confirmPassword = null;
            $(this).toggle('incorrect');
        }
    }

    function confEmail() {
        if ($(this).val() !== $('#createEmail').val()) {
            helper.error.hesh.createAccount.confirmEmail = helper.error.generate({
                target: $(this)[0],
                message: 'Duplicate email, please.'
            });
            $(this).toggle('incorrect');
        } else {
            helper.error.hesh.createAccount.confirmEmail = null;
            $(this).toggle('incorrect');
        }
    }

    function passwordValidate(password) {
        var passwordErrors = [];
        if (password.length === 0) {
            return 'Password required.'
        }
        if (password.length < 8) {
            passwordErrors.push('Your password must be at list 8 characters');
        }
        if (password.search(/[0-9]/) < 0) {
            passwordErrors.push('Your password must contain at list one digit');
        }
        if (password.search(/[a-z]/) < 0) {
            passwordErrors.push('Your password must contain at list one lowercase');
        }
        if (password.search(/[A-Z]/) < 0) {
            passwordErrors.push('Your password must contain at list one uppercase');
        }
        if (password.search(/[!#$%&?_"]/) < 0) {
            passwordErrors.push('Your password must contain at list one special symbol');
        }
        err_msg = passwordErrors.concat('. ');
    }

    function emailValidate() {
        $('#createEmail').attr('required', true);
        if ($('#createEmail')[0].validity.valueMissing) {
            helper.error.hesh.email = helper.error.generate(
                {
                    target: $('#createEmail')[0],
                    message: 'Email required.'
                });
            $('#createEmail').toggle('incorrect');
        }
        if ($('#createEmail').validity.typeMismatch) {
            $('#createEmail').toggle('incorrect');
            helper.error.hesh.email = helper.error.generate(
                {
                    target: $('#createEmail')[0],
                    message: 'Incorrect email.'
                });
        }
        if ($('#createEmail')[0].validity.valid) {
            $('#createEmail').toggle('incorrect');
            $('#createEmail').attr('required', false);
            helper.error.hesh.email = null;
        }
    }

    function postValidate() {
        $(this).attr('required', true);
        if ($('#postcode')[0].validity.valueMissing) {
            helper.error.hesh.postCode = helper.error.generate({
                target: $(this)[0],
                message: 'Must not be empty.'
            });
            $(this).toggleClass('incorrect');
        }
        if ($(this).val() < 1001 && $('#postcode').val() > 8000) {
            helper.error.hesh.postCode = helper.error.generate({
                target: postCode,
                message: 'Minimum 1001.'
            });
            $(this).toggleClass('incorrect');
        } else {
            helper.error.hesh.postCode = null;
            $(this).toggleClass('incorrect');
            $(this).attr('required', false);
        }
    }

    function displayCart() {
        var myCart,
            output,
            total,
            totalPrice;
        loadCart();

        total = totalCount();
        totalPrice = totalCost();
        myCart = listCart();
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
        if(cart.length === 0){
            $('.confirm-cart').css('display','none');
        }
        window.scrollTo(0, 0);
    }

    function windowResizeHeader() {
        $('header').css('width', document.querySelector('main').scrollWidth);
        $('main').css('marginTop', document.querySelector('header').offsetHeight);
        $('footer').css('top', document.querySelector('header').offsetHeight);
        $('#grid').find('.selected').css('left', $('#filters').offsetHeight + $('#filters').outerWidth(true));
        $('#filter').offset({top: document.querySelector('header').offsetHeight + 25});
    }

    return {
        displayCart: displayCart,
        remove: removeItemFromCart,
        removeAll: removeItemsFromCartAll,
        clear: clearCart,
        loadCart: loadCart,
        totalCost: totalCost,
        totalCount: totalCount,
        listCart: listCart,
        cart: loadCart(),
        utils: utils
    }
}());