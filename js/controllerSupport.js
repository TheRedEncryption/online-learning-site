let controllerTabIndex = 0;
let heldDown = false;

window.addEventListener("gamepadconnected", (e) => {
    console.log(
        "Gamepad connected at index %d: %s. %d buttons, %d axes.",
        e.gamepad.index,
        e.gamepad.id,
        e.gamepad.buttons.length,
        e.gamepad.axes.length,
    );

});
window.addEventListener("gamepaddisconnected", (e) => {
    console.log(
        "Gamepad disconnected from index %d: %s",
        e.gamepad.index,
        e.gamepad.id,
    );
});
window.setInterval(() => {
    var gamepads = navigator.getGamepads();
    gamepad = gamepads[0]
    if (gamepad) {
        // console.log(gamepads);
        //gamepad.axes[1]
        window.scrollBy(0, gamepad.axes[1] * 10);
        if (!heldDown && gamepad.buttons[15].pressed) {
            heldDown = true;
            console.log("hiiiiiiiiiiiiiii")
            // Get a list of all focusable elements in the document.
            const focusableElements = Array.from(document.querySelectorAll("[tabindex]"));
            //console.log(focusableElements)
            controllerTabIndex = controllerTabIndex + 1;
            if(controllerTabIndex>focusableElements.length-1){
                controllerTabIndex = 0;
            }


            // Get the next focusable element from the list of focusable elements using the index you calculated in step 3.
            focusableElements[controllerTabIndex].focus();
        }
        else if(!heldDown && gamepad.buttons[14].pressed){
            heldDown = true;
            //console.log(gamepad.buttons[14])
            // Get a list of all focusable elements in the document.
            const focusableElements = Array.from(document.querySelectorAll("[tabindex]"));
            //console.log(focusableElements)
            
            controllerTabIndex = controllerTabIndex - 1;
            if(controllerTabIndex<0){
                controllerTabIndex = focusableElements.length-1;
            }

            // Get the next focusable element from the list of focusable elements using the index you calculated in step 3.
            focusableElements[controllerTabIndex].focus();
        }
        else if (heldDown && !gamepad.buttons[15].pressed && !gamepad.buttons[14].pressed) {
            heldDown = false;
        }
    }
}, 10)