const word=document.getElementById('word');
const wrongletters=document.getElementById('incorrect-letters');
const popup=document.getElementById('popup-con');
const playbtn=document.getElementById('play-btn')
const notification =document.getElementById('notification-con');
const message=document.getElementById('final-message');

const figureparts=document.querySelectorAll('.figure-part')

const words=["bat","shade","shirt","burn","principal","dark",
"load","house","but","history","known","slope",
"population","engineer","mixture","simply","pretty","engine",
"fewer","raise","congress","raw","difference","at",
"happily","silly","remember","myself","stiff","unknown",
"island","printed","open","rabbit","pride","fell",
"upward","safe","positive","toy","different","beginning"]

let selectedword=words[Math.floor(Math.random()*words.length)]
 const correctletters=[];
 const incorrectletters=[];

 function displayword() {
    word.innerHTML = `${selectedword
        .split('')
        .map(letter => 
            `<span class="letter">
                ${correctletters.includes(letter) ? letter : ''}
            </span>`
        )
        .join('')
    }`;

    const innerword=word.innerText.replace(/\n/g,'')
    if(innerword===selectedword){
        message.innerText='congratualations! you won!'
        popup.style.display='flex';
    }
}
function shownotification(){
    notification.classList.add('show')
    setTimeout(()=>{
        notification.classList.remove('show')

    },2000)
}
function updateincorrectletters(){
    wrongletters.innerHTML = `
    ${incorrectletters.length>0?'<p>incorrect letters</p>':''}
    ${incorrectletters.map(letter=>`<span>${letter}</span>`)}
    `;
     figureparts.forEach((part,index)=>{
        const errors=incorrectletters.length;
        if(index<errors){
            part.style.display='block';

        }else{
            part.style.display='none'
        }
     });
     if(incorrectletters.length===figureparts.length){
        message.innerText='you lost!'
        popup.style.display='flex';
     }

}
window.addEventListener('keydown',e=>{
    if(e.keyCode>=65 && e.keyCode<=90){
        const letter=e.key;
       if(selectedword.includes(letter)){
        if(!correctletters.includes(letter)){
            correctletters.push(letter)
            displayword()
        }else{
            shownotification()
           }
        }else{
            if(!incorrectletters.includes(letter)){
                incorrectletters.push(letter)
                updateincorrectletters()
            }else{
                shownotification()
            }
        }
       
       
    }

})
playbtn.addEventListener('click',()=>{
    correctletters.splice(0);
    incorrectletters.splice(0)
    selectedword=words[Math.floor(Math.random()*words.length)]
    updateincorrectletters()
    popup.style.display='none';
    displayword()
})
displayword()