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
            <input type="text" class="form-control mb-2" id="searchQualification" placeholder="Search qualification...">
            <div class="row">
                <div class="col-12">
                    <button type="button" class="btn btn-dark btn-sm mb-1 btn-block" name="caste" value="Hindhu">Hindhu</button>
                </div>
                <div class="col-12">
                    <button type="button" class="btn btn-dark btn-sm mb-1 btn-block" name="caste" value="Muslim">Muslim</button>
                </div>
                <div class="col-12">
                    <button type="button" class="btn btn-dark btn-sm mb-1 btn-block" name="caste" value="Christian">Christian</button>
                </div>
            </div>
        </div>
    `,
    Gender: `
        <div class="filter-section" id="Gender">
            <h5>Gender</h5>
            <div class="row">
                <div class="col-12">
                    <button type="button" class="btn btn-dark btn-sm mb-2 btn-block" name="gender" value="Male">Male</button>
                </div>
                <div class="col-12">
                    <button type="button" class="btn btn-dark btn-sm mb-2 btn-block" name="gender" value="Female">Female</button>
                </div>
            </div>
        </div>
    `,
    Personality: `
        <div class="filter-section" id="Personality">
            <h5>Personality</h5>
            <div class="row">
                <div class="col-12">
                    <button type="button" class="btn btn-dark btn-sm mb-2 btn-block" name="height" value="5-5.5">Height: 5' - 5'5"</button>
                </div>
                <div class="col-12">
                    <button type="button" class="btn btn-dark btn-sm mb-2 btn-block" name="height" value="5.5-6">Height: 5'5" - 6'</button>
                </div>
                <div class="col-12">
                    <button type="button" class="btn btn-dark btn-sm mb-2 btn-block" name="height" value="6-Above">Height: 6' - Above</button>
                </div>
            </div>
        </div>
    `,
    Age: `
        <div class="filter-section" id="Age">
            <h5>Age</h5>
            <div class="row">
                <div class="col-12">
                    <button type="button" class="btn btn-dark btn-sm mb-2 btn-block" name="age" value="20-23">20 To 23</button>
                </div>
                <div class="col-12">
                    <button type="button" class="btn btn-dark btn-sm mb-2 btn-block" name="age" value="23-25">23 To 25</button>
                </div>
                <div class="col-12">
                    <button type="button" class="btn btn-dark btn-sm mb-2 btn-block" name="age" value="25-27">25 To 27</button>
                </div>
                <div class="col-12">
                    <button type="button" class="btn btn-dark btn-sm mb-2 btn-block" name="age" value="27+">27 And Above</button>
                </div>
            </div>
        </div>
    `,
    Tongue: `
        <div class="filter-section" id="Tongue">
            <h5>Mother-Tongue</h5>
            <div class="row">
                <div class="col-12">
                    <button type="button" class="btn btn-dark btn-sm mb-2 btn-block" name="tongue" value="Kannada">Kannada</button>
                </div>
                <div class="col-12">
                    <button type="button" class="btn btn-dark btn-sm mb-2 btn-block" name="tongue" value="Telugu">Telugu</button>
                </div>
                <div class="col-12">
                    <button type="button" class="btn btn-dark btn-sm mb-2 btn-block" name="tongue" value="Tamil">Tamil</button>
                </div>
                <div class="col-12">
                    <button type="button" class="btn btn-dark btn-sm mb-2 btn-block" name="tongue" value="Urdu">Urdu</button>
                </div>
                <div class="col-12">
                    <button type="button" class="btn btn-dark btn-sm mb-2 btn-block" name="tongue" value="Hindi">Hindi</button>
                </div>
                <div class="col-12">
                    <button type="button" class="btn btn-dark btn-sm mb-2 btn-block" name="tongue" value="Others">Others</button>
                </div>
            </div>
        </div>
    `,
    Qualification: `
        <div class="filter-section" id="Qualification">
            <h5>Qualification</h5>
            <input type="text" class="form-control mb-2" id="searchQualification" placeholder="Search qualification...">
            <div class="row">
                <div class="col-12">
                    <button type="button" class="btn btn-dark btn-sm mb-2 btn-block" name="qualification" value="2nd PUC">2nd PUC</button>
                </div>
                <div class="col-12">
                    <button type="button" class="btn btn-dark btn-sm mb-2 btn-block" name="qualification" value="BE">BE</button>
                </div>
                <div class="col-12">
                    <button type="button" class="btn btn-dark btn-sm mb-2 btn-block" name="qualification" value="MBBS">MBBS</button>
                </div>
                <div class="col-12">
                    <button type="button" class="btn btn-dark btn-sm mb-2 btn-block" name="qualification" value="Bcom">Bcom</button>
                </div>
                <div class="col-12">
                    <button type="button" class="btn btn-dark btn-sm mb-2 btn-block" name="qualification" value="BBA">BBA</button>
                </div>
                <div class="col-12">
                    <button type="button" class="btn btn-dark btn-sm mb-2 btn-block" name="qualification" value="Others">Others</button>
                </div>
            </div>
        </div>
    `,
    Marital: `
        <div class="filter-section" id="Marital">
            <h5>Marital Status</h5>
            <div class="row">
                <div class="col-12">
                    <button type="button" class="btn btn-dark btn-sm mb-2 btn-block" name="marital" value="Single">Single</button>
                </div>
                <div class="col-12">
                    <button type="button" class="btn btn-dark btn-sm mb-2 btn-block" name="marital" value="Divorced">Divorced</button>
                </div>
            </div>
        </div>
    `,
    Job: `
        <div class="filter-section" id="Job">
            <h5>Job/Business</h5>
            <input type="text" class="form-control mb-2" id="searchJob" placeholder="Search job...">
            <div class="row">
                <div class="col-12">
                    <button type="button" class="btn btn-dark btn-sm mb-2 btn-block" name="job" value="Engineer">Engineer</button>
                </div>
                <div class="col-12">
                    <button type="button" class="btn btn-dark btn-sm mb-2 btn-block" name="job" value="Doctor">Doctor</button>
                </div>
                <div class="col-12">
                    <button type="button" class="btn btn-dark btn-sm mb-2 btn-block" name="job" value="Job">JOB</button>
                </div>
                <div class="col-12">
                    <button type="button" class="btn btn-dark btn-sm mb-2 btn-block" name="job" value="Business">Business</button>
                </div>
            </div>
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

        // Add event listener for all filter buttons within the selected filter section
        document.querySelectorAll(`#${filterType} button`).forEach(button => {
            button.addEventListener('click', function () {
                const filterName = this.getAttribute('name');
                const filterValue = this.getAttribute('value');

                // If there's already a selected filter for this filterName, remove its selected state
                if (selectedFilters[filterName]) {
                    document.querySelectorAll(`button[name="${filterName}"]`).forEach(btn => {
                        btn.style.backgroundColor = ''; // Reset button color
                    });
                }

                // Toggle selected state
                if (selectedFilters[filterName] === filterValue) {
                    delete selectedFilters[filterName];
                    this.style.backgroundColor = ''; // Reset button color
                } else {
                    selectedFilters[filterName] = filterValue;
                    this.style.backgroundColor = 'gray'; // Change button color
                }

                // Update selected filters display
                updateSelectedFiltersDisplay();

               
               
            });
        });
    });
});



});