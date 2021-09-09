let elements = {
  // =================== //
  // === PROPERTIES === //
  // ================= //
  elementIndex: 1, //!
  currentElementIndex: false,
  elementZindex: 1, //!
  elementPosX: false,
  elementPosY: false,
  elementWidth: false,
  elementHeight: false,
  elemToModify: false,
  initialElementWidth: false,
  initialElementHeight: false,
  selectedElement: false,
  elementClicked: false,
  allElements: {},
  elementsRotateValues: [],
  maxElementNb: 30,
  isSelected: false,
  currentRoundHandler: false,
  lastElementCreated: false,
  elementToCopy: false,
  // elementToPaste: false,//!
  // screen element :
  mainContainerWidth: false,
  containerWidth: false,
  // ================ //
  // === METHODS === //
  // ============== //
  initElements: function () {
    elements.mainContainerWidth = document.querySelector(".main_container").offsetWidth;
    elements.containerWidth = document.querySelector(".elements_container").offsetWidth;
    // initialize all elements from dom :
    let elementsTab = document.querySelectorAll(".element");
    for (let element of elementsTab) {
      let elementName = "element-" + element.dataset.indexNumber;
      // check if elements already exist in allElements Tab
      if (elements.allElements[elementName]) {} else {
        element.classList.add(elementName);
        elements.allElements[elementName] = element;
        toolbar.addElementToSelect(elementName, element.dataset.indexNumber);
      }
    }
  },
  selectElement: function () {
    elements.unselectAllElements();
    elements.elemToModify.classList.add("selected")
    if (elements.elementClicked === false) {
      elements.selectedElement = elements.elemToModify;
    } else {
      elements.selectedElement = elements.elementClicked.closest(".element");
    }
    elements.previousZindex = elements.elemToModify.style.zIndex;
    // rotation handler :
    let rotateHandlerElement = elements.elemToModify.querySelector(".rotate");
    rotateHandlerElement.style.visibility = "visible";
    let allHandlersElements = elements.elemToModify.querySelectorAll(".handler");
    for (handler in allHandlersElements) {
      if (allHandlersElements[handler].style !== undefined) {
        allHandlersElements[handler].style.visibility = "visible";
      }
    }
    let selectElement = document.querySelector("#element_selector");
    if (selectElement.options[elements.elemToModify.dataset.indexNumber]) {
      selectElement.options[elements.elemToModify.dataset.indexNumber].setAttribute("selected", "selected");
    }
    elements.elementPositionIndex();
  },
  unselectAllElements: function () {
    let allSelectedElements = document.querySelectorAll(".selected")
    for (element in allSelectedElements) {
      if (element >= 0) {
        allSelectedElements[element].classList.remove("selected");
        // rotation handler :
        let rotateHandlerElement = allSelectedElements[element].querySelector(".rotate");
        rotateHandlerElement.style.visibility = "hidden";
        let allHandlersElements = allSelectedElements[element].querySelectorAll(".handler");
        for (handler in allHandlersElements) {
          if (allHandlersElements[handler].style !== undefined) {
            allHandlersElements[handler].style.visibility = "hidden";
          }
        }
      }
    }
    let selectElement = document.querySelector("#element_selector");
    if (selectElement.options[elements.elemToModify.dataset.indexNumber]) {
      selectElement.options[elements.elemToModify.dataset.indexNumber].removeAttribute("selected");
    }
  },
  elementPositionIndex: function () {
    // setting index position to all elements :
    for (let oneElement in elements.allElements) {
      if (elements.allElements[oneElement].style.zIndex > 1) {
        elements.allElements[oneElement].style.zIndex -= 1;
      } else {
        elements.allElements[oneElement].style.zIndex = 1;
      }
    }
    // setting index position to current element 
    elements.elemToModify.style.zIndex = (elements.maxElementNb - 1);
  },
  elementSpecifications: function (currentElement) {
    if (currentElement) {
      let currentIndex = currentElement.dataset.indexNumber
      // element size :
      let elementSpanWidth = document.querySelector(".elem_width_value")
      let elementWidth = currentElement.offsetWidth;
      elementSpanWidth.textContent = elementWidth + " px";

      let elementSpanHeight = document.querySelector(".elem_height_value")
      let elementHeight = currentElement.offsetHeight;
      elementSpanHeight.textContent = elementHeight + " px";

      let elementSpanRotate = document.querySelector(".elem_rotate_value")
      let rotationValue = elements.elementsRotateValues["rotate-" + currentIndex];
      elementSpanRotate.textContent = rotationValue;

      let elementSpanColor = document.querySelector(".elem_color_value")
      let colorValue = currentElement.style.backgroundColor;
      elementSpanColor.textContent = colorValue;

      let elementSpanPosX = document.querySelector(".elem_pos_x")
      elementSpanPosX.textContent = elements.elemToModify.offsetLeft;
      let elementSpanPosY = document.querySelector(".elem_pos_y")
      elementSpanPosY.textContent = elements.elemToModify.offsetTop;
    }
  }
}