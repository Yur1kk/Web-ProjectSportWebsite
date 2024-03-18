document.addEventListener("DOMContentLoaded", function() {
    const surveyForm = document.getElementById("survey-form");
    let surveyResults = JSON.parse(localStorage.getItem('surveyResults')) || [];

    function displaySurveyResults(results) {
        const resultList = document.getElementById("survey-results");
        resultList.innerHTML = ""; 

        results.forEach(function(result, index) {
            const listItem = document.createElement("li");
            listItem.textContent = `Результат ${index + 1}: Факультет: ${result.faculty}, Дата та час співбесіди: ${result.interview_time}, Середній бал: ${result.average_grade}`;
            resultList.appendChild(listItem);
        });
    }

    displaySurveyResults(surveyResults);

    surveyForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const formData = new FormData(this);
        const surveyEntry = {};
        for (const [key, value] of formData.entries()) {
            surveyEntry[key] = key === 'interview-time' ? new Date(value).toISOString() : value;
        }
        surveyResults.push(surveyEntry);
        localStorage.setItem('surveyResults', JSON.stringify(surveyResults));
        displaySurveyResults(surveyResults);
        this.reset();
    });

    const facultyFilter = document.getElementById("faculty-filter");
    facultyFilter.addEventListener("change", function() {
        const selectedFaculty = this.value;
        const filteredResults = selectedFaculty ? surveyResults.filter(result => result.faculty === selectedFaculty) : surveyResults;
        displaySurveyResults(filteredResults);
    });

    const interviewTimeFilter = document.getElementById("interview-time-filter");
    interviewTimeFilter.addEventListener("change", function() {
        const selectedTime = this.value;
        const filteredResults = selectedTime ? surveyResults.filter(result => result.interview_time === new Date(selectedTime).toISOString()) : surveyResults;
        displaySurveyResults(filteredResults);
    });

    const averageGradeFilter = document.getElementById("average-grade-filter");
    averageGradeFilter.addEventListener("change", function() {
        const selectedGrade = parseFloat(this.value);
        const filteredResults = surveyResults.filter(result => result.average_grade >= selectedGrade && result.average_grade < selectedGrade + 1);
        displaySurveyResults(filteredResults);
    });
});
