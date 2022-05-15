"use strict";

(function() {
  const MISSING_PARAM = "You must input all parameters.";
  const OTHER_ERROR =
    "Sorry an error has occurred, try inserting a student first.";

  window.addEventListener("load", init);

  function init() {
    id("send").addEventListener("click", () => send());
    id("update").addEventListener("click",  () => update());
    update();
  }

  async function send() {
    let cmd = id("cmd").value;
    id("cmd").value = "";
    console.log(cmd);
    let call = "/send/" + cmd;
    try {
      let res = await fetch(call);
      res = await res.text();
    } catch (err) {
      console.error(err);
    }
    await update();
  }

  async function update() {
    let call = "/update";
    try {
      let res = await fetch(call);
      res = await res.text();
      id("data").textContent = res;
    } catch (err) {
      throw new Error(err);
    }
  }

  function id(id) {
    return document.getElementById(id);
  }

})();
