class articleModuleBuilder{
    constructor(){

    }
    static buildCourse(title, desc, courseTitle){
        return `
    <div class = "course-holder sillyRotate">
        <div class = "bold course-title" data-fontsize="20">
            ${title}
        </div>
        <div class = "course-description">
            ${desc}
        </div>
        <br>
        <button class = "shinyRed bold white containerWidth" onclick="window.location.href = '${window.location.href + "/read/" + btoa(title)}';" tabindex>
            View Article
        </button>
    </div>`;
    }
}