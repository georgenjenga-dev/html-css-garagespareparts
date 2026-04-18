function showMethod(method) {
    const mpesa = document.getElementById("mpesa");
    const airtel = document.getElementById("airtel");

    const tabs = document.querySelectorAll(".tab");

    // Hide both forms
    mpesa.classList.add("hidden");
    airtel.classList.add("hidden");

    // Remove active class from tabs
    tabs.forEach(tab => tab.classList.remove("active"));

    // Show selected method + activate tab
    if (method === "mpesa") {
        mpesa.classList.remove("hidden");
        tabs[0].classList.add("active");
    } else {
        airtel.classList.remove("hidden");
        tabs[1].classList.add("active");
    }
}

function pay(method) {
    const phoneInputs = document.querySelectorAll("input[type='text']");
    const amountInputs = document.querySelectorAll("input[type='number']");

    let phone = "";
    let amount = "";

    // Determine which form is active
    if (!document.getElementById("mpesa").classList.contains("hidden")) {
        phone = phoneInputs[0].value;
        amount = amountInputs[0].value;
    } else {
        phone = phoneInputs[1].value;
        amount = amountInputs[1].value;
    }

    if (phone === "" || amount === "") {
        alert("Please fill in all fields");
        return;
    }

    alert(`Processing ${method} payment of KES ${amount} for ${phone}`);
}



// Api call to fetch spare parts

function getspareparts() {
    fetch("https://fakestoreapi.com/products")
        .then(res => res.json())
        .then(data => {
            const container = document.getElementById("cars");
            container.innerHTML = "";

            // limit results
            data.slice(0, 6).forEach(part => {
                const item = document.createElement("div");

                item.innerHTML = `
                    <h3>${part.title}</h3>
                    <img src="${part.image}" width="100">
                    <p>KES ${Math.floor(part.price * 130)}</p>
                `;

                container.appendChild(item);
            });
        })
        .catch(err => {
            console.log(err);
            document.getElementById("cars").innerHTML = "Failed to load spare parts.";
        });
}