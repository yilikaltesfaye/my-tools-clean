const currentDate = document.querySelector('.current-date'),
daysTag = document.querySelector('.days'),
prevNextIcon = document.querySelectorAll('.icons span');

//getting the current year and month
let date = new Date();
currYear = date.getFullYear();
currMonth = date.getMonth();
const months = ["January", "February", "March", "April", "May", "June", "July", 
                "August", "September", "October", "November", "December"];

const renderCalendar = () => {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), //to get the first day of month
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), //to get the last date of the month
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), //to get the last day of month
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); //to get the last date of the previous month
    let liTag = "";

    for (let i = firstDayofMonth; i > 0; i--) { //creating li of previous month last days
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;                
    }
    for (let i = 1; i <= lastDateofMonth; i++) { //creating li of all days of the currnt month
        let isToday = i === date.getDate() && currMonth === new Date().getMonth()
                    && currYear === new Date().getFullYear() ?  "active" : "";
        liTag += `<li class="${isToday}">${i}</li>`;        
    }
    for (let i = lastDayofMonth; i < 6; i++) { //creating li of next month first days
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;         
    }
    currentDate.innerText = `${months[currMonth]} ${currYear}`;
    daysTag.innerHTML = liTag;
}
renderCalendar();

prevNextIcon.forEach(icon => {
    icon.addEventListener("click", () => {
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;
        if(currMonth  < 0 || currMonth > 11){ //if current month is less than 0 or greater than 11
            // creating a new date of current year & month and pass it as date value 
            date = new Date(currYear, currMonth);
            currYear = date.getFullYear(); //updating current year with new date year 
            currMonth = date.getMonth(); //updating current month with new date month 
        }
        else{ //else pass new Date as date value
            date = new Date();
        }
        renderCalendar();
    });
});