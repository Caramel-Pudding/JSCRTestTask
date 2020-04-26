window.onload = () => {
	// Should improve: seems like FORM_WRAPPER should be part of PageEnum
	const FORM_WRAPPER = document.querySelector(`.column_type_input`);
	const ratingArray = [];
	let countedRating = 20;


	const renderSearch = (allItemsData) => {
		// Could improve:
		// Isn't SEARCH.innerHTML already empty at the start? 
		PageEnum.SiteWrapper.SEARCH.innerHTML = ``;

		const searchComponent = new Search();

		PageEnum.SiteWrapper.SEARCH.appendChild(searchComponent.render());

		searchComponent._onChange = (value) => {
			const filteredItems = allItemsData.filter((currentItem) => currentItem._names.includes(value));
			PageEnum.SiteWrapper.rating.innerHTML = ``;
			value === `` ? ratingRender(countedRating, allItemsData) : ratingUpdate(filteredItems);
		};
	};

	// Should improve:
	// I belive this method should be rather called ratingUpdate as it doesn't actually
	// render anything to view but just fills an array of items
	const ratingRender = (ratingAmount, ratingArray) => {
		for (let i = 0; i < ratingAmount; i++) {
			ratingArray[i] = new PersonRating(returnRandomData());
		}
		ratingUpdate(ratingArray);
	};

	// Should improve:
	// And this one should rather be called ratingRender as it is actually renders rating elements
	const ratingUpdate = (ratingArray) => {
		ratingArray.forEach((item) => {
			PageEnum.SiteWrapper.rating.appendChild(item.render());
		});
		if (ratingArray.length === 0) {
			PageEnum.SiteWrapper.rating.innerHTML = `Rating list is empty`
		}
	};

	const renderForm = () => {
		const formComponent = new Form();
		FORM_WRAPPER.appendChild(formComponent.render());

		formComponent.onSubmit = (evt) => {
			evt.preventDefault();
			// Should improve: seems like these four variables also should be part of PageEnum
			const name = document.querySelector(`input[name=name]`).value;
			const cat = document.querySelector(`input[name=cat]`).value;
			const rest = document.querySelector(`input[name=rest]`).value;
			const money = document.querySelector(`input[name=money]`).value;
			// Should improve: it would be better to maintain naming convention and name man in camelCase 
			// like the rest of your variables
			const Man = new Person(name);
			if (cat === 'yes') {
				Man.hasCat();
			}
			if (rest === 'yes') {
				Man.hasRest();
			}
			if (money === 'yes') {
				Man.hasMoney();
			}
			Man.isSunny()
				.then((happiness) => {
					// Must fix:
					// For the problem case you may look up in Person.js comments.
					// Here i just want to advise the second option to fix this part:
					// You may simply refer to Man._happiness instead of happiness reutrned 
					//from fetch 
					Man._valueElement.innerHTML = name;
					if (happiness === 4) {
						Man._iconElement.innerHTML = '😆';
					} else if (happiness === 3 || happiness === 2) {
						Man._iconElement.innerHTML = '😐';
					} else {
						Man._iconElement.innerHTML = '☹️';
					}
				});
		}
	};

	renderForm();
	renderSearch(ratingArray);
	ratingRender(countedRating, ratingArray);
};


	// General Advises:

	// Should Improve:

	// Structural:
	// 	Component class and it's child should be probably bonded 
	// 	together in some common directory for a clearer structure

	//	You likely don't really need separate _onChange methods and onChange setters
	//  It creates confusion and overcomplicates classes where it's not really needed