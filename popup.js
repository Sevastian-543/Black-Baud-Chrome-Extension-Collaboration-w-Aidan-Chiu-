loadGrades.onclick = function() {
  text = 0
  if (run == 0) {
    load()
    run++;
  }
}

var run = 0;

async function load () {
  // get("document.getElementsByTagName(\'a\')[113].click()")
  console.log(await get('document.getElementById(\'coursesContainer\').getElementsByClassName(\'row\').length'))
}

var status = true;


async function get(x) {
  // Call the executeScript method and use the await keyword to wait for it to finish
  let result = await chrome.tabs.executeScript({
    code: x
  }, function re(re) {
      return re;
    });
  return result; 
  // console.log(results);
  
  // The executeScript method has now finished, and the results variable contains the return value of the script
  // let element = results[0];
  // return results;

  // console.log(element);
  // return element;
  // You can now use the element variable to access and manipulate the web page element
  // Any code that follows this point will not be executed until the executeScript method has completed
}
