// Node.js program to demonstrate
// the fs.readFile() method

// Include fs module
var fs = require("fs");

// Use fs.readFile() method to read the file
fs.readFile("New_Request-1681424094337.json", "utf8", function (err, data) {
  d = JSON.parse(data);
  console.log(d);
  let at = []
  d.questions.forEach((element, index) => {
    let ans = ""
    if(d.questions[index].bonus_format == "Multiple Choice"){
        ans = d.questions[index].bonus_answer.split(" ");
        ans[0].replace(")", "")
        ans = ans.toString()        
    }
    at.push({
      model: "game.question",
      pk: index+1,
      fields: {
        category: d.questions[index].category,
        difficulty: "HS",
        points: 10,
        content: d.questions[index].bonus_question,
        answer: ans,
        duration: 21.8,
      },
    })
  });
  atd = []
  console.log(at);
  d.questions.forEach((element, index) => {
    let ans = ""
    if(d.questions[index].tossup_format == "Multiple Choice"){
        ans = d.questions[index].tossup_answer.split(" ");
        ans[0].replace(")", "")
        ans = ans.toString()        
    }
    atd.push({
      model: "game.question",
      pk: index+1,
      fields: {
        category: d.questions[index].category,
        difficulty: "HS",
        points: 4,
        content: d.questions[index].tossup_question,
        answer: ans,
        duration: 21.8,
      },
    })
  });
  console.log(atd);
fLs = "{atd+at}"
  fs.writeFile("fl.json", fLs, (err) => {
    if (err)
      console.log(err);
    else {
      console.log("File written successfully\n");
      console.log("The written has the following contents:");
    }
  });
});

console.log("readFile called");
