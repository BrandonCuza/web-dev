import validator from 'validator';

let _validate_iso_code = (iso_code) => {
	return new Promise((resolve, reject) => {
		let is_valid = (validator.isAlpha(iso_code) && validator.isLength(iso_code, {min:3, max:3}));
		if (is_valid){
			resolve('The ISO code is valid.');
		} else {
			reject('The ISO code is invalid.');
		}
	});
};

let _validate_continent = (continent) => {
	let continents = ['North America'];
	return new Promise((resolve, reject) => {
		let is_valid = validator.isIn(continent, continents);
		if (is_valid){
			resolve('The continent is valid.');
		} else {
			reject('The continent is invalid.');
		}
	});
};

let _validate_location = (location) =>{
	let locations = ['Canada'];
	return new Promise((resolve, reject) => {
		let is_valid = validator.isIn(location, locations);
		if (is_valid){
			resolve('The location is valid.');
		} else {
			reject('The location is invalid.');
		}
	});
};

let _validate_date = (date) =>{
	return new Promise((resolve, reject) => {
		let is_valid = validator.isDate(date);
		if (is_valid){
			resolve('The date is valid.');
		} else {
			reject('The date is invalid.');
		}
	});
};

let _validate_total_cases = (total_cases) =>{
	return new Promise((resolve, reject) =>{
		if (typeof total_cases == 'number' || total_cases === '') {
			resolve('The number of total cases is valid.')
		} else {
			reject('The number of total cases is invalid.')
		};
	});
};

let _validate_new_cases = (new_cases) =>{
	return new Promise((resolve, reject) =>{
		if (typeof new_cases == 'number' || new_cases === '') {
			resolve('The number of new cases is valid.')
		} else {
			reject('The number of new cases is invalid.')
		};
	});
};

let _validate_total_deaths = (total_deaths) =>{
	return new Promise((resolve, reject) =>{
		if (typeof total_deaths == 'number' || total_deaths === '') {
			resolve('The number of total deaths is valid.')
		} else {
			reject('The number of total deaths is invalid.')
		};
	});
};

let _validate_new_deaths = (new_deaths) =>{
	return new Promise((resolve, reject) =>{
		if (typeof new_deaths == 'number' || new_deaths === '') {
			resolve('The number of new deaths is valid.')
		} else {
			reject('The number of new deaths is invalid.')
		};
	});
};

export function validate_fields(iso_code, continent, location, date, total_cases, new_cases, total_deaths, new_deaths) {
	return Promise.all([_validate_iso_code(iso_code), _validate_continent(continent), _validate_location(location), _validate_date(date),
						_validate_total_cases(total_cases), _validate_new_cases(new_cases), _validate_total_deaths(total_deaths), _validate_new_deaths(new_deaths)])
		.then((values) => {
			return true;
		})
		.catch((err) => {
			console.log(err);
			return false;
		});
}

export function validate_date(date) {
	return _validate_date(date, {format:'YYYY-MM-DD', strictMode:true})
		.then((value) => {
			return true;
		})
		.catch((err) => {
			console.log(err);
			return false;
		});
};
