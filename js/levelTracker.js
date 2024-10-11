// JavaScript Document

const AFRAME = window.AFRAME;

window.onload = function () {
  var speechbubble = document.getElementById("speechBubble");
  speechbubble.innerHTML = markers[4].dialogue;
  speechbubble.style.display = "block";
  speechbubble.addEventListener('click', function () {
    speechbubble.innerHTML = markers[4].clue;
    speechbubble.addEventListener('click', function () {
      speechbubble.style.display = "none";
    });
  });


  globalVariable.startTime = new Date();


  const helpModeBtn = document.getElementById('helpMode');
  var clicked = false;
  helpModeBtn.addEventListener("click", function () {
    globalVariable.useHelpMode = true;
    const arrowEntity = document.getElementById("arrowEntity");
    clicked = !clicked
    arrowEntity.setAttribute('visible', clicked);
  })

  var marker1 = document.getElementById('marker1');
  var marker2 = document.getElementById("marker2");
  var marker3 = document.getElementById("marker3");


  marker1.addEventListener('markerFound', () => {
    var marker1 = document.getElementById('marker1');
    if (globalVariable.level == 1) {
      globalVariable.level = 2;
      progressLevel(marker1);
    }

  });

  marker2.addEventListener('markerFound', () => {
    var marker2 = document.getElementById("marker2");
    if (globalVariable.level == 2) {
      globalVariable.level = 3;
      progressLevel(marker2);
    }

  });


  marker3.addEventListener('markerFound', () => {
    var marker3 = document.getElementById("marker3");
    if (globalVariable.level == 3) {
      globalVariable.level = 4;
      progressLevel(marker3);
    }
  });

  marker4.addEventListener('markerFound', () => {
    var marker4 = document.getElementById("marker4");
    if (globalVariable.level == 4) {
      globalVariable.level = 5;
      progressLevel(marker4);
    }
  });

}

function progressLevel(marker) {
  var speechbubble = document.getElementById("speechBubble");
  markerNumber = (globalVariable.level - 2)
  marker.innerHTML = `<a-entity position="${markers[markerNumber].modelPosition}" rotation="${markers[markerNumber].modelRotation}" scale="${markers[markerNumber].modelScale}" gltf-model="${markers[markerNumber].modelSrc}"></a-entity>`;
  var levelill = document.getElementById("levelIllustration");
  levelill.innerHTML = "Level " + globalVariable.level;
  if (globalVariable.level == 4) {
    levelill.innerHTML = "Final Level";
  }
  if (globalVariable.level == 5) {
	  calculateScore(levelill);

  }
  speechbubble.innerHTML = markers[globalVariable.level - 2].successDialogue;
  speechbubble.style.display = "block";
  speechbubble.addEventListener('click', function () {
    speechbubble.style.display = "block";
    speechbubble.innerHTML = markers[globalVariable.level - 2].clue;
    speechbubble.addEventListener('click', function () {
      speechbubble.style.display = "none";
      if (globalVariable.level == 5) {
        var restartBtn = document.getElementById("restartBtn");
        restartBtn.style.display = "flex";
        restartBtn.onclick = function () {
          location.reload();
        }
      }
    });

  })
}

function calculateScore(levelill){
	globalVariable.endTime = new Date();
    var timeTaken = globalVariable.endTime - globalVariable.startTime;
    timeTaken /= 1000;
    var seconds = Math.round(timeTaken);
    if (globalVariable.useHelpMode == false) {
      levelill.innerHTML = "You Win! Score: " + (seconds * 1000);
    } else {
      levelill.innerHTML = "You Win! Reduced Score: " + (seconds * 1000) / 2;
    }
}
