var i18n = {
    currentLang: 'fa',
    dictionary: {},

    load: function (lang) {
        i18n.currentLang = lang;

        $.getJSON('/i18n/lang-' + lang + '.json')
            .done(function (data) {
                i18n.dictionary = data;
                i18n.applyTranslations();
                i18n.applyDirection();
                localStorage.setItem('lang', lang);
            })
            .fail(function () {
                console.error('Language file not found:', lang);
            });
    },

    t: function (key) {
        return i18n.dictionary[key] || key;
    },

    applyTranslations: function () {

        $('[data-i18n]').each(function () {
            var key = $(this).data('i18n');
            $(this).text(i18n.t(key));
        });

        $('[data-i18n-placeholder]').each(function () {
            var key = $(this).data('i18n-placeholder');
            $(this).attr('placeholder', i18n.t(key));
        });

      
        $('html').attr('lang', i18n.currentLang);
    },


    //applyDirection: function () {


    //    var dir = i18n.dictionary.direction || 'rtl';


    //    $('html')
    //        .attr('dir', dir)
    //        .attr('lang', i18n.currentLang);

    //    $('body').removeClass('rtl ltr').addClass(dir);




    //    var cssPath = dir === 'rtl'
    //        ? '/lib/bootstrap/dist/css/bootstrap.min.css'
    //        : '/lib/bootstrap/dist/css/bootstrap.rtl.min.css';

    //    $('#bootstrap-css').attr('href', cssPath);
    //}


    applyDirection: function () {
        var dir = i18n.dictionary.direction || 'rtl';
        $('html')
            .attr('dir', dir)
            .attr('lang', i18n.currentLang);
        $('body').removeClass('rtl ltr').addClass(dir);

        // به‌روزرسانی Dropdown زبان
        updateLanguageDropdown();

        // سوئیچ فایل CSS بوت‌استرپ (در صورت نیاز)
        var cssPath = dir === 'rtl'
            ? '/lib/bootstrap/dist/css/bootstrap.rtl.min.css'
            : '/lib/bootstrap/dist/css/bootstrap.min.css';
        $('#bootstrap-css').attr('href', cssPath);
    }

};


function updateLanguageDropdown() {
    var lang = i18n.currentLang;
    var flag = lang === 'fa' ? '🇮🇷' : '🇺🇸';
    var name = lang === 'fa' ? 'فارسی' : 'English';
    $('#currentLanguageFlag').text(flag);
    $('#currentLanguageName').text(name);
}