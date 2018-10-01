const courseSelection = function () {

    const streams = ['Foundations', 'Applied', 'Professional', 'Cognitive', 'Systems'];

    const courseSelectionByGroup = {
        'Foundations': 2,
        'Applied': 2,
        'Professional': 1,
        'Cognitive': 2,
        'Systems': 5
    };

    let courseSelected = {
        'Foundations': [],
        'Applied': [],
        'Professional': [],
        'Cognitive': [],
        'Systems': []
    };

    let selectedCourses = {
        'Foundations': [],
        'Applied': [],
        'Professional': [],
        'Cognitive': [],
        'Systems': []
    };

    const init = function () {
        const btnSelectCourses = document.getElementById("btnSelectCourses");
        const courses = document.querySelectorAll(".course");
        const name = document.getElementById("txtName");
        const email = document.getElementById("txtEmail");
        const adviser = document.getElementById("ddlAdviser");
        attachEvents(btnSelectCourses, courses, email, adviser, name);
    };


    const onSelectCourses = function () {
        const studentName = document.getElementById("txtName");
        const studentEmail = document.getElementById("txtEmail");
        const adviser = document.getElementById("ddlAdviser");
        const coursePanel = document.getElementById("dCourses");

        if (studentName.value === "") {
            alert("Student Name Is Required");
            return;
        }

        if (studentEmail.value === "") {
            alert("Student Email Is Required");
            return;
        }

        if (adviser.value === "") {
            alert("Adviser Must Be Selected");
            return;
        }
        coursePanel.classList.remove("d-none");
    };

    const updateCourseSelectionTable = function () {
        const table = document.getElementById("courseSelection");
        const tableBody = table.querySelector("#courseSelectionTable");
        const tableRows = tableBody.getElementsByTagName('tr');
        for (let x = tableRows.length - 1; x >= 0; x--) {
            tableBody.removeChild(tableRows[x]);
        }
        streams.forEach(function (stream) {
            const streamRow = tableBody.insertRow();
            streamRow.insertCell(0).appendChild(document.createTextNode(stream));
            streamRow.insertCell(1).appendChild(document.createTextNode(courseSelectionByGroup[stream]));
            streamRow.insertCell(2).appendChild(document.createTextNode(courseSelected[stream].length));
        });
    };

    const updateCourseSelectionGroups = function () {
        const selectedCourseName = document.getElementById("selectedCourseName");
        selectedCourseName.innerHTML = "";
        for (let group in selectedCourses) {
            if (selectedCourses[group].length > 0) {
                const groupNode = document.createElement("div");
                const heading = document.createElement("h5");
                heading.classList.add("text-success");
                heading.innerText = group;
                groupNode.appendChild(heading);
                const list = document.createElement("ul");
                groupNode.appendChild(list);
                selectedCourses[group].forEach(function (course) {
                    const courseName = document.createElement("li")
                    courseName.innerHTML = course;
                    list.appendChild(courseName);
                })
                selectedCourseName.appendChild(groupNode);
            }
        }
    };

    const selectCourse = function () {
        const group = this.dataset.group;
        if (this.classList.contains("text-success")) {
            const index = courseSelected[group].indexOf(this.querySelector(".courseId").innerText);
            if (index > -1) {
                courseSelected[group].splice(index, 1);
                selectedCourses[group].splice(index, 1);
                this.classList.remove("text-success");
            }
        } else if (courseSelected[group].length < courseSelectionByGroup[group]) {
            courseSelected[group].push(this.querySelector(".courseId").innerText);
            selectedCourses[group].push(this.innerHTML);
            this.classList.add("text-success");
        } else {
            alert("Only " + courseSelectionByGroup[group] + " courses can be selected for " + group + ".");
        }

        const courseDetails = document.getElementById("courseDetails");
        updateCourseSelectionTable();
        updateCourseSelectionGroups();
        courseDetails.classList.remove("d-none");
    };

    const updateAdviser = function () {
        const adviser = document.getElementById("lblAdviser");
        const selected = this.options[this.selectedIndex];
        adviser.innerText = selected.value;
    };

    const updateName = function () {
        const name = document.getElementById("lblName");
        name.innerText = this.value;
    };

    const updateEmail = function () {
        const email = document.getElementById("lblEmail");
        email.innerText = this.value;
    };

    const attachEvents = function (btnSelectCourses, courses, email, adviser, name) {
        btnSelectCourses.addEventListener("click", onSelectCourses);
        courses.forEach(function (course) {
            course.addEventListener("click", selectCourse);
        });
        name.addEventListener("keyup", updateName);
        email.addEventListener("keyup", updateEmail);
        adviser.addEventListener("change", updateAdviser);
    };

    return {
        init: init
    }

}();