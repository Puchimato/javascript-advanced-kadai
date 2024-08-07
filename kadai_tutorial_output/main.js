let untyped = '';
let typed = '';
let score = 0;

const untypedfield = document.getElementById('untyped');
const typedfield = document.getElementById('typed');
const wrap = document.getElementById('wrap');
const start = document.getElementById('start');
const count = document.getElementById('count');


// text list
const textLists = [
  'Hello World','This is my App','How are you?',
  'Today is sunny','I love JavaScript!','Good morning',
  'I am Japanese','Let it be','Samurai',
  'Typing Game','Information Technology',
  'I want to be a programmer','What day is today?',
  'I want to build a web app','Nice to meet you',
  'Chrome Firefox Edge Safari','machine learning',
  'Brendan Eich','John Resig','React Vue Angular',
  'Netscape Communications','undefined null NaN',
  'Thank you very much','Google Apple Facebook Amazon',
  'ECMAScript','console.log','for while if switch',
  'var let const','Windows Mac Linux iOS Android',
  'programming'
];

// random text
const createText = () => {
  // Clear correct
 typed='';
 typedfield.textContent = typed;
  let random = Math.floor(Math.random() * textLists.length);
  untyped = textLists[random];
  untypedfield.textContent = untyped;
};

// key test
const keyPress = e => {
  // if wrong
  if(e.key !== untyped.substring(0,1)) {
    wrap.classList.add('mistyped');
    // change red color back
    setTimeout(() => {
      wrap.classList.remove('mistyped');
    }, 100);
    return;
  }

  // if right
  //Score add
  score++;
  wrap.classList.remove('mistyped')
  typed += untyped.substring(0, 1);
  untyped = untyped.substring(1);
  typedfield.textContent = typed;
  untypedfield.textContent = untyped;

  // new text when cleared
  if(untyped === '') {
  createText();
  }
};


//typing skill rank
const rankCheck = score => {

  // text counter
  let text = '';

  // score rankings texts
  if(score < 100) {
    text = 'あなたのランクはCです。\nBランクまであと${100 - score}文字です。';
  } else if(score < 200) {
    text = `あなたのランクはBです。\nAランクまであと${200 - score}文字です。`;    
  } else if(score < 300) {
    text = `あなたのランクはAです。\nSランクまであと${300 - score}文字です。`;    
  } else if(score >= 300) {
    text = `あなたのランクはSです。\nおめでとうございます!`;   
  }

  // show score in popup
  return `${score}文字打てました!\n${text}\n【OK】リトライ / 【キャンセル】終了`;
};

// end game
const gameOver = id => {
  clearInterval(id);

  const result = confirm(rankCheck(score));

  // new game when ok button is pressed
  if(result == true) {
    window.location.reload();
  }

};

// count down timer
const timer = () => {

  // timer html p
  let time = count.textContent;

  const id = setInterval(() => {

    // Count down
    time--;
    count.textContent = time;

    // stop timer at 0
    if(time <= 0) {
      gameOver(id);
    }
  }, 1000);
};

//Game Start settings
start.addEventListener('click', () => {

//  start timer
timer();

  // random text show
  createText();

  // Hide Start button
  start.style.display='none';

  // keyboard event
  document.addEventListener('keypress', keyPress);

});

untypedfield.textContent = 'スタートボタンで開始'