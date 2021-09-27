
function BanglaToEnglishNumber(number) {

    var finalBanglaToEnglishNumber = {
        '০':'0',  '১':'1', '২':'2', '৩':'3' , '৪':'4' ,'৫' : '5' , '৬' : '6' , '৭' : '7' ,'৮' : '8' ,'৯' : '9' 
    };
    var retStr = number.toString();
    for (var x in finalBanglaToEnglishNumber) {
        retStr = retStr.replace(new RegExp(x, 'g'), finalBanglaToEnglishNumber[x]);
    }
    return retStr;
}
module.exports = BanglaToEnglishNumber;



