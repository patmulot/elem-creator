let modifications = {
    // =================== //
    // === PROPERTIES === //
    // ================= //
    // modification status :
    elementModification: false,
    // rotation :
    rotationValue: 0,
    // ================ //
    // === METHODS === //
    // ============== //
    checkModifAction: function () {
        if (elements.elementClicked !== false) {
            if (elements.elementClicked.classList.contains("center")) {
                modifications.elementModification = "position";
            } else if (elements.elementClicked.classList.contains("rotate")) {
                modifications.elementModification = "rotate";
            } else if (elements.elementClicked.classList.contains("resize_axes")) {
                modifications.elementModification = "resizeAxes";
            } else if (elements.elementClicked.classList.contains("resize_angles")) {
                modifications.elementModification = "resizeAngle";
                modifications.enableRound();
            } else if (elements.elementClicked.classList.contains("round_handler")) {
                modifications.elementModification = "round";
                if (elements.elementClicked.style.display === "block") {
                    modifications.disableRound();
                }
            }
        }
    },
    enableRound: function () {
        if (elements.elementClicked.classList.contains("top_left")) {
            elements.currentRoundHandler = "top_left";
            elements.elemToModify.querySelector(".round_handler.top_left").style.display = "block";
        } else
        if (elements.elementClicked.classList.contains("top_right")) {
            elements.currentRoundHandler = "top_right";
            elements.elemToModify.querySelector(".round_handler.top_right").style.display = "block";
        } else
        if (elements.elementClicked.classList.contains("bottom_right")) {
            elements.currentRoundHandler = "bottom_right";
            elements.elemToModify.querySelector(".round_handler.bottom_right").style.display = "block";
        } else
        if (elements.elementClicked.classList.contains("bottom_left")) {
            elements.currentRoundHandler = "bottom_left";
            elements.elemToModify.querySelector(".round_handler.bottom_left").style.display = "block";
        }
    },
    disableRound: function () {
        let allRoundHandlers = document.querySelectorAll(".round_handler");
        for (let handler of allRoundHandlers) {
            handler.style.display = "none";
        };
    },
    movingElement: function () {
        elements.selectElement();
        modifications.disableRound();
        let adjustValueX = handleMouse.cursorMovingPosX - handleMouse.cursorPosX;
        let adjustValueY = handleMouse.cursorMovingPosY - handleMouse.cursorPosY;
        if (handleKeys.holdShiftKey === true) {
            if (adjustValueX / adjustValueY > 0.5 || adjustValueX / adjustValueY < -0.5) {
                elements.elemToModify.style.left = elements.elementPosX + adjustValueX + "px";
            } else {
                elements.elemToModify.style.top = elements.elementPosY + adjustValueY + "px";
            }
        } else {
            elements.elemToModify.style.left = elements.elementPosX + adjustValueX + "px";
            elements.elemToModify.style.top = elements.elementPosY + adjustValueY + "px";
        }
    },
    // resizing element :
    resizeAngles: function () {
        elements.selectElement();
        modifications.disableRound();
        let asjustScreenX = (elements.mainContainerWidth - elements.containerWidth) / 2;
        let valuePosX = handleMouse.cursorMovingPosX - elements.elementPosX - asjustScreenX; //!
        let valuePosY = handleMouse.cursorMovingPosY - elements.elementPosY; //!
        if (modifications.elementModification === "resizeAngle") {
            if (elements.elementClicked.classList.contains("top_left")) {
                elements.elementWidth -= valuePosX;
                elements.elementHeight -= valuePosY;
                // adjusting position value
                if (handleKeys.holdShiftKey === true) {
                    elements.elementPosX += (valuePosX / 2);
                    elements.elementPosY += (valuePosY / 2);
                } else {
                    elements.elementPosX += valuePosX;
                    elements.elementPosY += valuePosY;
                }
            } else if (elements.elementClicked.classList.contains("top_right")) {
                elements.elementWidth = valuePosX;
                elements.elementHeight -= valuePosY;
                // adjusting position value
                if (handleKeys.holdShiftKey === true) {
                    elements.elementPosX += (elements.initialElementWidth - valuePosX) / 2;
                    elements.initialElementWidth = elements.elementWidth;
                    elements.elementPosY += (valuePosY / 2);
                } else {
                    elements.elementPosY += valuePosY;
                }
            } else if (elements.elementClicked.classList.contains("bottom_right")) {
                elements.elementWidth = valuePosX;
                elements.elementHeight = valuePosY;
                // adjusting position value
                if (handleKeys.holdShiftKey === true) {
                    elements.elementPosX += ((elements.initialElementWidth - valuePosX) / 2);
                    elements.initialElementWidth = elements.elementWidth;
                    elements.elementPosY += ((elements.initialElementHeight - valuePosY) / 2);
                    elements.initialElementHeight = elements.elementHeight;
                }
            } else if (elements.elementClicked.classList.contains("bottom_left")) {
                elements.elementWidth -= valuePosX;
                elements.elementHeight = valuePosY;
                // adjusting position value
                if (handleKeys.holdShiftKey === true) {
                    elements.elementPosX += (valuePosX / 2);
                    elements.elementPosY += ((elements.initialElementHeight - valuePosY) / 2);
                    elements.initialElementHeight = elements.elementHeight;
                } else {
                    elements.elementPosX += valuePosX;
                }
            }
            // setting new size
            elements.elemToModify.style.width = elements.elementWidth + "px";
            elements.elemToModify.style.height = elements.elementHeight + "px";
            // setting new position
            elements.elemToModify.style.left = elements.elementPosX + "px";
            elements.elemToModify.style.top = elements.elementPosY + "px";
        }
    },
    resizeAxes: function () {
        modifications.disableRound();
        // elements.hydeRounds();
        elements.selectElement();
        let asjustScreenX = (elements.mainContainerWidth - elements.containerWidth) / 2;
        let valuePosX = handleMouse.cursorMovingPosX - elements.elementPosX - asjustScreenX;
        let valuePosY = handleMouse.cursorMovingPosY - elements.elementPosY;
        if (modifications.elementModification === "resizeAxes") {
            if (elements.elementClicked.classList.contains("resize_left")) {
                elements.elementWidth -= valuePosX;
                // adjusting position value
                if (handleKeys.holdShiftKey === true) {
                    elements.elementPosX += (valuePosX / 2);
                } else {
                    elements.elementPosX += valuePosX;
                }
            } else if (elements.elementClicked.classList.contains("resize_right")) {
                elements.elementWidth = valuePosX;
                // adjusting position value
                if (handleKeys.holdShiftKey === true) {
                    elements.elementPosX += (elements.initialElementWidth - valuePosX) / 2;
                    elements.initialElementWidth = elements.elementWidth;
                }
            } else if (elements.elementClicked.classList.contains("resize_top")) {
                elements.elementHeight -= valuePosY;
                // adjusting position value
                if (handleKeys.holdShiftKey === true) {
                    elements.elementPosY += (valuePosY / 2);
                    elements.initialElementHeight = elements.elementHeight;
                } else {
                    elements.elementPosY += valuePosY;
                }
            } else if (elements.elementClicked.classList.contains("resize_bottom")) {
                elements.elementHeight = valuePosY;
                // adjusting position value
                if (handleKeys.holdShiftKey === true) {
                    elements.elementPosY += ((elements.initialElementHeight - valuePosY) / 2);
                    elements.initialElementHeight = elements.elementHeight;
                }
            }
            // setting new size
            elements.elemToModify.style.width = elements.elementWidth + "px";
            elements.elemToModify.style.height = elements.elementHeight + "px";
            // setting new position
            elements.elemToModify.style.left = elements.elementPosX + "px";
            elements.elemToModify.style.top = elements.elementPosY + "px";
        }
    },
    handleElementRotation: function (evt) {
        // modifications.disableRound();
        // todo fonction à améliorer.
        if (elements.selectedElement && modifications.elementModification === "rotate") {
            let currentIndex = elements.elemToModify.dataset.indexNumber;
            let rotateSign;
            let rotateAngle;
            let newRotationValue = -((handleMouse.cursorPosX - evt.clientX) + (handleMouse.cursorPosY - evt.clientY)) / 2;
            handleMouse.cursorPosX = evt.clientX;
            handleMouse.cursorPosY = evt.clientY;
            handleMouse.shiftRotateValue += newRotationValue;
            if (handleKeys.holdShiftKey === true) {
                rotateAngle = 15;
            } else {
                rotateAngle = 1;
            }
            if (handleMouse.shiftRotateValue > 0) {
                rotateSign = 1;
            } else if (handleMouse.shiftRotateValue < 0) {
                rotateSign = -1;
            }
            if (handleMouse.shiftRotateValue >= rotateAngle || handleMouse.shiftRotateValue <= -rotateAngle) {
                modifications.rotationValue += (rotateAngle * rotateSign);
                handleMouse.shiftRotateValue = 0;
            } else {
                modifications.rotationValue += 0;
            }
            if (modifications.rotationValue > 180) {
                modifications.rotationValue = 180;
            } else if (modifications.rotationValue < -180) {
                handleMouse.rotationValue = -180;
            } else if (modifications.rotationValue >= -180 && modifications.rotationValue <= 180) {
                elements.elemToModify.style.transform = "rotate(" + modifications.rotationValue + "deg)";
            }
            elements.elementsRotateValues["rotate-" + currentIndex] = modifications.rotationValue;
        }
    },
}