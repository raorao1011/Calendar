"use strict";

console.clear();

{
    const today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth(); 


    function getCalendarHead() {
        const dates = [];
        const d = new Date(year, month, 0).getDate(); //先月の最終日が何日か
        const n = new Date(year, month, 1).getDay(); //先月の最終日が何曜日か

        for (let i = 0; i < n; i++) {
            dates.unshift({
                date: d - i,
                isToday: false, //Todayクラスをつけるかどうか、先月分の日付なので当然つかない
                isDisabled: true, //先月分のだから薄くする
            });
        }

        return dates;
    }
    

    function getCalendarBody() {
        const dates = []; // date: 日付, day: 曜日
        const lastDate = new Date(year, month + 1, 0).getDate();

        for (let i = 1; i <= lastDate; i++) {
            dates.push({
                date: i,
                isToday: false,
                isDisabled: false,
            });
        }

        if (year === today.getFullYear() && month === today.getMonth()) {
            dates[today.getDate() - 1].isToday = true;
        }


        return dates
    }

    function getCalendarTale() {
        const dates = [];
        const lastDay = new Date(year, month + 1, 0).getDay();


        for (let i = 1; i < 7 - lastDay; i++) {
            dates.push({
                date: i,
                isToday: false,
                isDisabled: true,
            });
        }

        return dates;

    }

    function clearCalendar() {
       const tbody = document.querySelector("tbody");

        while (tbody.firstChild) {
            tbody.removeChild(tbody.firstChild);
        } 
    }

    function renderTitle() {
        const title = `${year}/${String(month + 1).padStart(2, "0")}`;
        document.getElementById("ttl").textContent = title;
    }

    function renderweeks() {const dates = [
            ...getCalendarHead(),
            ...getCalendarBody(),
            ...getCalendarTale(),
        ];
        const weeks = [];
        const weeksCount = dates.length / 7 ;

        for (let i = 0; i < weeksCount; i++) {
            weeks.push(dates.splice(0, 7));
        }

        weeks.forEach(week => {
            const tr = document.createElement("tr");
            week.forEach(date => {
                const td = document.createElement("td");

                td.textContent = date.date;
                if (date.isToday) {
                    td.classList.add("today");
                }
                if (date.isDisabled) {
                    td.classList.add("disabled");
                }

                tr.appendChild(td);
            });
            document.querySelector("tbody").appendChild(tr);
        });
    }

    function createCalendar() {
        clearCalendar();
        renderTitle();
        renderweeks();
    }

    document.getElementById("prev").addEventListener("click", () => {
        month--;
        if (month < 0) {
            year--;
            month = 11;
        }

        createCalendar();
    });

    document.getElementById("next").addEventListener("click", () => {
        month++;
        if (month > 11) {
            year++;
            month = 0;
        }

        createCalendar();
    });

    document.getElementById("Today").addEventListener("click", () => {
        year = today.getFullYear();
        month = today.getMonth();

        createCalendar();
    });

    createCalendar();

}