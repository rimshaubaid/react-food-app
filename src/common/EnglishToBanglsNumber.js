// function Comma(Num) { //function to add commas to textboxes
//     Num += '';
//     Num = Num.replace(',', ''); Num = Num.replace(',', ''); Num = Num.replace(',', '');
//     Num = Num.replace(',', ''); Num = Num.replace(',', ''); Num = Num.replace(',', '');
//     var x = Num.split('.');
//     var x1 = x[0];
//     var x2 = x.length > 1 ? '.' + x[1] : '';
//     var rgx = /(\d+)(\d{3})/;
//     while (rgx.test(x1))
//         x1 = x1.replace(rgx, '$1' + ',' + '$2');
//     return x1 + x2;
// }


function EnglishToBanglsNumber(number) {

    if (number) {

        var finalEnlishToBanglaNumber = {
            '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪', '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯'
        };


        var retStr = (number*1).toFixed(2);
        for (var x in finalEnlishToBanglaNumber) {
            retStr = retStr.replace(new RegExp(x, 'g'), finalEnlishToBanglaNumber[x]);
        }
        return retStr;
    } else {
        return '';
    }

}
module.exports = EnglishToBanglsNumber;



