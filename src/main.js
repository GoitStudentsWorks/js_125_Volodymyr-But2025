import { initcategories, initFurnitureList } from './js/render';
import { initAccordion } from './js/modules';
import {
  initCategoryClickHandler,
  initLoadMoreHandler,
  initProductModalHandler,
} from './js/hendlers';

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded and parsed');

  initAccordion();
  initcategories();
  initCategoryClickHandler();
  initLoadMoreHandler();
  initProductModalHandler();
  initFurnitureList();
});
