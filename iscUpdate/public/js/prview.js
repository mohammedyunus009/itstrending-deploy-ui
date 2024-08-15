function goBack() {
    window.history.back();
}

function continueToFilters() {
    window.location.href = "filter.html";
}

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
    document.getElementById("coordinator-name").innerText = decodeURIComponent(getCookie("field1"));
    document.getElementById("profile-status").innerText = decodeURIComponent(getCookie("field2"));
    document.getElementById("revert").innerText = decodeURIComponent(getCookie("field9"));
    document.getElementById("gender").innerText = decodeURIComponent(getCookie("gender"));
    document.getElementById("caste").innerText = decodeURIComponent(getCookie("field1"));
    document.getElementById("follow").innerText = decodeURIComponent(getCookie("field2"));
    document.getElementById("phoneNumber").innerText = decodeURIComponent(getCookie("field10"));
    document.getElementById("nativeLanguage").innerText = decodeURIComponent(getCookie("field11"));
    document.getElementById("residenceLanguage").innerText = decodeURIComponent(getCookie("field13"));
    document.getElementById("country").innerText = decodeURIComponent(getCookie("field14"));
    document.getElementById("state").innerText = decodeURIComponent(getCookie("field3"));
    document.getElementById("city").innerText = decodeURIComponent(getCookie("field15"));
    document.getElementById("address").innerText = decodeURIComponent(getCookie("field16"));
    document.getElementById("maritalStatus").innerText = decodeURIComponent(getCookie("field6"));
    document.getElementById("children").innerText = decodeURIComponent(getCookie("field17"));
    document.getElementById("height").innerText = decodeURIComponent(getCookie("field18"));
    document.getElementById("weight").innerText = decodeURIComponent(getCookie("field19"));
    document.getElementById("aboutMe").innerText = decodeURIComponent(getCookie("field20"));
    document.getElementById("aboutFamily").innerText = decodeURIComponent(getCookie("field21"));
    document.getElementById("fatherName").innerText = decodeURIComponent(getCookie("field22"));
    document.getElementById("fatherOccupation").innerText = decodeURIComponent(getCookie("field23"));
    document.getElementById("motherName").innerText = decodeURIComponent(getCookie("field24"));
    document.getElementById("motherOccupation").innerText = decodeURIComponent(getCookie("field25"));
    document.getElementById('numberOfBrothers').textContent = decodeURIComponent(getCookie('field39'));
    document.getElementById('numberOfSisters').textContent = decodeURIComponent(getCookie('field40'));
    document.getElementById("education").innerText = decodeURIComponent(getCookie("field4"));
    document.getElementById("salaryRange").innerText = decodeURIComponent(getCookie("field26"));
    document.getElementById("profession").innerText = decodeURIComponent(getCookie("field27"));
    document.getElementById("businessType").innerText = decodeURIComponent(getCookie("field5"));
    document.getElementById("Working").innerText = decodeURIComponent(getCookie("field33"));
    document.getElementById("Caste").innerText = decodeURIComponent(getCookie("field34"));
    document.getElementById("Education").innerText = decodeURIComponent(getCookie("field35"));
    document.getElementById("Location").innerText = decodeURIComponent(getCookie("field36"));
    document.getElementById("FOLLOW").innerText = decodeURIComponent(getCookie("field37"));
    document.getElementById("Personal").innerText = decodeURIComponent(getCookie("field38"));

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
        if (imageUrls.length > 0) {
            profilePhotoDiv.style.backgroundImage = `url('${imageUrls[index]}')`;
        }
    }

    // Initialize variables
    const profilePhotoDiv = document.getElementById('profilePhoto');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const imageUrls = getImageUrls();
    let currentIndex = 0;

    // Set initial image
    updateImage(currentIndex);

    // Event listeners for navigation buttons
    prevButton.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + imageUrls.length) % imageUrls.length;
        updateImage(currentIndex);
    });

    nextButton.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % imageUrls.length;
        updateImage(currentIndex);
    });
});





// Function to get a cookie by name
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// Extract values from cookies (field1 to field50)
const field1 = getCookie('field1');
const field2 = getCookie('field2');
const field3 = getCookie('field3');
const field4 = getCookie('field4');
const field5 = getCookie('field5');
const field6 = getCookie('field6');
const field7 = getCookie('field7');
const field8 = getCookie('field8');
const field9 = getCookie('field9');
const field10 = getCookie('field10');
const field11 = getCookie('field11');
const field12 = getCookie('');
const field13 = getCookie('field13');
const field14 = getCookie('field14');
const field15 = getCookie('field15');
const field16 = getCookie('field16');
const field17 = getCookie('field17');
const field18 = getCookie('field18');
const field19 = getCookie('field19');
const field20 = getCookie('field20');
const field21 = getCookie('field21');
const field22 = getCookie('field22');
const field23 = getCookie('field23');
const field24 = getCookie('field24');
const field25 = getCookie('field25');
const field26 = getCookie('field26');
const field27 = getCookie('field27');
const field28 = getCookie('field28');
const field29 = getCookie('field29');
const field30 = getCookie('field30');
const field31 = getCookie('field31');
const field32 = getCookie('field32');
const field33 = getCookie('field33');
const field34 = getCookie('field34');
const field35 = getCookie('field35');
const field36 = getCookie('field36');
const field37 = getCookie('field37');
const field38 = getCookie('field38');
const field39 = getCookie('field39');
const field40 = getCookie('field40');
const field41 = getCookie('');
const field42 = getCookie('');
const field43 = getCookie('');
const field44 = getCookie('');
const field45 = getCookie('');
const field46 = getCookie('');
const field47 = getCookie('');
const field48 = getCookie('');
const field49 = getCookie('');
const field50 = getCookie('');

// Extract images from cookies
const images = [];
for (let i = 0; i < 6; i++) {
    let img = getCookie(`images${i}`);
    if (img) images.push(img);
}

// Extract authToken from cookies
const authToken = getCookie('token');

// Extract gender from cookies
const gender = getCookie('gender') || "male"; // Default to 'male' if not found

// Construct the request body
const requestBody = {
    "profile_id": "1",
    "description": "Rajesh",
    "gender": gender,
    "images": images,
    "bio": "There are many factors that contribute to a satisfying marriage/relationship such as; Love, Commitment, Trust, Time, Attention, Good Communication including Listening, Partnership, Tolerance, Patience, Openness, Honesty, Respect, Sharing, Consideration, Generosity, Willingness/Ability to Compromise, Constructive",
    "field1": field1 || "",
    "field2": field2 || "",
    "field3": field3 || "",
    "field4": field4 || "",
    "field5": field5 || "",
    "field6": field6 || "",
    "field7": field7 || "",
    "field8": field8 || "",
    "field9": field9 || "",
    "field10": field10 || "",
    "field11": field11 || "",
    "field12": field12 || "",
    "field13": field13 || "",
    "field14": field14 || "",
    "field15": field15 || "",
    "field16": field16 || "",
    "field17": field17 || "",
    "field18": field18 || "",
    "field19": field19 || "",
    "field20": field20 || "",
    "field21": field21 || "",
    "field22": field22 || "",
    "field23": field23 || "",
    "field24": field24 || "",
    "field25": field25 || "",
    "field26": field26 || "",
    "field27": field27 || "",
    "field28": field28 || "",
    "field29": field29 || "",
    "field30": field30 || "",
    "field31": field31 || "",
    "field32": field32 || "",
    "field33": field33 || "",
    "field34": field34 || "",
    "field35": field35 || "",
    "field36": field36 || "",
    "field37": field37 || "",
    "field38": field38 || "",
    "field39": field39 || "",
    "field40": field40 || "",
    "field41": field41 || "",
    "field42": field42 || "",
    "field43": field43 || "",
    "field44": field44 || "",
    "field45": field45 || "",
    "field46": field46 || "",
    "field47": field47 || "",
    "field48": field48 || "",
    "field49": field49 || "",
    "field50": field50 || ""
};

console.log(requestBody);

        // Send POST request
        fetch('https://api.itstrending.in:5000/api/v1/profiles', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authToken // Include the authToken directly in the Authorization header
            },
            body: JSON.stringify(requestBody)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });


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


