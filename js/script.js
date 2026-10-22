



// ленивая загрузка картинок
document.addEventListener("DOMContentLoaded",(function(){const e=document.querySelectorAll("img.lazy");if(!e.length)return;let n,t=!1;function s(){t||(t=!0,"IntersectionObserver"in window?(n=new IntersectionObserver(((e,t)=>{e.forEach((e=>{if(e.isIntersecting){const t=e.target;t.src=t.dataset.src,t.classList.remove("lazy"),t.style.opacity = "1",n.unobserve(t)}}))}),{rootMargin:"200px 0px"}),e.forEach((e=>{n.observe(e)}))):e.forEach((e=>{e.src=e.dataset.src,e.classList.remove("lazy")})))}window.addEventListener("load",(function(){s()}),{once:!0,passive:!0})}));

// mobile menu

document.addEventListener("DOMContentLoaded", () => {
    const openMenu = document.querySelector('.sidebar__mob-control-open');
    const closeMenu = document.querySelector('.sidebar__mob-control-close');
    const menuBody = document.querySelector('.sidebar__inner');
    if (openMenu) {
        openMenu.addEventListener('click', function() {
            document.body.classList.add('lock');
            closeMenu.classList.add('active');
            menuBody.classList.add('active');
        });
    } 
    if (closeMenu) {
        closeMenu.addEventListener('click', function() {
            document.body.classList.remove('lock');
            closeMenu.classList.remove('active');
            menuBody.classList.remove('active');
        });
    }
});

document.querySelectorAll('.faq__item').forEach(function (dropDownWrapper) {

    const button = dropDownWrapper.querySelector('.faq__item-question');
    const content = dropDownWrapper.querySelector('.faq__item-answer');

    button.addEventListener('click', (e) => {
        if (dropDownWrapper.dataset.open !== 'true') {
            dropDownWrapper.dataset.open = 'true';
            content.style.maxHeight = `${content.scrollHeight}px`;
            button.classList.add('active');
        } else {
            dropDownWrapper.dataset.open = 'false';
            content.style.maxHeight = '';
            button.classList.remove('active');
        }
        e.preventDefault();
    });

});

// account accordion
document.addEventListener("DOMContentLoaded", () => {
    const menu = document.querySelector('.header__button-menu');
    if(menu) {    
        const toggleBtn = document.querySelector('.header__button-toggle');
        const hiddenItem = menu.querySelector('.header__button-inner_hidden');

        let animating = false;

        toggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (animating) return;

            animating = true;
            menu.classList.toggle('open');

            hiddenItem.addEventListener("transitionend", () => {
                animating = false;
            }, { once: true });
        });
        document.addEventListener("click", (e) => {
            if (!menu.classList.contains("open")) return;

            if (!menu.contains(e.target)) {
                menu.classList.remove("open");
            }
        });
    }
});


document.addEventListener("DOMContentLoaded", () => {
    // main-search slider
    const mainSearchSlider = new Swiper('.main-search__logos-container', {
        direction: 'horizontal',
        slidesPerView: 'auto',
        speed: 800,
        spaceBetween: 20,
        loop: true,
    });


    const complaintsListSlider = new Swiper('.js-list-slider', {
        direction: 'horizontal',
        slidesPerView: 'auto',
        speed: 800,
        spaceBetween: 10,
    });

    const cardsSlider = new Swiper('.swiper-container', {
        direction: 'horizontal',
        slidesPerView: 'auto',
        speed: 800,
        spaceBetween: 10,
        navigation: {
            nextEl: '.swiper-btn-next',
            prevEl: '.swiper-btn-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
        },
        breakpoints: {
            992: {
            spaceBetween: 20
            }
        }
    });


    const ratings = document.querySelectorAll('.rating');
    if(ratings.length > 0) {
        initRatings();
    } 
    function initRatings() {
        let ratingActive, ratingValue;
        for (let index = 0; index < ratings.length; index++) {
            const rating = ratings[index];
            initRating(rating);
        }

        function initRating(rating) {
            initRatingVars(rating);
            setRatingActiveWidth();
        }

        function initRatingVars(rating) {
            ratingActive = rating.querySelector('.rating__items_active');
            ratingValue = rating.querySelector('.rating__value');
        }

        function setRatingActiveWidth(index = ratingValue.dataset.rating) {
            const ratingActiveWidth = index / 0.05;
            ratingActive.style.width = `${ratingActiveWidth}%`;
        }
    }






    /* modals */
    const body = document.body;
    const lockPaddingValue = window.innerWidth - document.querySelector('.main-wrapper').offsetWidth + 'px';
    const header = document.querySelector('.header');
    function unlockBody () {
        setTimeout(function () {
            body.classList.remove('lock');
            body.style.paddingRight = '0px';
            header.style.paddingRight = '0px';
        }, 300);
    }

    document.querySelectorAll('.modal-btn-js').forEach(function (btnModal) {  

        const modal = document.getElementById(btnModal.dataset.open);
        const closeModal = modal.querySelector('.modal-close-js');
    
        btnModal.addEventListener('click', function() {
            if(btnModal.closest('.modal')){
                btnModal.closest('.modal').classList.remove('active');
            }
            modal.classList.add('active');
            document.body.classList.add('lock');
            body.style.paddingRight = lockPaddingValue;
            header.style.paddingRight = lockPaddingValue;
        });
        if(closeModal) {
            closeModal.addEventListener('click', function() {
                modal.classList.remove('active');
                unlockBody();
            });
        }
        
    });


});





$(document).ready(function() {
    if($('.filters__filter')) {}
    $('.filters__filter').each(function() {
        const $selectWrapper = $(this);
        const $selectOpen = $selectWrapper.find('.filters__filter-button');
        const $selectBody = $selectWrapper.find('.filters__filter-body');
        const $checkboxes = $selectWrapper.find('.filters__filter-checkbox');
        const $clear = $selectWrapper.find('.filters__filter-clear');

        $selectOpen.on('click', function() {
            $('.filters__filter-body').removeClass('active');
            $selectBody.addClass('active');
        });

        $checkboxes.on('change', function() {
            if ($checkboxes.filter(':checked').length > 0) {
                $selectOpen.addClass('active');
            } else {
                $selectOpen.removeClass('active');
            }
        });
        $clear.on('click', function() {
            $selectOpen.removeClass('active');
        });
    });

    $(document).on('click', function(e) {
        if (!$(e.target).closest('.filters__filter').length) {
            $('.filters__filter-body').removeClass('active');
        }
    });

    $('.filters__statuses-status, .filters__item').on('click', function(e) {
        e.preventDefault();
        $(this).toggleClass('active');
        $('.filters__item').first().removeClass('active');
        applyFilters();
    });

    $('.filters__filter-clear').on('click', function(e) {
        e.preventDefault();
        $(this).closest('.filters__filter-body').find('.filters__filter-checkbox').prop('checked', false);
        applyFilters();
    });

    $('.filters__filter-radio, .filters__filter-checkbox').on('change', applyFilters);

    $('.filters__clear').on('click', function(e) {
        e.preventDefault();
        
        // Снять все чекбоксы
        $('.filters__filter-checkbox').prop('checked', false);
        $('.filters__filter-button').not(':first').removeClass('active');
        $('.filters__statuses-status, .filters__item').removeClass('active');
        $('.filters__item').first().addClass('active');
        
        applyFilters();
    });

    function applyFilters() {
        const filterData = {
            sort: $('input[name="sort"]:checked').val(),
            providers: $('.filters__filter-checkbox:checked').map(function() {
                return $(this).val();
            }).get(),
            software: $('.filter__status.active').map(function() {
                return $(this).val();
            }).get()
        };
        
       // $.ajax({
       //     url: '/ajax/slots_filter.php',
       //     type: 'GET',
       //     data: filterData,
       //     success: function(response) {
       //         $('#resulе_slots').html(response);
       //     },
       // });
    }

});


document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.querySelector('.filters__filter-search input');
    if(searchInput) {
        const items = document.querySelectorAll('.filters__filter-item span');

        searchInput.addEventListener('input', () => {
            const value = searchInput.value.toLowerCase().trim();

            items.forEach(span => {
                const country = span.textContent.toLowerCase();
                const item = span.closest('.filters__filter-item');

                item.style.display = country.includes(value) ? '' : 'none';
            });
        });
    }
    
});


document.addEventListener("DOMContentLoaded", () => {
    if(document.querySelector('[data-fancybox]')) {
        Fancybox.bind("[data-fancybox]", {
        // Your custom options
        });
    }
});





/* write reviews */
document.addEventListener("DOMContentLoaded", () => {
    const reviewForm = document.querySelector('.js-sizing-textarea');
    if (reviewForm) {
        reviewForm.addEventListener('click', function(e) {
            reviewForm.classList.add('active');
        });
    }
});




/* scroll content */
document.addEventListener("DOMContentLoaded", () => {
    const menuLinks = document.querySelectorAll('.scroll-btn');
    menuLinks.forEach(menuLink => {
        menuLink.addEventListener('click', function (e) {
            e.preventDefault();

            if(menuLink.classList.contains('about__sidebar-item')) {
                menuLinks.forEach(menuLink => {
                    menuLink.classList.remove('active');
                });
                menuLink.classList.add('active');
            }

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            let minusHeight = document.querySelector('.header').offsetHeight;
            const scrollBtns = document.querySelector('.scroll-btns');
            if (scrollBtns) minusHeight += scrollBtns.offsetHeight;

            const gototargetElement = targetElement.getBoundingClientRect().top  + window.scrollY - minusHeight - 20;
            if (targetElement) {
                window.scrollTo({
                    top: gototargetElement,
                    behavior: 'smooth'
                });
            }
        });
    });
});