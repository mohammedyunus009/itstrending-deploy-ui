function goBack() {
    window.history.back();
}

function continueToFilters() {
    window.location.href = "payment.html";
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
    // Fetch the data from cookies and set it to the respective fields
    document.getElementById("name").innerText = getCookie("field1");
    document.getElementById("dob").innerText = getCookie("field2");
    document.getElementById("gender").innerText = getCookie("gender");
    document.getElementById("caste").innerText = getCookie("field4");
    document.getElementById("follow").innerText = getCookie("field5");
    document.getElementById("phoneNumber").innerText = getCookie("field6");
    document.getElementById("nativeLanguage").innerText = getCookie("field7");
    document.getElementById("residenceLanguage").innerText = getCookie("field8");
    // document.getElementById("Hobbies").innerText = getCookie("field8");
    document.getElementById("country").innerText = getCookie("field9");
    document.getElementById("state").innerText = getCookie("field10");
    document.getElementById("city").innerText = getCookie("field11");
    document.getElementById("address").innerText = getCookie("field12");
    document.getElementById("maritalStatus").innerText = getCookie("field13");
    document.getElementById("children").innerText = getCookie("field14");
    document.getElementById("height").innerText = getCookie("field15");
    document.getElementById("weight").innerText = getCookie("field16");
    document.getElementById("aboutMe").innerText = getCookie("field17");
    document.getElementById("aboutFamily").innerText = getCookie("field18");
    // document.getElementById("familyType").innerText = getCookie("field19");
    document.getElementById("fatherName").innerText = getCookie("field19");
    document.getElementById("fatherOccupation").innerText = getCookie("field20");
    document.getElementById("motherName").innerText = getCookie("field21");
    document.getElementById("motherOccupation").innerText = getCookie("field22");

    document.getElementById('numberOfBrothers').textContent = getCookie('field23');
    document.getElementById('numberOfSisters').textContent = getCookie('field24');

    document.getElementById("education").innerText = getCookie("field28");
    document.getElementById("revert").innerText = getCookie("field3");
    document.getElementById("salaryRange").innerText = getCookie("field25");
    document.getElementById("profession").innerText = getCookie("field26");
    document.getElementById("businessType").innerText = getCookie("field27");
    document.getElementById("howIKnow").innerText = getCookie("field35");
    document.getElementById("partner_height").innerText = getCookie("field36");
    document.getElementById("partner_weight").innerText = getCookie("field37");
    document.getElementById("partner_caste").innerText = getCookie("field38");
    document.getElementById("partner_education").innerText = getCookie("field39");
    document.getElementById("partner_occupation").innerText = getCookie("field40");
    document.getElementById("partner_follow").innerText = getCookie("field41");
    document.getElementById("partner_personal_attribute").innerText = getCookie("field42");

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
