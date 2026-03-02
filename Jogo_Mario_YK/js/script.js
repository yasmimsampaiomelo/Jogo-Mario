/*criar uma variavel para cada elemento no gameboard, utilizando a palavra const. */
const personagem = document.getElementById("personagem");
const obstaculo = document.getElementById("obstaculo");
const nuvem = document.getElementById("nuvem");
const gameboard = document.getElementById("game-board");
const fase = document.getElementById("fase");

const tema = document.getElementById("tema");
const pulo = document.getElementById("pulo");
const gameover = document.getElementById("audio-gamer-over");
const palavra = document.getElementById("game-over")

const pontuacao = document.getElementById("pontuacao");
const botaoIniciar = document.getElementById("iniciar");
const display = document.getElementById("game-over");
const modal = document.getElementById("fundomodal");
const audio2 = document.getElementById("fase2");
const audio3 = document.getElementById("fase3");
const botaoReiniciar = document.getElementById("reiniciar");
// botao iniciar
function star() {

   personagem.style.display = "block";
   nuvem.style.display = "block";
   obstaculo.style.display = "block";
   iniciar.style.display = "none";
   tema.play();
   document.addEventListener('keydown', jump);

   fase.textContent = parseInt(fase.textContent) + 1;



   //inicia o pulo 

   function jump() {
      pulo.play()
      personagem.classList.add('jump');
      setTimeout(jumpout, 500);
   }
   function jumpout() {
      personagem.classList.remove('jump');
   }

   //inicia loop
   const loop = setInterval(verifica, 10);

   function verifica() {
      const posicaoObstaculo = obstaculo.offsetLeft;
      const posicaoPersonagem = parseInt(getComputedStyle(personagem).bottom);
      const larguraPersonagem = personagem.offsetWidth;

      // Colisão simples e eficaz
      if (posicaoObstaculo <= larguraPersonagem + 40 &&
         posicaoObstaculo >= -50 &&
         posicaoPersonagem < 80) {

         // ===== GAME OVER =====
         nuvem.style.animation = 'none';
         nuvem.style.left = nuvem.offsetLeft + 'px';

         obstaculo.style.animation = 'none';
         obstaculo.style.left = posicaoObstaculo + 'px';

         clearInterval(loop);

         personagem.style.animation = 'none';
         personagem.style.bottom = posicaoPersonagem + 'px';

         if (+fase.textContent === 1) {
            tema.pause();
            gameover.play();
            display.innerHTML = '<h3>Game Over</h3>';
            personagem.src = './img/game-over.png';
            personagem.style.width = '50px';
            botaoReiniciar.style.display = "block";
         } else if (+fase.textContent === 2) {
            audio2.pause()
            gameover.play();
            display.innerHTML = '<h3>Game Over</h3>'
            personagem.src = "./img/morte.png";
            personagem.style.width = "100px";
            personagem.style.height = "100px";
            botaoReiniciar.style.display = "block";
         } else {
            audio3.pause();
            gameover.play();
            display.innerHTML = '<h3>Game Over</h3>';
            personagem.src = "./img/machucada.png";
            personagem.style.width = "100px";
            personagem.style.height = "100px";
            botaoReiniciar.style.display = "block";
         }

      }
      else {
         // pontuação só aumenta se não colidiu
         pontuacao.textContent = Number(pontuacao.textContent) + 0.5;

         // mudança de fase 
         if (pontuacao.textContent >=200){
            pontuacao.textContent = 0;
            fase.textContent = Number(fase.textContent) + 1;

            if (+fase.textContent === 2) {
               personagem.src = "./img/R.gif";
               obstaculo.src = "./img/lua.png";
               obstaculo.style.width = "110px";
               nuvem.src = "./img/nave.png";
               nuvem.style.width = "200px";
               gameboard.style.backgroundImage = "url(./img/cenario.png)";
               gameboard.style.borderBottom = '30px solid black';
               tema.pause();
               audio2.play();
            }
            else if (+fase.textContent === 3) {
               personagem.src = "./img/poderosa.gif";
               obstaculo.src = "./img/taxi.png";
               gameboard.style.backgroundImage = "url(./img/cenariorosa.gif)";
               gameboard.style.borderBottom = "30px solid yellow";
               nuvem.src = "./img/coracao.gif";
               audio2.pause();
               audio3.play();
            }
            else if (+fase.textContent === 4) { 
               audio3.pause();
               tema.pause();
               audio2.pause();
               obstaculo.style.animation = 'none';
               nuvem.style.animation = 'none';
               personagem.style.animation = 'none';
               personagem.style.bottom = '0px';
               modal.style.display = "block";
            }
         }
      }
   }
}
// final do star

// reiniciar 
document.getElementById("reiniciar").addEventListener("click", function () {
   location.reload();
});



