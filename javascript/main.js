
import MusicPlayer from './music_player';
import Renderer from './renderer';

$( () => {
  // TODO: DELETE
  $(document).on('drop', e => e.preventDefault());
  const audio = $("#audio-source");
  const musicPlayer = new MusicPlayer();
  const renderer = new Renderer();
  musicPlayer.setRenderer(renderer);
});
