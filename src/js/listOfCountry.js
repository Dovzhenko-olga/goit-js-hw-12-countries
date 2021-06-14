export default class DropDownList {
  constructor({element, countryArray}) {
    this.element = element;
    this.countryArray = countryArray;
    
    this.listElement = null;
    
    this._onElementInput = this._onElementInput.bind(this);
    this._onItemListClick = this._onItemListClick.bind(this);

    this.bind();
  }
  
  _onElementInput({target}) {
    this.removeList();
    
    if(!target.value) {
      return;
    }
    
    this.createListMarcup(this.countryArray.filter(elem => elem.toLowerCase().indexOf(target.value.toLowerCase()) !== -1));
    this.addListBackground();
  }
  
  _onItemListClick({target}) {
    this.element.value = target.textContent;
    this.removeList();
  }
  
  createListMarcup(countryArray) {
    this.listElement = document.createElement(`ul`);
    this.listElement.className = `drop-list`;
    this.listElement.innerHTML = countryArray.map(elem => `<li class="drop-item">${elem}</li>`).join(``);
    
    [...this.listElement.querySelectorAll(`.drop-item`)].forEach(elem => {
      elem.addEventListener(`click`, this._onItemListClick);
    });
  }
  
  addListBackground() {
    const {left, width, bottom} = this.element.getBoundingClientRect();
    this.listElement.style.width = width + `px`;
    this.listElement.style.left = left + `px`;
    this.listElement.style.top = bottom + `px`;
    document.body.appendChild(this.listElement);
  }
  
  removeList() {
    if (this.listElement) {
      this.listElement.remove();
      this.listElement = null;
    }
  }
  
  bind() {
    this.element.addEventListener(`input`, this._onElementInput);
  }
}