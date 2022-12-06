
const horizontalInput = document.getElementById("horizontalShadow");
const horizontalOutput = document.getElementById("horizontalValue");
const verticalInput = document.getElementById("verticalShadow");
const verticalOutput = document.getElementById("verticalValue");
const blurInput = document.getElementById("blurShadow");
const blurOutput = document.getElementById("blurValue");
const spreadInput = document.getElementById("spreadShadow");
const spreadOutput = document.getElementById("spreadValue");
const colorInput = document.getElementById("colorShadowHex");
const colorInputColor = document.getElementById("colorShadow");
const opacityInput = document.getElementById("opacityShadow");
const opacityOutput = document.getElementById("opacityValue");
const backgroundInput = document.getElementById("backgroundEnviroment");
const backgroundInputColor = document.getElementById("backgroundColor");
const boxInput = document.getElementById("boxEnviroment");
const boxInputColor = document.getElementById("boxColor");
const clipboard = document.getElementById("copyToClipboard");
const darkMode = document.getElementById("toggleMode");
const shadowBox = document.getElementById("shadowContainer");

horizontalInput.oninput = function() {
    horizontalOutput.innerHTML = (this.value / 10);
    shadow_changes();
}

verticalInput.oninput = function() {
    verticalOutput.innerHTML = (this.value / 10);
    shadow_changes();
}

blurInput.oninput = function() {
    blurOutput.innerHTML = (this.value / 10);
    shadow_changes();
}

spreadInput.oninput = function() {
    spreadOutput.innerHTML = (this.value / 10);
    shadow_changes();
}

colorInput.addEventListener("change", function() {
    colorInputColor.value = this.value;
    shadow_changes();
}, false);

colorInputColor.addEventListener("input", function() {
    colorInput.value = this.value;
    shadow_changes();
}, false);

opacityInput.oninput = function() {
    opacityOutput.innerHTML = (this.value / 100);
    shadow_changes();
}

backgroundInput.addEventListener("change", function() {
    backgroundInputColor.value = this.value;
    shadow_changes();
}, false);

backgroundInputColor.addEventListener("input", function() {
    backgroundInput.value = this.value;
    shadow_changes();
}, false);

boxInput.addEventListener("change", function() {
    boxInputColor.value = this.value;
    shadow_changes();
}, false);

boxInputColor.addEventListener("input", function() {
    boxInput.value = this.value;
    shadow_changes();
}, false);

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
    clipboardText.innerHTML = `box-shadow: ${shadowConfig};
-webkit-box-shadow: ${shadowConfig};
-moz-box-shadow: ${shadowConfig};`;
    clipboardText.select();
    clipboardText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(clipboardText.value);
    this.innerHTML = "¡Copied!";
    setTimeout(() => {
        this.innerHTML = "Click to copy";
    }, 2000);
});

darkMode.addEventListener("click", function(e){
    e.preventDefault();
    document.body.classList.toggle('dark');
    document.body.classList.toggle('light');
});


function shadow_changes(){
    let horizontal = (horizontalInput.value / 10);
    let vertical = (verticalInput.value / 10);
    let blur = (blurInput.value / 10);
    let spread = (spreadInput.value / 10);
    let color = colorInput.value;
    let opacity = (opacityInput.value / 100);
    let backgroundEnviroment = backgroundInput.value;
    let boxEnviroment = boxInput.value;
    let boxShadow = horizontal + "em " + vertical + "em " + blur + "em " + spread + "em " + hexToRGB(color, opacity);
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


function hexToRGB(hex, opacity) {
    let red = 0;
    let green = 0
    let blue = 0;
    if (hex.length == 4) {
      red = "0x" + hex[1] + hex[1];
      green = "0x" + hex[2] + hex[2];
      blue = "0x" + hex[3] + hex[3];
    }
    else if (hex.length == 7) {
      red = "0x" + hex[1] + hex[2];
      green = "0x" + hex[3] + hex[4];
      blue = "0x" + hex[5] + hex[6];
    }
    return `rgba(${+red},${+green},${+blue},${opacity})`;
}