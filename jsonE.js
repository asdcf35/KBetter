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
        category: "Science Bowl",
        difficulty: "HS",
        points: 10,
        content: d.questions[index].bonus_question,
        answer: ans,
        duration: 21.8,
      },
    })
  });
  atd = []
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
        category: "Science Bowl",
        difficulty: "HS",
        points: 4,
        content: d.questions[index].tossup_question,
        answer: ans,
        duration: 30.8,
      },
    })
  });
  at.concat(atd);
  string = "[";
  at.forEach((element)=>{
    string += JSON.stringify(element) + ","
  })
  string += "]"
  fs.writeFile("new.json", string, (err) => {
    if (err)
      console.log(err);
  });
}); 

console.log("readFile called");
