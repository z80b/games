import { Sprite } from 'pixi.js';
import { Tween } from '@tweenjs/tween.js';

class Tower extends Sprite {

  rotationStep = 0.05;
  rotationDirection = 0;
  stopAngle = 0;

  constructor(texture) {
    super();
    this.texture = texture;
    this.anchor = texture.defaultAnchor;
    this.tween = new Tween(this);
  }

  rotate(angle) {
      this.tween = new Tween(this)
      .to({ rotation: angle }, 500)
      .onUpdate(this.update.bind(this))
      .start();
  }

  update(options) {
    this.rotation = options.rotation;
  }

  animate(delta) {
    this.tween.update();
  }
};

export default Tower;