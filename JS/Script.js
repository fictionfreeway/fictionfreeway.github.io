/* 
  File: script.js
  Author: William Watlington
  Date: 7/10/2022
  Description: script for portfolio project 
  */

//define sections of page that will be scrolled to by buttons/anchors
let home = document.getElementById("welcome-page");
let about = document.getElementById("about");
let portfolio = document.getElementById("portfolio");

//define buttons in navbar that will be changed in focus function
let homeButton = document.getElementById("home-button");
let aboutButton = document.getElementById("about-button");
let portButton = document.getElementById("port-button");
let letsGoButton = document.getElementById("lets-go");
let seeWorkButton = document.getElementById("see-work");
let buttons = [homeButton, aboutButton, portButton, letsGoButton, seeWorkButton];

//onclick functions for scrolling to elements
buttons.forEach(button => {
  button.onclick = () => {
    if(button == homeButton) {
      home.scrollIntoView(false);
    } else if(button == letsGoButton || button == aboutButton) {
      about.scrollIntoView({
        block: "center"
      });
    } else if(button == portButton || button == seeWorkButton) {
      portfolio.scrollIntoView({
        block: "center"
      })
    }
  }
})

// function that changes color and boldness of current option on nav and nav border color
let focus = (element) => {
  if (element == portfolio) {
    navbar.style.borderColor = "#fc4a1a";
    portButton.style.color = "#fc4a1a";

    //reset other navbar buttons color and font-weight when other section is visible
    homeButton.style.color = "#000";
    aboutButton.style.color = "#000";
  }

  else if (element == home) {
    navbar.style.borderColor = "#4abdac";
    homeButton.style.color = "#fc4a1a";

    //resetting other <a> elements in nav to default styles
    portButton.style.color = "#000";
    aboutButton.style.color = "#000";

  } else if (element == about) {
    navbar.style.borderColor = "#f7b733";
    aboutButton.style.color = "#fc4a1a";

    homeButton.style.color = "#000";
    portButton.style.color = "#000";
  }

};

//function that changes url when different sections are scrolled to
let changeUrl = (section) => {
  if (window.history.pushState) {
    if(section == home) {
      window.history.pushState(null, null, window.location.pathname);
    } else {
      let sectionId = "#" + String(section.id);
      window.history.pushState(null, null, window.location.pathname + sectionId);
    } 
  }
}

// detect when sections are scrolled to. This is to change nav border color to match the div border
let navbar = document.getElementById("navbar");
let observer = new IntersectionObserver((entries, observer) => { 
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      focus(entry.target);
      changeUrl(entry.target);
    }
  });
}, {threshold: 0.6});

// array of sections to be observed 
let sections = [home, about, portfolio];

sections.forEach(section => {
  observer.observe(section);
});




// script to animate the presentation of portfolio projects when clicked in the folder

// landingPage1 = document.getElementById("lp1");
lp1Text = document.getElementById("lp1-text");
lp1List = document.getElementById("lp1-list");

//define lists to loop through/use for portfolio functions
const projectGroups = Array.from(document.querySelectorAll(".project-group"));
const portImages = Array.from(document.querySelectorAll(".port-img"));
const firstImages = document.querySelectorAll(".img1");
const secondImages = document.querySelectorAll(".img2");
const projectContents = Array.from(document.querySelectorAll(".group-content"));
const folders = Array.from(document.querySelectorAll(".folder"));
const folderBorders = Array.from(document.querySelectorAll(".folder-border"));
const portLists = Array.from(document.querySelectorAll(".port-list"));
const closeButton = document.getElementById("close");
const changingText = document.getElementById("changing-text");


//function of styles to be applied to clicked images
let presentProject = (image) => {
  image.style.bottom = "18rem";
  image.style.left = "8%";
  image.style.transform = "rotate(0deg)";
};

//function to shrink folder and contents after first image is selected
let shrinkFolder = (currentContent) => {
  //nonActiveContent returns array of all elements in the project-group that except the one passed to function
  let nonActiveContent = projectContents.filter(content => content !== currentContent);
  nonActiveContent.forEach(element => {
    if(element.classList.contains("img1")) {
      element.style.transform = "translate(-5%, 10rem) scale(0.6) rotate(-12deg)";
    } else if(element.classList.contains("img2")) {
      element.style.transform = "translate(5%, 12rem) scale(0.6) rotate(-17deg)";
    } else if (element.classList.contains("folder-border")) {
      element.style.transform = "translate(0, 13.25rem) scale(0.6)";
    } else if (element.classList.contains("folder")) {
      element.style.transform = "translate(0, 13rem) scale(0.6)";
    }
  })
};

//function that when called returns all but one portfolio image back into the folder
let resetImages = (imgList, image) => {
  //nonActiveImages returns new array of elements in imgList except the current image which is passed to the function
  let nonActiveImages = imgList.filter(arrImage => arrImage !== image);
  nonActiveImages.forEach(project => {
    if(project.classList.contains("img1")) {
      project.style.bottom = "9rem";
      project.style.left = "30%";
      project.style.transform = "rotate(-12deg)";
    }
    else if(project.classList.contains("img2")) {
      project.style.bottom = "11rem";
      project.style.left = "27%";
      project.style.transform = "rotate(-17deg)";
    }
  })
};

//function that hides the accompanying list to all portfolio images
let hideLists = () => {
  portLists.forEach(list => {
    list.style.opacity = "0";
    list.style.visibility = "hidden";
  })
};

//function that will find the current list to accompany an image and make it appear
let showList = (currentImage) => {
  try {
    let listId = currentImage.id + "-list";
    let list = document.getElementById(listId);
    list.style.opacity = 1;
    list.style.visibility = "visible";
  } catch (error) {
  }
}

//function to show close button
let showClose = () => {
  closeButton.style.opacity = "1";
  closeButton.style.visibility = "visible";
}

//hides close button
let hideClose = () => {
  closeButton.style.opacity = "0";
  closeButton.style.visibility = "hidden";
}

//apply changes to portfolio images when clicked using functions defined above
portImages.forEach(image => {
  image.onclick = () => {
    activeImg = image;
    presentProject(image);
    resetImages(portImages, image);
    shrinkFolder(image);
    showClose();
    hideNext();
    hidePrevious();
    hideLists(image);
    showList(image);
    document.getElementById("lp1").style.animation = "none";
  }
});

//following functions are for restoring original state of project group when close button is clicked or categories changed

//resets folder and images to original full scale state
let closeProject = () => {
  resetImages(portImages);
  projectContents.forEach(element => {
    if(element.classList.contains("folder")) {
      element.style.transform = "scale(1.0)"
    }

    else if(element.classList.contains("folder-border")) {
      element.style.transform = "scale(1.0)"
    }

    else if(element.classList.contains("folder-title")) {
      element.style.transform = "scale(1.0)";
    }
  })

  folders.forEach(folder => {
    folder.style.transform = "scale(1.0)";
  });
  folderBorders.forEach(border => {
    border.style.transform = "scale(1.0)";
  });
}

//automatically shows the appropriate next or previous button depending on which folder is on screen
let showHideNextPrevious = () => {
  if(folderNumber == 0) {
    showNext();
    hidePrevious();
  } else if(folderNumber < 4 && folderNumber > 0) {
    showNext();
    showPrevious();
  } else if(folderNumber >= 4) {
    showPrevious();
    hideNext();
  }
}

//return to large folder when "x" button is clicked
closeButton.onclick = () => {
  closeProject();
  hideClose();
  hideLists();
  showHideNextPrevious();
}

//script to allow for next and previous buttons to scroll through portfolio categories/folders which will slid in from left/right


//functions to slide current folder away to left or right out of sight
let slideLeft = (folder) => {
  folder.style.transform = "translate(-2000px)";
}

let slideRight = (folder) => {
  folder.style.transform = "translate(2000px)";
}

let slideToCenter = (folder) => {
  folder.style.transform = "translate(0)";
}

// functions to show/hide next/previous buttons
let previousButton = document.getElementById("previous");
let nextButton = document.getElementById("next");

let showPrevious = () => {
  previousButton.style.opacity = "100";
  previousButton.style.visibility = "visible";
}

let hidePrevious = () => {
  previousButton.style.opacity = "0";
  previousButton.style.visibility = "hidden";
}

let showNext = () => {
  nextButton.style.opacity = "100";
  nextButton.style.visibility = "visible";
}

let hideNext = () => {
  nextButton.style.opacity = "0";
  nextButton.style.visibility = "hidden";
}

//variable that holds the current shown folder
folderNumber = 0;

currentFolder = projectGroups[folderNumber];

//function to reassign currentFolder
updateFolder = () => {
  currentFolder = projectGroups[folderNumber];
}


//changes text at top of #portfolio div when certain folders are on in frame
let changePortText = (current) => {
  if(current == 4) {
    changingText.innerHTML = "This is where you can find me";
  } else {
    changingText.innerHTML = "This is what I do"
  }
}

//function to bring next folder when next button is clicked
nextButton.onclick = () => {
  if(folderNumber < 4) {
    slideLeft(currentFolder);
    folderNumber++;
    updateFolder();
    showHideNextPrevious();
    slideToCenter(currentFolder);
    changePortText(folderNumber);
  }
}

//recall previous folder when previous arrow button is clicked
previousButton.onclick = () => {
  if(folderNumber > 0) {
    slideRight(currentFolder);
    folderNumber--;
    updateFolder();
    showHideNextPrevious();
    slideToCenter(currentFolder);
    changePortText(folderNumber);
  } else {

  }
  
}

console.log("Oh no they're inspecting it");