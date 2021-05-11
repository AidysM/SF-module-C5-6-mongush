/**
  * Функция-обертка над XMLHttpRequest, осуществляющая запрос
  * url - урл, по которому будет осуществляться запрос
  * callback - функция, которая вызовется при успешном выполнении
  * и первым параметром получит объект-результат запроса
  */
// Ищем ноду для вставки результата запроса
const resultNode = document.querySelector('.j-result');
// Ищем кнопку, по нажатии на которую будет запрос
const btnNode = document.querySelector('.j-btn-request');

const inputNode1 = document.querySelector('.input1');
const inputNode2 = document.querySelector('.input2');
// console.log(value);

function useRequest(url) {
  return fetch(url)
    .then((response) => {
      console.log('response', response);
      return response.url;
    })
    .catch(() => {
      console.log('error');
    });
}

/**
  * Функция обработки полученного результата
  * apiData - объект с результатом запроса
  */

// Вешаем обработчик на кнопку для запроса
btnNode.addEventListener('click', async () => {
  let n1 = Number(inputNode1.value);
  let n2 = Number(inputNode2.value);
  // console.log(inputNode.value);
  if (100 <= n1 && n1 <= 300 && 100 <= n2 && n2 <= 300) {
    const displayResult = await useRequest(`https://picsum.photos/${n1}/${n2}`);
    resultNode.innerHTML = `<img src="${displayResult}"/>`;
  }
  else {
    resultNode.innerHTML = '<div class="result j-result">Одно из чисел вне диапазона от 100 до 300!</div>';
  }
});
