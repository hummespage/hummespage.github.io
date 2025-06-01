// Função para ligar/desligar a música de fundo
function toggleMusica() {
  const musica = document.getElementById("musica");

  // Define volume inicial
  musica.volume = 0.5;

  // Tenta reproduzir caso esteja pausada
  if (musica.paused) {
    musica.play().catch((err) => {
      console.log("O navegador bloqueou o autoplay. Clique para liberar o som.");
    });
  } else {
    musica.pause();
  }
}
