module.exports.getDate = getDate;
function getDate() {
    let date = new Date();
    let monthnum = date.getMonth();
    let dayNumber = date.getDate();
    let daynum = date.getDay();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let dateString = `${days[daynum]}, ${dayNumber} ${months[monthnum]}`;
    return dateString;
}
module.exports.getDay = getDay;
function getDay() {
    let date = new Date();
    let daynum = date.getDay();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let dayString = `${days[daynum]}`;
    return dayString;
}
// module.exports is an object and hence it can have some characteristic properties of it's own.
// so suppose we have more than 2 functions to export then we can just do..
// module.exports.function1 = function1 before the first function
// module.exports.function2 = function2 before the second function
// or else we can also write this...
// module.exports = {
//     getDate: getDate,
//     getDay: getDay,
// }