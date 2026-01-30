var i18n = {
    currentLang: 'fa',
    dictionary: {},

    load: function (lang) {
        var self = this;
        $.getJSON('/lang-' + lang + '.json', function (data) {
            self.dictionary = data;
            self.currentLang = lang;
            console.log('Loaded', lang, 'direction:', data.direction);
            self.applyTranslations();
            self.applyDirection();
            updateLanguageDropdown(); // به‌روزرسانی Dropdown
        }).fail(function () {
            console.error('Failed to load language file for ' + lang);
        });
    },

    applyTranslations: function () {
        $('[data-i18n]').each(function () {
            var key = $(this).data('i18n');
            var translation = i18n.dictionary[key] || key;
            $(this).text(translation);
        });
    },

    applyDirection: function () {
        var dir = i18n.dictionary.direction || 'rtl';
        console.log('Setting dir to:', dir); // لاگ برای بررسی
        $('html')
            .attr('dir', dir)
            .attr('lang', i18n.currentLang);
        $('body').removeClass('rtl ltr').addClass(dir);

        // سوئیچ فایل CSS بوت‌استرپ
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

// بارگذاری زبان پیش‌فرض
$(document).ready(function () {
    i18n.load('fa');
    updateLanguageDropdown();
});
