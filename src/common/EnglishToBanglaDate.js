
function EnglishToBanglaDate(date) {

    var options = {
        year: "numeric",
        month: "2-digit",
        day: "numeric"
    };


    var n = new Date(date);


    return n.toLocaleString("bn-BD", options);

}
module.exports = EnglishToBanglaDate;



