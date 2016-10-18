// ==UserScript==
// @name         ShortReckonings auto-select
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Saves precious time when it was your turn to pay.
// @author       Rene Saarsoo
// @match        http://www.shortreckonings.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const WHO_PAID = "Rene";

    waitFor("#sr-exp .toolbar", () => {
        document.querySelector("#sr-exp .toolbar button[name=add]").addEventListener("click", () => {
            waitFor("#expense_editor", () => {
                // In "Who paid?" form
                selectOnly("#expense_editor_form_pid", WHO_PAID);
                hideNonSystemUsers("#expense_editor_form_pid");

                // In "For whom?" form
                selectOnly("#expense_editor_form_group", WHO_PAID);
                hideNonSystemUsers("#expense_editor_form_group");
            });
        });
    });

    function selectOnly(containerSelector, username) {
        for (const field of document.querySelectorAll(`${containerSelector} .editor-field-atom`)) {
            if (field.querySelector("label").innerHTML === username) {
                field.querySelector("input").checked = true;
            }
            else {
                field.querySelector("input").checked = false;
            }
        }
    }

    function hideNonSystemUsers(containerSelector) {
        for (const field of document.querySelectorAll(`${containerSelector} .editor-field-atom`)) {
            if (/^\(.*\)$/.test(field.querySelector("label").innerHTML)) {
                field.style.display = "none";
            }
        }
    }

    function waitFor(selector, fn) {
        if (document.querySelector(selector)) {
            fn();
        }
        else {
            setTimeout(() => {
                waitFor(selector, fn);
            }, 100);
        }
    }
})();

