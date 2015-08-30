var EPAM =
    (function () {
        var header = {
            aboveNavigation: {
                self: document.querySelector('.ABOVE_HEADER'),
                description: document.querySelector('.DESCRIPTION'),
                toTrack: document.querySelector('.TO_TRACK'),
                login: document.querySelector('.LOGIN'),
                shoppingCart: document.querySelector('.SHOPING_CART'),
                hide: function () {
                    header.aboveNavigation.self.className = 'ABOVE_HEADER collapse';
                },
                show: function () {
                    header.aboveNavigation.self.className = 'ABOVE_HEADER';
                },
                toggle: function () {
                    if (document.querySelector('.ABOVE_HEADER.collapse')) {
                        header.aboveNavigation.show();
                    } else {
                        header.aboveNavigation.hide();
                    }
                }
            },
            belowNavigation: {
                self: document.querySelector('.BELOW_HEADER'),
                logo: document.querySelector('.LOGO'),
                menu: {
                    self: document.querySelector('.MENU'),
                    catalog: document.querySelector('.CATALOG'),
                    men: document.querySelector('.MEN'),
                    woman: document.querySelector('.WOMAN'),
                    kids: document.querySelector('.KIDS'),
                    sports: document.querySelector('.SPORTS'),
                    blog: document.querySelector('.BLOG')
                },
                search: document.querySelector('.search'),
                hide: function () {
                    header.belowNavigation.self.className = 'BELOW_HEADER collapse';
                },
                show: function () {
                    header.belowNavigation.self.className = 'BELOW_HEADER';
                },
                toggle: function () {
                    if (document.querySelector('.BELOW_HEADER.collapse')) {
                        header.belowNavigation.show();
                    } else {
                        header.belowNavigation.hide();
                    }
                }
            },
            show: function () {
                header.belowNavigation.show();
                header.aboveNavigation.show();
            },
            hide: function () {
                header.belowNavigation.hide();
                header.aboveNavigation.hide();

            },
            toggle: function () {
                if (document.querySelector('.ABOVE_HEADER.collapse') &&
                    document.querySelector('.BELOW_HEADER.collapse')) {
                    header.show();
                } else {
                    header.hide();
                }
            }
        };
        // Resize header to show scroll onload and each time after resizing window.
        window.addEventListener('resize', scrollShow, false);
        window.addEventListener('load', initDoc, false);
        function initDoc() {
            if (window.innerWidth > 550) {
                header.aboveNavigation.self.className = 'ABOVE_HEADER collapse show';
            }
            scrollShow();
        }

        function scrollShow() {
            document.querySelector('header').style.width = document.querySelector('#scroll').scrollWidth + 'px';
            document.querySelector('#scroll').style.marginTop = document.querySelector('header').offsetHeight + 'px';
        }

        // Toggle logo in site.
        document.addEventListener('click', LOGO_Click, false);
        function LOGO_Click() {
            header.toggle();
            scrollShow();
        }

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

        // Menu adding events for animation.
        // Moousemove.
        header.belowNavigation.menu.self.addEventListener('mousemove', menuOnMouseMove, false);
        function menuOnMouseMove(e) {
            var helperParam = {
                target: null,
                targetImg: null,
                img: null,
                a: null,
                event: e
            };
            switch (e.target) {
                case document.querySelector('.MEN a') && document.querySelector('.MEN span'):
                {
                    helperParam = {
                        target: header.belowNavigation.menu.men,
                        targetImg: document.querySelectorAll('.menu_choose')[1],
                        img: document.querySelectorAll('.menu_choose')[0],
                        a: document.querySelector('.MEN>a'),
                        event: e
                    };
                    onMouseMoveHelper(helperParam);
                    break;
                }
                case document.querySelector('.WOMAN a') && document.querySelector('.WOMAN span'):
                {
                    helperParam = {
                        target: header.belowNavigation.menu.woman,
                        targetImg: document.querySelectorAll('.menu_choose')[0],
                        img: document.querySelectorAll('.menu_choose')[1],
                        a: document.querySelector('.WOMAN>a'),
                        event: e
                    };
                    onMouseMoveHelper(helperParam);
                    break;
                }
                case document.querySelector('.KIDS a') && document.querySelector('.KIDS span'):
                {
                    helperParam = {
                        target: header.belowNavigation.menu.kids,
                        targetImg: document.querySelectorAll('.menu_choose')[1],
                        img: document.querySelectorAll('.menu_choose')[0],
                        a: document.querySelector('.KIDS>a'),
                        event: e
                    };
                    onMouseMoveHelper(helperParam);
                    break;
                }
                case document.querySelector('.SPORTS a') && document.querySelector('.SPORTS span'):
                {
                    helperParam = {
                        target: header.belowNavigation.menu.sports,
                        targetImg: document.querySelectorAll('.menu_choose')[0],
                        img: document.querySelectorAll('.menu_choose')[1],
                        a: document.querySelector('.SPORTS>a'),
                        event: e
                    };
                    onMouseMoveHelper(helperParam);
                    break;
                }
                case document.querySelector('.BLOG a') && document.querySelector('.BLOG span'):
                {
                    helperParam = {
                        target: header.belowNavigation.menu.blog,
                        targetImg: document.querySelectorAll('.menu_choose')[1],
                        img: document.querySelectorAll('.menu_choose')[0],
                        a: document.querySelector('.BLOG>a'),
                        event: e
                    };
                    onMouseMoveHelper(helperParam);
                    break;
                }
                case document.querySelector('.CATALOG>a') && document.querySelector('.CATALOG span'):
                {
                    helperParam = {
                        target: header.belowNavigation.menu.catalog,
                        targetImg: document.querySelectorAll('.menu_choose')[0],
                        img: document.querySelectorAll('.menu_choose')[1],
                        a: document.querySelector('.CATALOG>a'),
                        event: e
                    };
                    onMouseMoveHelper(helperParam);
                    break;
                }
            }
        }

        function onMouseMoveHelper(o) {
            o['targetImg'].style.top = o['target'].offsetTop + o['target'].offsetHeight - 6 + 'px';
            o['targetImg'].style.left = o['target'].offsetLeft + 'px';
            o['targetImg'].style.width = o['target'].offsetWidth + 'px';
            o['targetImg'].style.margin = '0';
            if (o['target'] === header.belowNavigation.menu.blog) {
                o['targetImg'].style.marginLeft = parseInt(window.getComputedStyle(header.belowNavigation.menu.blog).marginLeft) + 'px';
            }
            o['targetImg'].style.display = 'block';
            o['targetImg'].style.height = '8px';
            o['img'].style.display = 'none';
            o['a'].className = 'hover';
            if ( o.target !== header.belowNavigation.menu.blog ) {
                document.querySelector('.dropmenu').className = 'dropmenu show';
            }
            o.event.stopPropagation();
            o.event.preventDefault();
        }

        /*function hideDropMenu(){
            document.querySelector('.dropmenu').className = 'dropmenu';
        }*/

        // Mouseout.
        header.belowNavigation.menu.self.addEventListener('mouseout', menuOnMouseOut, false);
        function menuOnMouseOut(e) {
            var helperParam = {
                target: null,
                targetImg: null,
                img: null,
                a: null,
                event: e
            };
            switch (e.target) {
                case document.querySelector('.MEN a') && document.querySelector('.MEN span'):
                {
                    helperParam = {
                        target: header.belowNavigation.menu.men,
                        targetImg: document.querySelectorAll('.menu_choose')[1],
                        img: document.querySelectorAll('.menu_choose')[0],
                        a: document.querySelector('.MEN>a'),
                        event: e
                    };
                    onMouseOutHelper(helperParam);
                    break;
                }
                case document.querySelector('.WOMAN a') && document.querySelector('.WOMAN span'):
                {
                    helperParam = {
                        target: header.belowNavigation.menu.woman,
                        targetImg: document.querySelectorAll('.menu_choose')[0],
                        img: document.querySelectorAll('.menu_choose')[1],
                        a: document.querySelector('.WOMAN>a'),
                        event: e
                    };
                    onMouseOutHelper(helperParam);
                    break;
                }
                case document.querySelector('.KIDS a') && document.querySelector('.KIDS span'):
                {
                    helperParam = {
                        target: header.belowNavigation.menu.kids,
                        targetImg: document.querySelectorAll('.menu_choose')[1],
                        img: document.querySelectorAll('.menu_choose')[0],
                        a: document.querySelector('.KIDS>a'),
                        event: e
                    };
                    onMouseOutHelper(helperParam);
                    break;
                }
                case document.querySelector('.SPORTS a') && document.querySelector('.SPORTS span'):
                {
                    helperParam = {
                        target: header.belowNavigation.menu.sports,
                        targetImg: document.querySelectorAll('.menu_choose')[0],
                        img: document.querySelectorAll('.menu_choose')[1],
                        a: document.querySelector('.SPORTS>a'),
                        event: e
                    };
                    onMouseOutHelper(helperParam);
                    break;
                }
                case document.querySelector('.BLOG a') && document.querySelector('.BLOG span'):
                {
                    helperParam = {
                        target: header.belowNavigation.menu.blog,
                        targetImg: document.querySelectorAll('.menu_choose')[1],
                        img: document.querySelectorAll('.menu_choose')[0],
                        a: document.querySelector('.BLOG>a'),
                        event: e
                    };
                    onMouseOutHelper(helperParam);
                    console.log(e.target);
                    break;
                }
                case document.querySelector('.CATALOG>a') && document.querySelector('.CATALOG span'):
                {
                    helperParam = {
                        target: header.belowNavigation.menu.catalog,
                        targetImg: document.querySelectorAll('.menu_choose')[0],
                        img: document.querySelectorAll('.menu_choose')[1],
                        a: document.querySelector('.CATALOG>a'),
                        event: e
                    };
                    onMouseOutHelper(helperParam);
                    break;
                }
            }
            document.querySelectorAll('.menu_choose')[0].style.display = 'none';
            document.querySelectorAll('.menu_choose')[1].style.display = 'none';
            document.querySelectorAll('.menu_choose')[0].style.margin = '0';
        }

        function onMouseOutHelper(o) {
            o['a'].className = '';

            document.querySelector('.dropmenu').className = 'dropmenu';
            o.event.stopPropagation();
            o.event.preventDefault();
        }

        document.body.addEventListener('mousemove', showLoginMenu, false);
        function showLoginMenu(e) {
            document.querySelector("[type='search']").placeholder = e.screenX + " " + e.screenY;

            if (window.scrollY === 0 && window.innerWidth > 550) {
                header.aboveNavigation.self.className = 'ABOVE_HEADER collapse show';
                scrollShow();
            } else {
                if (e.screenY <= 180 && window.innerWidth > 550) {
                    header.aboveNavigation.self.className = 'ABOVE_HEADER collapse show';
                    scrollShow();
                } else {
                    if (window.innerWidth > 550) {
                        header.aboveNavigation.self.className = 'ABOVE_HEADER collapse';
                        scrollShow();
                    }
                }
            }
        }

        document.body.onscroll = function myFunck(e){
            console.log(window.scrollY);
            if (window.scrollY === 0 && window.innerWidth > 550) {
                header.aboveNavigation.self.className = 'ABOVE_HEADER collapse show';
                scrollShow();
            }
            if (window.scrollY >= 50) {

                if (e.screenY <= 200 && window.innerWidth > 550) {
                    header.aboveNavigation.self.className = 'ABOVE_HEADER collapse show';
                    scrollShow();
                }
            }
        };

        return header;
    }());