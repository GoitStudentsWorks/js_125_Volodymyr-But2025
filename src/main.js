import { initcategories, initFurnitureList } from './js/render';
import { initAccordion } from './js/modules';
import { initCategoryClickHandler } from './js/hendlers';

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded and parsed');

  // Викликаємо ініціалізацію акордеона
  initAccordion();
  initcategories();
  initCategoryClickHandler();
  initFurnitureList();
  // Сюди ж потім додаси інші модулі:
});
