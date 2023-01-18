// Khai báo các đối tượng DOM
let btnAddtaskEl = document.querySelector('button') 
let wordEl = document.querySelector('#todo-word') 
let meaningEl = document.querySelector('#todo-meaning') 

// Lấy danh sách từ từ local storage và render ra trang web
let words = getWordsFromLocalSrorage()
renderWords(words)

// Thêm sự kiện click cho nút "Thêm từ"
btnAddtaskEl.addEventListener('click', function () {
  // Kiểm tra xem người dùng có nhập từ và nghĩa hay không
  if (!wordEl.value || !meaningEl.value) {
    alert('vui lòng nhập từ và nghĩa')
    return false
  }

  saveWord()
})
// Hàm deleteWord(id) sẽ được gọi khi người dùng bấm vào nút "Xóa" trong danh sách từ vựng. Hàm này sẽ xóa từ vựng tại vị trí id trong danh sách.
function editWord(id) {
  let words = getWordsFromLocalSrorage()
  if (words.length > 0) {
    wordEl.value = words[id].word
    meaningEl.value = words[id].meaning
    btnAddtaskEl.setAttribute('id', id)
  }
}
// Hàm renderWords(words = []) sẽ được gọi để cập nhật lại danh sách từ vựng sau khi thêm, sửa hoặc xóa từ vựng.
function deleteWord(id) {
  if (confirm('Bạn có thực sự muốn xóa không?')) {
    let words = getWordsFromLocalSrorage()
    words.splice(id, 1)
    localStorage.setItem('words', JSON.stringify(words))

    renderWords(getWordsFromLocalSrorage())
  }
}

function renderWords(words = []) {
  let content = '<ul>'
  words.forEach((word, index) => {
    content += `<li>
        <div class="word">${word.word}</div>
        <div class="meaning">${word.meaning}</div>
        <a href="#" onclick="editWord(${index})">Sửa</a>
        <a href="#" onclick="deleteWord(${index})">Xóa</a>
      </li>`
  })
  content += '</ul>'
  document.querySelector('#result').innerHTML = content
}
//Hàm getWordsFromLocalSrorage() sẽ được gọi để lấy danh sách từ vựng từ bộ nhớ local storage của trình duyệt.
function getWordsFromLocalSrorage() {
  return localStorage.getItem('words') ? JSON.parse(localStorage.getItem('words')) : []
}
function saveWord() {
  let wordId = btnAddtaskEl.getAttribute('id')
  let words = getWordsFromLocalSrorage()
  let word = { word: wordEl.value, meaning: meaningEl.value }
  if (wordId == 0 || wordId) {
    words[wordId] = word
    btnAddtaskEl.removeAttribute('id')
  } else {
    words.push(word)
  }
  wordEl.value = ''
  meaningEl.value = ''

  localStorage.setItem('words', JSON.stringify(words))
  renderWords(words)
}