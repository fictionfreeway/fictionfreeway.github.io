
//define buttons in navbar that will be changed in focus function
let homeButton = document.getElementById("home-button");
let portButton = document.getElementById("port-button");
let contactButton = document.getElementById("contact-button");


// function that changes color and boldness of current option on nav and nav border color
let focus = (element) => {
  if (element == portfolio) {
    navbar.style.borderColor = "#fc4a1a";
    portButton.style.color = "#fc4a1a";
    portButton.style.fontWeight = "bold";

    //reset other navbar buttons color and font-weight when other section is visible
    homeButton.style.color = "#000";
    homeButton.style.fontWeight = "normal";
  }

  else if (element == welcome) {
    navbar.style.borderColor = "#4abdac";
    homeButton.style.color = "#fc4a1a";
    homeButton.style.fontWeight = "bold";

    //resetting other <a> elements in nav to default styles
    portButton.style.color = "#000";
    portButton.style.fontWeight = "normal";
  }
};

// detect when sections are scrolled to. This is to change nav border color to match the div border
let navbar = document.getElementById("navbar");
let portfolio = document.getElementById("portfolio")
let welcome = document.getElementById("welcome-page")
let observer = new IntersectionObserver((entries, observer) => { 
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      focus(entry.target);
    }
  });
}, {threshold: 0.3});

// array of sections to be observed 
let sections = [welcome, portfolio];

sections.forEach(section => {
  observer.observe(section);
});




// script to animate the presentation of portfolio projects when clicked in the folder

// landingPage1 = document.getElementById("lp1");
lp1Text = document.getElementById("lp1-text");
lp1List = document.getElementById("lp1-list");

//define lists to loop through/use for portfolio functions
const projectGroups = document.querySelectorAll(".project-group");
const portImages = Array.from(document.querySelectorAll(".port-img"));
const firstImages = document.querySelectorAll(".img1");
const secondImages = document.querySelectorAll(".img2");
const projectContents = Array.from(document.querySelectorAll(".group-content"));
const folders = Array.from(document.querySelectorAll(".folder"));
const folderBorders = Array.from(document.querySelectorAll(".folder-border"));
const portLists = Array.from(document.querySelectorAll(".port-list"));
const closeButton = document.getElementById("close");



//function of styles to be applied to clicked images
let presentProject = (image) => {
  image.style.bottom = "30vh";
  image.style.left = "8%";
  image.style.transform = "rotate(0deg)";
};

//function to shrink folder and contents after first image is selected
let shrinkFolder = (currentContent) => {
  //nonActiveContent returns array of all elements in the project-group that except the one passed to function
  let nonActiveContent = projectContents.filter(content => content !== currentContent);
  nonActiveContent.forEach(element => {
    if(element.classList.contains("img1")) {
      element.style.transform = "translate(-5%, 17vh) scale(0.6) rotate(-12deg)";
    }
    else if(element.classList.contains("img2")) {
      element.style.transform = "translate(0, 22vh) scale(0.6) rotate(-17deg)";
    }
    //translate folder title to stay in the correct spot on folder, will need work in responsiveness
    else if(element.classList.contains("folder-title")) {
      element.style.transform = "translate(-40%, 28vh) scale(0.63)";
    }
    else {
      element.style.transform = "translate(0, 25vh) scale(0.6)";
    }
  })
};

//function that when called returns all but one portfolio image back into the folder
let resetImages = (imgList, image) => {
  //nonActiveImages returns new array of elements in imgList except the current image which is passed to the function
  let nonActiveImages = imgList.filter(arrImage => arrImage !== image);
  nonActiveImages.forEach(project => {
    if(project.classList.contains("img1")) {
      project.style.bottom = "15vh";
      project.style.left = "30%";
      project.style.transform = "rotate(-12deg)";
    }
    else if(project.classList.contains("img2")) {
      project.style.bottom = "20vh";
      project.style.left = "27%";
      project.style.transform = "rotate(-12deg)";
    }
  })
};

//function that hides the accompanying list to all portfolio images
let hideLists = () => {
  portLists.forEach(list => {
    list.style.opacity = "0";
  })
};

//function that will find the current list to accompany an image and make it appear
let showList = (currentImage) => {
  try {
    let listId = currentImage.id + "-list";
    let list = document.getElementById(listId);
    list.style.opacity = 1;
  } catch (error) {
  }
}

//function to show close button
let showClose = () => {
  closeButton.style.opacity = "1";
}

//apply changes to portfolio images when clicked using functions defined above
portImages.forEach(image => {
  image.onclick = () => {
    presentProject(image);
    resetImages(portImages, image);
    shrinkFolder(image);
    showClose();
    hideLists(image);
    showList(image);
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

  /* folders.forEach(folder => {
    folder.style.transform = "scale(1.0)";
  });
  folderBorders.forEach(border => {
    border.style.transform = "scale(1.0)";
  }); */
}

//hides close button
let hideClose = () => {
  closeButton.style.opacity = "0";
}

closeButton.onclick = () => {
  closeProject();
  hideClose();
  hideLists();
}