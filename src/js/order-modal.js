import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let formData = {};
let orderContext = {
  modelId: '682f9bbf8acbdf505592ac36',
  color: '#1212ca',
};

const refs = {
  formEl: document.querySelector('.order-form'),
  backdropEl: document.querySelector('.order-backdrop'),
  closeBtn: document.querySelector('.modal-close-button'),
  nameInput: document.getElementById('name'),
  phoneInput: document.getElementById('phone'),
  orderBtn: document.querySelector('.order-button'),
};

refs.phoneInput.addEventListener('input', () => {
  let digits = refs.phoneInput.value.replace(/\D/g, '');

  if (digits.startsWith('0')) {
    digits = '38' + digits;
  } else if (digits.startsWith('8')) {
    digits = '3' + digits;
  }

  digits = digits.slice(0, 12);
  refs.phoneInput.value = digits;
  toggleOrderButtonState();
});

refs.nameInput.addEventListener('input', toggleOrderButtonState);
refs.closeBtn.addEventListener('click', closeOrderModal);
refs.backdropEl.addEventListener('click', event => {
  if (event.target === refs.backdropEl) {
    closeOrderModal();
  }
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && refs.backdropEl.classList.contains('is-open')) {
    closeOrderModal();
  }
});

refs.formEl.addEventListener('submit', async event => {
  event.preventDefault();

  const { name, phone, comment } = event.target.elements;
  const validNumber = /^380\d{9}$/.test(phone.value);

  if (!validNumber) {
    iziToast.show({
      message: 'Введіть номер у форматі 380XXXXXXXXX',
    });
    return;
  }

  if (name.value.length === 1) {
    iziToast.show({
      message: "Ім'я має складатися мінімум з 2 символів!",
      color: 'red',
    });
    return;
  }

  const commentValue = commentValidator(comment.value);

  formData = {
    name: name.value,
    phone: phone.value,
    comment: commentValue,
    modelId: orderContext.modelId,
    color: orderContext.color,
  };

  try {
    const response = await axios.post(
      'https://furniture-store-v2.b.goit.study/api/orders',
      formData
    );
    const orderData = response.data;

    iziToast.show({
      message: `Ви замовили ${orderData.model}! Номер вашого замовлення ${orderData.orderNum}. Вже телефонуємо Вам!`,
      color: 'green',
    });

    event.target.reset();
    toggleOrderButtonState();
    closeOrderModal();
  } catch (error) {
    console.log(error.message);
    iziToast.show({
      message: "Некоректні дані, будь ласка, перевірте ім'я і номер телефону!",
      color: 'red',
    });
  }
});

toggleOrderButtonState();
closeOrderModal();

export function openOrderModal() {
  refs.backdropEl.classList.add('is-open');
}

export function setOrderModalContext(context = {}) {
  orderContext = {
    ...orderContext,
    ...context,
  };
}

function closeOrderModal() {
  refs.backdropEl.classList.remove('is-open');
}

function toggleOrderButtonState() {
  const hasNameValue = refs.nameInput.value.trim() !== '';
  const hasPhoneValue = refs.phoneInput.value.trim() !== '';

  refs.orderBtn.disabled = !(hasNameValue && hasPhoneValue);
}

function commentValidator(str) {
  if (str.length > 256) {
    return str.slice(0, 255);
  }

  while (str.length < 5) {
    str += ' ';
  }

  return str;
}
