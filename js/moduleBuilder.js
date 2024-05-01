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
        <button class = "shinyRed bold white containerWidth" onclick="window.location.href = '${window.location.href.substring(0,window.location.href.indexOf('/learn.html')) + "/course/" + btoa(title)}';" tabindex>
            Begin
        </button>
        <br><br>
        <button class = "bold containerWidth" tabindex>
            View Full Course
        </button>
    </div>`;
    }
}

class articleModuleBuilder{
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
        <button class = "shinyRed bold white containerWidth" onclick="window.location.href = '${window.location.href + "/" + btoa(title)}';" tabindex>
            View Article
        </button>
    </div>`;
    }
}