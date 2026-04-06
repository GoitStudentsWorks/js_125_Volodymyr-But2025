import { getFurnitureById } from './api';
import { openOrderModal, setOrderModalContext } from './order-modal';
import { initFurnitureList, loadMoreFurniture } from './render';
import { refs } from './refs';

let currentProduct = null;

function createStarsMarkup(rating = 4) {
  return Array.from({ length: 5 }, (_, index) => {
    const modifier = index < rating ? 'star-filled' : 'star-empty';

    return `
      <svg class="star ${modifier}" viewBox="0 0 32 32" aria-hidden="true">
        <path d="M8.688 19.097l-1.987 8.603c-0.062 0.261-0.043 0.533 0.053 0.783s0.265 0.465 0.485 0.617c0.22 0.152 0.481 0.235 0.749 0.236s0.53-0.078 0.752-0.227l7.26-4.84 7.26 4.84c0.227 0.151 0.495 0.228 0.768 0.222s0.537-0.095 0.757-0.256c0.22-0.161 0.386-0.385 0.475-0.642s0.097-0.536 0.023-0.799l-2.439-8.533 6.048-5.443c0.194-0.174 0.332-0.402 0.398-0.654s0.056-0.518-0.027-0.765-0.238-0.464-0.444-0.624c-0.206-0.16-0.454-0.256-0.714-0.277l-7.601-0.605-3.289-7.281c-0.105-0.234-0.275-0.434-0.491-0.573s-0.467-0.214-0.724-0.214c-0.257 0-0.508 0.074-0.724 0.214s-0.386 0.339-0.491 0.573l-3.289 7.281-7.601 0.604c-0.255 0.020-0.5 0.114-0.703 0.269s-0.358 0.366-0.445 0.607c-0.087 0.241-0.103 0.502-0.046 0.752s0.185 0.478 0.369 0.656l5.619 5.476zM12.492 13.329c0.238-0.019 0.467-0.101 0.662-0.239s0.35-0.325 0.448-0.543l2.399-5.308 2.399 5.308c0.098 0.218 0.252 0.405 0.448 0.543s0.424 0.22 0.662 0.239l5.296 0.42-4.361 3.925c-0.379 0.341-0.529 0.867-0.391 1.357l1.671 5.847-4.981-3.321c-0.219-0.147-0.476-0.225-0.739-0.225s-0.521 0.078-0.739 0.225l-5.205 3.471 1.4-6.061c0.051-0.223 0.044-0.455-0.020-0.675s-0.184-0.419-0.348-0.579l-4.051-3.949 5.453-0.435z"></path>
      </svg>
    `;
  }).join('');
}

function formatCategory(category) {
  if (!category) return 'Меблі';
  if (typeof category === 'string') return category;
  return category.name || category.title || 'Меблі';
}

function formatSize(product) {
  if (typeof product.size === 'string') return product.size;
  if (Array.isArray(product.size)) return product.size.join('x');
  if (product.size && typeof product.size === 'object') {
    return Object.values(product.size).join('x');
  }
  if (typeof product.dimensions === 'string') return product.dimensions;
  if (product.dimensions && typeof product.dimensions === 'object') {
    return Object.values(product.dimensions).join('x');
  }
  return 'Немає даних';
}

function renderModalColors(colors = []) {
  return colors
    .map(
      color =>
        `<button type="button" aria-label="Колір меблів" style="background-color: ${color}"></button>`
    )
    .join('');
}

function updateModalMainImage(imageSrc, altText) {
  const mainImage = refs.productModal?.querySelector('.product-modal__main-image');

  if (!mainImage) return;

  mainImage.src = imageSrc;
  mainImage.alt = altText;
}

function fillProductModal(product) {
  if (!refs.productModal) return;

  const images = product.images || [];
  const colors = product.color || product.colors || [];
  const title = product.name || 'Модель';
  const category = formatCategory(product.category);
  const price = Number(product.price || 0).toLocaleString('uk-UA');
  const description = product.description || 'Опис товару поки що недоступний.';
  const size = formatSize(product);
  const rating = Number(product.rating || 4);

  refs.productModal.querySelector('.product-modal__title').textContent = title;
  refs.productModal.querySelector('.product-modal__category').textContent = category;
  refs.productModal.querySelector('.product-modal__price').textContent = `${price} грн`;
  refs.productModal.querySelector('.product-modal__description').textContent = description;
  refs.productModal.querySelector('.product-modal__size').textContent = `Розмір: ${size}`;
  refs.productModal.querySelector('.product-modal__rating').innerHTML = createStarsMarkup(rating);
  refs.productModal.querySelector('.product-modal__color-list').innerHTML = renderModalColors(colors);

  if (images.length > 0) {
    updateModalMainImage(images[0], title);
  }

  const thumbnails = refs.productModal.querySelector('.product-modal__thumbnails');
  thumbnails.innerHTML = images
    .slice(1)
    .map(
      (image, index) => `
        <button type="button" class="product-modal__thumb" data-image-src="${image}">
          <img src="${image}" alt="${title} ракурс ${index + 2}" />
        </button>
      `
    )
    .join('');
}

async function openProductModal(productId) {
  if (!refs.productModal || !productId) return;

  try {
    const product = await getFurnitureById(productId);

    currentProduct = product;
    fillProductModal(product);

    if (!refs.productModal.open) {
      refs.productModal.showModal();
    }
  } catch (error) {
    console.error('Error opening furniture modal:', error);
  }
}

function closeProductModal() {
  if (refs.productModal?.open) {
    refs.productModal.close();
  }
}

export function initCategoryClickHandler() {
  if (!refs.furnitureCategoryList) return;

  refs.furnitureCategoryList.addEventListener('click', async event => {
    const clickedLink = event.target.closest('.furniture-category__link');
    const clickedItem = event.target.closest('.furniture-category__item');

    if (!clickedItem || !clickedLink) return;

    event.preventDefault();

    const allItems = refs.furnitureCategoryList.querySelectorAll(
      '.furniture-category__item'
    );
    allItems.forEach(item => item.classList.remove('akcent-item-color'));

    clickedItem.classList.add('akcent-item-color');

    const categoryId = clickedItem.dataset.id;

    if (!categoryId) {
      await initFurnitureList();
      return;
    }

    await initFurnitureList({ category: categoryId });
  });
}

export function initLoadMoreHandler() {
  if (!refs.loadMoreBtn) return;

  refs.loadMoreBtn.addEventListener('click', async () => {
    await loadMoreFurniture();
  });
}

export function initProductModalHandler() {
  if (!refs.productModal || !refs.furnitureList) return;

  if (refs.productModal.open) {
    refs.productModal.close();
  }

  refs.furnitureList.addEventListener('click', async event => {
    const detailsButton = event.target.closest('.details-btn');

    if (!detailsButton) return;

    event.preventDefault();
    await openProductModal(detailsButton.dataset.id);
  });

  refs.productModalCloseBtn?.addEventListener('click', closeProductModal);

  refs.productModal.addEventListener('click', event => {
    if (event.target === refs.productModal) {
      closeProductModal();
    }
  });

  refs.productModal.addEventListener('click', event => {
    const thumbButton = event.target.closest('.product-modal__thumb');

    if (!thumbButton) return;

    const imageSrc = thumbButton.dataset.imageSrc;
    const thumbImage = thumbButton.querySelector('img');

    if (!imageSrc) return;

    updateModalMainImage(imageSrc, thumbImage?.alt || 'Фото товару');
  });

  refs.productModal
    .querySelector('.product-modal__btn')
    ?.addEventListener('click', event => {
      event.preventDefault();

      setOrderModalContext({
        modelId: currentProduct?._id,
        color: currentProduct?.color?.[0] || '#1212ca',
      });

      closeProductModal();
      openOrderModal();
    });
}
