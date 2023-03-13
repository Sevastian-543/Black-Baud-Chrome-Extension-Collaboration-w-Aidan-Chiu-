var tab_title = '';
const classes = [];

var status = 0;

loadGrades.onclick = function() {
  if (status == 0) {
    chrome.tabs.query({active: true}, function(tabs) {
      var tab = tabs[0];
      tab_title = tab.title;
  
      chrome.tabs.executeScript(tab.id, {
        code: 'document.getElementsByTagName(\'a\')[113].click()'
      });
  
      chrome.tabs.executeScript(tab.id, {
        code: 'document.getElementById(\'coursesContainer\').getElementsByClassName(\'row\').length'
      }, iterate);
    });
  }
  status++;
  console.log(status)
}

function iterate (results){
  console.log(results)
  count = results
  for (var i = 0; i < results; i++) {
    chrome.tabs.query({active: true}, function(tabs) {
      var tab = tabs[0];
      //get grades
      chrome.tabs.executeScript(tab.id, {
        code: 'document.getElementsByTagName(\'div\')[10].childNodes.length'
      }, addTypes)
    })
    chrome.tabs.query({active: true}, function(tabs) {
      var tab = tabs[0];
      
      //get class name
      chrome.tabs.executeScript(tab.id, {
        code: 'document.querySelector(\'h1\').textContent'
      }, addClass);

      //next course
      chrome.tabs.executeScript(tab.id, {
        code: 'document.getElementsByTagName(\'button\')[1].click()'
      });
    });
  }


  chrome.tabs.query({active: true}, function(tabs) {
    var tab = tabs[0];
    
    chrome.tabs.executeScript(tab.id, {
      code: 'document.getElementsByTagName(\'a\')[0].click()'
    })
  })
}

var count = 0;

function addTypes (r) {
  console.log(r);
  var numOfTypes = r;

  for (var i = 2; i < numOfTypes; i++) {
    var numOfAssignments = 0;

    chrome.tabs.query({active: true}, function(tabs) {
      var tab = tabs[0];
  
      //get number of assignments in type
      chrome.tabs.executeScript(tab.id, {
        code: 'document.getElementsByTagName(\'div\')[10].children[4].textContent.replace("Back to top ", "")'
      }, function declareNumOfAssignments (r) {
        numOfAssignments = r
      })
    })

    console.log(numOfAssignments);
  }

  
}

function addClass (r) {
  classes.push(r[0]);
  if (count-- == 1) {
    print()
  }
}

function print() {
  var text = "";
  for (var i = 0; i < classes.length; i++) {
    text += "<p>" + classes[i] + "</p>";
  }
  
  document.querySelector("#id1").innerHTML = text;
}

class Class {


  constructor (name, assignments) {
      this.name = name;
      this.assignments = assignments;
  }

  get name() {
    return this.name;
  }

  get assignments() {
    return this.assignments;
  }

  get grades() {
    for (var i = 0; i < this.assignments.length; i++) {

    }
  }
}

class Assignment {


  constructor (type, name, received, total) {
    this.type = type;
    this.name = name;
    this.received = received;
    this.total = total;
  }

  get type() {
    return this.type;
  }

  get name() {
    return this.name;
  }

  get received() {
    return this.received;
  }

  get total() {
    return this.total;
  }
}





