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

            setTimeout(() => map.invalidateSize(), 200);
        });
    };

    const handlePriceRange = function () {
        const priceGap = 200;

        $('.filter-price').each(function () {
            const container = $(this);
            const rangeInputs = container.find('.range-input .input');
            const progress = container.find('.tow-bar .progress');
            const minPrice = container.find('.price-min');
            const maxPrice = container.find('.price-max');
            const towBar = container.find('.tow-bar');

            const updateUI = () => {
                const minVal = parseInt(rangeInputs.eq(0).val());
                const maxVal = parseInt(rangeInputs.eq(1).val());
                const max = parseInt(rangeInputs.eq(0).attr('max'));

                progress.css({
                    'left': (minVal / max) * 100 + '%',
                    'right': 100 - (maxVal / max) * 100 + '%'
                });

                minPrice.text(minVal + '€');
                maxPrice.text(maxVal + '€');
            };

            // Input logic
            rangeInputs.on('input', function () {
                let minVal = parseInt(rangeInputs.eq(0).val());
                let maxVal = parseInt(rangeInputs.eq(1).val());

                if (maxVal - minVal <= priceGap) {
                    if ($(this).hasClass('range-min')) {
                        minVal = maxVal - priceGap;
                        rangeInputs.eq(0).val(minVal);
                    } else {
                        maxVal = minVal + priceGap;
                        rangeInputs.eq(1).val(maxVal);
                    }
                }

                updateUI();
            });

            // Click logic
            towBar.on('click', function (e) {
                const barOffset = $(this).offset().left;
                const barWidth = $(this).width();
                const clickX = e.pageX - barOffset;
                const clickPercent = clickX / barWidth;
                const max = parseInt(rangeInputs.eq(0).attr('max'));
                const targetValue = Math.round(clickPercent * max);

                const minVal = parseInt(rangeInputs.eq(0).val());
                const maxVal = parseInt(rangeInputs.eq(1).val());

                const distToMin = Math.abs(targetValue - minVal);
                const distToMax = Math.abs(targetValue - maxVal);

                if (distToMin < distToMax) {
                    const newMin = Math.min(targetValue, maxVal - priceGap);
                    rangeInputs.eq(0).val(newMin);
                } else {
                    const newMax = Math.max(targetValue, minVal + priceGap);
                    rangeInputs.eq(1).val(newMax);
                }

                updateUI();
            });
        });
    };

    const handleFilterAction = function () {
        // Bắt sự kiện nút lọc
        $('.btn-filter').each(function () {
            $(this).on('click', function () {
                const filters = {
                    priceMin: $(this).closest('.filter').find('.range-min').val(),
                    priceMax: $(this).closest('.filter').find('.range-max').val(),
                    sizeMin: $(this).closest('.filter').find('#sizeMin').val(),
                    sizeMax: $(this).closest('.filter').find('#sizeMax').val(),
                    roomsMin: $(this).closest('.filter').find('#roomsMin').val(),
                    roomsMax: $(this).closest('.filter').find('#roomsMax').val(),
                    bathroomsMin: $(this).closest('.filter').find('#bathroomsMin').val(),
                    bathroomsMax: $(this).closest('.filter').find('#bathroomsMax').val(),
                    petMentioned: $(this).closest('.filter').find('.dropdown-pet .dropdown-item.active').attr('data-value'),
                    propertyType: $(this).closest('.filter').find('.dropdown-property .dropdown-item.active').attr('data-value'),
                };

                // In ra console (hoặc xử lý ở đây)
                console.log('Filters:', filters);
            });
        })

        // Bắt sự kiện nút xóa lọc
        $('.btn-clear').each(function () {
            $(this).on('click', function () {
                $(this).closest('.filter').find('.range-min').val(0);
                $(this).closest('.filter').find('.range-max').val(5000);
                $(this).closest('.filter').find('.filter-price .price-min').text('0€')
                $(this).closest('.filter').find('.filter-price .price-max').text('5000€')
                $(this).closest('.filter').find('.filter-price .tow-bar .progress').css({ 'left': "1px", 'right': "1px" })
                $(this).closest('.filter').find('#sizeMin, #sizeMax, #roomsMin, #roomsMax, #bathroomsMin, #bathroomsMax').val('');
            });
        })
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

    const handleToggleBtn = function () {
        $(document).on('click', '.btn-toggle', function (e) {
            e.preventDefault();
            $(this).toggleClass('active');
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

    const initCitiesSwiper = function () {
        new Swiper('.topCitiesSwiper', {
            slidesPerView: 2,
            spaceBetween: 16,
            // grid: {
            //     rows: 2
            // },
            loop: true,
            navigation: {
                nextEl: ".cities-swiper-btn .swiper-button-next",
                prevEl: ".cities-swiper-btn .swiper-button-prev",
            },
            breakpoints: {
                768: {
                    slidesPerView: 3,
                    grid: {
                        rows: 1
                    },
                },
                1024: {
                    slidesPerView: 4,
                    grid: {
                        rows: 1
                    },
                },
                1280: {
                    slidesPerView: 5,
                    grid: {
                        rows: 1
                    },
                }
            }
        });
    }

    const initDetailSwiper = function () {
        var swiper = new Swiper(".swiper-images", {
            spaceBetween: 12,
            slidesPerView: 4,
        });
        var swiper2 = new Swiper(".swiper-thumb", {
            spaceBetween: 10,
            navigation: {
                nextEl: ".swiper-button-next-thumb",
                prevEl: ".swiper-button-prev-thumb",
            },
            thumbs: {
                swiper: swiper,
            },
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

    $(win).on('load', function () {
        initLeafletMaps()
        handlePriceRange()
        handleFilterAction()
        handleDropdownActive()
        handleToggleBtn()
        initCardSwiper()
        initCitiesSwiper()
        initDetailSwiper()
        handleOpenPopup()
    });
})(window, window.jQuery);