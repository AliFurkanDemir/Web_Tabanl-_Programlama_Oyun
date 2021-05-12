var jet = document.getElementById("jet");
var board = document.getElementById("board");
var jet_fire = new Audio();
jet_fire.src="jet_fire.mp3";

window.addEventListener("keydown", (e) => {
  var left = parseInt(window.getComputedStyle(jet).getPropertyValue("left"));
  if (e.key == "ArrowLeft" && left > 0) {
    jet.style.left = left - 10 + "px";
  }
  else if (e.key == "ArrowRight" && left <= 270) {
    jet.style.left = left + 10 + "px";
  }

  if (e.key == "ArrowUp" || e.keyCode == 32) {
    var bullet = document.createElement("div");
    bullet.classList.add("bullets");
    board.appendChild(bullet);
    jet_fire.play();
      jet_fire.playbackRate=2;

    var movebullet = setInterval(() => {
      var rocks = document.getElementsByClassName("rocks");

      for (var i = 0; i < rocks.length; i++) {
        var rock = rocks[i];
        if (rock != undefined) {
          var rockbound = rock.getBoundingClientRect();
          var bulletbound = bullet.getBoundingClientRect();

          if (
            bulletbound.left >= rockbound.left &&
            bulletbound.right <= rockbound.right &&
            bulletbound.top <= rockbound.top &&
            bulletbound.bottom <= rockbound.bottom
          ) {
            rock.parentElement.removeChild(rock);
            document.getElementById("points").innerHTML =
              parseInt(document.getElementById("points").innerHTML) + 1;
          }
        }
      }
      var bulletbottom = parseInt(
        window.getComputedStyle(bullet).getPropertyValue("bottom")
      );

      if (bulletbottom >= 500) {
        clearInterval(movebullet);
      }

      bullet.style.left = left + 10 +"px";
      bullet.style.bottom = bulletbottom + 3 + "px";
    });
  }
});

var generaterocks = setInterval(() => {
  var rock = document.createElement("div");
  rock.classList.add("rocks");

  var rockleft = parseInt(
    window.getComputedStyle(rock).getPropertyValue("left")
  );

  rock.style.left = Math.floor(Math.random() * 250) + "px";

  board.appendChild(rock);
}, 1000);

var moverocks = setInterval(() => {
  var rocks = document.getElementsByClassName("rocks");

  if (rocks != undefined) {
    for (var i = 0; i < rocks.length; i++) {
      var rock = rocks[i];
      var rocktop = parseInt(
        window.getComputedStyle(rock).getPropertyValue("top")
      );
      
      if (rocktop >= 475) {
        alert("Oyun Bitti");
        clearInterval(moverocks);
        window.location.reload();
      }

      rock.style.top = rocktop + 25 + "px";
    }
  }
}, 450);
