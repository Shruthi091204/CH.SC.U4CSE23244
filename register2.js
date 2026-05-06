const data = {
    email: "ch.sc.u4cse23244@ch.students.amrita.edu",
    name: "Shruthika Rajan",
    rollNo: "CH.SC.U4CSE23244",
    accessCode: "PTBMmQ",
    clientID: "48693768-af66-46a1-a84d-3903d98ef7cc",
    clientSecret: "HsmpQBhFvZdYBwFN"
};

fetch("http://20.207.122.201/evaluation-service/auth", {
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