let shapes = {
  // =================== //
  // === PROPERTIES === //
  // ================= //
  roundValue: 1,
  // ================ //
  // === METHODS === //
  // ============== //
  handleRangeRound: function (evt) {
    elements.selectElement();
    let centerElement = elements.elemToModify.querySelector(".center");
    radiusValue = evt.target.value;
    elements.elemToModify.style.borderRadius = radiusValue + "%";
    centerElement.style.borderRadius = radiusValue + "%";
  },
  handleCornerRound: function () {
    elements.selectElement();
    let radiusValue;
    let centerElement = elements.elemToModify.querySelector(".center");
    console.log(handleMouse.cursorPosX);
    if (handleMouse.holdClick === true) {
      if (handleKeys.holdShiftKey === true) {
        radiusValue = ((handleMouse.cursorPosX - handleMouse.cursorMovingPosX) + (-handleMouse.cursorPosY + handleMouse.cursorMovingPosY)) / 2;
        elements.elemToModify.style.borderRadius = radiusValue + "%";
        centerElement.style.borderRadius = radiusValue + "%";
      } else {
        if (elements.elementClicked.classList.contains("top_left")) {
          radiusValue = -((handleMouse.cursorPosX - handleMouse.cursorMovingPosX) + (handleMouse.cursorPosY - handleMouse.cursorMovingPosY)) / 2;
          elements.elemToModify.style.borderTopLeftRadius = radiusValue + "%";
          centerElement.style.borderTopLeftRadius = radiusValue + "%";
        } else if (elements.elementClicked.classList.contains("top_right")) {
          radiusValue = -(-(handleMouse.cursorPosX - handleMouse.cursorMovingPosX) + (handleMouse.cursorPosY - handleMouse.cursorMovingPosY)) / 2;
          elements.elemToModify.style.borderTopRightRadius = radiusValue + "%";
          centerElement.style.borderTopRightRadius = radiusValue + "%";
        } else if (elements.elementClicked.classList.contains("bottom_right")) {
          radiusValue = ((handleMouse.cursorPosX - handleMouse.cursorMovingPosX) + (handleMouse.cursorPosY - handleMouse.cursorMovingPosY)) / 2;
          elements.elemToModify.style.borderBottomRightRadius = radiusValue + "%";
          centerElement.style.borderBottomRightRadius = radiusValue + "%";
        } else if (elements.elementClicked.classList.contains("bottom_left")) {
          radiusValue = -((handleMouse.cursorPosX - handleMouse.cursorMovingPosX) - (handleMouse.cursorPosY - handleMouse.cursorMovingPosY)) / 2;
          elements.elemToModify.style.borderBottomLeftRadius = radiusValue + "%";
          centerElement.style.borderBottomLeftRadius = radiusValue + "%";
        }
      }
    }
  }
}