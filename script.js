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
    commandInput.focus();
}

typeBootSequence();

const commandInput = document.getElementById('command-input');
const commandFeedback = document.getElementById('command-feedback');
const allSections = document.querySelectorAll('#main-site section');

const commands = {
    whoami : 'about',
    'ls projects' : 'projects',
    'ls projects/' : 'projects',
    'cat skills.txt' : 'skills',
    'cat contact.txt' : 'contact',
};

function hideAllSections(){
    allSections.forEach(function(section){
        section.classList.add('hidden');
    });
}



commandInput.addEventListener('keydown', function(event){
    if (event.key !== 'Enter') return;

    const rawInput = commandInput.value.trim().toLowerCase();
    const targetSectionId = commands[rawInput];

    hideAllSections();

    if (targetSectionId){
        document.getElementById(targetSectionId).classList.remove('hidden');
        commandFeedback.textContent = '';
    }
    else if (rawInput == 'help') {
        commandFeedback.textContent = 'Available commands: whoami, ls, cat';
    }
    else if (rawInput == 'ls'){
        commandFeedback.innerHTML = '<b>/projects</b>  skills.txt contact.txt';
    }
    else if (rawInput == ''){
        commandFeedback.textContent = '';
    }
    else {
        commandFeedback.textContent = `command not found: ${rawInput}`;
    }

    commandInput.value = '';
    
});