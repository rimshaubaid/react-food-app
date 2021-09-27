
function EnglishToBanglamonth(number) {

    var finalEnglishToBanglamonth = {
        '1': 'জানুয়ারী', '2': 'ফেব্রুয়ারী', '3': 'মার্চ', '4': 'এপ্রিল', '5': 'মে', '6': 'জুন', '7': 'জুলাই', '8': 'অগাস্ট', '9': 'সেপ্টেম্বর', '10': 'অক্টোবর','11': 'নভেম্বর','12': 'ডিসেম্বর'
    };
    
    return finalEnglishToBanglamonth[number];
}
module.exports = EnglishToBanglamonth;



