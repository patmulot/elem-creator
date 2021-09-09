let toolbar = {
  // =================== //
  // === PROPERTIES === //
  // ================= //
  elemSelector: false,
  // ================ //
  // === METHODS === //
  // ============== //
  initToolbar: function () {
    // initialize element selector menu :
    // ============================================ //
    // ======== ADD/REMOVE ELEMENT BUTTON ======== //
    let addElementBtn = document.querySelector(".add_element");
    addElementBtn.addEventListener("click", toolbar.handleAddElementBtn);
    let deleteElementBtn = document.querySelector(".delete_element");
    deleteElementBtn.addEventListener("click", toolbar.handleRemoveElementBtn);
    // ================================= //
    // ======== COLOR SELECTOR ======== //
    let colorModButton = document.querySelector(".elem_mod_color");
    colorModButton.addEventListener("input", toolbar.handleColorChange);
    // =================================== //
    // ======== ELEMENT SELECTOR ======== //
    let elementSelector = document.querySelector("#element_selector");
    elementSelector.addEventListener("change", toolbar.handleElementSelector);
    toolbar.elemSelector = elementSelector;
    // ====================================== //
    // ======== ELEMENT ROUND RANGE ======== //
    let rangeElement = document.querySelector("#range_round");
    rangeElement.addEventListener("change", shapes.handleRangeRound);
    let listedElements = document.querySelectorAll(".list_item");
    for (let elementLi of listedElements) {
      elementLi.addEventListener("click", toolbar.handleClickOnList);
    }
  },
  // ===================================== //
  // ======== ADD ELEMENT BUTTON ======== //
  handleAddElementBtn: function (evt) {
    if (Object.entries(elements.allElements).length > 0) {
      elements.unselectAllElements();
    };
    let templateElement = document.querySelector(".new_element_tpl");
    if (Object.entries(elements.allElements).length < elements.maxElementNb) {
      let newElement = templateElement.content.cloneNode(true);
      newElement.querySelector(".element").classList.add("element-" + elements.elementIndex);
      newElement.querySelector(".element").dataset.indexNumber = elements.elementIndex;
      newElement.querySelector(".element").style.zIndex = (elements.maxElementNb - 1);
      elements.elemToModify = newElement;
      let elementContainer = document.querySelector(".elements_container");
      toolbar.addElementToList(elements.elementIndex);
      elements.elemToModify = newElement.querySelector(".element");
      elements.lastElementCreated = elements.elementIndex;
      elementContainer.appendChild(newElement);
      elements.elementIndex++;
      app.init();
    }
  },
  handleRemoveElementBtn: function (evt) {
    // remove element from dom :
    let elementContainer = document.querySelector(".elements_container")
    let elementToRemoveindex = elements.elemToModify.dataset.indexNumber;
    let elementToRemove = elements.elemToModify.closest(".element_content");
    elementContainer.removeChild(elementToRemove);
    // remove element from select :
    toolbar.removeElementFromSelect(elementToRemoveindex);
    // remove element from list :
    toolbar.removeElementFromList(elementToRemoveindex);
  },
  // =================================== //
  // ======== ELEMENT SELECTOR ======== //
  addElementToSelect: function (elementName, elementValue) {
    let newElementToSelect = document.createElement("option");
    newElementToSelect.value = elementValue;
    newElementToSelect.textContent = elementName;
    let selectElement = document.querySelector("#element_selector");
    selectElement.appendChild(newElementToSelect);
  },
  removeElementFromSelect: function (elementToRemoveindex) {
    let selectElement = document.querySelector("#element_selector");
    let optionElements = selectElement.querySelectorAll("option");
    for (oneOption in optionElements) {
      if (optionElements[oneOption].value === elementToRemoveindex) {
        selectElement.removeChild(optionElements[oneOption]);
      }
    }
  },
  handleElementSelector: function (evt) {
    elements.elemToModify = elements.allElements["element-" + evt.target.value];
    elements.selectElement();
  },
  // ================================= //
  // ======== COLOR SELECTOR ======== //
  handleColorChange: function (evt) {
    let colorSelected = evt.target.value;
    if (elements.selectedElement) {
      elements.selectedElement.style.backgroundColor = colorSelected;
    };
  },
  // =============================== //
  // ======== ELEMENT LIST ======== //
  addElementToList: function (elementIndex) {
    let listContainer = document.querySelector("#element_list ul");
    let newListedElement = document.createElement("li");
    newListedElement.textContent = "elem n°" + elementIndex;
    newListedElement.dataset.indexNumber = elementIndex;
    newListedElement.classList.add("list_item")
    listContainer.appendChild(newListedElement);
  },
  removeElementFromList: function (elementIndex) {
    let listContainer = document.querySelector("#element_list ul");
    let allListedElements = listContainer.querySelectorAll("li");
    let liElementIndex;
    let liElementToRemove;
    for (let oneElement in allListedElements) {
      if (allListedElements[oneElement].dataset) {
        liElementIndex = allListedElements[oneElement].dataset.indexNumber;
      }
      liElementToRemove = allListedElements[oneElement];
      if (liElementIndex === elementIndex) {
        listContainer.removeChild(liElementToRemove);
      }
    }
  },
  handleClickOnList: function(evt) {
    elements.elemToModify = elements.allElements["element-" + evt.currentTarget.dataset.indexNumber];
    elements.selectElement();
  }
}