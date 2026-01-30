var i18n = {
    currentLang: 'fa',
    dictionary: {},

    load: function (lang) {
        i18n.currentLang = lang;

        $.getJSON('/i18n/' + lang + '.json', function (data) {
            i18n.dictionary = data;
            i18n.apply();
            localStorage.setItem('lang', lang);
        });
    },

    t: function (key) {
        return i18n.dictionary[key] || key;
    },

    apply: function () {

        // متن‌ها
        $('[data-i18n]').each(function () {
            var key = $(this).data('i18n');
            $(this).text(i18n.t(key));
        });

        // placeholder
        $('[data-i18n-placeholder]').each(function () {
            var key = $(this).data('i18n-placeholder');
            $(this).attr('placeholder', i18n.t(key));
        });
    }
};
