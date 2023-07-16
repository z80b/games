import { Application } from 'pixi.js'
import Game from '~/components/game';
import '~/style.css';

const app = new Application({
  view: document.getElementById('game'),
  width: 800,
  height: 600,
  background: '#657050',
});

app.stage.scale.set(0.25);

const game = new Game({ stage: app.stage, marker: true });
game.begin();

app.ticker.stop();
app.ticker.add(game.animate);
app.ticker.start();