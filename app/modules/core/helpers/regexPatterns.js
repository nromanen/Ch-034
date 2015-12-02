define(function(require) {
    "use strict";

    var RegexPattern = {

        nameRegex       : /^[A-ZА-ЯЄІЇ]'?[a-zа-яєії']*[a-zа-яєії]*\-[A-ZА-ЯЄІЇ][a-zа-яєії']+$|^[A-ZА-ЯЄІЇ][a-zа-яєії']+$/,
        emailRegex      : /^[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+(\.[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+)*@([a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+([a-zA-Z]{2,4}|museum|travel)$/,
        passwordRegex   : /^(?=.*[a-zа-яєії])(?=.*[A-ZА-ЯЄІЇ])(?=.*[0-9])(?=.{8,})/,
        rootPathRegex   : /(^#[^\?\/]+)/gi
    };

    return RegexPattern;
});