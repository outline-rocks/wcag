/**
 * postProcessors Respec modifications for translation stuff
 */

// Replacement of elements
function replaceWith(el1, el2) {
  if (
    el2 === undefined
    || !(el2 instanceof HTMLElement)
  ) {
    console.error('[postProcess: replaceWith]: A replacement is required and should be an HtmlElement');
    return;
  }

  if (el1.id !== undefined || el1.id !== '') {
    el2.id = el1.id;
  }

  el1.parentElement.insertBefore(el2, el1);
  el1.parentElement.removeChild(el1);
}

// Moves the translation heading on top of actual document header
function moveTransheaderToTop() {
  var transHeader = document.querySelector('.transheader');
  var documentHeader = document.querySelector('.head');

  transHeader.parentElement.insertBefore(transHeader, documentHeader);
}

function replaceHead() {
  var translation = document.querySelector('.head-translated');
  var documentHeader = document.querySelector('.head');
  var docTitle = documentHeader.querySelector('h1');
  docTitle.textContent = document.title;
  translation.insertBefore(docTitle, translation.querySelector('h2'));
  translation.classList.add('head');
  translation.classList.remove('head-translated');
  translation.removeAttribute('id');

  replaceWith(documentHeader, translation);
}

// Replacing the generated sotd with translated sotd
function replaceSotd() {
  var translation = document.querySelector('#sotd-de');
  var sotd = document.querySelector('#sotd');

  translation.classList.remove('notoc');
  replaceWith(sotd, translation);
}

function removeRespecReferences() {
  var respecRefsId = 'references';
  var respecRefs = document.getElementById(respecRefsId);
  var respecRefsTocline = document.querySelector('.tocxref[href="#' + respecRefsId + '"]').parentElement;

  respecRefs.parentElement.removeChild(respecRefs);
  respecRefsTocline.parentElement.removeChild(respecRefsTocline);
}

function translateId(currentId, newId) {
  var element = document.getElementById(currentId);
  var linkElements = document.querySelectorAll('[href="#' + currentId + '"]');

  element.id = newId;
  linkElements.forEach(function (link) {
    link.href = '#' + newId;
  });
}
