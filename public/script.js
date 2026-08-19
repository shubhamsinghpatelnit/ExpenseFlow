const frm = document.getElementById("expFrm");
const amt = document.getElementById("amt");
const cat = document.getElementById("cat");
const dat = document.getElementById("dat");
const des = document.getElementById("des");
const msg = document.getElementById("msg");

const body = document.getElementById("expBody");
const tot = document.getElementById("tot");
const cnt = document.getElementById("cnt");
const catSum = document.getElementById("catSum");

const filCat = document.getElementById("filCat");
const filDat = document.getElementById("filDat");
const clrBtn = document.getElementById("clrBtn");

dat.value = new Date().toISOString().split("T")[0];

frm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        amount: Number(amt.value),
        category: cat.value,
        description: des.value,
        date: dat.value
    };

    const res = await fetch("/api/expenses", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    const out = await res.json();

    if (!res.ok) {
        msg.textContent = out.error || "Something went wrong";
        return;
    }

    msg.textContent = "Expense added successfully";
    frm.reset();
    dat.value = new Date().toISOString().split("T")[0];

    await loadExp();
    await loadSum();
});

filCat.addEventListener("change", loadExp);
filDat.addEventListener("change", loadExp);

clrBtn.addEventListener("click", () => {
    filCat.value = "";
    filDat.value = "";
    loadExp();
});

async function loadExp() {
    const prm = new URLSearchParams();

    if (filCat.value) {
        prm.set("category", filCat.value);
    }

    if (filDat.value) {
        prm.set("date", filDat.value);
    }

    const url = prm.toString()
        ? `/api/expenses?${prm.toString()}`
        : "/api/expenses";

    const res = await fetch(url);
    const arr = await res.json();

    body.innerHTML = "";

    if (arr.length === 0) {
        body.innerHTML = `
            <tr>
                <td colspan="5">No expenses found.</td>
            </tr>
        `;
        cnt.textContent = "0";
        return;
    }

    for (const exp of arr) {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${exp.date}</td>
            <td>${exp.category}</td>
            <td>${exp.description || "-"}</td>
            <td>₹${Number(exp.amount).toFixed(2)}</td>
            <td>
                <button class="danger" onclick="delExp(${exp.id})">
                    Delete
                </button>
            </td>
        `;

        body.appendChild(tr);
    }

    cnt.textContent = arr.length;
}

async function delExp(id) {
    const res = await fetch(`/api/expenses/${id}`, {
        method: "DELETE"
    });

    const out = await res.json();

    if (!res.ok) {
        alert(out.error || "Delete failed");
        return;
    }

    await loadExp();
    await loadSum();
}

async function loadSum() {
    const res = await fetch("/api/expenses/summary");
    const data = await res.json();

    tot.textContent = `₹${Number(data.total).toFixed(2)}`;
    catSum.innerHTML = "";

    if (data.byCategory.length === 0) {
        catSum.textContent = "No category data yet.";
        return;
    }

    for (const item of data.byCategory) {
        const div = document.createElement("div");
        div.className = "pill";
        div.textContent = `${item.category}: ₹${Number(item.total).toFixed(2)}`;
        catSum.appendChild(div);
    }
}

loadExp();
loadSum();
