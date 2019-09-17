Instructions to run

$node . environment  - where environment can be production or test

Assumptions
- Keep application light, with no external libraries

Design decisions and trade-offs

- This is a command line application written in node.js
- I have node v.10 on my machine (for other apps that I maintain), so have not used ES6 modules.
- Statistics logic split into own class
- With no external libraries, tests build into single app 
