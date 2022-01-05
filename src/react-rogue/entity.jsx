class Entity {
  constructor(x, y, size, attributes) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.attributes = { ...attributes };
  }

  draw(ctx) {
    ctx.fillStyle = this.attributes.color || 'white';
    ctx.textBaseline = 'hanging';
    ctx.font = '16px Arial';
    ctx.fillText(this.attributes.ascii, this.x * this.size + (this.attributes.offset ? this.attributes.offset.x : 0), this.y * this.size + (this.attributes.offset ? this.attributes.offset.y : 0));
  }
}

export default Entity;