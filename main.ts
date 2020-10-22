import { Course } from './course.js';

import { dataCourses } from './dataCourses.js';

import { Dato } from './dato.js';

import { dataDatos } from './dataDatos.js';


let datosTbody: HTMLElement = document.getElementById('datos')!;

let coursesTbody: HTMLElement = document.getElementById('courses')!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box")!;
const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;


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

btnfilterByName.onclick = () => applyFilterByName();

renderCoursesInTable(dataCourses);

renderDatosInTable(dataDatos);

totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`

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
  
  function searchCourseByName(nameKey: string, courses: Course[]) {
    return nameKey === '' ? dataCourses : courses.filter( c => 
      c.name.match(nameKey));
  }

  function clearCoursesInTable() {
    while (coursesTbody.hasChildNodes()) {
      if (coursesTbody.firstChild != null) {
        coursesTbody.removeChild(coursesTbody.firstChild);
      }
    }
}