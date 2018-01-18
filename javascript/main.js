import MusicPlayer from './music_player';
import Renderer from './renderer';

$( () => {

  const audio = $("#audio-source");
  const musicPlayer = new MusicPlayer();
  const renderer = new Renderer();
  musicPlayer.setRenderer(renderer);
});
