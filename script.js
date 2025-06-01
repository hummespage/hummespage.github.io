function toggleMusica() {
  const musica = document.getElementById("musica");

  // Garante volume e ativa o som
  musica.volume = 0.5;
  musica.muted = false;

  if (musica.paused) {
    musica.play().catch((err) => {
      console.log("Clique necessário para ativar o som:", err);
    });
  } else {
    musica.pause();
  }
}
