
let horizontalInput = document.getElementById("horizontalShadow");
let horizontalOutput = document.getElementById("horizontalValue");
horizontalInput.oninput = function() {
    horizontalOutput.innerHTML = (this.value / 10);
    shadow_changes();
}

let verticalInput = document.getElementById("verticalShadow");
let verticalOutput = document.getElementById("verticalValue");
verticalInput.oninput = function() {
    verticalOutput.innerHTML = (this.value / 10);
    shadow_changes();
}

let blurInput = document.getElementById("blurShadow");
let blurOutput = document.getElementById("blurValue");
blurInput.oninput = function() {
    blurOutput.innerHTML = (this.value / 10);
    shadow_changes();
}

let spreadInput = document.getElementById("spreadShadow");
let spreadOutput = document.getElementById("spreadValue");
spreadInput.oninput = function() {
    spreadOutput.innerHTML = (this.value / 10);
    shadow_changes();
}

let colorInput = document.getElementById("colorShadowHex");
colorInput.addEventListener("change", function() {
    colorInputColor.value = this.value;
    shadow_changes();
}, false);

let colorInputColor = document.getElementById("colorShadow");
colorInputColor.addEventListener("input", function() {
    colorInput.value = this.value;
    shadow_changes();
}, false);

let opacityInput = document.getElementById("opacityShadow");
let opacityOutput = document.getElementById("opacityValue");
opacityInput.oninput = function() {
    opacityOutput.innerHTML = (this.value / 100);
    shadow_changes();
}

let backgroundInput = document.getElementById("backgroundEnviroment");
backgroundInput.addEventListener("change", function() {
    backgroundInputColor.value = this.value;
    shadow_changes();
}, false);

let backgroundInputColor = document.getElementById("backgroundColor");
backgroundInputColor.addEventListener("input", function() {
    backgroundInput.value = this.value;
    shadow_changes();
}, false);

let boxInput = document.getElementById("boxEnviroment");
boxInput.addEventListener("change", function() {
    boxInputColor.value = this.value;
    shadow_changes();
}, false);

let boxInputColor = document.getElementById("boxColor");
boxInputColor.addEventListener("input", function() {
    boxInput.value = this.value;
    shadow_changes();
}, false);

let clipboard = document.getElementById("copyToClipboard");
clipboard.addEventListener("click", function(e){
    e.preventDefault();
    let horizontal = (horizontalInput.value / 10);
    let vertical = (verticalInput.value / 10);
    let blur = (blurInput.value / 10);
    let spread = (spreadInput.value / 10);
    let color = colorInput.value;
    let opacity = (opacityInput.value / 100);
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

let darkMode = document.getElementById("toggleMode");
darkMode.addEventListener("click", function(e){
    e.preventDefault();
    document.body.classList.toggle('dark');
});


function shadow_changes(){
    let horizontal = (horizontalInput.value / 10);
    let vertical = (verticalInput.value / 10);
    let blur = (blurInput.value / 10);
    let spread = (spreadInput.value / 10);
    let color = colorInput.value;
    let opacity = (opacityInput.value / 100);
    let shadowBox = document.getElementById("shadowContainer");
    let backgroundEnviroment = backgroundInput.value;
    let boxEnviroment = boxInput.value;
    let boxShadow = horizontal + "em " + vertical + "em " + blur + "em " + spread + "em " + hexToRGB(color, opacity)
    shadowBox.style.boxShadow = boxShadow;
    shadowBox.style.webkitBoxShadow = boxShadow;
    shadowBox.style.mozBoxShadow = boxShadow;
    shadowBox.style.background = boxEnviroment;
    document.getElementById("normal").innerHTML = boxShadow;
    document.getElementById("webkit").innerHTML = boxShadow;
    document.getElementById("moz").innerHTML = boxShadow;
    document.getElementById("shadowBackground").style.background = backgroundEnviroment;
}
document.addEventListener('DOMContentLoaded', function(){
    horizontalOutput.innerHTML = (horizontalInput.value / 10);
    verticalOutput.innerHTML = (verticalInput.value / 10);
    blurOutput.innerHTML = (blurInput.value / 10);
    spreadOutput.innerHTML = (spreadInput.value / 10);
    opacityOutput.innerHTML = (opacityInput.value / 100);
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