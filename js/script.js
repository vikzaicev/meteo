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

// function tabs(elements) {
//   for (let index = 0; index < elements.length; index++) {
//     const item = elements[index];

//     item.addEventListener("click", numbActiv);

//     function numbActiv() {
//       elements.forEach(element => {
//         element.classList.remove('active')
//       });
//       item.classList.add('active')
//     }
//   }
// }

// const fn = document.querySelectorAll('.fn');
//tabs(fn)
/*===============tab===================================*/

/*===============popup=================================*/
//const body = document.body
// const popup = document.querySelector('.popup')
// const settingsBtn = document.querySelector('.settings')
// const settingsCloseBtn = document.querySelector('.settings__bott')

// settingsBtn.addEventListener('click', openPopup)

// function openPopup() {
//   popup.classList.add('active')
//   body.classList.add('scroll')
// }

// settingsCloseBtn.addEventListener('click', closePopup)

// function closePopup() {
//   popup.classList.remove('active')
//   body.classList.remove('scroll')
// }

// window.addEventListener('click', closePopupWin)

// function closePopupWin(event) {
//   if (event.target == popup) {
//     popup.classList.remove('active')
//     body.classList.remove('scroll')
//   }
// }

/*===============popup=================================*/
const temper = document.querySelector('.main__temper')
const humidity = document.querySelector('#humidity')
const pressure = document.querySelector('#pressure')
const wind = document.querySelector('#wind')
const cloud = document.querySelector('#cloud')
const discription = document.querySelector('.main__inform')
const locationBtn = document.querySelector('.header__geoloc')
const cityTitle = document.querySelector('.header__city')

//const city = 'Костанай'
const APIkey = '92f66a5c06e43b7bf134889afb03cc8c'
//const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&lang=ru&units=metric`

async function appWeather(city) {
   try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&lang=ru&units=metric`)
      const result = await response.json()
      console.log(result);
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
   temper.innerText = Math.round(data.main.temp)
   humidity.innerText = data.main.humidity + '%'
   pressure.innerText = data.main.pressure + ' мм рт. ст.'
   wind.innerText = Math.round(data.wind.speed) + ' м/с, ' + lineWind(data.wind.deg)
   cloud.innerText = data.clouds.all + '%'
   discription.innerText = toUpCase(data.weather[0].description)
   cityTitle.innerText = toUpCase(data.name)

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
      //console.log(result);
      appWeather(result.features[0].properties.city)
   }

   const error = (err) => {
      console.log(err.code + ' ' + err.message);
   }
   navigator.geolocation.getCurrentPosition(success, error, option)

}

const serthCity = document.querySelector('.header__select-city')
const form = document.querySelector('.header__form')
const info = document.querySelector('.header__info')
const inputBtn = document.querySelector('.header__input-btn')
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
   console.log(e.target);

   if (!e.target.classList.contains('header__form')) {
      closeForm()
      console.log(e.target);
   }


})

