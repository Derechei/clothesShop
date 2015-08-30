var EPAM =
    (function () {
        var header = {
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
            dropMenu = document.querySelector('.dropmenu');

        // Resize header to show scroll onload and each time after resizing window.
        window.addEventListener('resize', scrollShow, false);
        window.addEventListener('load', initDoc, false);
        function initDoc() {
            if (window.innerWidth > 550) {
                header.aNav.self.className = 'ABOVE_HEADER collapse show';
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
        header.bNav.menu.self.addEventListener('mousemove', menuOnMouseMove, false);
        function menuOnMouseMove(e) {
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
                    onMouseMoveHelper(helperParam);
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
                    onMouseMoveHelper(helperParam);
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
                    onMouseMoveHelper(helperParam);
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
                    onMouseMoveHelper(helperParam);
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
                    onMouseMoveHelper(helperParam);
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
                    onMouseMoveHelper(helperParam);
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
                    onMouseMoveHelper(helperParam);
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
                    onMouseMoveHelper(helperParam);
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
                    onMouseMoveHelper(helperParam);
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
                    onMouseMoveHelper(helperParam);
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
                    onMouseMoveHelper(helperParam);
                    break;
                }
                case header.bNav.menu.self:
                {
                    dropMenu.className = 'dropmenu';
                    break;
                }
            }
        }
        function onMouseMoveHelper(o) {
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
                    dropMenu.className = 'dropmenu show';
            }
            // Highlights only one category and else not.
            for (var i = 0; i < header.bNav.menu.links.length; i += 1) {
                if (header.bNav.menu.links[i] !== o.a) {
                    header.bNav.menu.links[i].className = '';
                }
            }
            o.event.stopPropagation();
            o.event.preventDefault();
        }
        // Mouseout.
        header.bNav.menu.self.addEventListener('mouseout', menuOnMouseOut, false);
        function menuOnMouseOut(e) {
            switch (e.target) {
                case header.bNav.menu.self:
                {
                    dropMenu.className = 'dropmenu';
                    break;
                }
            }
            e.stopPropagation();
            e.preventDefault();
            document.querySelectorAll('.menu_choose')[0].style.display = 'none';
            document.querySelectorAll('.menu_choose')[1].style.display = 'none';
            document.querySelectorAll('.menu_choose')[0].style.margin = '0';
        }
        // Dropmenu fadeIn fadeOut
        dropMenu.addEventListener('mouseout',dropMenuMouseOut,false);
        function dropMenuMouseOut(){
            dropMenu.className = 'dropmenu';
        }
        dropMenu.addEventListener('mousemove',dropMenuMouseMove,false);
        function dropMenuMouseMove(){
            dropMenu.className = 'dropmenu show';
        }

        /*When U move pointer to top show's abovemenu. When U move's poiner down it dissapear's.*/
        document.body.addEventListener('mousemove', showLoginMenu, false);
        function showLoginMenu(e) {
            // Helper.
            document.querySelector("[type='search']").placeholder = e.screenX + " " + e.screenY;
            // Window top and not mobile version.
            if (window.scrollY === 0 && window.innerWidth > 550) {
                header.aNav.self.className = 'ABOVE_HEADER collapse show';
                scrollShow();
            } else {
                if (e.screenY <= 150 && window.innerWidth > 550) {
                    header.aNav.self.className = 'ABOVE_HEADER collapse show';
                    scrollShow();
                } else {
                    if (window.innerWidth > 550) {
                        header.aNav.self.className = 'ABOVE_HEADER collapse';
                        scrollShow();
                    }
                }
            }
        }

        /* When screenTop U see abovemenu. When scrollOver abovemenu disapear's. */
        document.body.onscroll = function (e) {
            console.log(window.scrollY);
            if (window.scrollY === 0 && window.innerWidth > 550) {
                header.aNav.self.className = 'ABOVE_HEADER collapse show';
                scrollShow();
            }
            if (window.scrollY >= 50) {

                if (e.screenY <= 200 && window.innerWidth > 550) {
                    header.aNav.self.className = 'ABOVE_HEADER collapse show';
                    scrollShow();
                }
            }
        };

        return header;
    }());