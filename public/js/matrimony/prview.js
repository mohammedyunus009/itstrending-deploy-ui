function goBack() {
    window.history.back();
}

function continueToFilters() {
    window.location.href = "profilesearch3.html";
}

// Function to get a cookie value
function getCookie(name) {
    let cookieArr = document.cookie.split(";");
    for (let i = 0; i < cookieArr.length; i++) {
        let cookiePair = cookieArr[i].split("=");
        if (name == cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1]);
        }
    }
    return null;
}

// Set profile details from cookies
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("name").innerText = getCookie("field1") || "N/A";
    document.getElementById("dob").innerText = getCookie("field2") || "N/A";
    document.getElementById("gender").innerText = getCookie("gender") || "N/A";
    document.getElementById("caste").innerText = getCookie("field4") || "N/A";
    document.getElementById("phoneNumber").innerText = getCookie("field6") || "N/A";
    document.getElementById("nativeLanguage").innerText = getCookie("field7") || "N/A";
    document.getElementById("residenceLanguage").innerText = getCookie("field8") || "N/A";
    document.getElementById("country").innerText = getCookie("field5") || "N/A";
    document.getElementById("state").innerText = getCookie("field9") || "N/A";
    document.getElementById("city").innerText = getCookie("field10") || "N/A";
    document.getElementById("address").innerText = getCookie("field11") || "N/A";
    document.getElementById("maritalStatus").innerText = getCookie("field12") || "N/A";
    document.getElementById("height").innerText = getCookie("field14") || "N/A";
    document.getElementById("weight").innerText = getCookie("field15") || "N/A";
    document.getElementById("aboutMe").innerText = getCookie("field16") || "N/A";
    document.getElementById("preferredAlliance").innerText = getCookie("field17") || "N/A";
    document.getElementById("marriageConditions").innerText = getCookie("field18") || "N/A";
    document.getElementById("siblings").innerText = getCookie("field20") || "N/A";
    document.getElementById("revert").innerText = getCookie("field22") || "N/A";
    document.getElementById("aboutFamily").innerText = getCookie("field21") || "N/A";
    document.getElementById("salaryRange").innerText = getCookie("field23") || "N/A";
    document.getElementById("profession").innerText = getCookie("field24") || "N/A";


    // Handle children detail based on marital status
    const maritalStatus = getCookie("maritalStatus") || "N/A";
    const children = getCookie("children") || "";
    const childrenDetail = document.getElementById("childrenDetail");

    if (maritalStatus === "Divorced" || maritalStatus === "Widowed" || maritalStatus === "Annulled") {
        childrenDetail.style.display = "block";
        document.getElementById("children").innerText = children;
    } else {
        childrenDetail.style.display = "none";
        document.getElementById("children").innerText = "0";
    }
});

// Prepare data to send to the API
const profileData = {
    profile_id: getCookie("profile_id") || "N/A", // Fetching profile_id from cookies
    description: "Working in software firm",
    gender: getCookie("gender") || "N/A", // Fetching gender from cookies
    images: "https://w0.peakpx.com/wallpaper/262/146/HD-wallpaper-virat-and-anushka-anushka-couple-kohli-love-sharma-virat.jpg", // Using the given URL for images
    bio: getCookie("bio") || "N/A" // Fetching bio from cookies
};

// Log the data to be sent to the API
console.log("Profile Data:", profileData);

// Send data to the API
fetch('http://35.233.133.10:5001/api/v1/profiles', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(profileData)
})
.then(response => response.json())
.then(data => {
    console.log("API Response:", data);
    // alert('Profile data sent successfully!');
})
.catch(error => {
    console.error('Error:', error);
    // alert('Failed to send profile data.');
});