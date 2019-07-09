export function detectCollision(star, character) {
  let bottomStar = star.y + star.radius;
  let characterTop = character.y;
  let characterLeft = character.x;
  let characterRight = character.x + character.width;

  if (
      bottomStar >= characterTop &&
      star.x >= characterLeft &&
      star.x + star.radius <= characterRight
    ) {
      character.lives -= 1
      return true
    }
};
