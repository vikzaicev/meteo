/*=============animItems================*/

// const animItems = document.querySelectorAll('.amim-items');
// if (animItems.length > 0) {
//    window.addEventListener("scroll", animOnScroll);
//    function animOnScroll() {
//       for (let index = 0; index < animItems.length; index++) {
//          const animItem = animItems[index];
//          const animItemHeight = animItem.offsetHeight;
//          const animItemOffset = offset(animItem).top;
//          const animStart = 4;

//          let animItemPoint = window.innerHeight - animItemHeight / animStart;
//          //*console.log(animItemPoint);
//          if (animItemHeight > window.innerHeight) {
//             animItemPoint = window.innerHeight - window.innerHeight / animStart;
//          }
//          if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
//             animItem.classList.add('active');
//          }
//          else {
//             if (!animItem.classList.contains('anim-no'))
//                animItem.classList.remove('active');
//          }
//       }
//    }
//    function offset(el) {
//       const rect = el.getBoundingClientRect();
//       scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
//          scrollTop = window.pageYOffset || document.documentElement.scrollTop;
//       return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
//    }
//    setTimeout(() => {
//       animOnScroll()
//    }, 400);
// }

/*=============animItems================*/

/*====================hamb==========================*/

// const menu = document.querySelector('.menu__list');
// const hamb = document.querySelector('.header__hamb');
// const body = document.querySelector('body');
// const popup = document.querySelector('.header__popup');
// console.log(hamb, popup, menu);

// popup.append(menu.cloneNode(1));

// hamb.addEventListener('click', hamburger);

// function hamburger() {
//    hamb.classList.toggle('activ');
//    popup.classList.toggle('open');
//    body.classList.toggle('noscrol');
// };

/*====================hamb=======================*/

/*===============tab===================================*/

function tabs(elements) {
   for (let index = 0; index < elements.length; index++) {
      const item = elements[index];

      item.addEventListener("click", numbActiv);

      function numbActiv() {
         elements.forEach(element => {
            element.classList.remove('active')
         });
         item.classList.add('active')
      }
   }
}

const deg = document.querySelectorAll('.deg');
tabs(deg)
const color = document.querySelectorAll('.color');
tabs(color)
/*===============tab===================================*/

/*===============popup=================================*/
const body = document.body
const popup = document.querySelector('.popup')
const settingsBtn = document.querySelector('.header__setting-logo')
const settingsCloseBtn = document.querySelector('.popup__close')
const popupBg = document.querySelector('.popup__bg')

settingsBtn.addEventListener('click', openPopup)

function openPopup() {
   popup.classList.add('active')
   body.classList.add('scroll')
   popupBg.classList.add('active')
}

settingsCloseBtn.addEventListener('click', closePopup)

function closePopup() {
   popup.classList.remove('active')
   body.classList.remove('scroll')
   popupBg.classList.remove('active')
}

window.addEventListener('click', closePopupWin)

function closePopupWin(event) {
   if (event.target.classList.contains('header__setting-logo')) {
      return;
   }

   else if (event.target.classList.contains('popup__bg')) {
      popup.classList.remove('active')
      body.classList.remove('scroll')
      popupBg.classList.remove('active')
   }
}

/*===============popup=================================*/
const temper = document.querySelector('.main__temper')
const humidity = document.querySelector('#humidity')
const pressure = document.querySelector('#pressure')
const wind = document.querySelector('#wind')
const cloud = document.querySelector('#cloud')
const discription = document.querySelector('.main__inform')
const locationBtn = document.querySelector('.header__geoloc')
const cityTitle = document.querySelector('.header__city')
const img = document.querySelector('.main__img')

const APIkey = '92f66a5c06e43b7bf134889afb03cc8c'
//const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&lang=ru&units=metric`
let result
async function appWeather(city) {
   try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&lang=ru&units=metric`)
     result = await response.json()
      console.log(result.message || result);
      showWeater(result)
   } catch (error) {
      console.log(error);
   }
}
appWeather('Костанай')

function lineWind(deg) {
   if (deg > 337.5) return 'северный';
   if (deg > 292.5) return 'северо-западный';
   if (deg > 247.5) return 'западный';
   if (deg > 202.5) return 'юго-западный';
   if (deg > 157.5) return 'южный';
   if (deg > 122.5) return 'юго-восточный';
   if (deg > 67.5) return 'восточный';
   if (deg > 22.5) return 'северо-восточный';
   return 'северный';
}

function toUpCase(str) {
   return str[0].toUpperCase() + str.slice(1)
}
function showWeater(data) {
   const { main: { temp: temp }, main: { humidity: hum },
      main: { pressure: press }, wind: { speed }, wind: { deg },
      clouds: { all }, weather: [{ description: descr }], name: nameC,
      weather: [{ icon }] } = data;

   temper.innerText = Math.round(temp)
   humidity.innerText = hum + '%'
   pressure.innerText = press + ' мм рт. ст.'
   wind.innerText = Math.round(speed) + ' м/с, ' + lineWind(deg)
   cloud.innerText = all + '%'
   discription.innerText = toUpCase(descr)
   cityTitle.innerText = toUpCase(nameC)
   img.src = `http://openweathermap.org/img/w/${icon}.png`
}

locationBtn.addEventListener('click', appLocation)
function appLocation() {
   const option = {
      enableHigthAccuracy: true,
      timeout: 5000,
      maximmage: 0
   }
   const success = async (pos) => {
      const crd = pos.coords;
      console.log(crd);
      const response = await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${crd.latitude}&lon=${crd.longitude}&apiKey=e9063f48db2d442bbedfee0d6b7509d7`)
      const result = await response.json()
      console.log(result);
      appWeather(result.features[0].properties.city)
   }

   const error = (err) => {
      console.log(err.code + ' ' + err.message);
   }
   navigator.geolocation.getCurrentPosition(success, error, option)
}


//===========================openForm=============================//
const serthCity = document.querySelector('.header__select-city')
const form = document.querySelector('.header__form')
const info = document.querySelector('.header__info')
const input = document.querySelector('.header__input')

serthCity.addEventListener('click', openForm)

function openForm() {
   info.classList.add('hiden')
   form.classList.remove('hiden')
   input.focus()
}

function closeForm() {
   info.classList.remove('hiden')
   form.classList.add('hiden')
}


window.addEventListener('click', (e) => {
   if (e.target.classList.contains('header__select-city')) {
      return;
   }
   else if (!e.target.closest('.header__form') && !form.classList.contains('hiden')) {
      closeForm()
   }
})
//===========================openForm=============================//
//===========================newCity==============================//
const inputBtn = document.querySelector('.header__input-btn')

inputBtn.addEventListener('click', newCity)
function newCity() {
   if (!input.value) return;
   appWeather(input.value)
   closeForm()
   input.value = "";
}
//===========================newCity==============================//
//===========================new settings=========================//
const newSettingsBtn = document.querySelector('.popup__btn')

newSettingsBtn.addEventListener('click', newSettings)

function newSettings() {
   color.forEach(elem => {
      if (elem.classList.contains('active')) {
         const newColor = elem.getAttribute('data-set')
         body.style.backgroundColor = newColor;
      };
   })
   deg.forEach(elem => {
      if (elem.classList.contains('active')) {
         const metric = elem.getAttribute('data-set')
         console.log(metric);
         if (metric == 'celciy') {
            temper.innerText = Math.round(result.main.temp)
         }
         else {
            temper.innerText = ((Math.round(result.main.temp) * 9) / 5) + 32
         }
      }
   })
   closePopup()
}

//===========================new settings=========================//