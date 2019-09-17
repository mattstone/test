// Ensure input is sane
const environment = process.argv[2]

if (process.argv.length !== 3 || (environment !== "production" && environment !== "test")) {
  console.log("Usage: node . environment");
  console.log("Where environment can be production or test");
  console.log("");
  process.exit(0);
}

// Define variables
const Statistics = require('./Statistics');
const stats   = new Statistics;
let   data    = {};
let   working = {};
let   output  = []

// Populate data
data = environment === "production" ? require('./data') : require('./testData');

// Populate working
for (var element of data) {
  if (element.id && element.temperature) {
    if (!(element.id in working)) { working[element.id] = []; }
    working[element.id].push(Number(element.temperature));
  }
}

// Calculate statistics from working
for (var key in working) {
  let object     = { id: key }
  object.average = stats.average(working[key]).toFixed(2);
  object.median  = stats.median(working[key]).toFixed(2);
  object.mode    = stats.mode(working[key]);
  output.push(object);
}

switch (environment) {
  case "production": console.log(JSON.stringify(output)); break;

  case "test":
    let mode_is_valid = null;

    console.log("Output length is " + (output.length === 3 ? "valid" : "invalid"));

    for (var element of output) {
      switch (element.id) {
        case 'a':
          console.log("a.average is " + (element.average === '3.77' ? "valid" : "invalid"));
          console.log("a.median  is " + (element.median  === '3.65' ? "valid" : "invalid"));

          mode_is_valid = true;
          if (element.mode.length !== 1)      { mode_is_valid = false; }
          if (element.mode[0]     !== '3.53') { mode_is_valid = false; }
          console.log("a.mode    is " + (mode_is_valid ? "valid" : "invalid"));
          break;

        case 'b':
          console.log("b.average is " + (element.average === '4.08' ? "valid" : "invalid"));
          console.log("b.median  is " + (element.median  === '4.14' ? "valid" : "invalid"));

          mode_is_valid = true;
          if (element.mode.length !== 1)      { mode_is_valid = false; }
          if (element.mode[0]     !== '4.15') { mode_is_valid = false; }
          console.log("b.mode    is " + (mode_is_valid ? "valid" : "invalid"));
          break;

        case 'c':
          console.log("c.average is " + (element.average === '3.72' ? "valid" : "invalid"));
          console.log("c.median  is " + (element.median  === '3.95' ? "valid" : "invalid"));

          mode_is_valid = true;
          if (element.mode.length !== 2)      { mode_is_valid = false; }
          if (element.mode[0]     !== '3.36') { mode_is_valid = false; }
          if (element.mode[1]     !== '3.96') { mode_is_valid = false; }
          console.log("c.mode    is " + (mode_is_valid ? "valid" : "invalid"));
          break;
      }
    }
    break;
}
