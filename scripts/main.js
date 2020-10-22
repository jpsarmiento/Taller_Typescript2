import { dataCourses } from './dataCourses.js';
import { dataDatos } from './dataDatos.js';
var datosTbody = document.getElementById('datos');
var coursesTbody = document.getElementById('courses');
var btnfilterByName = document.getElementById("button-filterByName");
var btnfilterByCredits = document.getElementById("button-filterByCredits");
var inputLimInf = document.getElementById("liminf");
var inputLimSup = document.getElementById("limsup");
var inputSearchBox = document.getElementById("search-box");
var totalCreditElm = document.getElementById("total-credits");
renderCoursesInTable(dataCourses);
renderDatosInTable(dataDatos);
totalCreditElm.innerHTML = "" + getTotalCredits(dataCourses);
btnfilterByName.onclick = function () { return applyFilterByName(); };
btnfilterByCredits.onclick = function () { return applyFilterByCredits(); };
function renderCoursesInTable(courses) {
    courses.forEach(function (c) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + c.name + "</td>\n                           <td>" + c.professor + "</td>\n                           <td>" + c.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
}
function renderDatosInTable(datos) {
    datos.forEach(function (x) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + x.titulo + "</td>\n                         <td>" + x.info + "</td>";
        datosTbody.appendChild(trElement);
    });
}
function getTotalCredits(courses) {
    var totalCredits = 0;
    courses.forEach(function (course) {
        totalCredits = totalCredits + course.credits;
    });
    return totalCredits;
}
function applyFilterByName() {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function applyFilterByCredits() {
    var limInf = inputLimInf.value;
    var limSup = inputLimSup.value;
    limInf = (limInf == null) ? '0' : limInf;
    limSup = (limSup == null) ? '10' : limSup;
    var inferior = parseInt(limInf);
    var superior = parseInt(limSup);
    clearCoursesInTable();
    var coursesFiltered = searchCourseByCredits(inferior, superior, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? dataCourses : courses.filter(function (c) {
        return c.name.match(nameKey);
    });
}
function searchCourseByCredits(limInf, limSup, courses) {
    return courses.filter(function (c) { return c.credits > limInf && c.credits < limSup; });
}
function clearCoursesInTable() {
    while (coursesTbody.hasChildNodes()) {
        if (coursesTbody.firstChild != null) {
            coursesTbody.removeChild(coursesTbody.firstChild);
        }
    }
}
