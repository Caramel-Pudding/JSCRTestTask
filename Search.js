class Search extends Component {
  constructor() {
    super();
    // Could improve:
    // Do we really need to nullify onChange in constructor?
    this._onChange = null;
    // Also
    // Must fix:
    // onSearchChange binding is forgotten hence sadly search doesn't work
  }

  get template() {
    return `<input type="text" name="search" placeholder="Search">
      <button type="submit" class="visually-hidden">Search</button>`.trim();
  }

  removeEventListener() {
    this._element
        .removeEventListener(`keydown`, this._onSearchChange);
  }
  // Should improve:
  // At this moment names got pretty entangled. There is onChange, _onChange and _onSearchChange
  // which seems confusing

  _onSearchChange(event) {
    console.log(this._onChange)
    if (typeof this._onChange === `function`) {
      this._onChange(event.target.value);
    }
  }
  set onChange(fn) {
    this._onChange = fn;
  }

  setEventListener() {
    this._element
        .addEventListener(`keyup`, this._onSearchChange);
  }
  
  //Must fix: 'keyup' EventListner is added yet 'keydown' is removed
}
