
const data = {
    email: "ch.sc.u4cse23244@ch.students.amrita.edu",
    name: "Shruthika Rajan",
    mobileNo: "9074383050",
    githubUsername: "Shruthi091204",
    rollNo: "CH.SC.U4CSE23244",
    accessCode: "PTBMmQ"
};

fetch("http://20.207.122.201/evaluation-service/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
})
    .then(res => res.json())
    .then(result => {
        console.log("=== SAVE THIS ===");
        console.log(JSON.stringify(result, null, 2));
    })
    .catch(err => console.error("Error:", err));