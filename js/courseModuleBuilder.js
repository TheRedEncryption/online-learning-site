class courseModuleBuilder{
    constructor(){

    }
    static buildCourse(title, desc){
        return `
    <div class = "course-holder sillyRotate">
        <div class = "bold course-title" data-fontsize="20">
            ${title}
        </div>
        <div class = "course-description">
            ${desc}
        </div>
        <br>
        <button class = "shinyRed bold white containerWidth" tabindex>
            Begin
        </button>
        <br><br>
        <button class = "bold containerWidth" tabindex>
            View Full Course
        </button>
    </div>`;
    }
}