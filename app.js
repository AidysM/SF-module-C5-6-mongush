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

function useRequest(url, callback) {
  // var xhr = new XMLHttpRequest();
  // xhr.open('GET', url, true);
  //
  // xhr.onload = function() {
  //   if (xhr.status != 200) {
  //     console.log('Статус ответа: ', xhr.status);
  //   } else {
  //     const result = JSON.parse(xhr.response);
  //     if (callback) {
  //       callback(result);
  //     }
  //   }
  // };
  //
  // xhr.onerror = function() {
  //   console.log('Ошибка! Статус ответа: ', xhr.status);
  // };
  //
  // xhr.send();
  return fetch(url)
    .then((response) => {
      console.log('response', response);
      const result = response.json();
      if (callback) {callback(result);}
      return result;
    })
    .then((result) => {
      return result;
    })
    .catch(() => {
      console.log('error');
    });
}


/**
  * Функция обработки полученного результата
  * apiData - объект с результатом запроса
  */
function displayResult(apiData) {
  let cards = '';
  // console.log('start cards', cards);

  apiData.forEach(item => {
    const cardBlock = `
      <div class="card">
        <img
          src="${item.download_url}"
          class="card-image"
        />
        <p>${item.author}</p>
      </div>
    `;
    cards = cards + cardBlock;
  });

  // console.log('end cards', cards);

  resultNode.innerHTML = cards;
}


// Вешаем обработчик на кнопку для запроса
btnNode.addEventListener('click', async () => {
  let n1 = Number(inputNode1.value);
  let n2 = Number(inputNode2.value);
  // console.log(inputNode.value);
  if (100 <= n1 <= 300 && 100 <= n2 <= 300) {
    await useRequest(`https://picsum.photos/${n1}/${n2}`, displayResult);
  }
  else {
    resultNode.innerHTML = '<div class="result j-result">Одно из чисел вне диапазона от 100 до 300!</div>';
  }
});

