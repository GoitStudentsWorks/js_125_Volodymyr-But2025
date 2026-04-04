import axios from "axios"

let formData = {};

const formEl = document.querySelector('.order-form');

formEl.addEventListener('submit', asyns e => {
    e.preventDefault();
    const { name, phone, comment } = e.target.elements;
    formData = {
        name: name.value,
        phone: phone.value,
        comment: comment.value,
    };

    try {
        const response = await.axios.post('https://furniture-store-v2.b.goit.study/api', formData);
    const orderData = response.data;

    console.log(orderData);

    e.target.reset();
    
    
}
catch (error) {
    console.log(error.message);
}
});

