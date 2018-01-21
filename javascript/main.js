
import MusicPlayer from './music_player';
import Renderer from './renderer';
// import Dropzone from "./external_packages/dropzone";

$( () => {
  // Dropzone.autoDiscover = false;
  $(document).on('drop', e => e.preventDefault());
  const audio = $("#audio-source");
  const musicPlayer = new MusicPlayer();
  const renderer = new Renderer();
  musicPlayer.setRenderer(renderer);
});
