import { refs } from './refs';

export function initCategoryClickHandler() {
  if (!refs.furnitureCategoryList) return;

  refs.furnitureCategoryList.addEventListener('click', event => {
    const clickedItem = event.target.closest('.furniture-category__item');
    if (!clickedItem) return;

    // Видаляємо клас з усіх елементів
    const allItems = refs.furnitureCategoryList.querySelectorAll(
      '.furniture-category__item'
    );
    allItems.forEach(item => item.classList.remove('akcent-item-color'));

    // Додаємо клас до клікнутого елемента
    clickedItem.classList.add('akcent-item-color');
  });
}

export function initHeaderMenuHandler() {
  if (!refs.header) return;

  const menuModal = refs.header.querySelector('.header_menu_svg');
  const xModal = refs.header.querySelector('.header_x_svg');
  const navList = refs.header.querySelector('.nav_list');

  if (!menuModal || !xModal || !navList) return;

  const closeMenu = () => {
    xModal.classList.add('hide');
    xModal.classList.remove('show');

    menuModal.classList.add('show');
    menuModal.classList.remove('hide');

    navList.classList.remove('is-open');
    document.body.classList.remove('menu-open');
  };

  menuModal.addEventListener('click', () => {
    menuModal.classList.add('hide');
    menuModal.classList.remove('show');

    xModal.classList.add('show');
    xModal.classList.remove('hide');

    navList.classList.add('is-open');
    document.body.classList.add('menu-open');
  });

  xModal.addEventListener('click', closeMenu);

  navList.addEventListener('click', event => {
    if (event.target.closest('a')) {
      closeMenu();
    }
  });
}
