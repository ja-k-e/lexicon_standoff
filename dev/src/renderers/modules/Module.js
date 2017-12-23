export default class Module {
  el(tagname, inner, classname) {
    let $el = document.createElement(tagname);
    if (inner) $el.innerHTML = inner;
    if (classname) $el.className = classname;
    return $el;
  }
}
