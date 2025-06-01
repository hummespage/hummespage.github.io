function toggleMusica() {
  const musica = document.getElementById("musica");

  musica.volume = 0.5;

  if (musica.paused) {
    musica.play().catch((err) => {
      console.log("Navegador bloqueou autoplay. Clique para liberar o som.");
    });
  } else {
    musica.pause();
  }
}
