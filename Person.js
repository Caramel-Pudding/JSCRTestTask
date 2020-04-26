class Person extends Component {
    constructor(name) {
        super();
        this.name = name;
        this._happiness = 0;
        // Should improve: seems like these two variables also should be part of PageEnum
        this._valueElement = document.querySelector(`.column__value-name`);
        this._iconElement = document.querySelector(`.column__value-icon`);
    }
    // Could improve:
    // You don't really need to return anything from these functions as you're not getting or assigning anything
    // but simply modify objcet inner properties
    // Also i belive as these variables have binary states i belive it would be more representative to implement
    // them as booleans and count total count of truthy values in the end
    hasCat() {
        return this._happiness++;
    }

    hasRest() {
        return this._happiness++;
    }

    hasMoney() {
        return this._happiness++;
    }

    isSunny() {
        const APIKey = '28c7d687accc7c75aabbc7fb71173feb';
        const city = 'Москва';
        const url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + APIKey;

        return fetch(url)
            .then(res => res.json())
            .then((res) => {
                console.log(res)
            // Could improve: console.logging anything isn't usually a good idea prerry much anytime
              console.log(this._happiness);
                // Must fix:
                // As in upper case you don't need to return this_appiness++ but here you also
                // absolutely should not if you intend to use result of this fetch to later count
                // overall happiness. Instead you should return _happiness which at this point should
                // be equal to the total count. Or you may change .then part in script.js
                if (res.main.temp - 273 > 15) {
                    return this._happiness++;
                }
            });
      }
}
