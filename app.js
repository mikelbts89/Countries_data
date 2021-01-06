const thRow = $("#tHead");
const mainTable = $("#tBody");

async function getCountries() {
  thRow.html("");
  mainTable.html("");
  try {
    const countriesData = await fetch("https://restcountries.eu/rest/v2/all");
    const countriesContent = await countriesData.json();
    getCountryName(countriesContent);
    getCountryPopulation(countriesContent);
    getCountryRegion(countriesContent);
    getCurrencies(countriesContent);
    dataTable(countriesContent);
    drawHeaders();
  } catch (err) {
    alert(err);
    console.log(err);
  }
}

function getCountryName(countries) {
  const counrtiesArr = countries.map((count) => {
    return count.name;
  });
  console.log(counrtiesArr);
  const numberOfCountrie = counrtiesArr.length;
}

function getCountryPopulation(countries) {
  const countriePopulation = countries.map((count) => {
    return count.population;
  });

  console.log(countriePopulation);
  averagePopulation(countriePopulation);
}

function averagePopulation(population) {
  const averPopul = population.reduce((total, amount, index, array) => {
    total += amount;
    if (index === array.length - 1) {
      return total / array.length;
    } else {
      return total;
    }
  });
  console.log(`Average : ${averPopul}`);
}

function getCountryRegion(countries) {
  const countriesRegion = countries.map((count) => {
    return count.region;
  });
  const sameCountriesRegionArr = countriesRegion.reduce(
    (region, nextRegion) => {
      region[nextRegion] = (region[nextRegion] || 0) + 1;
      return region;
    },
    {}
  );
  console.log(sameCountriesRegionArr);
}

function getCurrencies(countries) {
  const countryCurrencies = countries.map((country) => {
    return country.currencies[0].code;
  });
  console.log(countryCurrencies);
  const sameMoneyInDifrentCountries = countryCurrencies.reduce(
    (money, nextMoney) => {
      money[nextMoney] = (money[nextMoney] || 0) + 1;
      return money;
    },
    {}
  );
  console.log(sameMoneyInDifrentCountries);
}

async function getCountryByName() {
  thRow.html("");
  mainTable.html("");
  try {
    const countriesData = await fetch("https://restcountries.eu/rest/v2/all");
    const countriesContent = await countriesData.json();
    const inputValue = $("#countryName");
    const inputValueLower = inputValue.val().toLowerCase();

    const searchArr = [];
    for (let key in countriesContent) {
      if (countriesContent[key].name.toLowerCase().includes(inputValueLower)) {
        searchArr.push(countriesContent[key]);
      }
    }
    console.log(searchArr);
    dataTable(searchArr);
    const numberOfCountrie = searchArr.length;
    getCountryPopulation(searchArr);
    getCountryRegion(searchArr);
    getCountryName(searchArr);
    getCurrencies(searchArr);
    drawHeaders();
    inputValue.val("");
  } catch (err) {
    console.log(err);
    alert(`Search By Name Err ${err}`);
  }
}

const btnName = $("#searchCountry");
const btnAll = $("#getCountriesList");
(function getContent() {
  btnAll.on("click", getCountries);
  btnName.on("click", getCountryByName);
})();

function dataTable(countries) {
  for (let key in countries) {
    let countryName = countries[key].name;
    let countryPopulation = countries[key].population;
    drawTable(countryName, countryPopulation);
  }
}

function drawTable(name, population) {
  trCountryName = $("<tr>");
  tdCountryName = $("<td>");
  tdCountryPopulation = $("<td>");
  tdCountryName.text(name);
  tdCountryPopulation.text(population);
  trCountryName.append(tdCountryName, tdCountryPopulation);
  mainTable.append(trCountryName);
}

function drawHeaders() {
  let trLayoutHeaders = $("<tr/>");
  let thFirstName = $("<th/>", {
    text: "Country",
  });
  let thLastName = $("<th/>", {
    text: "Population",
  });
  thRow.append(trLayoutHeaders);
  trLayoutHeaders.append(thFirstName, thLastName);
}
