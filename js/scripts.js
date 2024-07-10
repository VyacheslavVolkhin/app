

//field counter
const plusButtons = document.querySelectorAll(".js-button-counter-plus");
const minusButtons = document.querySelectorAll(".js-button-counter-minus");
const inputCounters = document.querySelectorAll(".js-input-counter");

if (inputCounters) {
  for (let i = 0; i < inputCounters.length; i++) {
	const plusButton = plusButtons[i
		];
	const minusButton = minusButtons[i
		];
	const inputCounter = inputCounters[i
		];

	plusButton.addEventListener("click", function(event) {
	  increaseCounter(inputCounter);
	  event.preventDefault();
		});

	minusButton.addEventListener("click", function(event) {
	  decreaseCounter(inputCounter);
	  event.preventDefault();
		});
	}
}

function increaseCounter(inputCounter) {
  let value = parseInt(inputCounter.value);
  value++;
  inputCounter.value = value;
}

function decreaseCounter(inputCounter) {
  const buttonMinus = this;
  let value = parseInt(inputCounter.value);

  if (value > 1) {
	value--;
	} else {
	value = 1;
	}

  inputCounter.value = value;
}





//js tabs
const tabsNav = document.querySelectorAll(".js-tabs-nav");
const tabsBlocks = document.querySelectorAll(".js-tab-block");
const tabsButtonTitle = document.querySelectorAll(".js-tab-title");
const tabsButtonContent = document.querySelectorAll(".js-tab-content");
function tabsActiveStart() {
  for (iTab = 0; iTab < tabsBlocks.length; iTab++) {
    if (tabsBlocks[iTab].classList.contains("active")) {
      tabsBlocks[iTab].classList.remove("active");
    }
  }
  for (i = 0; i < tabsNav.length; i++) {
    let tabsNavElements = tabsNav[i].querySelectorAll("[data-tab]");
    for (iElements = 0; iElements < tabsNavElements.length; iElements++) {
      if (tabsNavElements[iElements].classList.contains("active")) {
        let tabsNavElementActive = tabsNavElements[iElements].dataset.tab;
        for (j = 0; j < tabsBlocks.length; j++) {
          if (
            tabsBlocks[j].dataset.tab.toString().indexOf(tabsNavElementActive) >
            -1
          ) {
            console.log(
              tabsBlocks[j].dataset.tab.toString().indexOf(tabsNavElementActive)
            );
            tabsBlocks[j].classList.add("active");
          }
        }
      }
    }
  }
}
for (i = 0; i < tabsButtonTitle.length; i++) {
  tabsButtonTitle[i].addEventListener("click", function (e) {
    this.classList.toggle("active");
    e.preventDefault();
    e.stopPropagation();
    return false;
  });
}
for (i = 0; i < tabsNav.length; i++) {
  tabsNav[i].addEventListener("click", function (e) {
    if (e.target.closest("[data-tab]")) {
      let tabsNavElements = this.querySelector("[data-tab].active");
      tabsNavElements ? tabsNavElements.classList.remove("active") : false;
      e.target.closest("[data-tab]").classList.add("active");
      tabsActiveStart();
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  });
}
tabsActiveStart();

//fancybox
Fancybox.bind("[data-fancybox]", {
  //settings
});

//js popup wrap
const togglePopupButtons = document.querySelectorAll(".js-btn-popup-toggle");
const closePopupButtons = document.querySelectorAll(".js-btn-popup-close");
const popupElements = document.querySelectorAll(".js-popup-wrap");
const wrapWidth = document.querySelector(".wrap").offsetWidth;
const bodyElem = document.querySelector("body");
function popupElementsClear() {
  document.body.classList.remove("menu-show");
  document.body.classList.remove("search-show");
  popupElements.forEach((element) => element.classList.remove("popup-right"));
}
function popupElementsClose() {
  togglePopupButtons.forEach((element) => {
    if (!element.closest(".no-close")) {
      element.classList.remove("active");
    }
  });
}
function popupElementsContentPositionClass() {
  popupElements.forEach((element) => {
    let pLeft = element.offsetLeft;
    let pWidth = element.querySelector(".js-popup-block").offsetWidth;
    let pMax = pLeft + pWidth;
    if (pMax > wrapWidth) {
      element.classList.add("popup-right");
    } else {
      element.classList.remove("popup-right");
    }
  });
}
for (i = 0; i < togglePopupButtons.length; i++) {
  togglePopupButtons[i].addEventListener("click", function (e) {
    popupElementsClear();
    if (this.classList.contains("active")) {
      this.classList.remove("active");
    } else {
      popupElementsClose();
      this.classList.add("active");
      if (this.closest(".popup-menu-wrap")) {
        document.body.classList.add("menu-show");
      }
      if (this.closest(".popup-search-wrap")) {
        document.body.classList.add("search-show");
      }
      popupElementsContentPositionClass();
    }
    e.preventDefault();
    e.stopPropagation();
    return false;
  });
}
for (i = 0; i < closePopupButtons.length; i++) {
  closePopupButtons[i].addEventListener("click", function (e) {
    popupElementsClear();
    popupElementsClose();
    e.preventDefault();
    e.stopPropagation();
    return false;
  });
}
document.onclick = function (event) {
  if (!event.target.closest(".js-popup-block")) {
    popupElementsClear();
    popupElementsClose();
  }
};
popupElements.forEach((element) => {
  if (element.classList.contains("js-popup-select")) {
    let popupElementSelectItem = element.querySelectorAll(
      ".js-popup-block li a"
    );
    if (element.querySelector(".js-popup-block .active")) {
      element.classList.add("select-active");
      let popupElementActive = element.querySelector(
        ".js-popup-block .active"
      ).innerHTML;
      let popupElementButton = element.querySelector(".js-btn-popup-toggle");
      popupElementButton.innerHTML = "";
      popupElementButton.insertAdjacentHTML("beforeend", popupElementActive);
    } else {
      element.classList.remove("select-active");
    }
    for (i = 0; i < popupElementSelectItem.length; i++) {
      popupElementSelectItem[i].addEventListener("click", function (e) {
        this.closest(".js-popup-wrap").classList.add("select-active");
        if (
          this.closest(".js-popup-wrap").querySelector(
            ".js-popup-block .active"
          )
        ) {
          this.closest(".js-popup-wrap")
            .querySelector(".js-popup-block .active")
            .classList.remove("active");
        }
        this.classList.add("active");
        let popupElementActive = element.querySelector(
          ".js-popup-block .active"
        ).innerHTML;
        let popupElementButton = element.querySelector(".js-btn-popup-toggle");
        popupElementButton.innerHTML = "";
        popupElementButton.insertAdjacentHTML("beforeend", popupElementActive);
        popupElementsClear();
        popupElementsClose();
        if (!this.closest(".js-tabs-nav")) {
          e.preventDefault();
          e.stopPropagation();
          return false;
        }
      });
    }
  }
});

// Popups
let popupCurrent;

document.querySelectorAll(".js-popup-open").forEach(function (element) {
  element.addEventListener("click", function (e) {
    document.querySelector(".popup-outer-box").classList.remove("active");
    document.body.classList.add("popup-open");

    popupCurrent = this.getAttribute("data-popup");
    document
      .querySelector(
        `.popup-outer-box[id="${popupCurrent}"
		]`
      )
      .classList.add("active");

    e.preventDefault();
    e.stopPropagation();
    return false;
  });
});
document.querySelectorAll(".js-popup-close").forEach(function (element) {
  element.addEventListener("click", function (e) {
    document.body.classList.remove("popup-open");
    document.querySelector(".popup-outer-box").classList.remove("active");

    e.preventDefault();
    e.stopPropagation();
    return false;
  });
});
document.querySelectorAll(".popup-outer-box").forEach(function (element) {
  element.addEventListener("click", function (event) {
    if (!event.target.closest(".popup-box")) {
      document.body.classList.remove("popup-open");
      document.body.classList.remove("popup-open-scroll");
      document.querySelectorAll(".popup-outer-box").forEach(function (e) {
        e.classList.remove("active");
      });
      return false;
    }
  });
});


//cart button catalog
const cartButton = document.querySelectorAll(".js-button-cart");
if (cartButton) {
	for (i=0;i<cartButton.length;i++) {
		cartButton[i].addEventListener("click", function (event) {
      this.closest(".cart-field").classList.add("cart-added");
      event.preventDefault();
    });
	}
}

//form input clear
const inputFields = document.querySelectorAll(".frm-field-input .form-input");
const clearButtons = document.querySelectorAll(".btn-input-clear");

for (let i = 0; i < inputFields.length; i++) {
  const inputField = inputFields[i];
  const form = inputField.closest(".frm-field-input");

  inputField.addEventListener("input", function () {
    if (inputField.value.length > 0) {
      form.classList.add("input-active");
      form.classList.add("results-active");
    } else {
      form.classList.remove("input-active");
      form.classList.remove("results-active");
    }
  });
}
for (let i = 0; i < clearButtons.length; i++) {
  const clearButton = clearButtons[i];
  clearButton.addEventListener("click", function (event) {
    this.closest(".frm-field-input").querySelector(".form-input").value = "";
    this.closest(".frm-field-input").classList.remove("input-active");
    this.closest(".frm-field-input").classList.remove("results-active");
    event.preventDefault();
  });
}

//sticky header
if (!!document.querySelector(".header").offsetParent) {
  window.addEventListener("scroll", function () {
    const windowTop = window.pageYOffset;

    if (windowTop > 230) {
      document.querySelector(".wrap").classList.add("header-fixed");
    } else {
      document.querySelector(".wrap").classList.remove("header-fixed");
    }
  });
}




// filter actions
const filterButtonOpen = document.querySelector('.js-filter-open');
const filterSection = document.querySelector('.filter-box');
if (filterSection) {
	filterButtonOpen.addEventListener("click", function(even) {
		document.body.classList.add("filter-show");
		event.preventDefault();
	})
	filterSection.addEventListener("click", function (event) {
		//filter close
		if (event.target.matches(".js-filter-toggle")) {
			document.body.classList.toggle("filter-show");
			event.preventDefault();
		} else if (event.target.matches(".js-filter-more")) {
			event.target.closest('.filter-section-wrap').classList.toggle('show-all')
			event.preventDefault();
		} else if (event.target.matches(".js-filter-more-filters")) {
			event.target.closest('.filter-box').classList.toggle('show-all-filters')
			event.preventDefault();
		}
	});
}

//btn tgl
let tglButtons = document.querySelectorAll(".js-btn-tgl");
for (i = 0; i < tglButtons.length; i++) {
  tglButtons[i].addEventListener("click", function (e) {
    this.classList.contains("active")
      ? this.classList.remove("active")
      : this.classList.add("active");
    e.preventDefault();
    e.stopPropagation();
    return false;
  });
}

//slider gallery
const swiperSliderGallery = new Swiper(".slider-gallery .swiper", {
  loop: false,
  slidesPerView: 1,
  spaceBetween: 0,
  autoHeight: true,
  speed: 400,
  pagination: {
    el: ".slider-gallery-pagination",
    clickable: true,
  },
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  navigation: false,
});

//slider photos
const swiperSliderPhotos = new Swiper(".slider-photos .swiper", {
  loop: false,
  slidesPerView: 1,
  spaceBetween: 0,
  autoHeight: true,
  speed: 400,
  pagination: {
    el: ".slider-photos-pagination",
    clickable: true,
  },
  autoplay: false,
  navigation: false,
  breakpoints: {
    640: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
      grid: {
        rows: 2,
      },
    },
  },
});



//slider media thumbs preview
const swiperMediaPreview = new Swiper(".slider-media-thumbs .swiper",
{
  loop: false,
  slidesPerView: "auto",
  spaceBetween: 0,
  threshold: 5,
  watchSlidesVisibility: true,
  watchSlidesProgress: true,
  freeMode: false,
  navigation: {
	nextEl: ".button-slider-media-thumbs-next",
	prevEl: ".button-slider-media-thumbs-prev",
	},
  breakpoints: {
		1024: {
	  direction: "vertical",
		},
	},
});

//slider media thumbs main
const swiperMediaMain = new Swiper(".slider-media-main .swiper",
{
  loop: false,
  slidesPerView: 1,
  spaceBetween: 0,
  autoHeight: true,
  speed: 400,
  threshold: 5,
  freeMode: false,
  watchSlidesProgress: true,
  navigation: {
	nextEl: ".button-slider-media-main-next",
	prevEl: ".button-slider-media-main-prev",
	},
  pagination: {
	clickable: true,
	},
  thumbs: {
	swiper: swiperMediaPreview,
	},
});




//slider tiles
const sliderList = document.querySelectorAll(".slider-tiles");
sliderList.forEach(function (slider) {
	let sliderCols = slider.getAttribute("data-cols");
	let sliderWrapper = slider.querySelector('.swiper')
	let sliderArrowNext = slider.querySelector(".button-slider-tiles-next");
	let sliderArrowPrev = slider.querySelector(".button-slider-tiles-prev");
	let sliderPagination = slider.querySelector(".slider-tiles-pagination");
	switch (sliderCols) {
		case "4":
			const swiperCol4SliderTiles = new Swiper(sliderWrapper, {
				loop: false,
				slidesPerView: 'auto',
				spaceBetween: 0,
				autoHeight: true,
				speed: 400,
				freeMode: true,
				pagination: {
					el: sliderPagination,
					clickable: true,
				},
				autoplay: false,
				navigation: {
					nextEl: sliderArrowNext,
					prevEl: sliderArrowPrev,
				},
				breakpoints: {
					1024: {
						slidesPerView: 3,
						freeMode: false,
					},
					1200: {
						slidesPerView: 4,
						freeMode: false,
					},
				},

			});
			break;
		case "3":
			const swiperCol3SliderTiles = new Swiper(sliderWrapper, {
				loop: false,
				slidesPerView: 1,
				spaceBetween: 0,
				autoHeight: true,
				speed: 400,
				pagination: {
					el: sliderPagination,
					clickable: true,
				},
				autoplay: false,
				navigation: {
					nextEl: sliderArrowNext,
					prevEl: sliderArrowPrev,
				},
				breakpoints: {
					640: {
						slidesPerView: 2,
					},
					1024: {
						slidesPerView: 3,
					},
				},

			});
			break;
		default:
			const swiperSliderTiles = new Swiper(sliderWrapper, {
				loop: false,
				slidesPerView: 1,
				spaceBetween: 0,
				autoHeight: true,
				speed: 400,
				pagination: {
					el: '.slider-tiles-pagination',
					clickable: true,
					renderBullet: function (index, className) {
						return '<span class="' + className + '">' + (index + 1) + "</span>";
					},
				},
				autoplay: {
					delay: 2500,
					disableOnInteraction: false,
				},
				navigation: {
					nextEl: '.btn-action-ico.ico-arrow.ico-arrow-next.button-slider-tiles-next',
					prevEl: '.btn-action-ico.ico-arrow.ico-arrow-prev.button-slider-tiles-prev',
				},
				breakpoints: {
					640: {
						slidesPerView: 2,
					},
					768: {
						slidesPerView: 3,
					},
					1024: {
						slidesPerView: 4,
					},
				},

			});
	}
})


//slider maintiles
const swiperSliderMaintiles = new Swiper('.slider-maintiles .swiper', {
	loop: false,
	slidesPerView: 1,
	spaceBetween: 0,
	autoHeight: true,
	speed: 400,
	pagination: {
		el: '.slider-maintiles-pagination',
		clickable: true,
	},
	autoplay: false,
	navigation: false,
	breakpoints: {
		640: {
			slidesPerView: 2,
		},
		1024: {
			slidesPerView: 3,
			grid: false,
		},
	},

});

//slider maintilessecond
const swiperSliderMaintilessecond = new Swiper(
  ".slider-maintilessecond .swiper",
  {
    loop: false,
    slidesPerView: "auto",
    spaceBetween: 0,
    autoHeight: true,
    speed: 400,
    pagination: {
      el: ".slider-maintilessecond-pagination",
      clickable: true,
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    navigation: false,
    breakpoints: {
      1024: {
        slidesPerView: 5,
      },
      1200: {
        slidesPerView: 6,
      },
    },
  }
);


//slider maintop
const swiperSliderMaintop = new Swiper('.slider-maintop .swiper', {
	loop: false,
	slidesPerView: 1,
	spaceBetween: 0,
	autoHeight: true,
	speed: 400,
	pagination: false,
	autoplay: {
		delay: 3000,
		disableOnInteraction: false,
	},
	navigation: false,

});

//slider cat
const swiperSliderCat = new Swiper('.slider-cat .swiper', {
	loop: false,
	slidesPerView: 1,
	spaceBetween: 0,
	autoHeight: true,
	speed: 400,
	pagination: false,
	autoplay: {
		delay: 2500,
		disableOnInteraction: false,
	},
	navigation: false,

});


// items animations
let sTop = window.scrollY + window.innerHeight;
const items = document.querySelectorAll('.item-animation');
items.forEach(function (item) {
  if (item.offsetTop < sTop) {
	item.classList.add('item-active');
	}
});
window.addEventListener('scroll', function () {
  sTop = this.scrollY + this.innerHeight; // Обновляем позицию прокрутки

  items.forEach((item) => { // Проверяем все элементы с классом item-animation
	if (item.offsetTop < sTop) { // Если он находится ниже позиции прокрутки
	  item.classList.add('item-active'); // Добавляем класс item-active
		} else {
	  item.classList.remove('item-active'); // Иначе удаляем класс
		}
	});
});