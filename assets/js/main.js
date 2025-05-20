feather.replace();

; (function (win, $) {
    // Map
    // Initial leaflet map
    if ($('#map').length > 0) {
        var map = L.map('map').setView([51.505, -0.09], 15);

        // Street
        // L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        //     maxZoom: 19,
        //     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        // }).addTo(map);

        // CartoDB Positron (Light colors, bright tones):
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://carto.com">CartoDB</a>'
        }).addTo(map);

        // CartoDB Dark Matter (Dark color, dark tone):
        // L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        //     attribution: '&copy; <a href="https://carto.com">CartoDB</a>'
        // }).addTo(map);

        L.icon({
            iconUrl: '/assets/image/location.png', // dùng ảnh của bạn
            iconSize: [32, 32]
        });

        setTimeout(() => map.invalidateSize(), 100);

        // var locateIcon = L.icon({
        //     iconUrl: '/assets/image/location.png',
        //     iconSize: [60, 60], // size of the icon
        //     popupAnchor: [0, -20] // point from which the popup should open relative to the iconAnchor
        // });

        // Initial marker array
        // const markers = [
        //     {
        //         lat: 51.5001,
        //         lng: -0.0999,
        //         companyImg: "./assets/images/company/1.png",
        //         companyName: "rockstar games london",
        //         jobName: "Full Stack Developer",
        //         address: "367 king james street, london, UK"
        //     },
        //     {
        //         lat: 51.5101,
        //         lng: -0.1555,
        //         companyImg: "./assets/images/company/2.png",
        //         companyName: "tech innovators",
        //         jobName: "frontend developer",
        //         address: "13 upper grovest, london, United Kingdom"
        //     },
        //     {
        //         lat: 51.5225,
        //         lng: -0.0111,
        //         companyImg: "./assets/images/company/3.png",
        //         companyName: "creative solutions",
        //         jobName: "UI/UX designer",
        //         address: "24D3 empson road, west ham, UK"
        //     }
        // ];

        // markers.forEach(function (item) {
        //     var marker = L.marker([item.lat, item.lng], { icon: locateIcon }).addTo(map);

        //     marker.bindPopup(`
        //         <a href="jobs-detail1.html" class="jobs_info flex gap-4">
        //             <img src=${item.companyImg} alt=${item.companyName} class="jobs_avatar flex-shrink-0 w-15 h-15 rounded-full" />
        //             <div href="jobs-detail1.html" class="jobs_detail flex flex-col gap-0.5">
        //                 <span class="jobs_company text-sm font-semibold text-primary capitalize">${item.companyName}</span>
        //                 <strong class="jobs_name text-title -style-1 text-black capitalize">${item.jobName}</strong>
        //                 <div class="jobs_address -style-1 text-secondary">
        //                     <span class="ph ph-map-pin text-lg"></span>
        //                     <span class="address caption1 align-top capitalize">${item.address}</span>
        //                 </div>
        //             </div>
        //         </a>`
        //     );
        // })
    }

    
    // Bắt sự kiện nút lọc
    $('#filterBtn').click(function () {
        const filters = {
            budget: $('#budgetRange').val(),
            sizeMin: $('#sizeMin').val(),
            sizeMax: $('#sizeMax').val(),
            roomsMin: $('#roomsMin').val(),
            roomsMax: $('#roomsMax').val(),
            bathroomsMin: $('#bathroomsMin').val(),
            bathroomsMax: $('#bathroomsMax').val(),
            petMentioned: $('#petMentioned').val(),
            propertyType: $('#propertyType').val()
        };

        // In ra console (hoặc xử lý gửi AJAX ở đây)
        console.log('Filters:', filters);

        // Gửi request, ví dụ:
        // $.post('/filter-properties', filters, function(response) { ... });
    });

    // Bắt sự kiện nút xóa lọc
    $('#clearBtn').click(function () {
        $('#budgetRange').val(100);
        $('#sizeMin, #sizeMax, #roomsMin, #bathroomsMin, #bathroomsMax').val('');
        $('#roomsMax, #petMentioned, #propertyType').prop('selectedIndex', 0);
    });

    $(win).on('load', function () {
    });
})(window, window.jQuery);