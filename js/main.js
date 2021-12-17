let questions = database.questions
for (let key in questions){
  let question = questions[key];
  let question_button = `
  <button class="nav-link" onclick="changeEditorContent()" data-bs-toggle="pill" data-bs-target="#text${key}" type="button">
    <span class="question">Masala #${key}</span>
    <i class="fa-regular fa-circle"></i>
  </button>`;
  document.getElementById('v-pills-tab').innerHTML += question_button;
  let question_content = `
  <div class="tab-pane fade" id="text${key}">
    <h3 id='problem-title'>Masala #${key}</h3>
    <p>${question.text}</p>
    <ul class="list-unstyled">`;
  for (let example in question.examples){
    question_content += `<li>${question.examples[example]}</li>`
    console.log(`<li>${question.examples[example]}</li>`)
  }
  question_content += '</ul></div>';
  document.getElementById('v-pills-tabContent').innerHTML += question_content;
}

function changeEditorContent(){
  let question_id = document.getElementsByClassName('active')[0].innerText.slice(-1);
  let func = database.questions[question_id].fun_name;
  question_id = parseInt(question_id);
  let editor = document.getElementById('answer');
  editor.value = `function ${func} {

}`

}


function submit() {
  let check = [
    [12, 4, 5],
    ['Bob', 'Alice', 'X'],
    ['Hello', 'ab', 'Hi'],
  ]
  let answers = [
    [true, false, true],
    ['Hello Bob!', 'Hello Alice!', 'Hello X!'],
    ['lololo', 'ababab', 'HiHiHi'],
  ]
  let question_title = document.getElementsByClassName('active')[0]
  let question_id = question_title.innerText.slice(-1);
  let ans = document.getElementById('answer').value;
  question_id = parseInt(question_id) - 1;
  let exec = document.getElementById('result-table');
  let tr = document.createElement('tr')
  let td = document.createElement('td');
  td.colSpan = '5';
  td.innerHTML= `${question_title.innerText}`
  tr.appendChild(td)
  exec.append(tr)
  let true_answers = 0;
  for (let i = 0; i < check[question_id].length; i++){
    let time = new Date();
    let result = eval(ans + `myFunction('${check[question_id][i]}'.valueOf())`)
    let tr = document.createElement('tr')
    tr.innerHTML = `
    <td>${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}</td>
    <td>myFunction(${check[question_id][i]})</td>
    <td class="text-primary">${answers[question_id][i]}</td>
    <td>${result}</td>`
    if (result == answers[question_id][i]) {
      tr.innerHTML += `<td class="text-success"><i class="fa-solid fa-circle-check"></i></td>`;
      true_answers++;
      console.log(true_answers)
    }
    else tr.innerHTML += `<td class="text-danger"><i class="fa-solid fa-circle-minus"></i></td>`;
    exec.append(tr)
  }
  if (true_answers === answers[question_id].length) {
    document.getElementById('final-result').innerHTML = ' <span><i class="fa-solid fa-circle-check text-success"</span>';
    question_title.style.color = 'green'
  }
  else {
    document.getElementById('final-result').innerHTML = ' <span><i class="fa-solid fa-circle-minus text-danger"</span>'
    question_title.style.color = 'red'
  }
}