import { Course } from './course.js';

import { dataCourses } from './dataCourses.js';

import { Dato } from './dato.js';

import { dataDatos } from './dataDatos.js';


let datosTbody: HTMLElement = document.getElementById('datos')!;

let coursesTbody: HTMLElement = document.getElementById('courses')!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const btnfilterByCredits: HTMLElement = document.getElementById("button-filterByCredits")!;
const inputLimInf: HTMLInputElement = <HTMLInputElement> document.getElementById("liminf")!;
const inputLimSup: HTMLInputElement = <HTMLInputElement> document.getElementById("limsup")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box")!;
const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;


renderCoursesInTable(dataCourses);
renderDatosInTable(dataDatos);
totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`


btnfilterByName.onclick = () => applyFilterByName();
btnfilterByCredits.onclick = () => applyFilterByCredits();


function renderCoursesInTable(courses: Course[]): void {
    courses.forEach(c => {
        let trElement = document.createElement("tr");
        trElement.innerHTML = `<td>${c.name}</td>
                           <td>${c.professor}</td>
                           <td>${c.credits}</td>`;
        coursesTbody.appendChild(trElement);
    });
}
function renderDatosInTable(datos: Dato[]): void {
  datos.forEach(x => {
      let trElement = document.createElement("tr");
      trElement.innerHTML = `<td>${x.titulo}</td>
                         <td>${x.info}</td>`;
      datosTbody.appendChild(trElement);
  });
}
function getTotalCredits(courses: Course[]): number {
    let totalCredits: number = 0;
    courses.forEach((course) => {
        totalCredits = totalCredits + course.credits
    });
    return totalCredits;
}
function applyFilterByName() { 
    let text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
  }
  function applyFilterByCredits() { 
    let limInf = inputLimInf.value;
    let limSup = inputLimSup.value;
    limInf = (limInf == null) ? '0' : limInf;
    limSup = (limSup == null) ? '10' : limSup;
    let inferior = parseInt(limInf);
    let superior = parseInt(limSup);
    clearCoursesInTable();
    let coursesFiltered: Course[] = searchCourseByCredits(inferior, superior, dataCourses);
    renderCoursesInTable(coursesFiltered);
  }
function searchCourseByName(nameKey: string, courses: Course[]) {
    return nameKey === '' ? dataCourses : courses.filter( c => 
      c.name.match(nameKey));
  }
function searchCourseByCredits(limInf: number, limSup: number, courses: Course[]) {
    return courses.filter( c => c.credits > limInf && c.credits < limSup);
  }
function clearCoursesInTable() {
    while (coursesTbody.hasChildNodes()) {
      if (coursesTbody.firstChild != null) {
        coursesTbody.removeChild(coursesTbody.firstChild);
      }
    }
}