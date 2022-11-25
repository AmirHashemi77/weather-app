
  let bgImgs = document.querySelectorAll('.bg-img');
  let realTimeTempEl = document.getElementById("fristTemptureText");
  let activeCityNameEl = document.getElementById("fristCityName");
  let realTimeEl = document.getElementById("realTime");
  let typeOfWeatherText = document.getElementById("typeOfWeatherText");
  let typeOfWeatherImg = document.getElementById("typeOfWeatherImg");
  let cloud = document.getElementById("cloudy");
  let humidity = document.getElementById("humidity");
  let wind = document.getElementById("wind");
  let rain = document.getElementById("rain");
  let maxTemp = document.getElementById("maxTemture");
  let mintemp = document.getElementById("minTemture");
  let suggests = document.querySelectorAll(".suggest-item");
  let searchBtn = document.getElementById("searchBtn");
  let searchInp = document.getElementById("searchLocation");
  let cityName = "auto:ip";
  getData();

  suggests.forEach((suggest) => {
    suggest.addEventListener("click", () => {
      cityName = suggest.innerHTML;
      getData();
      
    });
  });
  searchBtn.addEventListener("click", () => {
    if (searchInp) {
      cityName = searchInp.value;
    } else {
      cityName = "auto:ip";
    }
    getData();
    
  });

  async function getData() {
    try {
      let response = await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=9a7f7e98cb82409da3761906220201&q=${cityName}`
      );
      let result = await response.json();
      let realTimenum = Math.floor(+result.current.temp_c);
      realTimeTempEl.innerHTML = `${realTimenum}°`;
      activeCityNameEl.innerHTML = result.location.name;
      typeOfWeatherText.innerHTML = result.current.condition.text;
      typeOfWeatherImg.src = `${result.current.condition.icon}`;
      let clock = result.location.localtime.slice(11, 16);
      realTimeEl.innerHTML = `${clock} - ${getTime()}`;
      cloud.innerHTML = `${result.current.cloud}%`;
      humidity.innerHTML = `${result.current.humidity}%`;
      wind.innerHTML = `${result.current.wind_kph} km\/\h`;
      rain.innerHTML = `${result.current.precip_mm} mm`;
      maxTemp.innerHTML = `${Math.floor(
        +result.forecast.forecastday[0].day.maxtemp_c
      )}°`;
      mintemp.innerHTML = `${Math.floor(
        +result.forecast.forecastday[0].day.mintemp_c
      )}°`;
     changeBg(result.current.condition.text)
    } catch {
      alert(
        `<< ${searchInp.value} >> is not Location. Please Enter Correct LocationName `
      );
    }

   
  }
  function getTime() {
    let nowTime = new Date();
    let monthName = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let month = monthName[nowTime.getMonth()];
    let numDay = nowTime.getDate();
    let dayName = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = dayName[nowTime.getDay()];
    let year = nowTime.getFullYear();
    return `${day},${numDay} ${month} ${year}`;
  }

  

  function changeBg(type) {
    if (/rain/i.test(type) || /sleet/i.test(type) || /drizzle/i.test(type)) {
      removeActive();
      bgImgs[0].classList.add('active')
      searchBtn.style.backgroundColor='#F8451C'
    } else if (/sunny/i.test(type)) {
      removeActive();
      bgImgs[1].classList.add('active')
      searchBtn.style.backgroundColor='#AF9B18'
    } else if (/cloudy/i.test(type) || /overcast/i.test(type)) {
      removeActive();
      bgImgs[2].classList.add('active')
      searchBtn.style.backgroundColor='#DE716E'
    } else if (/snow/i.test(type) || /ice/i.test(type)) {
      removeActive();
      bgImgs[3].classList.add('active')
      searchBtn.style.backgroundColor='#07bb9a'
    } else if (/mist/i.test(type) || /fog/i.test(type)) {
      removeActive();
      bgImgs[4].classList.add('active')
      searchBtn.style.backgroundColor='#076EB4'
    } else if (/clear/i.test(type)) {
      removeActive();
      bgImgs[5].classList.add('active')
      searchBtn.style.backgroundColor='#6D3D41'
    } else if (/Thundery/i.test(type)) {
      removeActive();
      bgImgs[6].classList.add('active')
      searchBtn.style.backgroundColor='#E5B3B9'
    } else if (/blizzard/i.test(type)) {
      removeActive();
      bgImgs[7].classList.add('active')
      searchBtn.style.backgroundColor='#153948'
    }
  }

  function removeActive(){
    bgImgs.forEach((bgImg)=>{
      bgImg.classList.remove('active')
    })
  }



