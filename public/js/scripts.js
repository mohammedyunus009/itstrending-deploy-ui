document.addEventListener('DOMContentLoaded', function () {
  const selectedFiltersContainer = document.getElementById('selectedFilters');
  const filterButtons = document.getElementById('filterButtons');
  const filterLinks = filterButtons.querySelectorAll('.list-group-item-action');
  const searchQualification = document.getElementById('searchQualification');
  const qualificationList = document.getElementById('qualificationList');
 
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
                    <label class="dropdown-item"><button type="button" class="btn btn-outline-primary btn-sm mb-1" name="caste" value="Brahmin">Brahmin</button></label>
                    <label class="dropdown-item"><button type="button" class="btn btn-outline-primary btn-sm mb-1" name="caste" value="Kshatriya">Kshatriya</button></label>
                    <label class="dropdown-item"><button type="button" class="btn btn-outline-primary btn-sm mb-1" name="caste" value="Vaishya">Vaishya</button></label>
                    <label class="dropdown-item"><button type="button" class="btn btn-outline-primary btn-sm mb-1" name="caste" value="Shudra">Shudra</button></label>
                </div>
            </div>
        </div>
        <label class="dropdown-item"><button type="button" class="btn btn-outline-primary btn-sm mb-1" name="caste" value="Muslim">Muslim</button></label>
        <label class="dropdown-item"><button type="button" class="btn btn-outline-primary btn-sm mb-1" name="caste" value="Christian">Christian</button></label>
    </div>
    `,
      Gender: `
      <div class="filter-section" id="Gender">
          <h5>Looking-For</h5>
          <button type="button" class="btn btn-outline-primary btn-sm mb-2" name="gender" value="Male">Groom</button>
          <button type="button" class="btn btn-outline-primary btn-sm mb-2" name="gender" value="Female">Bride</button>
      </div>
      `,
      Personality: `
      <div class="filter-section" id="Personality">
          <h5>Personality</h5>
          <button type="button" class="btn btn-outline-primary btn-sm mb-2" name="height" value="5-5.5">Height: 5' - 5'5"</button>
          <button type="button" class="btn btn-outline-primary btn-sm mb-2" name="height" value="5.5-6">Height: 5'5" - 6'</button>
                    <button type="button" class="btn btn-outline-primary btn-sm mb-2" name="height" value="5.5-6">Height: 6 - Above</button>

      </div>
      `,
      Weight: `
      <div class="filter-section" id="Weight">
          <h5>Weight</h5>
          <button type="button" class="btn btn-outline-primary btn-sm mb-2" name="weight" value="50-60">Weight: 50-60kg</button>
          <button type="button" class="btn btn-outline-primary btn-sm mb-2" name="weight" value="60-70">Weight: 60-70kg</button>
      </div>
      `,
      Age: `
      <div class="filter-section" id="Age">
          <h5>Age</h5>
          <button type="button" class="btn btn-outline-primary btn-sm mb-2" name="age" value="20-23">20 To 23</button>
          <button type="button" class="btn btn-outline-primary btn-sm mb-2" name="age" value="23-25">23 To 25</button>
          <button type="button" class="btn btn-outline-primary btn-sm mb-2" name="age" value="25-27">25 To 27</button>
          <button type="button" class="btn btn-outline-primary btn-sm mb-2" name="age" value="27+">27 And Above</button>
      </div>
      `,
      Tongue: `
      <div class="filter-section" id="Tongue">
          <h5>  Mother-Toungue</h5>
          <button type="button" class="btn btn-outline-primary btn-sm mb-2" name="tongue" value="Kannada">Kannada</button>
          <button type="button" class="btn btn-outline-primary btn-sm mb-2" name="tongue" value="Telugu">Telugu</button>
          <button type="button" class="btn btn-outline-primary btn-sm mb-2" name="tongue" value="Tamil">Tamil</button>
          <button type="button" class="btn btn-outline-primary btn-sm mb-2" name="tongue" value="Urdu">Urdu</button>
          <button type="button" class="btn btn-outline-primary btn-sm mb-2" name="tongue" value="Hindi">Hindi</button>
          <button type="button" class="btn btn-outline-primary btn-sm mb-2" name="tongue" value="Others">Others</button>
      </div>
      `,
      Qualification: `
      <div class="filter-section" id="Qualification">
          <h5>Qualification</h5>
          <input type="text" class="form-control mb-2" id="searchQualification" placeholder="Search qualification...">
          <div id="qualificationList">
              <button type="button" class="btn btn-outline-primary btn-sm mb-2" name="qualification" value="2nd PUC">2nd PUC</button>
              <button type="button" class="btn btn-outline-primary btn-sm mb-2" name="qualification" value="BE">BE</button>
              <button type="button" class="btn btn-outline-primary btn-sm mb-2" name="qualification" value="MBBS">MBBS</button>
              <button type="button" class="btn btn-outline-primary btn-sm mb-2" name="qualification" value="Bcom">Bcom</button>
              <button type="button" class="btn btn-outline-primary btn-sm mb-2" name="qualification" value="BBA">BBA</button>
              <button type="button" class="btn btn-outline-primary btn-sm mb-2" name="qualification" value="Others">Others</button>
          </div>
      </div>
      `,
      Marital: `
      <div class="filter-section" id="Marital">
          <h5>Marital Status</h5>
          <button type="button" class="btn btn-outline-primary btn-sm mb-2" name="marital" value="Single">Single</button>
          <button type="button" class="btn btn-outline-primary btn-sm mb-2" name="marital" value="Divorced">Divorced</button>
          <button type="button" class="btn btn-outline-primary btn-sm mb-2" name="marital" value="Married">Married</button>
      </div>
      `,
      Country: `
      <div class="filter-section" id="Country">
          <h5>Country</h5>
          <button type="button" class="btn btn-outline-primary btn-sm mb-2" name="country" value="India">India</button>
          <button type="button" class="btn btn-outline-primary btn-sm mb-2" name="country" value="Pakistan">Pakistan</button>
          <button type="button" class="btn btn-outline-primary btn-sm mb-2" name="country" value="America">America</button>
          <button type="button" class="btn btn-outline-primary btn-sm mb-2" name="country" value="Others">Others</button>
      </div>
      `,
    
      Job: `
      <div class="filter-section" id="Job">
          <h5>Job/Business</h5>
          <button type="button" class="btn btn-outline-primary btn-sm mb-2" name="job" value="Engineer">Engineer</button>
          <button type="button" class="btn btn-outline-primary btn-sm mb-2" name="job" value="Doctor">Doctor</button>
                    <button type="button" class="btn btn-outline-primary btn-sm mb-2" name="job" value="Doctor">JOB</button>

          <button type="button" class="btn btn-outline-primary btn-sm mb-2" name="job" value="Business">Business</button>
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

                // Add search functionality to the dropdown
                searchCaste.addEventListener('input', function () {
                    casteList.style.display = 'block';
                    const searchTerm = this.value.toLowerCase();
                    const items = casteList.querySelectorAll('.dropdown-item');
                    items.forEach(item => {
                        const button = item.querySelector('button');
                        if (button.textContent.toLowerCase().includes(searchTerm)) {
                            item.style.display = '';
                        } else {
                            item.style.display = 'none';
                        }
                    });
                });

                // Hide dropdown when clicking outside
                document.addEventListener('click', function (event) {
                    if (!hinduDropdown.contains(event.target) && !dropdownMenu.contains(event.target)) {
                        dropdownMenu.style.display = 'none';
                        casteList.style.display = 'none';
                    }
                });
            }
            // Qualification
            searchQualification.addEventListener('input', function () {
                const searchTerm = this.value.toLowerCase();
                const buttons = qualificationList.querySelectorAll('button');
            
                buttons.forEach(button => {
                    if (button.textContent.toLowerCase().includes(searchTerm)) {
                        button.style.display = '';
                    } else {
                        button.style.display = 'none';
                    }
                });
            });
            // Style buttons with background color and hover effects
            const buttons = document.querySelectorAll(`#${filterType} button.btn`);
            buttons.forEach(button => {
                button.style.backgroundColor = 'white'; // Set initial background color to white
                button.style.color = 'black'; // Set initial text color to black
                button.style.marginRight = '5px'; // Add margin between buttons

                // Change background color to black and text color to white on hover
                button.addEventListener('mouseenter', function() {
                    button.style.backgroundColor = 'black';
                    button.style.color = 'white';
                });

                // Reset background color and text color on mouse leave
                button.addEventListener('mouseleave', function() {
                    button.style.backgroundColor = 'white';
                    button.style.color = 'black';
                });
            });
        });
    });
});