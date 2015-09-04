(function () {
    "use strict";
    var header = {
            self: document.querySelector('header'),
            aNav: {
                self: document.querySelector('.ABOVE_HEADER'),
                description: document.querySelector('.DESCRIPTION'),
                toTrack: document.querySelector('.TO_TRACK'),
                login: document.querySelector('.LOGIN'),
                shoppingCart: document.querySelector('.SHOPING_CART'),
                hide: function () {
                    header.aNav.self.className = 'ABOVE_HEADER collapse';
                },
                show: function () {
                    header.aNav.self.className = 'ABOVE_HEADER';
                },
                toggle: function () {
                    if (document.querySelector('.ABOVE_HEADER.collapse')) {
                        header.aNav.show();
                    } else {
                        header.aNav.hide();
                    }
                }
            },
            bNav: {
                self: document.querySelector('.BELOW_HEADER'),
                logo: document.querySelector('#LOGO'),
                menu: {
                    self: document.querySelector('#MENU'),
                    links: document.querySelectorAll('#MENU a'),
                    catalogLink: document.querySelector('.CATALOG a'),
                    catalogSpan: document.querySelector('.CATALOG span'),
                    catalog: document.querySelector('.CATALOG'),
                    men: document.querySelector('.MEN'),
                    menLink: document.querySelector('.MEN a'),
                    menSpan: document.querySelector('.MEN span'),
                    woman: document.querySelector('.WOMAN'),
                    womanLink: document.querySelector('.WOMAN a'),
                    womanSpan: document.querySelector('.WOMAN span'),
                    kids: document.querySelector('.KIDS'),
                    kidsLink: document.querySelector('.KIDS a'),
                    kidsSpan: document.querySelector('.KIDS span'),
                    sports: document.querySelector('.SPORTS'),
                    sportsLink: document.querySelector('.SPORTS a'),
                    sportsSpan: document.querySelector('.SPORTS span'),
                    blog: document.querySelector('.BLOG'),
                    blogLink: document.querySelector('.BLOG a'),
                    blogSpan: document.querySelector('.BLOG span')
                },
                search: document.querySelector('.search'),
                hide: function () {
                    header.bNav.self.className = 'BELOW_HEADER collapse';
                },
                show: function () {
                    header.bNav.self.className = 'BELOW_HEADER';
                },
                toggle: function () {
                    if (document.querySelector('.BELOW_HEADER.collapse')) {
                        header.bNav.show();
                    } else {
                        header.bNav.hide();
                    }
                }
            },
            show: function () {
                header.bNav.show();
                header.aNav.show();
            },
            hide: function () {
                header.bNav.hide();
                header.aNav.hide();

            },
            toggle: function () {
                if (document.querySelector('.ABOVE_HEADER.collapse') &&
                    document.querySelector('.BELOW_HEADER.collapse')) {
                    header.show();
                } else {
                    header.hide();
                }
            }
        },
        dropMenu = document.querySelector('.dropmenu'),
        text = document.querySelectorAll('.CREATE_ACCAUNT [type="text"]'),
        createAccount = {
            self: document.querySelector('.CREATE_ACCAUNT'),
            gender: document.querySelectorAll('[name="gender"]'),
            lastName: document.querySelector('#lastName'),
            firstName: document.querySelector('#firstname'),
            address: document.querySelector('#address'),
            company: document.querySelector('#company'),
            postcode: document.querySelector('#postcode'),
            town: document.querySelector('#towm'),
            country: document.querySelector('#country'),
            email: document.querySelector('#createEmail'),
            confirmEmail: document.querySelector('#confirmCreateEmail'),
            password: document.querySelector('#createPassword'),
            confirmPassword: document.querySelector('#confirmCreatePassword'),
            tel: document.querySelector('#Tel'),
            birthDay: {
                day: document.querySelector('#day'),
                month: document.querySelector('#month'),
                year: document.querySelector('#year')
            },
            language: document.querySelector('#language'),
            subscribe: document.querySelector('#subscribe'),
            submit: document.querySelector('.CREATE_ACCAUNT [type="submit"]')
        },
        login = {
            self: document.querySelector('.POPIN_LOGIN'),
            have_account: {
                self: document.querySelector('.HAVE_ACCOUNT'),
                email: document.querySelector('.POPIN_LOGIN .HAVE_ACCOUNT [type="email"]'),
                password: document.querySelector('.POPIN_LOGIN .HAVE_ACCOUNT [type="password"]'),
                submit: document.querySelector('.POPIN_LOGIN .HAVE_ACCOUNT [type="submit"]'),
                forgot_pass: null,
                error_msg: document.querySelector('.POPIN_LOGIN .HAVE_ACCOUNT .error_msg')
            },
            not_have_account: {
                self: document.querySelector('.DONT_HAVE_ACCOUNT'),
                submit: document.querySelector('.POPIN_LOGIN .DONT_HAVE_ACCOUNT [type="submit"]')
            }
        },
        main = {
            self: document.querySelector('main'),
            catalogue: {
                self: document.querySelector('#catalogue'),
                filter: {
                    self: document.querySelector('#filters'),
                    gender: document.querySelector('#gender'),
                    categories: {
                        filter: [0, 0, 0, 0, 0, 0, 0, 0],
                        a: document.querySelectorAll('#categories a'),
                        li: document.querySelectorAll('#categories li')
                    },
                    color: {
                        filter: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        self: document.querySelectorAll('#colors a'),
                        colorArray: ['#003D71', '#C42C39', '#F4BC08', '#02882C', '#000', '#F9E7B6', '#EF8A07', '#5A433F', '#2C2C2C', '#8C56A9', '#AAE7FC', '#CACCCE', '#fff']
                    }
                }
            },
            myCart: document.querySelector('#MY_CART'),
            order: document.querySelector('#ORDER_TRACKING')
        },
        helper = {
            passwordErrors: [],
            error: {
                generate: function (o) {
                    return {
                        target: o !== undefined ? o.target : null,
                        message: o !== undefined ? o.message : '',
                        toString: function () {
                            console.log('Error appeard in ' + this.target + '.\nError staus: ' +
                                this + '.\nError message: ' + this.message);
                        }
                    }
                },
                hesh: {
                    login: {
                        email: null,
                        password: null
                    },
                    createAccount: {
                        postcode: null,
                        email: null,
                        confirmEmail: null,
                        password: null,
                        confirmPassword: null
                    }
                }
            },
            passwordValidation: function (password) {
                helper.passwordErrors = [];
                if (password.value.length === 0) {
                    return 'Password required.'
                }
                if (password.value.length < 8) {
                    helper.passwordErrors.push('Your password must be at list 8 characters');
                }
                if (password.value.search(/[0-9]/) < 0) {
                    helper.passwordErrors.push('Your password must contain at list one digit');
                }
                if (password.value.search(/[a-z]/) < 0) {
                    helper.passwordErrors.push('Your password must contain at list one lowercase');
                }
                if (password.value.search(/[A-Z]/) < 0) {
                    helper.passwordErrors.push('Your password must contain at list one uppercase');
                }
                if (password.value.search(/[!#$%&?_"]/) < 0) {
                    helper.passwordErrors.push('Your password must contain at list one special symbol');
                    return helper.passwordErrors.concat('. ');
                }
                return '';
            }
        },
        utils = {
            addListener: null,
            removeListener: null,
            preStop: null,
            pre: null,
            stop: null
        },
        i,
        db,
        output,
        cart,
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
        countCart = function () {
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
    loadCart();

    utils = {
        addListener: null,
        removeListener: null
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
    // Create in body to <img> for menu animation.
    (function longMenuAnimation() {
        var imgLong = document.createElement('img'),
            imgShort = document.createElement('img');
        if (!document.querySelector('.menu_choose')) {
            imgLong.style.position = imgShort.style.position = 'fixed';
            imgLong.style.zIndex = imgShort.style.zIndex = '3000';
            imgLong.className = imgShort.className = 'menu_choose';
            imgLong.style.display = imgShort.style.display = 'none';
            imgShort.src = '../content/svg/menu-choose-short.svg';
            imgLong.src = '../content/svg/menu-choose-long.svg';
            document.body.appendChild(imgLong);
            document.body.appendChild(imgShort);
        }
    })();
    // Window events
    (function () {
        // When screenTop U see abovemenu. When scrollOver abovemenu disapear's.
        utils.addListener(window, 'scroll', windowOnScroll, false);
        utils.addListener(window, 'resize', windowResizeHeader, false);
        utils.addListener(window, 'load', windowLoad, false);

        $(window).mousemove(function (event) {
            // Helper.
            if (event.clientY <= 20 && window.innerWidth > 550) {
                header.aNav.self.className = 'ABOVE_HEADER collapse show';
                windowResizeHeader();
            }
        });

        function windowLoad() {
            if (window.innerWidth > 550) {
                header.aNav.self.className = 'ABOVE_HEADER collapse show';
            }
            windowResizeHeader();
        }

        function windowOnScroll() {
            if (window.scrollY === 0 && window.innerWidth > 550) {
                header.aNav.self.className = 'ABOVE_HEADER collapse show';
                windowResizeHeader();
            } else {
                if (window.innerWidth > 550) {
                    header.aNav.self.className = 'ABOVE_HEADER collapse';
                    windowResizeHeader();
                }
            }
        }
    }());
    function windowResizeHeader() {
        document.querySelector('header').style.width = document.querySelector('main').scrollWidth + 'px';
        document.querySelector('main').style.marginTop = document.querySelector('header').offsetHeight + 'px';
        document.querySelector('footer').style.top = document.querySelector('header').offsetHeight + 'px';
        $('#grid').find('.selected').css('left', $('#filters').offset().left + $('#filters').outerWidth(true));
    }

    // Navigation
    (function () {
        utils.addListener(header.bNav.logo, 'click', function () {
            header.toggle();
            windowResizeHeader();
        }, false);
        // Menu transition.
        utils.addListener(header.bNav.menu.self, 'mousemove', headerBnavMenuOnMouseMove, false);
        utils.addListener(header.bNav.menu.self, 'mouseout', headerBnavMenuOnMouseOut, false);
        function headerBnavMenuOnMouseMove(e) {
            var helperParam = {
                target: null,
                targetImg: null,
                img: null,
                a: null,
                e: e
            };
            switch (e.target) {
                // Links.
                case header.bNav.menu.menLink:
                {
                    helperParam = {
                        target: header.bNav.menu.men,
                        targetImg: document.querySelectorAll('.menu_choose')[1],
                        img: document.querySelectorAll('.menu_choose')[0],
                        a: document.querySelector('.MEN>a'),
                        e: e
                    };
                    headerOnMouseMoveHelper(helperParam);
                    break;
                }
                case header.bNav.menu.womanLink:
                {
                    helperParam = {
                        target: header.bNav.menu.woman,
                        targetImg: document.querySelectorAll('.menu_choose')[0],
                        img: document.querySelectorAll('.menu_choose')[1],
                        a: document.querySelector('.WOMAN>a'),
                        e: e
                    };
                    headerOnMouseMoveHelper(helperParam);
                    break;
                }
                case header.bNav.menu.kidsLink:
                {
                    helperParam = {
                        target: header.bNav.menu.kids,
                        targetImg: document.querySelectorAll('.menu_choose')[1],
                        img: document.querySelectorAll('.menu_choose')[0],
                        a: document.querySelector('.KIDS>a'),
                        e: e
                    };
                    headerOnMouseMoveHelper(helperParam);
                    break;
                }
                case header.bNav.menu.sportsLink:
                {
                    helperParam = {
                        target: header.bNav.menu.sports,
                        targetImg: document.querySelectorAll('.menu_choose')[0],
                        img: document.querySelectorAll('.menu_choose')[1],
                        a: document.querySelector('.SPORTS>a'),
                        e: e
                    };
                    headerOnMouseMoveHelper(helperParam);
                    break;
                }
                case header.bNav.menu.catalogLink:
                {
                    helperParam = {
                        target: header.bNav.menu.catalog,
                        targetImg: document.querySelectorAll('.menu_choose')[0],
                        img: document.querySelectorAll('.menu_choose')[1],
                        a: header.bNav.menu.catalogLink,
                        e: e
                    };
                    headerOnMouseMoveHelper(helperParam);
                    break;
                }
                // Span.
                case header.bNav.menu.menSpan:
                {
                    helperParam = {
                        target: header.bNav.menu.men,
                        targetImg: document.querySelectorAll('.menu_choose')[1],
                        img: document.querySelectorAll('.menu_choose')[0],
                        a: document.querySelector('.MEN>a'),
                        e: e
                    };
                    headerOnMouseMoveHelper(helperParam);
                    break;
                }
                case header.bNav.menu.womanSpan:
                {
                    helperParam = {
                        target: header.bNav.menu.woman,
                        targetImg: document.querySelectorAll('.menu_choose')[0],
                        img: document.querySelectorAll('.menu_choose')[1],
                        a: document.querySelector('.WOMAN>a'),
                        e: e
                    };
                    headerOnMouseMoveHelper(helperParam);
                    break;
                }
                case header.bNav.menu.kidsSpan:
                {
                    helperParam = {
                        target: header.bNav.menu.kids,
                        targetImg: document.querySelectorAll('.menu_choose')[1],
                        img: document.querySelectorAll('.menu_choose')[0],
                        a: document.querySelector('.KIDS>a'),
                        e: e
                    };
                    headerOnMouseMoveHelper(helperParam);
                    break;
                }
                case header.bNav.menu.sportsSpan:
                {
                    helperParam = {
                        target: header.bNav.menu.sports,
                        targetImg: document.querySelectorAll('.menu_choose')[0],
                        img: document.querySelectorAll('.menu_choose')[1],
                        a: document.querySelector('.SPORTS>a'),
                        e: e
                    };
                    headerOnMouseMoveHelper(helperParam);
                    break;
                }
                case header.bNav.menu.catalogSpan:
                {
                    helperParam = {
                        target: header.bNav.menu.catalog,
                        targetImg: document.querySelectorAll('.menu_choose')[0],
                        img: document.querySelectorAll('.menu_choose')[1],
                        a: header.bNav.menu.catalogLink,
                        e: e
                    };
                    headerOnMouseMoveHelper(helperParam);
                    break;
                }
                // Blog.
                case header.bNav.menu.blogLink && header.bNav.menu.blogSpan:
                {
                    helperParam = {
                        target: header.bNav.menu.blog,
                        targetImg: document.querySelectorAll('.menu_choose')[1],
                        img: document.querySelectorAll('.menu_choose')[0],
                        a: document.querySelector('.BLOG>a'),
                        e: e
                    };
                    headerOnMouseMoveHelper(helperParam);
                    break;
                }
                case header.bNav.menu.self:
                {
                    dropMenu.className = 'dropmenu';
                    break;
                }
                case header.self:
                {
                    if (header.aNav.self.className === 'ABOVE_HEADER collapse') {
                        dropMenu.className = 'dropmenu show upper';
                    } else {
                        dropMenu.className = 'dropmenu show';
                    }
                    break;
                }
            }
        }

        function headerBnavMenuOnMouseOut(e) {

            switch (e.target) {
                case header.bNav.menu.self:
                {
                    dropMenu.className = 'dropmenu';
                    break;
                }
                case header.self:
                {
                    if (header.aNav.self.className === 'ABOVE_HEADER collapse') {
                        dropMenu.className = 'dropmenu show upper';
                    } else {
                        dropMenu.className = 'dropmenu show';
                    }
                    break;
                }
            }
            document.querySelectorAll('.menu_choose')[0].style.display = 'none';
            document.querySelectorAll('.menu_choose')[1].style.display = 'none';
            document.querySelectorAll('.menu_choose')[0].style.margin = '0';
        }

        function headerOnMouseMoveHelper(o) {
            o.targetImg.style.top = o.target.offsetTop + o.target.offsetHeight - 6 + 'px';
            o.targetImg.style.left = o.target.offsetLeft + 'px';
            o.targetImg.style.width = o.target.offsetWidth + 'px';
            o.targetImg.style.margin = '0';
            o.targetImg.style.display = 'block';
            o.targetImg.style.height = '8px';
            o.img.style.display = 'none';
            o.a.className = 'hover';
            // For All exept BLOG
            if (o.target !== header.bNav.menu.blog) {
                if (header.aNav.self.className === 'ABOVE_HEADER collapse') {
                    dropMenu.className = 'dropmenu show upper';
                } else {
                    dropMenu.className = 'dropmenu show';
                }
            }
            // Highlights only one category and else not.
            for (var i = 0; i < header.bNav.menu.links.length; i += 1) {
                if (header.bNav.menu.links[i] !== o.a) {
                    header.bNav.menu.links[i].className = '';
                }
            }
        }
    }());
    // Dropmenu fadeIn fadeOut
    (function () {
        utils.addListener(document.querySelector('main'), 'mousemove', mainMouseMoveHideDropmenu, false);
        utils.addListener(document.querySelector('footer'), 'mousemove', footerMouseMoveHideDropmenu, false);
        utils.addListener(header.aNav.self, 'mousemove', headerAnavMouseMoveHideDropmenu, false);
        utils.addListener(dropMenu, 'mousemove', dropMenuMouseMove, false);
        utils.addListener(document.body, 'mousemove', headerMouseMoveShowAnav, false);
        function mainMouseMoveHideDropmenu() {
            dropMenu.className = 'dropmenu';
            for (var i = 0; i < header.bNav.menu.links.length; i += 1) {
                header.bNav.menu.links[i].className = '';
            }
        }

        function footerMouseMoveHideDropmenu() {
            dropMenu.className = 'dropmenu';
            for (var i = 0; i < header.bNav.menu.links.length; i += 1) {
                header.bNav.menu.links[i].className = '';
            }
        }

        function headerAnavMouseMoveHideDropmenu() {
            dropMenu.className = 'dropmenu';
            for (var i = 0; i < header.bNav.menu.links.length; i += 1) {
                header.bNav.menu.links[i].className = '';
            }
        }

        function dropMenuMouseMove() {
            if (header.aNav.self.className === 'ABOVE_HEADER collapse') {
                dropMenu.className = 'dropmenu show upper';
            } else {
                dropMenu.className = 'dropmenu show';
            }
        }

        function headerMouseMoveShowAnav(e) {

            // Window top and not mobile version.
            if (e.screenY <= 120 && window.innerWidth > 550) {
                header.aNav.self.className = 'ABOVE_HEADER collapse show';
                windowResizeHeader();
            }
        }
    }());
    // Filter generate color.
    for (output = '', i = 0; i < 13; i += 1) {
        var color = main.catalogue.filter.color.colorArray[i];
        output += '<li><a href="#" style="'
            + 'background-color:' + color + '; '
            + 'box-shadow: 0 0 0 1px ' + color + ', 0 0 0 3px ' + color + ';" ' +
            'data-type = "' + color + '"></a></li>';
    }
    // Filter Colors events.
    $('#colors').html(output)
        .on('click', 'a', function (event) {
            var tmp = $('#colors').find('a'),
                color = $(this).attr('data-type');
            $('#grid').find('.selected').removeClass('selected');
            for (i in tmp) {
                if (Object.prototype.hasOwnProperty.call(tmp, i)) {
                    if ($(this)[0] === tmp[i]) {
                        break;
                    }
                }
            }
            if (!$(this).hasClass('selected')) {
                if (color === 'rgb(255, 255, 255)') {
                    $(this).css('box-shadow', '0 0 0 1px #fff, 0 0 0 3px rgb(42, 56, 55)');
                } else {
                    $(this).css('box-shadow', '0 0 0 1px #fff, 0 0 0 3px rgb(42, 56, 55)');
                }
                $(this).addClass('selected');
                main.catalogue.filter.color.filter[i] = $(this).attr('data-type');
            } else {
                if (color === 'rgb(255, 255, 255)') {
                    $(this).css('box-shadow', '0 0 0 2px #fff, 0 0 0 3px #CACCCE');
                } else {
                    $(this).css('box-shadow', '0 0 0 1px ' + color + ', 0 0 0 3px ' + color);
                }
                $(this).removeClass('selected');
                main.catalogue.filter.color.filter[i] = 0;
            }
            firstShow(main.catalogue.filter.color.filter);
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
                main.catalogue.filter.categories.filter[i] = $(this).attr('data-type');
            } else {
                $(this).parent().css('border', '2px solid rgb(229, 235, 241)');
                $(this).removeClass('selected');
                main.catalogue.filter.categories.filter[i] = 0;
            }
            firstShow(main.catalogue.filter.categories.filter);
        });
    // Filtering items.
    function firstShow(arr) {
        for (var tmp = 0, i = 0; i < arr.length - 1; i += 1) {
            tmp += arr[i];
        }
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

    // Get data from JSON.
    $.ajax({
        url: '../js/goods.json',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            localStorage.setItem('db', JSON.stringify(data));
        }
    });
    db = JSON.parse(localStorage.getItem('db'));
    output = '';
    // Grid generate Items.
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

    // Cart mathods.
    $('main')
        .on('click', '.delete-item', function () {
            var id = $(this).attr('data-id');
            removeItemsFromCartAll(id);
            displayCart();
        })
        .on('click', '.substract-item', function () {
            var id = $(this).attr('data-id');
            removeItemFromCart(id);
            displayCart();
        })
        .on('click', '.clear-cart',function (event) {
            clearCart();
            displayCart();
            utils.preStop(event);
        })
        .on('click', '.confirm-cart',function(){});
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
        $('.fa-cart-arrow-down').addClass('show');
        $('.fa-shopping-cart').removeClass('show');
    });

// Show to track menu.
    $('#TO_TRACK').on('click', 'a', function () {
        windowResizeHeader();
        $('#MY_CART').removeClass('show');
        $('#CATALOGUE').removeClass('show');
        $('#ORDER_TRACKING').addClass('show');
    });
// Show shoping cart.
    $('#SHOPING_CART').on('click', 'a', function () {
        windowResizeHeader();
        $('#MY_CART').addClass('show');
        $('#CATALOGUE').removeClass('show');
        $('#ORDER_TRACKING').removeClass('show');
        displayCart();
    });
// Show catalog.
    $('#MENU').on('click', '.catalog', showCatalog);
    $('#LOGO').on('click', function () {
        if (window.innerWidth > 550) {
            showCatalog();
        }
    });
    $('footer').find('.PRODUCTS').on('click', 'a', showCatalog);
    function showCatalog() {
        windowResizeHeader();
        $('#MY_CART').removeClass('show');
        $('#CATALOGUE').addClass('show');
        $('#ORDER_TRACKING').removeClass('show');
    }

    function displayCart() {
        var myCart,
            output,
            totalCount,
            totalPrice;
        loadCart();
        totalCount = countCart();
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
                    '<div class="cartColor" style="background-color: ' + myCart[i].color + ';"></div>' +
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
                        '<p><strong>Total count: </strong>' + totalCount + '</p>' +
                    '</div>' +
                    '<div class="confButtons">' +
                        '<a class = "clear-cart" href="#"><i class="fa fa-times"></i></a>' +
                        '<a class = "confirm-cart" href="#"><i class="fa fa-check"></i></a>' +
                    '</div>' +
                '</div>';
        }
        $('#CART_CONTAINER').html(output);
        window.scrollTo(0, 0);
    }

// login.
    (function () {
        utils.addListener(document.querySelector('.LOGIN a'), 'click', headerAboveMenuLogicCkick, false);
        utils.addListener(login.self, 'click', loginClick, false);
        utils.addListener(login.have_account.submit, 'click', loginHaveAccountSubmit, true);
        utils.addListener(login.have_account.password, 'blur', loginPasswordValidate, false);
        utils.addListener(login.have_account.email, 'blur', loginEmailValidate, false);
        function loginPasswordValidate() {
            helper.error.hesh.login.password = helper.error.generate({

                target: login.have_account.password,
                message: helper.passwordValidation(login.have_account.password)
            });
            if (helper.error.hesh.login.password.message !== '') {
                login.have_account.error_msg.innerHTML = helper.error.hesh.login.password.message;
                login.have_account.password.className = 'incorrect';
            } else {
                helper.error.hesh.login.password = null;
                login.have_account.error_msg.innerHTML = '';
                login.have_account.password.className = '';
                login.have_account.password.validity.patternMismatch = true;
            }
        }

        function loginEmailValidate() {
            login.have_account.email.required = true;
            if (login.have_account.email.validity.valueMissing) {
                helper.error.hesh.login.email = helper.error.generate(
                    {
                        target: login.have_account.email,
                        message: 'Email required.'
                    });
                login.have_account.error_msg.innerHTML = helper.error.hesh.login.email.message;
                login.have_account.email.className = 'incorrect';
            }
            if (login.have_account.email.validity.typeMismatch) {
                helper.error.hesh.login.email = helper.error.generate(
                    {
                        target: login.have_account.email,
                        message: 'Incorrect email.'
                    });
                login.have_account.error_msg.innerHTML = helper.error.hesh.login.email.message;
                login.have_account.email.className = 'incorrect';
            }
            if (login.have_account.email.validity.valid) {
                helper.error.hesh.login.email = null;
                login.have_account.error_msg.innerHTML = '';
                login.have_account.email.className = '';
                login.have_account.email.required = false;
            }
        }

        function loginHaveAccountSubmit() {
            if (!helper.error.hesh.login.email) {
                loginEmailValidate();
            }
            if (!helper.error.hesh.login.password) {
                loginPasswordValidate();
            }
            if (helper.error.hesh.login.email === true) {
                login.have_account.email.focus();
            } else {
                if (helper.error.hesh.login.password === true) {
                    login.have_account.password.focus();
                }
            }
        }

        function loginClick(e) {

            switch (e.target) {
                case login.self :
                {
                    login.self.className = 'POPIN_LOGIN';
                    document.querySelector('main').className = '';
                    document.querySelector('header').className = '';
                    document.querySelector('footer').className = '';
                    break;
                }
                case login.not_have_account.submit:
                {
                    createAccount.self.className = 'CREATE_ACCAUNT show';
                    login.self.className = 'POPIN_LOGIN';
                    document.querySelector('main').className = 'modal';
                    document.querySelector('header').className = 'modal';
                    document.querySelector('footer').className = 'modal';
                    break;
                }
            }
            utils.preStop(e);
        }

        function headerAboveMenuLogicCkick() {
            login.self.className = 'POPIN_LOGIN show';
            document.querySelector('main').className = 'modal';
            document.querySelector('header').className = 'modal';
            document.querySelector('footer').className = 'modal';
        }
    }());
// createAccount.
    (function () {
        utils.addListener(createAccount.postcode, 'blur', createAccountPostCodeValidate, false);
        utils.addListener(createAccount.password, 'blur', createAccountPasswordValidate, false);
        utils.addListener(createAccount.email, 'blur', createAccountEmailValidate, false);
        utils.addListener(createAccount.confirmPassword, 'blur', createAccountConfirmPasswordValidate, false);
        utils.addListener(createAccount.confirmEmail, 'blur', createAccountConfirmEmailValidate, false);
        utils.addListener(createAccount.tel, 'blur', createAccountTelValidate, false);
        utils.addListener(createAccount.self, 'click', function () {
            createAccount.self.className = 'CREATE_ACCAUNT';
            document.querySelector('main').className = '';
            document.querySelector('header').className = '';
            document.querySelector('footer').className = '';
        }, false);
        utils.addListener(document.querySelector('.CREATE_ACCAUNT form'), 'click', function (e) {
            utils.preStop(e);
        }, true);
        utils.addListener(createAccount.submit, 'click', createAccountSubmit, false);
        function createAccountSubmit() {
            Array.prototype.forEach.call(document.querySelectorAll('.CREATE_ACCAUNT [type="text"]'), function (el) {
                if (el.validity.valueMissing) {
                    el.focus();
                }
            });
            createAccountPostCodeValidate();
            createAccountEmailValidate();
            createAccountConfirmEmailValidate();
            createAccountPasswordValidate();
            createAccountConfirmPasswordValidate();
            createAccountTelValidate();
        }

        function createAccountTelValidate() {
            createAccount.tel.required = true;
            if (createAccount.tel.validity.valueMissing) {
                helper.error.hesh.createAccount.tel = helper.error.generate({
                    target: createAccount.tel,
                    message: 'Must not be empty.'
                });
                document.querySelector('.tel.error_msg').innerHTML = helper.error.hesh.createAccount.tel.message;
                createAccount.tel.className = 'incorrect';
            }
            if (createAccount.tel.validity.patternMismatch) {
                helper.error.hesh.createAccount.tel = helper.error.generate({
                    target: createAccount.tel,
                    message: 'Must be 10 digits.'
                });
                document.querySelector('.tel.error_msg').innerHTML = helper.error.hesh.createAccount.tel.message;
                createAccount.tel.className = 'incorrect';
            } else {
                helper.error.hesh.createAccount.tel = null;
                document.querySelector('.tel.error_msg').innerHTML = '';
                createAccount.tel.className = '';
            }
        }

        function createAccountConfirmPasswordValidate() {
            if (createAccount.confirmPassword.value !== createAccount.password.value) {
                helper.error.hesh.createAccount.confirmPassword = helper.error.generate({
                    target: createAccount.confirmPassword,
                    message: 'Duplicate password, please.'
                });
                document.querySelector('.confirmCreatePassword.error_msg').innerHTML = helper.error.hesh.createAccount.confirmPassword.message;
                createAccount.confirmPassword.className = 'incorrect';
            } else {
                helper.error.hesh.createAccount.confirmPassword = null;
                document.querySelector('.confirmCreatePassword.error_msg').innerHTML = '';
                createAccount.confirmPassword.className = '';
            }
        }

        function createAccountConfirmEmailValidate() {
            if (createAccount.confirmEmail.value !== createAccount.email.value) {
                helper.error.hesh.createAccount.confirmEmail = helper.error.generate({
                    target: createAccount.confirmEmail,
                    message: 'Duplicate email, please.'
                });
                document.querySelector('.confirmCreateEmail.error_msg').innerHTML = helper.error.hesh.createAccount.confirmEmail.message;
                createAccount.confirmEmail.className = 'incorrect';
            } else {
                helper.error.hesh.createAccount.confirmEmail = null;
                document.querySelector('.confirmCreateEmail.error_msg').innerHTML = '';
                createAccount.confirmEmail.className = '';
            }
        }

        function createAccountPasswordValidate() {
            helper.error.hesh.createAccount.password = helper.error.generate({
                target: createAccount.password,
                message: helper.passwordValidation(createAccount.password)
            });
            if (helper.error.hesh.createAccount.password.message !== '') {
                document.querySelector('.createPassword.error_msg').innerHTML = helper.error.hesh.createAccount.password.message;
                createAccount.password.className = 'incorrect';
            } else {
                helper.error.hesh.createAccount.password = null;
                document.querySelector('.createPassword.error_msg').innerHTML = '';
                createAccount.password.className = '';
            }
        }

        function createAccountEmailValidate() {
            createAccount.email.required = true;
            if (createAccount.email.validity.valueMissing) {
                helper.error.hesh.createAccount.email = helper.error.generate(
                    {
                        target: createAccount.email,
                        message: 'Email required.'
                    });
                document.querySelector('.createEmail.error_msg').innerHTML = helper.error.hesh.createAccount.email.message;
                createAccount.email.className = 'incorrect';
            }
            if (createAccount.email.validity.typeMismatch) {
                helper.error.hesh.createAccount.email = helper.error.generate(
                    {
                        target: createAccount.email,
                        message: 'Incorrect email.'
                    });
                document.querySelector('.createEmail.error_msg').innerHTML = helper.error.hesh.createAccount.email.message;
                createAccount.email.className = 'incorrect';
            }
            if (createAccount.email.validity.valid) {
                helper.error.hesh.createAccount.email = null;
                document.querySelector('.createEmail.error_msg').innerHTML = '';
                createAccount.email.className = '';
                createAccount.email.required = false;
            }
        }

        function createAccountPostCodeValidate() {
            createAccount.postcode.required = true;
            if (createAccount.postcode.validity.valueMissing) {
                helper.error.hesh.createAccount.postcode = helper.error.generate({
                    target: createAccount.postcode,
                    message: 'Must not be empty.'
                });
                createAccount.postcode.className = 'incorrect';
                document.querySelector('.postcode').innerHTML = helper.error.hesh.createAccount.postcode.message;
            }
            if (createAccount.postcode.value < 1001) {
                helper.error.hesh.createAccount.postcode = helper.error.generate({
                    target: createAccount.postcode,
                    message: 'Minimum 1001.'
                });
                createAccount.postcode.className = 'incorrect';
                document.querySelector('.postcode').innerHTML = helper.error.hesh.createAccount.postcode.message;
            } else {
                helper.error.hesh.createAccount.postcode = null;
                createAccount.postcode.className = '';
                createAccount.postcode.required = false;
                document.querySelector('.postcode').innerHTML = '';
            }
        }
    }());
// blocking links.
    Array.prototype.forEach.call(document.querySelectorAll('a'), function (el) {
        utils.addListener(el, 'click', function (e) {

            utils.pre(e)
        }, false);
    });
}());