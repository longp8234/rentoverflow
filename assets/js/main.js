; (function (win, $) {
    const initLeafletMap = function () {
        // Initial leaflet map
        if ($('#map').length > 0) {
            var map = L.map('map').setView([51.505, -0.09], 12);

            L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="https://carto.com">CartoDB</a>'
            }).addTo(map);

            L.icon({
                iconUrl: '/assets/image/location.png',
                iconSize: [32, 32]
            });

            setTimeout(() => map.invalidateSize(), 100);
        }
    }

    const handlePriceRange = function () {
        const rangeInput = $('.filter-price .range-input .input')
        const progress = $('.filter-price .tow-bar .progress')
        const minPrice = $('.filter-price .price-min')
        const maxPrice = $('.filter-price .price-max')
        let priceGap = 200

        rangeInput.on('input', function () {
            let minValue = parseInt(rangeInput.eq(0).val())
            let maxValue = parseInt(rangeInput.eq(1).val())

            if (maxValue - minValue <= priceGap) {
                if ($(this).hasClass('range-min')) {
                    rangeInput.eq(0).val(maxValue - priceGap)
                    minValue = maxValue - priceGap
                } else {
                    rangeInput.eq(1).val(minValue + priceGap)
                    maxValue = minValue + priceGap
                }
            } else {
                progress.css({
                    'left': (minValue / rangeInput.eq(0).attr('max')) * 100 + "%",
                    'right': 100 - (maxValue / rangeInput.eq(1).attr('max')) * 100 + "%"
                });
            }

            minPrice.text(minValue + '€')
            maxPrice.text(maxValue + '€')
        })
    }

    const handleFilterAction = function () {
        // Bắt sự kiện nút lọc
        $('#filterBtn').click(function () {
            const filters = {
                priceMin: $('.range-min').val(),
                priceMax: $('.range-max').val(),
                sizeMin: $('#sizeMin').val(),
                sizeMax: $('#sizeMax').val(),
                roomsMin: $('#roomsMin').val(),
                roomsMax: $('#roomsMax').val(),
                bathroomsMin: $('#bathroomsMin').val(),
                bathroomsMax: $('#bathroomsMax').val(),
                petMentioned: $('#sortOptionsPet .dropdown-item.active').attr('data-value'),
                propertyType: $('#sortOptionsType .dropdown-item.active').attr('data-value'),
            };
    
            // In ra console (hoặc xử lý gửi AJAX ở đây)
            console.log('Filters:', filters);
    
            // Gửi request, ví dụ:
            // $.post('/filter-properties', filters, function(response) { ... });
        });
    
        // Bắt sự kiện nút xóa lọc
        $('#clearBtn').click(function () {
            $('.range-min').val(0);
            $('.range-max').val(5000);
            $('.filter-price .price-min').text('0€')
            $('.filter-price .price-max').text('5000€')
            $('.filter-price .tow-bar .progress').css({ 'left': "1px", 'right': "1px" })
            $('#sizeMin, #sizeMax, #roomsMin, #roomsMax, #bathroomsMin, #bathroomsMax').val('');
        });
    }

    const handleDropdownActive = function () {
        $(document).on('click', '.dropdown-menu .dropdown-item', function (e) {
            e.preventDefault();
            const $menu = $(this).closest('.dropdown-menu');
            $menu.find('.dropdown-item').removeClass('active');
            $(this).addClass('active');

            const $button = $menu.siblings('button');
            $button.text($(this).text());
        });
    }

    const initCardSwiper = function () {
        $('.card-rent').each(function() {
            const id = $(this).attr('data-id');
            console.log(id);
            
            const card = $(this).find('.card-thumb-swiper')[0];
            new Swiper(card, {
                slidesPerView: 1,
                loop: true,
                navigation: {
                    nextEl: `.swiper-button-next-${id}`,
                    prevEl: `.swiper-button-prev-${id}`
                }
            });
        });
    }

    $(win).on('load', function () {
        initLeafletMap()
        handlePriceRange()
        handleFilterAction()
        handleDropdownActive()
        initCardSwiper()
    });
})(window, window.jQuery);