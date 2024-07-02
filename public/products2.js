document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.main-image');
    const dots = document.querySelectorAll('.dot');
    let currentIndex = 0;
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID;
    const sliderContainer = document.querySelector('.slider-container');

    slides.forEach((slide, index) => {
        const slideImage = slide.querySelector('img');
        slideImage.addEventListener('dragstart', (e) => e.preventDefault());

        // Touch events
        slide.addEventListener('touchstart', touchStart(index));
        slide.addEventListener('touchend', touchEnd);
        slide.addEventListener('touchmove', touchMove);

        // Mouse events
        slide.addEventListener('mousedown', touchStart(index));
        slide.addEventListener('mouseup', touchEnd);
        slide.addEventListener('mouseleave', touchEnd);
        slide.addEventListener('mousemove', touchMove);
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            setPositionByIndex();
        });
    });

    function touchStart(index) {
        return function(event) {
            currentIndex = index;
            startPos = getPositionX(event);
            isDragging = true;
            animationID = requestAnimationFrame(animation);
            slider.classList.add('grabbing');
        }
    }

    function touchEnd() {
        isDragging = false;
        cancelAnimationFrame(animationID);
        const movedBy = currentTranslate - prevTranslate;

        if (movedBy < -100 && currentIndex < slides.length - 1) currentIndex += 1;
        if (movedBy > 100 && currentIndex > 0) currentIndex -= 1;

        setPositionByIndex();

        slider.classList.remove('grabbing');
    }

    function touchMove(event) {
        if (isDragging) {
            const currentPosition = getPositionX(event);
            currentTranslate = prevTranslate + currentPosition - startPos;
        }
    }

    function getPositionX(event) {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    }

    function animation() {
        setSliderPosition();
        if (isDragging) requestAnimationFrame(animation);
    }

    function setSliderPosition() {
        slider.style.transform = `translateX(${currentTranslate}px)`;
    }

    function setPositionByIndex() {
        currentTranslate = currentIndex * -sliderContainer.clientWidth;
        prevTranslate = currentTranslate;
        setSliderPosition();
        updateDots();
    }

    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    setPositionByIndex();
});

// quentity add 

document.addEventListener('DOMContentLoaded', (event) => {
  const minusButton = document.getElementById('minus');
  const plusButton = document.getElementById('plus');
  const quantityInput = document.getElementById('quantity');

  minusButton.addEventListener('click', () => {
      let currentValue = parseInt(quantityInput.value);
      if (currentValue > 1) {
          quantityInput.value = currentValue - 1;
      }
  });

  plusButton.addEventListener('click', () => {
      let currentValue = parseInt(quantityInput.value);
      quantityInput.value = currentValue + 1;
  });
});




// JavaScript to handle search functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const list = document.getElementById('list');

    searchInput.addEventListener('input', function() {
      const searchTerm = this.value.toLowerCase().trim();
      const items = list.getElementsByTagName('li');

      // Hide list if search term is empty
      if (searchTerm === '') {
        list.style.display = 'none';
        return;
      }

      // Filter list items based on search term
      Array.from(items).forEach(function(item) {
        const text = item.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });

      // Show list
      list.style.display = 'block';
    });
  });








// Function to handle button click
function handleButtonClick(size) {
  // Clear all buttons' background color
  document.querySelectorAll('.sizes button').forEach(button => {
    button.style.backgroundColor = '#f0f0f0';
  });

  // Set the selected button's background color to pink
  size.style.backgroundColor = 'pink';

  // Save selected size to local storage
  localStorage.setItem('selectedSize', size.id);
}

// Retrieve selected size from local storage on page load
document.addEventListener('DOMContentLoaded', function() {
  let selectedSize = localStorage.getItem('selectedSize');
  if (selectedSize) {
    // Highlight the previously selected button
    document.getElementById(selectedSize).style.backgroundColor = 'pink';
  }

  // Attach click event listeners to all buttons
  document.querySelectorAll('.sizes button').forEach(button => {
    button.addEventListener('click', function() {
      handleButtonClick(this);
    });
  });
});
