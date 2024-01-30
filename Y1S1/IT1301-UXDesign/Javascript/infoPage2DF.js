/* scroller */
'use strict'
var	testim = document.getElementById("testim"),
		testimDots = Array.prototype.slice.call(document.getElementById("testim-dots").children),
    testimContent = Array.prototype.slice.call(document.getElementById("testim-content").children),
    testimLeftArrow = document.getElementById("left-arrow"),
    testimRightArrow = document.getElementById("right-arrow"),
    testimSpeed = 6000,
    currentSlide = 0,
    currentActive = 0,
    testimTimer,
		touchStartPos,
		touchEndPos,
		touchPosDiff,
		ignoreTouch = 30;
;

window.onload = function() {

    // Testim Script
    function playSlide(slide) {
        for (var k = 0; k < testimDots.length; k++) {
            testimContent[k].classList.remove("active");
            testimContent[k].classList.remove("inactive");
            testimDots[k].classList.remove("active");
        }

        if (slide < 0) {
            slide = currentSlide = testimContent.length-1;
        }

        if (slide > testimContent.length - 1) {
            slide = currentSlide = 0;
        }

        if (currentActive != currentSlide) {
            testimContent[currentActive].classList.add("inactive");            
        }
        testimContent[slide].classList.add("active");
        testimDots[slide].classList.add("active");

        currentActive = currentSlide;
    
        clearTimeout(testimTimer);
        testimTimer = setTimeout(function() {
            playSlide(currentSlide += 1);
        }, testimSpeed)
    }

    testimLeftArrow.addEventListener("click", function() {
        playSlide(currentSlide -= 1);
    })

    testimRightArrow.addEventListener("click", function() {
        playSlide(currentSlide += 1);
    })    

    for (var l = 0; l < testimDots.length; l++) {
        testimDots[l].addEventListener("click", function() {
            playSlide(currentSlide = testimDots.indexOf(this));
        })
    }

    playSlide(currentSlide);

    // keyboard shortcuts
    document.addEventListener("keyup", function(e) {
        switch (e.keyCode) {
            case 37:
                testimLeftArrow.click();
                break;
                
            case 39:
                testimRightArrow.click();
                break;

            case 39:
                testimRightArrow.click();
                break;

            default:
                break;
        }
    })
		
		testim.addEventListener("touchstart", function(e) {
				touchStartPos = e.changedTouches[0].clientX;
		})
	
		testim.addEventListener("touchend", function(e) {
				touchEndPos = e.changedTouches[0].clientX;
			
				touchPosDiff = touchStartPos - touchEndPos;
			
				console.log(touchPosDiff);
				console.log(touchStartPos);	
				console.log(touchEndPos);	

			
				if (touchPosDiff > 0 + ignoreTouch) {
						testimLeftArrow.click();
				} else if (touchPosDiff < 0 - ignoreTouch) {
						testimRightArrow.click();
				} else {
					return;
				}
			
		})
}
/* -- Glow effect -- */
const viewportWidth = window.innerWidth;
const blob = document.getElementById("blob");

const maxWidthRelativeToViewport = 0.8;
const maxHeightRelativeToViewport = 0.6
window.onpointermove = event => { 
  const { clientX, clientY } = event;
  if (clientX > viewportWidth * maxWidthRelativeToViewport) {
    clientX = viewportWidth * maxWidthRelativeToViewport;}
  blob.animate({
    left: `${clientX}px`,
    top: `${clientY * 0.3}px`
  }, { duration: 3000, fill: "forwards" });
}

function smoothScrollTo(targetId, duration) {
    const target = document.getElementById(targetId);
    const targetPosition = target.getBoundingClientRect().top;
    const startPosition = window.pageYOffset;
    const startTime = performance.now();
  
    function scrollAnimation(currentTime) {
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const easing = easeInOutCubic(progress);
      const distance = targetPosition * easing;
      window.scrollTo(0, startPosition + distance);
  
      if (timeElapsed < duration) {
        requestAnimationFrame(scrollAnimation);
      }
    }
  
    function easeInOutCubic(t) {
      return t < 0.5
        ? 4 * t * t * t
        : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    }
  
    requestAnimationFrame(scrollAnimation);
  }

  const divToMove = document.getElementById('divToMove');
  const targetPosition1 = document.getElementById('bottomHalfInner1');
  const targetPosition2 = document.getElementById('targetPosition2');
  
  // Function to move the div based on window width
  function moveDivBasedOnWidth() {
    const windowWidth = window.innerWidth; // Get the window width
    if (windowWidth <= 1300) {
      // Move the div to targetPosition2 if the window width is 1300px or less
      targetPosition2.appendChild(divToMove);
    } else {
      // Move the div to targetPosition1 if the window width is greater than 1300px
      targetPosition1.appendChild(divToMove);
    }
  }
  
  // Call the function initially and add an event listener to update on window resize
  moveDivBasedOnWidth();
  window.addEventListener('resize', moveDivBasedOnWidth);