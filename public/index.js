/**
 * Configure script error handling function
 */
function scriptErrorHandler(event, source, lineno, colno, error) {






  console.log(event, source, lineno, colno, error)
}
// script error
window.onerror = scriptErrorHandler