function toggleMusica() {
  const musica = document.getElementById("musica");
  musica.volume = 0.4;

  if (musica.paused) {
    musica.play().catch(err => {
      console.log("Clique necessário para liberar o som.");
    });
  } else {
    musica.pause();
  }
}
