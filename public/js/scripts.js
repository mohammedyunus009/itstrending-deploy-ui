document.addEventListener('DOMContentLoaded', function () {
    const selectedFiltersContainer = document.getElementById('selectedFilters');
    const filterButtons = document.getElementById('filterButtons');
    const filterLinks = filterButtons.querySelectorAll('.list-group-item-action');
    const searchQualification = document.getElementById('searchQualification');
    const qualificationList = document.getElementById('qualificationList');
  
    const selectedFilters = {}; // Object to store selected filters
  
    const filterOptions = {
      Religion: `
      <div class="filter-section" id="Religion">
          <h5>Religion</h5>
          <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle mb-2" type="button" id="hinduDropdown" aria-haspopup="true" aria-expanded="false">
                  Hindu
              </button>
              <div class="dropdown-menu" aria-labelledby="hinduDropdown" style="display: none;">
                  <input type="text" class="form-control" id="searchCaste" placeholder="Search caste...">
                  <div id="casteList" style="display: none;">
                      <label class="dropdown-item"><button type="button" class="btn btn-dark btn-sm mb-1" name="caste" value="Brahmin">Brahmin</button></label>
                      <label class="dropdown-item"><button type="button" class="btn btn-dark btn-sm mb-1" name="caste" value="Kshatriya">Kshatriya</button></label>
                      <label class="dropdown-item"><button type="button" class="btn btn-dark btn-sm mb-1" name="caste" value="Vaishya">Vaishya</button></label>
                      <label class="dropdown-item"><button type="button" class="btn btn-dark btn-sm mb-1" name="caste" value="Shudra">Shudra</button></label>
                  </div>
              </div>
          </div>
          <label class="dropdown-item"><button type="button" class="btn btn-dark btn-sm mb-1" name="caste" value="Muslim">Muslim</button></label>
          <label class="dropdown-item"><button type="button" class="btn btn-dark btn-sm mb-1" name="caste" value="Christian">Christian</button></label>
      </div>
      `,
      Gender: `
        <div class="filter-section" id="Gender">
            <h5>Looking-For</h5>
            <button type="button" class="btn btn-dark btn-sm mb-2" name="gender" value="Male">Groom</button>
            <button type="button" class="btn btn-dark btn-sm mb-2" name="gender" value="Female">Bride</button>
        </div>
        `,
      Personality: `
        <div class="filter-section" id="Personality">
            <h5>Personality</h5>
            <button type="button" class="btn btn-dark btn-sm mb-2" name="height" value="5-5.5">Height: 5' - 5'5"</button>
            <button type="button" class="btn btn-dark btn-sm mb-2" name="height" value="5.5-6">Height: 5'5" - 6'</button>
            <button type="button" class="btn btn-dark btn-sm mb-2" name="height" value="6-Above">Height: 6' - Above</button>
        </div>
        `,
      Age: `
        <div class="filter-section" id="Age">
            <h5>Age</h5>
            <button type="button" class="btn btn-dark btn-sm mb-2" name="age" value="20-23">20 To 23</button>
            <button type="button" class="btn btn-dark btn-sm mb-2" name="age" value="23-25">23 To 25</button>
            <button type="button" class="btn btn-dark btn-sm mb-2" name="age" value="25-27">25 To 27</button>
            <button type="button" class="btn btn-dark btn-sm mb-2" name="age" value="27+">27 And Above</button>
        </div>
        `,
      Tongue: `
        <div class="filter-section" id="Tongue">
            <h5>Mother-Tongue</h5>
            <button type="button" class="btn btn-dark btn-sm mb-2" name="tongue" value="Kannada">Kannada</button>
            <button type="button" class="btn btn-dark btn-sm mb-2" name="tongue" value="Telugu">Telugu</button>
            <button type="button" class="btn btn-dark btn-sm mb-2" name="tongue" value="Tamil">Tamil</button>
            <button type="button" class="btn btn-dark btn-sm mb-2" name="tongue" value="Urdu">Urdu</button>
            <button type="button" class="btn btn-dark btn-sm mb-2" name="tongue" value="Hindi">Hindi</button>
            <button type="button" class="btn btn-dark btn-sm mb-2" name="tongue" value="Others">Others</button>
        </div>
        `,
      Qualification: `
        <div class="filter-section" id="Qualification">
            <h5>Qualification</h5>
            <input type="text" class="form-control mb-2" id="searchQualification" placeholder="Search qualification...">
            <div id="qualificationList">
                <button type="button" class="btn btn-dark btn-sm mb-2" name="qualification" value="2nd PUC">2nd PUC</button>
                <button type="button" class="btn btn-dark btn-sm mb-2" name="qualification" value="BE">BE</button>
                <button type="button" class="btn btn-dark btn-sm mb-2" name="qualification" value="MBBS">MBBS</button>
                <button type="button" class="btn btn-dark btn-sm mb-2" name="qualification" value="Bcom">Bcom</button>
                <button type="button" class="btn btn-dark btn-sm mb-2" name="qualification" value="BBA">BBA</button>
                <button type="button" class="btn btn-dark btn-sm mb-2" name="qualification" value="Others">Others</button>
            </div>
        </div>
        `,
      Marital: `
        <div class="filter-section" id="Marital">
            <h5>Marital Status</h5>
            <button type="button" class="btn btn-dark btn-sm mb-2" name="marital" value="Single">Single</button>
            <button type="button" class="btn btn-dark btn-sm mb-2" name="marital" value="Divorced">Divorced</button>
        </div>
        `,
      Job: `
        <div class="filter-section" id="Job">
            <h5>Job/Business</h5>
            <input type="text" class="form-control mb-2" id="searchJob" placeholder="Search job...">
            <button type="button" class="btn btn-dark btn-sm mb-2" name="job" value="Engineer">Engineer</button>
            <button type="button" class="btn btn-dark btn-sm mb-2" name="job" value="Doctor">Doctor</button>
            <button type="button" class="btn btn-dark btn-sm mb-2" name="job" value="Job">JOB</button>
            <button type="button" class="btn btn-dark btn-sm mb-2" name="job" value="Business">Business</button>
        </div>
        `
    };
  
    filterLinks.forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        const filterType = this.getAttribute('data-filter');
  
        // Hide all other filter sections
        document.querySelectorAll('.filter-section').forEach(section => {
          section.style.display = 'none';
        });
  
        // Display the selected filter section
        if (!document.getElementById(filterType)) {
          selectedFiltersContainer.insertAdjacentHTML('beforeend', filterOptions[filterType]);
        }
        document.getElementById(filterType).style.display = 'block';
  
        // Initialize the dropdown functionality for Hindu button
        if (filterType === 'Religion') {
          const hinduDropdown = document.getElementById('hinduDropdown');
          const searchCaste = document.getElementById('searchCaste');
          const dropdownMenu = hinduDropdown.nextElementSibling;
          const casteList = document.getElementById('casteList');
  
          hinduDropdown.addEventListener('click', function () {
            dropdownMenu.style.display = 'block';
          });
  
          // Filter caste list based on search
          searchCaste.addEventListener('input', function () {
            const searchValue = searchCaste.value.toLowerCase();
            const castes = casteList.querySelectorAll('.dropdown-item');
  
            casteList.style.display = 'block';
  
            castes.forEach(caste => {
              const casteValue = caste.textContent.toLowerCase();
              caste.style.display = casteValue.includes(searchValue) ? 'block' : 'none';
            });
          });
        }
  
        // Add event listener for all filter buttons within the selected filter section
        document.querySelectorAll(`#${filterType} button`).forEach(button => {
          button.addEventListener('click', function () {
            const filterName = this.getAttribute('name');
            const filterValue = this.getAttribute('value');
  
            if (!selectedFilters[filterName]) {
              selectedFilters[filterName] = [];
            }
  
            if (!selectedFilters[filterName].includes(filterValue)) {
              selectedFilters[filterName].push(filterValue);
            }
  
            // Update selected filters display
            updateSelectedFiltersDisplay();
          });
        });
      });
    });
  
    // Function to update selected filters display
    function updateSelectedFiltersDisplay() {
      const selectedFiltersDisplay = document.getElementById('selectedFiltersDisplay');
      selectedFiltersDisplay.innerHTML = '';
  
      for (const [filterName, filterValues] of Object.entries(selectedFilters)) {
        const filterText = filterValues.join(', ');
        const filterElement = document.createElement('div');
        filterElement.textContent = `${filterName}: ${filterText}`;
        selectedFiltersDisplay.appendChild(filterElement);
      }
    }
  
    document.getElementById('submitButton').addEventListener('click', function () {
      alert(JSON.stringify(selectedFilters));
    });
  });
  