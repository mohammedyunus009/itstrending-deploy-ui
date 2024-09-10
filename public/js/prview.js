function goBack() {
    window.history.back();
}

// function continueToFilters() {
//     window.location.href = "filter.html";
// }

/// Function to get a cookie value or return "N/A" if not found
function getCookie(name) {
    let cookieArr = document.cookie.split(";");
    for (let i = 0; i < cookieArr.length; i++) {
        let cookiePair = cookieArr[i].split("=");
        if (name == cookiePair[0].trim()) {
            let value = decodeURIComponent(cookiePair[1]);
            return value ? value : "N/A";
        }
    }
    return "N/A";
}

// Function to create sibling fields
function createSiblingFields(containerId, numberOfSiblings, siblingType) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    for (let i = 1; i <= numberOfSiblings; i++) {
        const siblingContainer = document.createElement('div');
        siblingContainer.className = 'sibling-details';

        const siblingOccupation = document.createElement('div');
        siblingOccupation.className = 'detail-item';
        siblingOccupation.innerHTML = `<label>${siblingType} ${i} Occupation:</label><span id="${siblingType.toLowerCase()}${i}Occupation"></span>`;
        siblingContainer.appendChild(siblingOccupation);

        const siblingMaritalStatus = document.createElement('div');
        siblingMaritalStatus.className = 'detail-item';
        siblingMaritalStatus.innerHTML = `<label>${siblingType} ${i} Marital Status:</label><span id="${siblingType.toLowerCase()}${i}MaritalStatus"></span>`;
        siblingContainer.appendChild(siblingMaritalStatus);

        container.appendChild(siblingContainer);
    }
}




document.addEventListener("DOMContentLoaded", function () {
    // Fetch the data from cookies, decode it, and set it to the respective fields
    document.getElementById("coordinator-name").innerText = decodeURIComponent(getCookie("field10"));
    document.getElementById("coordinator-number").innerText = decodeURIComponent(getCookie("field41"));
    document.getElementById("profile-status").innerText = decodeURIComponent(getCookie("field11"));
    document.getElementById("on-hold-reason").innerText = decodeURIComponent(getCookie("field13"));
    document.getElementById("slno").innerText = decodeURIComponent(getCookie("field1"));
    document.getElementById("name").innerText = decodeURIComponent(getCookie("field5"));
    document.getElementById("gender").innerText = decodeURIComponent(getCookie("gender"));
    document.getElementById("age").innerText = decodeURIComponent(getCookie("field6"));
    document.getElementById("height").innerText = decodeURIComponent(getCookie("field14"));
    document.getElementById("family-subcaste").innerText = decodeURIComponent(getCookie("field8"));
    document.getElementById("follow").innerText = decodeURIComponent(getCookie("field4"));
    document.getElementById("marital-status").innerText = decodeURIComponent(getCookie("field3"));
    document.getElementById("marital-tenure").innerText = decodeURIComponent(getCookie("field15"));
    document.getElementById("children").innerText = decodeURIComponent(getCookie("field16"));
    // document.getElementById("divorce-document").innerText = decodeURIComponent(getCookie("field17")) || "N/A";
    document.getElementById("education").innerText = decodeURIComponent(getCookie("field2"));
    document.getElementById("profession").innerText = decodeURIComponent(getCookie("field9"));
    document.getElementById("company").innerText = decodeURIComponent(getCookie("field18"));
    document.getElementById("job-location").innerText = decodeURIComponent(getCookie("field19"));
    document.getElementById("home-address").innerText = decodeURIComponent(getCookie("field7"));
    document.getElementById("father-name").innerText = decodeURIComponent(getCookie("field20"));
    document.getElementById("father-occupation").innerText = decodeURIComponent(getCookie("field21"));
    document.getElementById("mother-name").innerText = decodeURIComponent(getCookie("field22"));
    document.getElementById("mother-occupation").innerText = decodeURIComponent(getCookie("field23"));
    document.getElementById("family-contact-number").innerText = decodeURIComponent(getCookie("field42"));
    document.getElementById("no-of-sisters").innerText = decodeURIComponent(getCookie("field24"));
    document.getElementById("sister-marital-status").innerText = decodeURIComponent(getCookie("field37"));
    document.getElementById('sister-occupation').textContent = decodeURIComponent(getCookie('field38'));
    document.getElementById('no-of-brothers').textContent = decodeURIComponent(getCookie('field25'));
    document.getElementById('brother-marital-status').textContent = decodeURIComponent(getCookie('field39'));
    document.getElementById('brother-occupation').textContent = decodeURIComponent(getCookie('field40'));
    document.getElementById('partner-caste').textContent = decodeURIComponent(getCookie('field26'));
    document.getElementById("partner-education").innerText = decodeURIComponent(getCookie("field27"));
    document.getElementById("partner-profession").innerText = decodeURIComponent(getCookie("field28"));
    document.getElementById("custom-age").innerText = decodeURIComponent(getCookie("field29"));
    document.getElementById("custom-height").innerText = decodeURIComponent(getCookie("field30"));
    document.getElementById("personal-attributes").innerText = decodeURIComponent(getCookie("field31"));
    document.getElementById("partner-follow").innerText = decodeURIComponent(getCookie("field32"));
    document.getElementById("family-type").innerText = decodeURIComponent(getCookie("field33"));
    document.getElementById("partner-location").innerText = decodeURIComponent(getCookie("field34"));
    document.getElementById("religious-attributes").innerText = decodeURIComponent(getCookie("field35"));
    document.getElementById("partner-working-status").innerText = decodeURIComponent(getCookie("field36"));

    if (numBrothers > 0) {
        showBrothersDetails(numBrothers);
    }

    if (numSisters > 0) {
        showSistersDetails(numSisters);
    }

    // Show children detail section if the marital status indicates there are children
    const maritalStatus = getCookie("maritalStatus");
    if (maritalStatus && maritalStatus.toLowerCase() === 'married' && getCookie("children")) {
        document.getElementById("childrenDetail").style.display = 'block';
    }
    // Create fields for brothers and sisters details
createSiblingFields('brothersDetailsContainer', getCookie('numberOfBrothers'), 'Brother');
createSiblingFields('sistersDetailsContainer', getCookie('numberOfSisters'), 'Sister');
});



// document.addEventListener('DOMContentLoaded', function() {
//     // Function to get a cookie by name
//     function getCookie(name) {
//         const value = `; ${document.cookie}`;
//         const parts = value.split(`; ${name}=`);
//         if (parts.length === 2) return parts.pop().split(';').shift();
//     }

//     // Get the image URL from the cookies
//     const imageUrl = getCookie('images0'); // Adjust the cookie name as needed

//     // Set the background image of the profilePhoto div
//     if (imageUrl) {
//         const profilePhotoDiv = document.getElementById('profilePhoto');
//         profilePhotoDiv.style.backgroundImage = `url('${imageUrl}')`;
//     }
// });


document.addEventListener('DOMContentLoaded', function() {
    // Function to get a cookie by name
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    // Function to get image URLs from cookies
    function getImageUrls() {
        const urls = [];
        for (let i = 0; i <= 5; i++) {
            const url = getCookie(`images${i}`);
            if (url) {
                urls.push(url);
            }
        }
        return urls;
    }

    // Function to update the background image
    function updateImage(index) {
        if (imagesUrls.length > 0) {
            profilePhotoDiv.style.backgroundImage = `url('${imagesUrls[index]}')`;
        }
    }

    // Initialize variables
    const profilePhotoDiv = document.getElementById('profilePhoto');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const imagesUrls = getImageUrls();
    let currentIndex = 0;

    // Set initial image
    updateImage(currentIndex);

    // Event listeners for navigation buttons
    prevButton.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + imagesUrls.length) % imagesUrls.length;
        updateImage(currentIndex);
    });

    nextButton.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % imagesUrls.length;
        updateImage(currentIndex);
    });
});




// Function to get a cookie by name
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// Function to get image URLs from cookies
function getImageUrls() {
    const urls = [];
    for (let i = 0; i <= 11; i++) { // Updated to go up to images11
        const url = getCookie(`images${i}`);
        if (url) {
            urls.push(url);
        }
    }
    return urls;
}

// Function to update the background image
function updateImage(index) {
    if (imagesUrls.length > 0) {
        profilePhotoDiv.style.backgroundImage = `url('${imagesUrls[index]}')`;
    }
}

// Initialize variables
const profilePhotoDiv = document.getElementById('profilePhoto');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const imagesUrls = getImageUrls();
let currentIndex = 0;

// Set initial image
updateImage(currentIndex);

// Event listeners for navigation buttons
prevButton.addEventListener('click', function() {
    currentIndex = (currentIndex - 1 + imagesUrls.length) % imagesUrls.length;
    updateImage(currentIndex);
});

nextButton.addEventListener('click', function() {
    currentIndex = (currentIndex + 1) % imagesUrls.length;
    updateImage(currentIndex);
});

function continueToFilters() {
    // Construct the request body
    const requestBody = {
    "profile_id": "1",
    "description": "Rajesh",
    "gender": getCookie('gender') || "male", // Default to 'male' if not found
    "images": getImageUrls(), // Updated to include images0 to images11
    "bio": "There are many factors that contribute to a satisfying marriage/relationship such as; Love, Commitment, Trust, Time, Attention, Good Communication including Listening, Partnership, Tolerance, Patience, Openness, Honesty, Respect, Sharing, Consideration, Generosity, Willingness/Ability to Compromise, Constructive",
    // Include other fields from cookies
    "field1": getCookie('field1') || "",
    "field2": getCookie('field2') || "",
    "field3": getCookie('field3') || "",
    "field4": getCookie('field4') || "",
    "field5": getCookie('field5') || "",
    "field6": getCookie('field6') || "",
    "field7": getCookie('field7') || "",
    "field8": getCookie('field8') || "",
    "field9": getCookie('field9') || "",
    "field10": getCookie('field10') || "",
    "field11": getCookie('field11') || "",
    "field12": getCookie('field12') || "",
    "field13": getCookie('field13') || "",
    "field14": getCookie('field14') || "",
    "field15": getCookie('field15') || "",
    "field16": getCookie('field16') || "",
    "field17": getCookie('field17') || "",
    "field18": getCookie('field18') || "",
    "field19": getCookie('field19') || "",
    "field20": getCookie('field20') || "",
    "field21": getCookie('field21') || "",
    "field22": getCookie('field22') || "",
    "field23": getCookie('field23') || "",
    "field24": getCookie('field24') || "",
    "field25": getCookie('field25') || "",
    "field26": getCookie('field26') || "",
    "field27": getCookie('field27') || "",
    "field28": getCookie('field28') || "",
    "field29": getCookie('field29') || "",
    "field30": getCookie('field30') || "",
    "field31": getCookie('field31') || "",
    "field32": getCookie('field32') || "",
    "field33": getCookie('field33') || "",
    "field34": getCookie('field34') || "",
    "field35": getCookie('field35') || "",
    "field36": getCookie('field36') || "",
    "field37": getCookie('field37') || "",
    "field38": getCookie('field38') || "",
    "field39": getCookie('field39') || "",
    "field40": getCookie('field40') || "",
    "field41": getCookie('field41') || "",
    "field42": getCookie('field42') || "",
    "field43": getCookie('field43') || "",
    "field44": getCookie('field44') || "",
    "field45": getCookie('field45') || "",
    "field46": getCookie('field46') || "",
    "field47": getCookie('field47') || "",
    "field48": getCookie('field48') || "",
    "field49": getCookie('field49') || "",
    "field50": getCookie('field50') || ""
};

// Confirm before sending the POST request
if (window.confirm("Are you sure you want to create your profile?")) {
    // If the user clicks "Yes", send POST request
    fetch('https://api.itstrending.in:5000/api/v1/profiles', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getCookie('token') // Include the authToken directly in the Authorization header
        },
        body: JSON.stringify(requestBody)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        // After successful submission, clear all cookies except "email" and "token"
        clearCookiesExcept(['email', 'token']);

        // Redirect to filters page after saving the profile
        window.location.href = "filter.html";
    })
    .catch((error) => {
        console.error('Error:', error);
    });
} else {
    // If the user clicks "No", do nothing
    console.log("Profile creation canceled.");
}
}

// Function to clear all cookies except the ones specified in the `exceptions` array
function clearCookiesExcept(exceptions) {
const cookies = document.cookie.split(";");

cookies.forEach(cookie => {
    const cookieName = cookie.split("=")[0].trim();

    // Clear the cookie if it's not in the exceptions array
    if (!exceptions.includes(cookieName)) {
        document.cookie = cookieName + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
});
}

        const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Replace * with your domain if possible
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Define your API endpoints here
app.get('/login', (req, res) => {
  // Handle API logic here
  res.send('API response');
});

// POST endpoint for profile creation
app.post('/api/v1/profiles', (req, res) => {
  const { profile_id, description, gender, images, bio, ...fields } = req.body;

  // Validate request body here if needed

  // Simulate saving profile data (you should replace this with your actual data handling logic)
  console.log('Profile Data:', { profile_id, description, gender, images, bio, ...fields });

  // Send response
  res.status(200).json({ success: true, message: 'Profile data received', data: req.body });
});

// Start your server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});


