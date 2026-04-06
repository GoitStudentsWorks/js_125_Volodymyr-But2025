import axios from "axios"
import iziToast from "izitoast";

let formData = {};

const refs = {
formEl: document.querySelector('.order-form'),
backdropEl:document.querySelector('.order-backdrop'),
closeBtn: document.querySelector('.modal-close-button'),
phoneInput: document.getElementById('phone'),
}

  refs.phoneInput.addEventListener('input', () => {
    // прибираємо все, крім цифр
    let digits = refs.phoneInput.value.replace(/\D/g, '');

    // якщо починається з 8 або 0 — приводимо до 380
    if (digits.startsWith('0')) {
      digits = '38' + digits;
    } else if (digits.startsWith('8')) {
      digits = '3' + digits;
      }

    // обмежуємо до 12 цифр
    digits = digits.slice(0, 12);

      refs.phoneInput.value = digits;
  });

// Функція для блокування скролювання
function disableBodyScroll() {
  document.body.style.overflow = 'hidden';
}

// Функція для дозволу скролювання
function enableBodyScroll() {
  document.body.style.overflow = '';
}

// Відкриття модального вікна
export function openOrderModal() {
  refs.backdropEl.classList.add('is-open');
  disableBodyScroll();
}

// Закриття модального вікна
function closeOrderModal() {
  refs.backdropEl.classList.remove('is-open');
  enableBodyScroll();
}

// Закриття при кліку на кнопку закриття
refs.closeBtn.addEventListener('click', closeOrderModal);

// Закриття при кліку на backdrop (за межами модального вікна)
refs.backdropEl.addEventListener('click', (e) => {
  if (e.target === refs.backdropEl) {
    closeOrderModal();
  }
});

refs.formEl.addEventListener('submit', async e => {
    e.preventDefault();

      
    const { name, phone, comment } = e.target.elements;

    // Перевірка номера телефону
    const validNumber = /^380\d{9}$/.test(phone.value);
    if (!validNumber) {
    e.preventDefault();
      iziToast.show({ 
    message: 'Введіть номер у форматі 380XXXXXXXXX'
});
      return; 
    }

    const commentValue = commentValidator(comment.value);

    formData = {
        name: name.value,
        phone: phone.value,
        comment: commentValue,
        modelId: "682f9bbf8acbdf505592ac36",
  color: "#1212ca"
    };

    console.log(formData);
    
    try {
        const response = await axios.post('https://furniture-store-v2.b.goit.study/api/orders', formData);
    const orderData = response.data;

    console.log(orderData);
iziToast.show({ 
    message: `Ви замовили ${orderData.model}! 
    Hомер замовлення ${orderData.orderNum}. 
    Вже телефонуємо Вам 🫶`
                });
    e.target.reset();
    closeOrderModal();
    
}
    catch (error) {
            e.preventDefault();
        console.log(error.message);
        iziToast.show({
            message: `error`
                });
}
});

// Закриття при натисканні на ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && refs.backdropEl.classList.contains('is-open')) {
    closeOrderModal();
  }
});

function commentValidator(str) {
  while (str.length < 5) {
    str += ' ';
  }
  return str;
}