let handleKeys = {
  // =================== //
  // === PROPERTIES === //
  // ================= //
  // keys :
  holdCtrl: false,
  holdC: false,
  holdV: false,
  holdShiftKey: false,
  // holdCtrlKey: false, //!
  // ================ //
  // === METHODS === //
  // ============== //
  initKeysHandlers: function () {
    document.body.addEventListener('keydown', handleKeys.handlePressDown);
    document.body.addEventListener('keyup', handleKeys.handlePressUp);
  },
  handlePressDown: function (evt) {
    // console.log(evt);
    if (evt.key === "Escape") {
      elements.unselectAllElements();
    }
    if (evt.key === "Control") {
      handleKeys.holdCtrl = 1;
    }
    if (evt.key === "c") {
      handleKeys.holdC = 1;
      handleKeys.checkCopyPaste();
    }
    if (evt.key === "v") {
      handleKeys.holdV = 1;
      handleKeys.checkCopyPaste();
    }
    if (evt.key === "Delete") {
      toolbar.handleRemoveElementBtn();
    }
  },
  handlePressUp: function (evt) {
    handleKeys.holdCtrl = false;
    handleKeys.holdC = false;
    handleKeys.holdV = false;
  },
  checkCopyPaste: function () {
    let elemOrientation;
    let elemIndex = elements.elemToModify.dataset.indexNumber;
    if (handleKeys.holdCtrl === 1 && handleKeys.holdC === 1) {
      // copying current element to elementToCopy :
      elements.elementToCopy = elements.elemToModify;
    }
    if (handleKeys.holdCtrl === 1 && handleKeys.holdV === 1) {
      // create new element :
      toolbar.handleAddElementBtn();
      let newElement = elements.allElements["element-" + elements.lastElementCreated];
      // setting copyied values to new element :
      newElement.style.width = elements.elementToCopy.offsetWidth + "px";
      newElement.style.height = elements.elementToCopy.offsetHeight + "px";
      newElement.style.backgroundColor = elements.elementToCopy.style.backgroundColor;
      // setting rotation value to new element :
      if (elements.elementsRotateValues["rotate-" + elemIndex]) {
        elemOrientation = elements.elementsRotateValues["rotate-" + elemIndex];
      } else {
        elemOrientation = 0;
      }
      elements.elemToModify.style.transform = "rotate(" + elemOrientation + "deg)";
      let centerElement = elements.elemToModify.querySelector(".center");
      // setting round values to new element :
      elements.elemToModify.style.borderTopLeftRadius = elements.elementToCopy.style.borderTopLeftRadius;
      elements.elemToModify.style.borderTopRightRadius = elements.elementToCopy.style.borderTopRightRadius;
      elements.elemToModify.style.borderBottomRightRadius = elements.elementToCopy.style.borderBottomRightRadius;
      elements.elemToModify.style.borderBottomLeftRadius = elements.elementToCopy.style.borderBottomLeftRadius;
      // setting round values to center element :
      centerElement.style.borderTopLeftRadius = elements.elementToCopy.style.borderTopLeftRadius;
      centerElement.style.borderTopRightRadius = elements.elementToCopy.style.borderTopRightRadius;
      centerElement.style.borderBottomRightRadius = elements.elementToCopy.style.borderBottomRightRadius;
      centerElement.style.borderBottomLeftRadius = elements.elementToCopy.style.borderBottomLeftRadius;
    }
  }
}