var tmp = (function () {
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
                logo: document.querySelector('.LOGO'),
                menu: {
                    self: document.querySelector('.MENU'),
                    links: document.querySelectorAll('.MENU a'),
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
        order = document.querySelector('.ORDER_TRACKING'),
        my_cart = document.querySelector('.MY_CART'),
        register = document.querySelector('.CREATE_ACCAUNT'),
        utils = {
            addListener: null,
            removeListener: null,
            preventStop: null,
            prevent: null,
            stop: null
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

        // Normal browsers: utils.stop, utils.prevent, utils.preventStop.
        if (typeof Event.prototype.preventDefault === 'function') {
            utils.prevent = function (e) {
                e.preventDefault();
            };
            if (typeof Event.prototype.stopPropagation === 'function') {
                utils.stop = function (e) {
                    e.stopPropagation();
                };
                utils.preventStop = function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                }
            }
        } else {

            // IE: utils.stop, utils.prevent, utils.preventStop.
            if (typeof Event.prototype.returnValue === 'boolean') {
                utils.prevent = function (e) {
                    e.preventDefault();
                };
                if (typeof Event.prototype.cancelBubble === 'boolean') {
                    utils.stop = function (e) {
                        e.stopPropagation();
                    };
                    utils.preventStop = function (e) {
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

    // When screenTop U see abovemenu. When scrollOver abovemenu disapear's.
    utils.addListener(window, 'scroll', windowOnScroll, false);
    // Menu transition.
    utils.addListener(header.bNav.menu.self, 'mousemove', headerBnavMenuOnMouseMove, false);
    utils.addListener(header.bNav.menu.self, 'mouseout', headerBnavMenuOnMouseOut, false);
    // Dropmenu fadeIn fadeOut
    utils.addListener(document.querySelector('main'), 'mousemove', mainMouseMoveHideDropmenu, false);
    utils.addListener(document.querySelector('footer'), 'mousemove', footerMouseMoveHideDropmenu, false);
    utils.addListener(header.aNav.self, 'mousemove', headerAnavMouseMoveHideDropmenu, false);

    utils.addListener(dropMenu, 'mousemove', dropMenuMouseMove, false);
    utils.addListener(document.body, 'mousemove', headerMouseMoveShowAnav, false);
    utils.addListener(window, 'resize', windowResizeHeader, false);
    utils.addListener(window, 'load', windowLoad, false);
    utils.addListener(header.bNav.logo, 'click', function () {
        header.toggle();
        windowResizeHeader();
    }, false);

    utils.addListener(document.querySelector('.TO_TRACK a'), 'click', function () {
        my_cart.className = 'MY_CART';
        windowResizeHeader();
        if (order.className === 'ORDER_TRACKING show') {
            order.className = 'ORDER_TRACKING';
        } else {
            order.className = 'ORDER_TRACKING show';
        }
    }, false);
    utils.addListener(document.querySelector('.SHOPING_CART a'), 'click', function () {
        order.className = 'ORDER_TRACKING';
        windowResizeHeader();
        if (my_cart.className === 'MY_CART show') {
            my_cart.className = 'MY_CART';
        } else {
            my_cart.className = 'MY_CART show';
        }
    }, false);

    utils.addListener(document.querySelector('.LOGIN a'), 'click', headerAboveMenuLogicCkick, false);
    function headerAboveMenuLogicCkick() {
        login.self.className = 'POPIN_LOGIN show';
        document.querySelector('main').className = 'modal';
        document.querySelector('header').className = 'modal';
        document.querySelector('footer').className = 'modal';
    }

    var login = {
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
    };
    var helper = {
        passwordErrors: [],
        mailError: '',
        passwordValidation: function( password ){
            helper.passwordErrors = [];
            if (password.value.length === 0) {
                return 'Password required.'
            }
            if (password.value.length < 8){
                helper.passwordErrors.push('Your password must be at list 8 characters');
            }
            if (password.value.search(/[0-9]/) < 0){
                helper.passwordErrors.push('Your password must contain at list one digit');
            }
            if (password.value.search(/[a-z]/) < 0){
                helper.passwordErrors.push('Your password must contain at list one lowercase');
            }
            if (password.value.search(/[A-Z]/) < 0){
                helper.passwordErrors.push('Your password must contain at list one uppercase');
            }
            if (password.value.search(/[!#$%&?_"]/) < 0){
                helper.passwordErrors.push('Your password must contain at list one special symbol');
                return helper.passwordErrors.concat('. ');
            }
            return false;
        }
    };

    utils.addListener( login.self, 'click', loginClick, false);
    function loginClick(e) {
        switch(e.target){
            case login.self : {
                login.self.className = 'POPIN_LOGIN';
                document.querySelector('main').className = '';
                document.querySelector('header').className = '';
                document.querySelector('footer').className = '';
                break;
            }
            case login.not_have_account.submit: {
                register.className = 'CREATE_ACCAUNT show';
                login.self.className = 'POPIN_LOGIN';
                document.querySelector('main').className = 'modal';
                document.querySelector('header').className = 'modal';
                document.querySelector('footer').className = 'modal';
                break;
            }
        }
        utils.preventStop(e);
    }

    utils.addListener( login.have_account.submit, 'click', loginHaveAccountSubmit, false);
    function loginHaveAccountSubmit(e){
        loginEmailValidate();
        loginPasswordValidate();
        if (helper.mailError !== '') {
            login.have_account.email.focus();
        }
        else {
            if (helper.passwordErrors.length > 0) {
                login.have_account.password.focus();
            }
        }
    }

    utils.addListener( login.have_account.password, 'blur', loginPasswordValidate, false);
    utils.addListener( login.have_account.email, 'blur', loginEmailValidate, false);
    function loginPasswordValidate() {
        var msg = helper.passwordValidation(login.have_account.password);
        if (msg) {
            login.have_account.error_msg.innerHTML = msg;
            login.have_account.password.className  = 'incorrect';
        } else {
            login.have_account.error_msg.innerHTML = '';
            login.have_account.password.className  = 'correct';
        }
    }
    function loginEmailValidate() {
        if (login.have_account.email.value.length === 0){
            helper.mailError = 'Email required.';
            login.have_account.error_msg.innerHTML = helper.mailError;
            login.have_account.email.className  = 'incorrect';
        } else {
            helper.mailError = '';
            login.have_account.email.className  = 'correct';
        }
    }

    utils.addListener(register, 'click', function (e) {
        register.className = 'CREATE_ACCAUNT';
        document.querySelector('main').className = '';
        document.querySelector('header').className = '';
        document.querySelector('footer').className = '';
        utils.preventStop(e);
    }, false);

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

    function windowLoad() {
        if (window.innerWidth > 550) {
            header.aNav.self.className = 'ABOVE_HEADER collapse show';
        }
        windowResizeHeader();
    }

    function headerMouseMoveShowAnav(e) {
        // Helper.
        document.querySelector("[type='search']").placeholder = e.screenX + " " + e.screenY + " " + window.scrollY;
        // Window top and not mobile version.
        if (e.screenY <= 160 && window.innerWidth > 550) {
            header.aNav.self.className = 'ABOVE_HEADER collapse show';
            windowResizeHeader();
        }
    }

    function headerBnavMenuOnMouseMove(e) {
        var helperParam = {
            target: null,
            targetImg: null,
            img: null,
            a: null,
            event: e
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
                    event: e
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
                    event: e
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
                    event: e
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
                    event: e
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
                    event: e
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
                    event: e
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
                    event: e
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
                    event: e
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
                    event: e
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
                    event: e
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
                    event: e
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

    function dropMenuMouseMove() {
        if (header.aNav.self.className === 'ABOVE_HEADER collapse') {
            dropMenu.className = 'dropmenu show upper';
        } else {
            dropMenu.className = 'dropmenu show';
        }
    }

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

    function windowResizeHeader() {
        document.querySelector('header').style.width = document.querySelector('#scroll').scrollWidth + 'px';
        document.querySelector('#scroll').style.marginTop = document.querySelector('header').offsetHeight + 'px';
    }

    Array.prototype.forEach.call(document.querySelectorAll('a'), function (el) {
        utils.addListener(el, 'click', function (e) {
            utils.prevent(e)
        }, false);
    });


}());