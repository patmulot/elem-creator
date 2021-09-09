let handleMouse = {
  // =================== //
  // === PROPERTIES === //
  // ================= //
  // cursor :
  cursorPosX: 0,
  cursorPosY: 0,
  cursorMovingPosX: 0,
  cursorMovingPosY: 0,
  holdClick: false,
  isRound: false,
  cursorEvt: false,
  // keys :
  shiftResize: 1,
  shiftResizePos: 1,
  shiftRotateValue: 0,
  // ================ //
  // === METHODS === //
  // ============== //
  initMouseHandlers: function () {
    let elementContainer = document.querySelector(".elements_container");
    let clickableElement = document.querySelectorAll(".clickable");
    // init mouse events :
    for (let element of clickableElement) {
      element.addEventListener('mousedown', handleMouse.handleElementClickdown);
      element.addEventListener('mousedown', modifications.handleElementRotation);
      element.addEventListener('mousedown', handleMouse.handleElementResizeAxes);
    };
    elementContainer.addEventListener('mouseup', handleMouse.handleElementClickup);
    elementContainer.addEventListener("mousemove", handleMouse.handleMousemove);
    // ini keyboard events :
    document.body.addEventListener('keydown', function () {
      handleKeys.holdShiftKey = true;
    });
    document.body.addEventListener('keyup', function () {
      handleKeys.holdShiftKey = false;
    });
  },
  handleElementClickdown: function (evt) {
    modifications.disableRound();
    // setting element to modify from clicked element :
    elements.elementClicked = evt.currentTarget;
    elements.elemToModify = elements.elementClicked.closest(".element");
    elements.elementPositionIndex();
    elements.currentElementIndex = elements.elemToModify.dataset.indexNumber;
    if (elements.elementsRotateValues["rotate-" + elements.currentElementIndex] !== undefined) {
      modifications.rotationValue = elements.elementsRotateValues["rotate-" + elements.currentElementIndex];
    };
    // init element position :
    elements.elementPosX = elements.elemToModify.offsetLeft;
    elements.elementPosY = elements.elemToModify.offsetTop;
    // init element size :
    elements.initialElementWidth = elements.elemToModify.offsetWidth;
    elements.initialElementHeight = elements.elemToModify.offsetHeight;
    elements.elementWidth = elements.elemToModify.offsetWidth;
    elements.elementHeight = elements.elemToModify.offsetHeight;
    // init cursor position :
    handleMouse.cursorPosX = evt.clientX;
    handleMouse.cursorPosY = evt.clientY;
    // starting hold click :
    handleMouse.holdClick = true;
    document.body.style.cursor = "all-scroll";
    // selected element :
    if (elements.elemToModify !== false) {
      if (elements.elemToModify.classList.contains("selected")) {
        elements.unselectAllElements();
      } else {
        elements.selectElement();
      }
    }
    if (elements.elemToModify !== false) {
      modifications.checkModifAction();
    }
  },
  handleElementClickup: function (evt) {
    // reset elements clicked
    elements.elementClicked = false;
    modifications.elementModification = false;
    document.body.style.cursor = "auto";
    // ending hold click :
    handleMouse.holdClick = false;
    modifications.rotationValue = 0;
  },
  handleMousemove: function (evt) {
    handleMouse.cursorMovingPosX = evt.clientX;
    handleMouse.cursorMovingPosY = evt.clientY;
    if (modifications.elementModification === "position") {
      modifications.movingElement();
    } else if (modifications.elementModification === "resizeAngle") {
      modifications.resizeAngles();
    } else if (modifications.elementModification === "resizeAxes") {
      modifications.resizeAxes();
    } else if (modifications.elementModification === "rotate") {
      modifications.handleElementRotation(evt);
    } else if (elements.elementClicked) {
      if (elements.elementClicked.classList.contains("round_handler")) {
        modifications.enableRound();
        shapes.handleCornerRound();
      }
    }
    elements.elementSpecifications(elements.elemToModify);
  },
}