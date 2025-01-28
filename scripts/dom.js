const browser = chrome || browser;

function insertCounterButton() {
  const imageUrl = browser.runtime.getURL('images/icon-32.png');

  const button = document.createElement('div');
  button.id = 'tree-counter-button';

  const counterContainer = document.createElement('div');
  counterContainer.id = 'counter-container';

  const icon = document.createElement('img');
  icon.src = imageUrl;
  icon.alt = 'Tree Icon';

  const treeCounterText = document.createElement('span');
  treeCounterText.id = 'tree-counter-text';
  treeCounterText.textContent = '0';

  counterContainer.appendChild(icon);
  counterContainer.appendChild(treeCounterText);

  const progressContainer = document.createElement('div');
  progressContainer.id = 'progress-container';

  const progressBar = document.createElement('div');
  progressBar.id = 'progress-bar';
  progressContainer.appendChild(progressBar);

  button.appendChild(counterContainer);
  button.appendChild(progressContainer);

  const targetElement = document.querySelector('.notifications.main-header__notifications') 
    || document.querySelector('.main-nav.main-header__nav');

  if (targetElement) {
    targetElement.parentNode.insertBefore(button, targetElement);
  }

  const popover = document.createElement('div');
  popover.id = 'tree-counter-popover';
  popover.classList.add('hidden');

  const popoverContent = document.createElement('div');
  popoverContent.classList.add('popover-content');

  const details = document.createElement('li');
  details.classList.add('popover-info', 'divider-bottom');
  
  const detailsText = document.createElement('span');
  detailsText.classList.add('popover-section-text');
  detailsText.textContent = 'Details';
  
  const detailsList = document.createElement('ul');
  
  const treeCountItem = document.createElement('li');
  treeCountItem.innerHTML = `<span class="popover-data-text">Tree counter:</span> <span id="tree-counter-text">0</span>`;
  
  const searchCountItem = document.createElement('li');
  searchCountItem.innerHTML = `<span class="popover-data-text">Search counter:</span> <span id="search-counter-text">0</span> <span>(ad present)</span>`;
  
  detailsList.appendChild(treeCountItem);
  detailsList.appendChild(searchCountItem);
  details.appendChild(detailsText);
  details.appendChild(detailsList);

  popoverContent.appendChild(details);

  const warning = document.createElement('li');
  warning.classList.add('popover-warning');

  const warningText = document.createElement('span');
  warningText.classList.add('popover-section-text');
  warningText.textContent = 'Warning';

  const warningList = document.createElement('ul');

  const warningItem = document.createElement('li');
  warningItem.textContent = 'Trees planted counter is an approximation, the real number may vary dramatically from Ecosia\'s expenditure.';

  warningList.appendChild(warningItem);
  warning.appendChild(warningText);
  warning.appendChild(warningList);

  popoverContent.appendChild(warning);

  popover.appendChild(popoverContent);
  document.body.appendChild(popover);

  button.addEventListener('click', (event) => {
    const isVisible = popover.classList.contains('show');
    if (isVisible) {
      togglePopover(popover, false);
    } else {
      togglePopover(popover, true);
      positionPopover(button, popover);
    }
    event.stopPropagation(); 
  });

  document.addEventListener('click', (event) => {
    const isVisible = popover.classList.contains('show');
    if (isVisible && !popover.contains(event.target) && !button.contains(event.target)) {
      togglePopover(popover, false);
    }
  });
}

function updateCounterDisplay(treeCount, searchCount, progressPercentage) {
  const treeCounters = document.querySelectorAll('#tree-counter-text');
  const searchCounter = document.getElementById('search-counter-text');
  const progressBar = document.getElementById('progress-bar');

  if (treeCounters.length) {
    treeCounters.forEach((counter) => {
      counter.textContent = `${treeCount}`;
    })
  }

  if (searchCounter) {
    searchCounter.textContent = `${searchCount}`;
  }

  if (progressBar) {
    progressBar.style.width = `${progressPercentage}%`;
  }
}

function togglePopover(popover, shouldShow) {
  if (shouldShow) {
    popover.classList.remove('hidden');
    setTimeout(() => {
      popover.classList.add('show');
    }, 10);
  } else {
    popover.classList.remove('show');
    setTimeout(() => {
      popover.classList.add('hidden');
    }, 300);
  }
}

function positionPopover(button, popover) {
  const buttonRect = button.getBoundingClientRect();
  popover.style.top = `${(buttonRect.bottom + 12) + window.scrollY}px`;
  popover.style.left = `${(buttonRect.left - 169) + window.scrollX}px`;
}
