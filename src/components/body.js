import { Container, Sprite } from "pixi.js";
import { Tween } from '@tweenjs/tween.js';
import Wheels from '~/components/wheels';

class Body extends Container {
  wheels;
  rotationStep = 0.01;
  rotationDirection = 0;
  stopAngle = 0;

  constructor(textures) {
    super();
    this.build(textures);
    this.tween = new Tween(this);
  }

  build(textures) {
    this.body = new Sprite(textures.body);
    this.wheels = new Wheels([
      textures.wheel1,
      textures.wheel2,
    ]);
    this.addChild(this.wheels);
    this.addChild(this.body);
  }

  rotate(angle) {
    return new Promise((resolve) => {
      this.tween = new Tween(this)
        .to({ rotation: angle }, 1500)
        .onUpdate(this.update.bind(this))
        .onComplete(resolve)
        .start();
    });
  }

  update(options) {
    this.rotation = options.rotation;
  }

  animate(delta) {
    this.wheels.animate(delta);
    this.tween.update(); 
  }
}

export default Body;