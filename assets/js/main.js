; (function (win, $) {
    const initLeafletMaps = function () {
        $('.map').each(function () {
            const mapEl = this;

            // Nếu đã khởi tạo, bỏ qua
            if (mapEl._leaflet_map_instance) return;

            const map = L.map(mapEl).setView([51.505, -0.09], 13);

            L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
                maxZoom: 19,
            }).addTo(map);

            mapEl._leaflet_map_instance = map;

            // const markerIcon = L.icon({
            //     iconUrl: '/assets/image/location.png',
            //     iconSize: [32, 32]
            // });

            // L.marker([51.505, -0.09], { icon: markerIcon }).addTo(map);

            // setTimeout(() => map.invalidateSize(), 100);
        });
    };

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
        $('.card-rent').each(function () {
            const id = $(this).attr('data-id');

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

    // Open popup
    const handleOpenPopup = function () {
        const btnOpenPopup = $('.btn')

        btnOpenPopup.on("click", function () {
            if ($(this).attr('data-bs-target') === '#modalFilter') {
                // Sau khi popup mở, khởi tạo hoặc hiển thị map
                const mapEl = $('#modalFilter').find('.map')[0]

                // Kiểm tra nếu chưa có map thì khởi tạo
                if (!mapEl._leaflet_map_instance) {
                    const map = L.map(mapEl).setView([51.505, -0.09], 13)

                    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
                        maxZoom: 19,
                    }).addTo(map)

                    mapEl._leaflet_map_instance = map
                }

                // Dù đã khởi tạo thì vẫn cần invalidateSize để render đúng
                setTimeout(() => {
                    mapEl._leaflet_map_instance.invalidateSize()
                }, 200)
            }
        })
    }

    // Close popup
    const handleClosePopup = function () {
        const popup = $(".popup")

        popup.on('click', function () {
            popup.find('>.open').removeClass('open')
            $('body').removeClass('scroll-locked')
        })

        $('.close-popup-btn').on('click', function () {
            popup.find('>.open').removeClass('open')
            $('body').removeClass('scroll-locked')
        })
    }

    $(win).on('load', function () {
        initLeafletMaps()
        handlePriceRange()
        handleFilterAction()
        handleDropdownActive()
        initCardSwiper()
        handleOpenPopup()
        // handleClosePopup()
    });
})(window, window.jQuery);