import axios from "axios"

let formData = {};

const formEl = document.querySelector('.order-form');
const backdropEl = document.querySelector('.order-backdrop');
const closeBtn = document.querySelector('.modal-close-button');

console.log(formEl);

// Функція для блокування скролювання
function disableBodyScroll() {
  document.body.style.overflow = 'hidden';
}

// Функція для дозволу скролювання
function enableBodyScroll() {
  document.body.style.overflow = '';
}

// Відкриття модального вікна
function openModal() {
  backdropEl.classList.add('is-open');
  disableBodyScroll();
}

// Закриття модального вікна
function closeModal() {
  backdropEl.classList.remove('is-open');
  enableBodyScroll();
}

// Закриття при кліку на кнопку закриття
closeBtn.addEventListener('click', closeModal);

// Закриття при кліку на backdrop (за межами модального вікна)
backdropEl.addEventListener('click', (e) => {
  if (e.target === backdropEl) {
    closeModal();
  }
});

formEl.addEventListener('submit', async e => {
    e.preventDefault();
    const { name, phone, comment } = e.target.elements;
    formData = {
        name: name.value,
        phone: phone.value,
        comment: comment.value,
        modelId: "682f9bbf8acbdf505592ac36",
  color: "#1212ca"
    };

    console.log(formData);
    
    try {
        const response = await axios.post('https://furniture-store-v2.b.goit.study/api/orders', formData);
    const orderData = response.data;

    console.log(orderData);

    e.target.reset();
    closeModal();
    
}
catch (error) {
    console.log(error.message);
}
});

// Закриття при натисканні на ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && backdropEl.classList.contains('is-open')) {
    closeModal();
  }
});

