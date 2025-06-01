// Função para ligar/desligar a música de fundo
function toggleMusica() {
  const musica = document.getElementById("musica");
  if (musica.paused) {
    musica.play();
  } else {
    musica.pause();
  }
}
