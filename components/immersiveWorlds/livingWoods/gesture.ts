/** A tap must remain a tap for the entire gesture, even if a drag returns to its start. */
export class WoodsGesture {
  private start: { id: number; x: number; y: number; time: number } | null = null;
  private moved = false;
  begin(id: number, x: number, y: number, time: number) {
    if (this.start) return false;
    this.start = { id, x, y, time }; this.moved = false; return true;
  }
  move(id: number, x: number, y: number) {
    if (!this.start || this.start.id !== id) return null;
    const dx = x - this.start.x, dy = y - this.start.y;
    if (Math.hypot(dx, dy) > 8) this.moved = true;
    return { dx, dy };
  }
  end(id: number, x: number, y: number, time: number) {
    if (!this.start || this.start.id !== id) return false;
    this.move(id, x, y);
    const tap = !this.moved && time - this.start.time < 700;
    this.start = null; return tap;
  }
  cancel(id?: number) {
    if (id === undefined || this.start?.id === id) this.start = null;
  }
}
