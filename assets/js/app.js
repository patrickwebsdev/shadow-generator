
let horizontal__input = document.getElementById("horizontal__shadow");
let horizontal__output = document.getElementById("horizontal__value");
horizontal__input.oninput = function() {
    horizontal__output.innerHTML = (this.value / 10);
    shadow_changes();
}

let vertical__input = document.getElementById("vertical__shadow");
let vertical__output = document.getElementById("vertical__value");
vertical__input.oninput = function() {
    vertical__output.innerHTML = (this.value / 10);
    shadow_changes();
}

let blur__input = document.getElementById("blur__shadow");
let blur__output = document.getElementById("blur__value");
blur__input.oninput = function() {
    blur__output.innerHTML = (this.value / 10);
    shadow_changes();
}

let spread__input = document.getElementById("spread__shadow");
let spread__output = document.getElementById("spread__value");
spread__input.oninput = function() {
    spread__output.innerHTML = (this.value / 10);
    shadow_changes();
}

let color__input = document.getElementById("color__shadow__hex");
color__input.addEventListener("change", function() {
    color__input__color.value = this.value;
    shadow_changes();
}, false);

let color__input__color = document.getElementById("color__shadow");
color__input__color.addEventListener("input", function() {
    color__input.value = this.value;
    shadow_changes();
}, false);

let opacity__input = document.getElementById("opacity__shadow");
let opacity__output = document.getElementById("opacity__value");
opacity__input.oninput = function() {
    opacity__output.innerHTML = (this.value / 100);
    shadow_changes();
}

let background__input = document.getElementById("background__enviroment");
background__input.addEventListener("change", function() {
    background__input__color.value = this.value;
    shadow_changes();
}, false);

let background__input__color = document.getElementById("background__color");
background__input__color.addEventListener("input", function() {
    background__input.value = this.value;
    shadow_changes();
}, false);

let box__input = document.getElementById("box__enviroment");
box__input.addEventListener("change", function() {
    box__input__color.value = this.value;
    shadow_changes();
}, false);

let box__input__color = document.getElementById("box__color");
box__input__color.addEventListener("input", function() {
    box__input.value = this.value;
    shadow_changes();
}, false);

let clipboard = document.getElementById("copyToClipboard");
clipboard.addEventListener("click", function(e){
    e.preventDefault();
    let horizontal = (horizontal__input.value / 10);
    let vertical = (vertical__input.value / 10);
    let blur = (blur__input.value / 10);
    let spread = (spread__input.value / 10);
    let color = color__input.value;
    let opacity = (opacity__input.value / 100);
    let shadowConfig = horizontal + "em " + vertical + "em " + blur + "em " + spread + "em " + hexToRGB(color, opacity);
    let clipboardText = document.getElementById("clipboard");
    clipboardText.innerHTML = `box-shadow: ${shadowConfig}
-webkit-box-shadow: ${shadowConfig}
-moz-box-shadow: ${shadowConfig}`;
    clipboardText.select();
    clipboardText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(clipboardText.value);
    this.innerHTML = "¡Copied!";
    setTimeout(() => {
        this.innerHTML = "Click to copy";
    }, 2000);
});

let darkMode = document.getElementById("toggle__mode");
darkMode.addEventListener("click", function(e){
    e.preventDefault();
    document.body.classList.toggle('dark');
});


function shadow_changes(){
    let horizontal = (horizontal__input.value / 10);
    let vertical = (vertical__input.value / 10);
    let blur = (blur__input.value / 10);
    let spread = (spread__input.value / 10);
    let color = color__input.value;
    let opacity = (opacity__input.value / 100);
    let shadowBox = document.getElementById("shadow__container");
    let background__enviroment = background__input.value;
    let box__enviroment = box__input.value;
    let boxShadow = horizontal + "em " + vertical + "em " + blur + "em " + spread + "em " + hexToRGB(color, opacity)
    shadowBox.style.boxShadow = boxShadow;
    shadowBox.style.webkitBoxShadow = boxShadow;
    shadowBox.style.mozBoxShadow = boxShadow;
    shadowBox.style.background = box__enviroment;
    document.getElementById("normal").innerHTML = boxShadow;
    document.getElementById("webkit").innerHTML = boxShadow;
    document.getElementById("moz").innerHTML = boxShadow;
    document.getElementById("shadow_background").style.background = background__enviroment;
}
document.addEventListener('DOMContentLoaded', function(){
    horizontal__output.innerHTML = (horizontal__input.value / 10);
    vertical__output.innerHTML = (vertical__input.value / 10);
    blur__output.innerHTML = (blur__input.value / 10);
    spread__output.innerHTML = (spread__input.value / 10);
    opacity__output.innerHTML = (opacity__input.value / 100);
    shadow_changes();
})


function hexToRGB(h, opacity) {
    let r = 0, g = 0, b = 0;
    if (h.length == 4) {
      r = "0x" + h[1] + h[1];
      g = "0x" + h[2] + h[2];
      b = "0x" + h[3] + h[3];
    }
    else if (h.length == 7) {
      r = "0x" + h[1] + h[2];
      g = "0x" + h[3] + h[4];
      b = "0x" + h[5] + h[6];
    }
    return "rgba("+ +r + "," + +g + "," + +b + ", " + opacity + ")";
}