(function () {
  var SLOT_ID = "sdk-language-selector-slot";
  var SDK_PATH_PREFIX = "/celesto-sdk/";
  var SDK_LANGUAGE_SELECTOR_PATHS = {
    "/celesto-sdk/overview": true,
    "/celesto-sdk/quickstart": true,
    "/celesto-sdk/authentication": true,
    "/celesto-sdk/computers": true,
    "/celesto-sdk/errors": true,
  };
  var scheduled = false;

  function shouldPromote() {
    var pathname = window.location.pathname.replace(/\/$/, "");
    return (
      pathname.indexOf(SDK_PATH_PREFIX) === 0 &&
      SDK_LANGUAGE_SELECTOR_PATHS[pathname] === true
    );
  }

  function isResponsiveDuplicate(dropdown) {
    return dropdown.className.indexOf("xl:hidden") !== -1;
  }

  function getDropdown(slot) {
    var dropdowns = Array.prototype.slice.call(
      document.querySelectorAll("#multi-view-dropdown")
    );

    var promoted = dropdowns.find(function (dropdown) {
      return dropdown.parentNode === slot && !isResponsiveDuplicate(dropdown);
    });
    if (promoted) {
      return promoted;
    }

    return (
      dropdowns.find(function (dropdown) {
        return dropdown.parentNode !== slot && !isResponsiveDuplicate(dropdown);
      }) ||
      dropdowns.find(function (dropdown) {
        return dropdown.parentNode !== slot;
      })
    );
  }

  function hideExtraDropdowns(promotedDropdown) {
    Array.prototype.slice
      .call(document.querySelectorAll("#multi-view-dropdown"))
      .forEach(function (dropdown) {
        if (dropdown !== promotedDropdown) {
          dropdown.setAttribute("data-sdk-language-selector-extra", "true");
        } else {
          dropdown.removeAttribute("data-sdk-language-selector-extra");
        }
      });
  }

  function getOrCreateSlot(header, content) {
    var slot = document.getElementById(SLOT_ID);
    if (slot) {
      return slot;
    }

    slot = document.createElement("section");
    slot.id = SLOT_ID;
    slot.setAttribute("aria-label", "SDK language selector");

    header.parentNode.insertBefore(slot, content);
    return slot;
  }

  function removeSlot() {
    var slot = document.getElementById(SLOT_ID);
    if (slot && !slot.querySelector("#multi-view-dropdown")) {
      slot.remove();
    }
  }

  function promoteLanguageSelector() {
    scheduled = false;

    if (!shouldPromote()) {
      removeSlot();
      return;
    }

    var header = document.querySelector("#header");
    var content = document.querySelector("#content");

    if (!header || !content || !header.parentNode) {
      return;
    }

    var existingSlot = document.getElementById(SLOT_ID);
    var dropdown = getDropdown(existingSlot);
    if (!dropdown) {
      removeSlot();
      return;
    }

    var slot = existingSlot || getOrCreateSlot(header, content);
    if (dropdown.parentNode !== slot) {
      slot.appendChild(dropdown);
    }
    hideExtraDropdowns(dropdown);
  }

  function schedulePromotion() {
    if (scheduled) {
      return;
    }
    scheduled = true;
    window.requestAnimationFrame(promoteLanguageSelector);
  }

  schedulePromotion();
  window.addEventListener("load", schedulePromotion);
  window.addEventListener("popstate", schedulePromotion);

  var observer = new MutationObserver(schedulePromotion);
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
})();
