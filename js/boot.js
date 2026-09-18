const bootLines = [
    "Booting kernel...",
    "[ OK ] Mounting Filesystems",
    "[ OK ] Starting Network Services",
    "[ OK ] Loading User Profile: User",
    "",
    "Initializing Portfolio.sh...",
    "Access Granted",
    "",
    "Welcome To Lukes Portfolio"
];


const bootTextEl = document.getElementById('boot-text');

let lineIndex = 0;
let charIndex = 0;

let bootSkipped = false;


function typeBootSequence() {
    if (bootSkipped) return;

    if (lineIndex >= bootLines.length){
        setTimeout(showMainSite, 800);
        return;
    }



    const currentLine = bootLines[lineIndex];

    if (charIndex < currentLine.length){
        bootTextEl.textContent += currentLine[charIndex];
        charIndex++;
        setTimeout(typeBootSequence, 20);
    } 
    else{
        bootTextEl.textContent += "\n";
        lineIndex++;
        charIndex = 0;
        setTimeout(typeBootSequence, 150);
    }
}  

function skipBoot(){
    if (bootSkipped) return;
    bootSkipped = true;
    bootTextEl.textContent = bootLines.join('\n');
    showMainSite();
}

document.addEventListener('keydown', skipBoot);
document.addEventListener('click', skipBoot);

function showMainSite(){
    document.getElementById('boot-screen').classList.add('hidden');
    document.getElementById('main-site').classList.remove('hidden');
    sessionStorage.setItem('hasBooted', 'true');
    
    const input = document.getElementById('command-input');
    if (input) input.focus();
}

const hasBooted = sessionStorage.getItem('hasBooted');

if (hasBooted){
    document.getElementById('boot-screen').classList.add('hidden');
    document.getElementById('main-site').classList.remove('hidden');
}
else {
    typeBootSequence();
}
