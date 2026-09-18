const commandInput = document.getElementById('command-input');
const commandFeedback = document.getElementById('command-feedback');

if (commandInput && commandFeedback) {

  const allSections = document.querySelectorAll('.shell-output');

  function hideAllSections() {
    allSections.forEach(function(section) {
      section.classList.add('hidden');
    });
  }

  // commands that reveal inline output on the homepage
  const showCommands = {
    whoami: 'about',
    'cat skills.txt': 'skills',
    'cat contact.txt': 'contact',
  };

  // commands that navigate to a real page
  const navCommands = {
    'cd projects': 'projects.html',
    'ls projects': 'projects.html',
    'cd writeups': 'writeups.html',
    'ls writeups': 'writeups.html',
    'cd cv': 'cv.html',
    'cat cv': 'cv.html',
    'cd about': 'about.html',
    'cd ~': 'index.html',
    'cd home': 'index.html',
  };

  const helpText = 'Commands: whoami, cat skills.txt, cat contact.txt, ' +
                    'cd projects, cd writeups, cd cv, ls';

  commandInput.addEventListener('keydown', function(event) {
    if (event.key !== 'Enter') return;

    const rawInput = commandInput.value.trim().toLowerCase();
    commandInput.value = '';

    if (rawInput === '') {
      commandFeedback.textContent = '';
      return;
    }

    if (navCommands[rawInput]) {
      commandFeedback.textContent = `navigating to ${navCommands[rawInput]} ...`;
      window.location.href = navCommands[rawInput];
      return;
    }

    hideAllSections();

    if (showCommands[rawInput]) {
      document.getElementById(showCommands[rawInput]).classList.remove('hidden');
      commandFeedback.textContent = '';
    } else if (rawInput === 'ls') {
      commandFeedback.textContent = 'projects/  writeups/   cv ';
    } else if (rawInput === 'help') {
      commandFeedback.textContent = helpText;
    } else {
      commandFeedback.textContent = `command not found: ${rawInput}`;
    }
  });

}