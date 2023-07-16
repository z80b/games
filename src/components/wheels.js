import { Container, AnimatedSprite } from 'pixi.js';

class Wheels extends Container {
  rotationStep = 0.01;
  rotationDirection = 0;
  positions = [[-70, -60], [70, -60], [70, 60], [-70, 60]];

  constructor(textures) {
    super();
    this.setup(textures);
  }

  setup(textures) {
    this.wheels = this.positions.map(([x, y]) => {
      const wheel = new AnimatedSprite(textures);
      wheel.position.set(x, y);
      wheel.animationSpeed = 1 / 6;
      this.addChild(wheel);
      return wheel;
    });
  }

  startRoll() {
    this.wheels.forEach(whell => whell.play());
  }

  stopRoll() {
    this.wheels.forEach(whell => whell.stop());
  }

  rotate(angle) {
    this.rotationDirection = 0.1;
  }

  animate(delta) {
    if (this.wheels[0].rotation > 1) {
      this.wheels.forEach((_, index, wheels) => {
        if (wheels[index].position.y < 0) {
          wheels[index].rotation += this.rotationDirection;
        } else {
          wheels[index].rotation -= this.rotationDirection;
        }
      });
    }
  }
};

export default Wheels;