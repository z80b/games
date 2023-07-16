import { Assets, Container, Graphics, Rectangle, Ticker } from "pixi.js";
import Tank from '~/components/tank';

export default class Game extends Container {
  marker = false;

  constructor(props) {
    super();
    this.stage = props.stage;
    this.marker = props.marker;
  };

  async begin() {
    const assets = await Assets.load(['/tank.json']);
    this.tank = new Tank(assets['/tank.json']['textures']);
    this.stage.addChild(this.tank);

    if (this.marker) {
      this.addMarker();
    }

    this.stage.position.set(0, 0);
    this.stage.eventMode = 'static'; // 'none'/'passive'/'auto'/'static'/'dynamic'
    this.stage.hitArea = new Rectangle(0, 0, 800, 600);
    this.stage.on('pointerdown', this.onPointerDown.bind(this), null);

    this.ticker = new Ticker();
    this.ticker.stop();
    this.ticker.add(this.animate.bind(this));
    this.ticker.start();
  };

  async onPointerDown({ data }) {
    const screenPosition = data.getLocalPosition(this.stage);
    const tankPosition = data.getLocalPosition(this.tank);
    this.tank.move(screenPosition, tankPosition);
  };

  addMarker() {
    const marker = new Graphics();
    marker.beginFill(0x0000ff, 1);
    marker.drawRect(395, 295, 10, 10);
    marker.endFill();
    this.stage.addChild(marker);
  };

  animate(delta) {
    if (this.tank) {
      this.tank.animate(delta);
    }
  };
};
