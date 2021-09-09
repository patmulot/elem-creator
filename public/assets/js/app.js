let app = {
  init: function () {
    handleMouse.initMouseHandlers();
    handleKeys.initKeysHandlers();
    elements.initElements();
    toolbar.initToolbar();
  },
  // todo aimantation
  // todo selection multiple
  // todo outil pipette
  // todo groupage d'éléments (avec class group add ou remove ?)
};
document.addEventListener("DOMContentLoaded", app.init)