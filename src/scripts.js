const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

const controlColumns = (levels, slider) => {
  levels.forEach((level, i) => {
    level.querySelectorAll(".column").forEach((element, i) => {
      toggleVisebility(element, i > slider.value);
    });

    level.querySelectorAll(".wall").forEach((wall, i) => {
      toggleVisebility(wall, i > slider.value - 1);
      toggleDoor(wall, slider, i);
    });
  });
};

const toggleDoor = (wall, slider, i) => {
  const midIndex = Math.ceil((slider.value - 1) / 2);
  const isMiddle = midIndex == i;
  if (isMiddle) {
    wall.classList.add("door");
  } else {
    wall.classList.remove("door");
  }
};

const setVisibility = (elements, slider) => {
  elements.forEach((element, i) => {
    toggleVisebility(element, i > slider.value);
  });
};

const toggleVisebility = (element, statment) => {
  if (statment) {
    element.style.display = "none";
  } else {
    element.style.display = "flex";
  }
};

const randomizeSlider = slider => {
  slider.value = getRandomInt(slider.min, slider.max);
  var event = new Event("input");
  slider.dispatchEvent(event);
};

const randomizeStyle = (elements) => {
  const index = getRandomInt(0, elements.length-1)
  elements[index].click()
}

const updateSize = e => {
  const slider = e.target;
  const target = document.querySelectorAll(slider.dataset.target);
  target.forEach(element => {
    element.style.setProperty(
      slider.dataset.prop,
      slider.value + slider.dataset.unit
    );
  });
};

const randomzie = (columnControl, levelControl, styleControls, sizeControls) =>{
  randomizeSlider(columnControl);
  randomizeSlider(levelControl);
  randomizeStyle(styleControls);
  sizeControls.forEach(slider => {
    randomizeSlider(slider);
  });
}

const init = () => {
  const sizeControls = document.querySelectorAll(".size-control");
  const levelControl = document.querySelector(".level-control");
  const columnControl = document.querySelector(".column-control");
  const styleControls = document.querySelectorAll(".style label");
  const randomizeButton = document.querySelector("[type='button']");
  

  const house = document.querySelector(".house");
  const levels = document.querySelectorAll(".level");
  const floors = document.querySelectorAll(".floor");

  sizeControls.forEach(slider => {
    slider.addEventListener("input", updateSize);
  });

  columnControl.addEventListener("input", e => {
    controlColumns(levels, e.target);
  });

  levelControl.addEventListener("input", e => {
    setVisibility(levels, e.target);
    setVisibility(floors, e.target);
  });

  styleControls.forEach(slider => {
    slider.addEventListener("click", (e) =>{
      house.className = "house";
      house.classList.add(e.target.htmlFor)
    });
  });

  randomizeButton.addEventListener("click", (e) =>{
    randomzie(columnControl, levelControl, styleControls, sizeControls)
  });

  randomzie(columnControl, levelControl, styleControls, sizeControls)

  house.style.opacity = 1;
};

document.addEventListener("DOMContentLoaded", init);



