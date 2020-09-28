/*
 *
 * Global Variables
 *
 */

const NavigationBar = document.getElementById("navbar");
const NavigationBarList = document.querySelector(".navigation__list");
const ShowingNavBar = document.getElementById(`show__navbarList`);
const HidingNavBar = document.getElementById(`hide__navbarList`);
const Sections = document.querySelectorAll("section");
const Paragraph = document.querySelectorAll(`.section__paragraph`);
const HideParagraph = document.querySelectorAll(`.arrow-up`);
const ShowParagraph = document.querySelectorAll(`.arrow-down`);
const TopPage = document.querySelector(`.navigation__TopPage`);
const Sections_array = Array.from(Sections);

/*
 *
 * Creation of Navigation Bar
 *
 */

for (let x = 0; x < 4; x++) {
  NavigationBarList.appendChild(document.createElement(`li`));
}
const lists = NavigationBarList.querySelectorAll(`li`);
lists.forEach((elem, n) => {
  elem.classList.add(`navigation__element`);
  elem.appendChild(document.createElement(`a`));
  elem.dataset.section = `Section ${n + 1}`;
  const links = NavigationBarList.querySelectorAll(`a`);
  links.forEach((link, i) => {
    link.classList.add(`navigation__link`);
    link.innerText = `Section ${i + 1}`;
    link.setAttribute(`href`, `#${Sections_array[i].getAttribute(`id`)}`);
  });
});

/*
 *
 * Navigation Bar Behaviour
 *
 */

//navigation bar reset function
function reset_navbar() {
  NavigationBar.classList.remove("header");
}
//Navigation Bar
window.addEventListener("scroll", () => {
  NavigationBar.classList.add("header");
  setTimeout(reset_navbar, 3500);
});

//navbar toggle
ShowingNavBar.addEventListener(`click`, () => {
  HidingNavBar.classList.toggle(`collapse`);
  ShowingNavBar.classList.toggle(`collapse`);
  NavigationBarList.classList.toggle(`navbar__visibility`);
  NavigationBar.style.height = `255px`;
});

HidingNavBar.addEventListener(`click`, () => {
  HidingNavBar.classList.toggle(`collapse`);
  ShowingNavBar.classList.toggle(`collapse`);
  NavigationBarList.classList.toggle(`navbar__visibility`);
  NavigationBar.style.height = `50px`;
});

/*
 *
 * Controlling Active Parts of the Page
 *
 */

//Navigation Bar elements variables
const NavigationElements = NavigationBarList.querySelectorAll(
  `.navigation__element`
);
let NavigationBarList_array = Array.from(NavigationElements);

// changing active navbar element
NavigationBarList_array.forEach((e) => {
  e.addEventListener("click", () => {
    NavigationBarList_array.forEach((event) => {
      event.classList.remove(`active`);
    });

    e.classList.add(`active`);

    //changing Active Section
    Sections_array.forEach((section) => {
      if (e.getAttribute("data-section") === section.getAttribute("data-nav")) {
        Sections_array.forEach((elem) => {
          elem.classList.remove("active__section");
        });

        section.classList.add("active__section");
      }
    });
  });
});

/*
 *
 * changing active section on scrolling
 *
 */

Sections_array.forEach((section) => {
  window.addEventListener(`scroll`, () => {
    let SectionPosition = section.getBoundingClientRect().top;
    let ScreenPosition = window.innerHeight;
    if (SectionPosition < ScreenPosition) {
      section.classList.add(`active__section`);
      section.querySelector(`.section__paragraph`).classList.remove(`collapse`);

      // changing the active navbar selection
      NavigationElements.forEach((e) => {
        if (
          section.getAttribute("data-nav") === e.getAttribute("data-section")
        ) {
          NavigationElements.forEach((elem) => {
            elem.classList.remove("active");
          });

          e.classList.add("active");
        }
      });
    }

    if (SectionPosition * 2 >= ScreenPosition) {
      section.classList.remove(`active__section`);
      section.querySelector(`.section__paragraph`).classList.add(`collapse`);
    }
  });
});

/*
 *
 * the Action of collapsable Paragraphs
 *
 */

//hiding sections paragraph
HideParagraph.forEach((e) => {
  e.addEventListener("click", () => {
    e.classList.add(`collapse`);
    e.parentElement.parentElement
      .querySelector(`.section__paragraph`)
      .classList.add(`collapse`);
    e.parentElement.querySelector(`.arrow-down`).classList.remove(`collapse`);
  });
});

// showing sections paragraph
ShowParagraph.forEach((e) => {
  e.addEventListener("click", () => {
    e.classList.add(`collapse`);
    e.parentElement.parentElement
      .querySelector(`.section__paragraph`)
      .classList.remove(`collapse`);
    e.parentElement.querySelector(`.arrow-up`).classList.remove(`collapse`);
  });
});

/*
 *
 *Section of returning to the top of the page
 *
 */

//returning to the top function

function ToTheTop() {
  window.scrollTo(0, 0);
}

//top page arrow

const top_default = 0;

window.addEventListener(`scroll`, () => {
  let scrolled = window.scrollY;
  if (scrolled > top_default) {
    TopPage.classList.remove(`collapse`);
    TopPage.addEventListener(`click`, ToTheTop);
  } else if (scrolled == top_default) {
    TopPage.classList.add(`collapse`);
  }
});
