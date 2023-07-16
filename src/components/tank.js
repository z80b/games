import { Container } from 'pixi.js';
import { Tween } from '@tweenjs/tween.js';
import Tower from '~/components/tower';
import Body from '~/components/body';

class Tank extends Container {
  constructor(textures) {
    super();
    this.body = new Body(textures);
    this.tower = new Tower(textures.tower);
    this.addChild(this.body);
    this.addChild(this.tower);

    this.position.set(400, 300);
    this.tower.position.set(0, -5);
    // this.tween = new Tween(this);
  };

  rollWheels() {
    this.body.wheels.startRoll();
  }

  moveTower(angle) {
    this.tower.rotate(angle * -1);
  };

  moveBody(angle) {
    return this.body.rotate(angle * -1);
  }

  rotateWheels(angle) {
    this.body.wheels.rotate(angle);
  }

  stopWheels() {
    this.body.wheels.stopRoll();
  }

  moveTo(position) {
    return new Promise((resolve) => {
      this.tween = new Tween(this)
        .to(position, 3000)
        .onUpdate(this.update.bind(this))
        .onComplete(resolve)
        .start();
    });
  }

  async move(screenPosition, tankPosition) {
    const angle = Math.atan2(-tankPosition.x, -tankPosition.y).toFixed(2);
    if (this.tween) {
      this.tween.stop();
    }
    this.rollWheels();
    await this.moveTower(angle);
    await this.moveBody(angle);
    this.rotateWheels(angle);
    await this.moveTo(screenPosition);
    this.stopWheels();
  }

  update(position) {
    this.position = position;
  }

  animate(delta) {
    if (this.tween) {
      this.tween.update();
    }
    this.tower.animate(delta);
    this.body.animate(delta);
  };
};

export default Tank;