const fallbackCoins = [
    {
        id: "bitcoin",
        name: "Bitcoin",
        symbol: "BTC",
        price: 65000,
        change: 2.4,
        cap: 1280000000000,
        volume: 28000000000,
        rank: 1,
        supply: 19700000,
        maxSupply: 21000000,
        high: 66000,
        low: 63000,
        website: "https://bitcoin.org",
        image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png"
    },
    {
        id: "ethereum",
        name: "Ethereum",
        symbol: "ETH",
        price: 3500,
        change: 1.8,
        cap: 420000000000,
        volume: 15000000000,
        rank: 2,
        supply: 120000000,
        maxSupply: null,
        high: 3600,
        low: 3400,
        website: "https://ethereum.org",
        image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png"
    },
    {
        id: "tether",
        name: "Tether",
        symbol: "USDT",
        price: 1,
        change: 0.1,
        cap: 110000000000,
        volume: 35000000000,
        rank: 3,
        supply: 110000000000,
        maxSupply: null,
        high: 1.01,
        low: 0.99,
        website: "https://tether.to",
        image: "https://assets.coingecko.com/coins/images/325/large/Tether.png"
    },
    {
        id: "binancecoin",
        name: "BNB",
        symbol: "BNB",
        price: 600,
        change: 1.2,
        cap: 90000000000,
        volume: 1800000000,
        rank: 4,
        supply: 145000000,
        maxSupply: 200000000,
        high: 610,
        low: 590,
        website: "https://www.bnbchain.org",
        image: "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png"
    },
    {
        id: "solana",
        name: "Solana",
        symbol: "SOL",
        price: 155,
        change: 4.8,
        cap: 72000000000,
        volume: 2800000000,
        rank: 5,
        supply: 460000000,
        maxSupply: null,
        high: 160,
        low: 148,
        website: "https://solana.com",
        image: "https://assets.coingecko.com/coins/images/4128/large/solana.png"
    },
    {
        id: "usd-coin",
        name: "USDC",
        symbol: "USDC",
        price: 1,
        change: -0.05,
        cap: 32000000000,
        volume: 6000000000,
        rank: 6,
        supply: 32000000000,
        maxSupply: null,
        high: 1.01,
        low: 0.99,
        website: "https://www.circle.com/usdc",
        image: "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png"
    },
    {
        id: "xrp",
        name: "XRP",
        symbol: "XRP",
        price: 0.58,
        change: -1.4,
        cap: 32000000000,
        volume: 1300000000,
        rank: 7,
        supply: 55000000000,
        maxSupply: 100000000000,
        high: 0.61,
        low: 0.56,
        website: "https://xrpl.org",
        image: "https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png"
    },
    {
        id: "dogecoin",
        name: "Dogecoin",
        symbol: "DOGE",
        price: 0.12,
        change: 3.2,
        cap: 17000000000,
        volume: 700000000,
        rank: 8,
        supply: 144000000000,
        maxSupply: null,
        high: 0.125,
        low: 0.115,
        website: "https://dogecoin.com",
        image: "https://assets.coingecko.com/coins/images/5/large/dogecoin.png"
    },
    {
        id: "cardano",
        name: "Cardano",
        symbol: "ADA",
        price: 0.35,
        change: -2.2,
        cap: 12500000000,
        volume: 300000000,
        rank: 9,
        supply: 35000000000,
        maxSupply: 45000000000,
        high: 0.37,
        low: 0.34,
        website: "https://cardano.org",
        image: "https://assets.coingecko.com/coins/images/975/large/cardano.png"
    },
    {
        id: "avalanche-2",
        name: "Avalanche",
        symbol: "AVAX",
        price: 27,
        change: 2.1,
        cap: 11000000000,
        volume: 250000000,
        rank: 10,
        supply: 410000000,
        maxSupply: 720000000,
        high: 28,
        low: 26,
        website: "https://www.avax.network",
        image: "https://assets.coingecko.com/coins/images/12559/large/Avalanche_Circle_RedWhite_Trans.png"
    },
    {
        id: "chainlink",
        name: "Chainlink",
        symbol: "LINK",
        price: 13,
        change: 1.5,
        cap: 8000000000,
        volume: 350000000,
        rank: 11,
        supply: 600000000,
        maxSupply: 1000000000,
        high: 13.5,
        low: 12.5,
        website: "https://chain.link",
        image: "https://assets.coingecko.com/coins/images/877/large/chainlink-new-logo.png"
    }
];

let coins = [...fallbackCoins];

let watchlist =
    JSON.parse(localStorage.getItem("coinWatchlist")) || [];

let portfolio =
    JSON.parse(localStorage.getItem("coinPortfolio")) || [];

let chart = null;

let editingHolding = null;

let isSignup = false;


/* ================= BASIC FUNCTIONS ================= */

function $(id) {
    return document.getElementById(id);
}


function money(value) {

    value = Number(value) || 0;

    return "$" + value.toLocaleString(
        undefined,
        {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }
    );
}


function compact(value) {

    value = Number(value) || 0;

    if (value >= 1000000000000)
        return "$" + (value / 1000000000000).toFixed(2) + "T";

    if (value >= 1000000000)
        return "$" + (value / 1000000000).toFixed(2) + "B";

    if (value >= 1000000)
        return "$" + (value / 1000000).toFixed(2) + "M";

    return money(value);
}


function coinById(id) {

    return coins.find(c => c.id === id) ||
           fallbackCoins.find(c => c.id === id);

}


function saveWatchlist() {

    localStorage.setItem(
        "coinWatchlist",
        JSON.stringify(watchlist)
    );

}


function savePortfolio() {

    localStorage.setItem(
        "coinPortfolio",
        JSON.stringify(portfolio)
    );

}


/* ================= COINGECKO API ================= */

async function loadMarketData() {

    $("lastUpdated").textContent =
        "Loading live CoinGecko data...";

    const url =
        "https://api.coingecko.com/api/v3/coins/markets" +
        "?vs_currency=usd" +
        "&order=market_cap_desc" +
        "&per_page=20" +
        "&page=1" +
        "&sparkline=true" +
        "&price_change_percentage=24h";

    try {

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("API error");
        }

        const data = await response.json();

        coins = data.map((coin, index) => {

            const fallback =
                fallbackCoins.find(
                    f => f.id === coin.id
                );

            return {

                id: coin.id,

                name: coin.name,

                symbol:
                    coin.symbol.toUpperCase(),

                price:
                    coin.current_price,

                change:
                    coin.price_change_percentage_24h || 0,

                cap:
                    coin.market_cap || 0,

                volume:
                    coin.total_volume || 0,

                rank:
                    coin.market_cap_rank ||
                    index + 1,

                supply:
                    coin.circulating_supply,

                maxSupply:
                    coin.max_supply,

                high:
                    coin.high_24h,

                low:
                    coin.low_24h,

                image:
                    coin.image,

                spark:
                    coin.sparkline_in_7d?.price || [],

                website:
                    fallback?.website || ""

            };

        });

        $("lastUpdated").textContent =
            "Live data • " +
            new Date().toLocaleTimeString();

    }

    catch (error) {

        coins = [...fallbackCoins];

        $("lastUpdated").textContent =
            "Demo data • API unavailable";

    }

    renderAll();

}


/* ================= DASHBOARD ================= */

function renderDashboard() {

    const total =
        coins.reduce(
            (sum, coin) => sum + coin.cap,
            0
        );

    const btc = coinById("bitcoin");
    const eth = coinById("ethereum");

    $("totalCap").textContent =
        compact(total);

    $("btcPrice").textContent =
        money(btc?.price);

    $("ethPrice").textContent =
        money(eth?.price);

    $("coinCount").textContent =
        coins.length;


    const gainers =
        [...coins]
        .sort((a, b) => b.change - a.change)
        .slice(0, 5);

    const losers =
        [...coins]
        .sort((a, b) => a.change - b.change)
        .slice(0, 5);


    $("trendingList").innerHTML =
        coins.slice(0, 5)
        .map(createMiniRow)
        .join("");

    $("gainersList").innerHTML =
        gainers
        .map(createMiniRow)
        .join("");

    $("losersList").innerHTML =
        losers
        .map(createMiniRow)
        .join("");


    renderChart();

}


function createMiniRow(coin) {

    return `

        <div class="mini-row">

            <span>

                <b>${coin.symbol}</b>

                ${coin.name}

            </span>

            <span
                class="${
                    coin.change >= 0
                    ? "positive"
                    : "negative"
                }"
            >

                ${
                    coin.change >= 0
                    ? "+"
                    : ""
                }

                ${coin.change.toFixed(2)}%

            </span>

        </div>

    `;

}


function renderChart() {

    if (!window.Chart)
        return;

    if (chart)
        chart.destroy();

    const data =
        coins
        .slice(0, 10)
        .map(c => c.price);

    chart = new Chart(
        $("marketChart"),
        {

            type: "line",

            data: {

                labels:
                    coins
                    .slice(0, 10)
                    .map(c => c.symbol),

                datasets: [

                    {

                        label: "Crypto Price",

                        data: data,

                        tension: 0.35,

                        fill: false

                    }

                ]

            },

            options: {

                responsive: true,

                plugins: {

                    legend: {
                        display: false
                    }

                }

            }

        }
    );

}


/* ================= MARKETS ================= */

function renderMarkets() {

    let list = [...coins];

    const search =
        ($("searchInput")?.value || "")
        .toLowerCase();

    const filter =
        $("filterSelect")?.value || "all";


    if (search) {

        list = list.filter(
            coin =>
                coin.name
                .toLowerCase()
                .includes(search)

                ||

                coin.symbol
                .toLowerCase()
                .includes(search)
        );

    }


    if (filter === "marketcap") {

        list.sort(
            (a, b) => b.cap - a.cap
        );

    }


    if (filter === "price") {

        list.sort(
            (a, b) => b.price - a.price
        );

    }


    if (
        filter === "change" ||
        filter === "gainers"
    ) {

        list.sort(
            (a, b) => b.change - a.change
        );

    }


    if (filter === "losers") {

        list.sort(
            (a, b) => a.change - b.change
        );

    }


    $("marketTable").innerHTML =
        list.map(coin => `

            <tr>

                <td>
                    #${coin.rank}
                </td>

                <td>

                    <div class="coin-name">

                        <img
                            src="${coin.image}"
                            alt=""
                        >

                        <span>

                            <b>
                                ${coin.name}
                            </b>

                            <small>
                                ${coin.symbol}
                            </small>

                        </span>

                    </div>

                </td>

                <td>
                    ${money(coin.price)}
                </td>

                <td
                    class="${
                        coin.change >= 0
                        ? "positive"
                        : "negative"
                    }"
                >

                    ${
                        coin.change >= 0
                        ? "+"
                        : ""
                    }

                    ${coin.change.toFixed(2)}%

                </td>

                <td>
                    ${compact(coin.cap)}
                </td>

                <td>
                    ${compact(coin.volume)}
                </td>

                <td>

                    <button
                        class="icon-btn"
                        onclick="toggleWatch('${coin.id}')"
                    >
                        ${
                            watchlist.includes(coin.id)
                            ? "★"
                            : "☆"
                        }
                    </button>

                    <button
                        class="icon-btn"
                        onclick="showCoin('${coin.id}')"
                    >
                        ↗
                    </button>

                </td>

            </tr>

        `)
        .join("");

}


/* ================= WATCHLIST ================= */

function toggleWatch(id) {

    if (watchlist.includes(id)) {

        watchlist =
            watchlist.filter(
                item => item !== id
            );

    }

    else {

        watchlist.push(id);

    }

    saveWatchlist();

    renderMarkets();

    renderWatchlist();

}


function renderWatchlist() {

    const search =
        ($("watchSearch")?.value || "")
        .toLowerCase();

    const list =
        watchlist
        .map(coinById)
        .filter(Boolean)
        .filter(
            coin =>
                !search ||

                coin.name
                .toLowerCase()
                .includes(search)

                ||

                coin.symbol
                .toLowerCase()
                .includes(search)
        );


    if (!list.length) {

        $("watchlistGrid").innerHTML = `

            <div class="panel">

                <h3>
                    No coins in watchlist
                </h3>

                <p class="muted">
                    Go to Markets and click ☆
                    to add coins.
                </p>

            </div>

        `;

        return;

    }


    $("watchlistGrid").innerHTML =
        list.map(coin => `

            <div class="coin-card">

                <div class="coin-card-head">

                    <div class="coin-name">

                        <img
                            class="coin-img"
                            src="${coin.image}"
                        >

                        ${coin.name}

                    </div>

                    <button
                        class="icon-btn"
                        onclick="toggleWatch('${coin.id}')"
                    >
                        ★
                    </button>

                </div>

                <h2>
                    ${money(coin.price)}
                </h2>

                <p
                    class="${
                        coin.change >= 0
                        ? "positive"
                        : "negative"
                    }"
                >

                    ${coin.change.toFixed(2)}%

                    (24h)

                </p>

                <button
                    class="btn"
                    onclick="showCoin('${coin.id}')"
                >
                    View Details
                </button>

            </div>

        `)
        .join("");

}


/* ================= COIN DETAILS ================= */

function showCoin(id) {

    const coin = coinById(id);

    if (!coin)
        return;


    $("coinDetails").innerHTML = `

        <div class="details-head">

            <img
                src="${coin.image}"
                alt=""
            >

            <div>

                <h2>
                    ${coin.name}
                    (${coin.symbol})
                </h2>

                <p>
                    Rank #${coin.rank}
                </p>

            </div>

        </div>


        <div class="details-grid">

            <div class="detail-item">

                <small>
                    Current Price
                </small>

                <b>
                    ${money(coin.price)}
                </b>

            </div>


            <div class="detail-item">

                <small>
                    Market Cap
                </small>

                <b>
                    ${compact(coin.cap)}
                </b>

            </div>


            <div class="detail-item">

                <small>
                    Trading Volume
                </small>

                <b>
                    ${compact(coin.volume)}
                </b>

            </div>


            <div class="detail-item">

                <small>
                    Circulating Supply
                </small>

                <b>
                    ${
                        Number(
                            coin.supply || 0
                        ).toLocaleString()
                    }
                </b>

            </div>


            <div class="detail-item">

                <small>
                    Max Supply
                </small>

                <b>
                    ${
                        coin.maxSupply
                        ? Number(
                            coin.maxSupply
                        ).toLocaleString()
                        : "Unlimited / N/A"
                    }
                </b>

            </div>


            <div class="detail-item">

                <small>
                    24h High / Low
                </small>

                <b>
                    ${money(coin.high)}
                    /
                    ${money(coin.low)}
                </b>

            </div>

        </div>


        <p>

            <a
                href="${coin.website || "#"}"
                target="_blank"
            >
                Official Website →
            </a>

        </p>

        <button
            class="btn primary"
            onclick="closeCoin(); openHoldingModalFor('${coin.id}')"
        >
            Add to Portfolio
        </button>

    `;


    $("coinModal")
        .classList
        .remove("hidden");

}


function closeCoin() {

    $("coinModal")
        .classList
        .add("hidden");

}


/* ================= PORTFOLIO ================= */

function fillHoldingCoins() {

    $("holdingCoin").innerHTML =
        coins.map(
            coin => `

                <option value="${coin.id}">

                    ${coin.name}
                    (${coin.symbol})

                </option>

            `
        )
        .join("");

}


function openHoldingModalFor(id) {

    openHoldingModal();

    $("holdingCoin").value = id;

}


function openHoldingModal(index = null) {

    editingHolding = index;

    $("holdingTitle").textContent =
        index === null
        ? "Add Holding"
        : "Edit Holding";


    fillHoldingCoins();


    if (index !== null) {

        const holding =
            portfolio[index];

        $("holdingCoin").value =
            holding.coin;

        $("holdingQty").value =
            holding.qty;

        $("holdingBuy").value =
            holding.buy;

    }

    else {

        $("holdingQty").value = "";

        $("holdingBuy").value = "";

    }


    $("holdingModal")
        .classList
        .remove("hidden");

}


function closeHoldingModal() {

    $("holdingModal")
        .classList
        .add("hidden");

}


function saveHolding() {

    const coin =
        $("holdingCoin").value;

    const qty =
        Number($("holdingQty").value);

    const buy =
        Number($("holdingBuy").value);


    if (
        !coin ||
        qty <= 0 ||
        buy < 0
    ) {

        alert(
            "Please enter valid portfolio details."
        );

        return;

    }


    const holding = {
        coin: coin,
        qty: qty,
        buy: buy
    };


    if (editingHolding === null) {

        portfolio.push(holding);

    }

    else {

        portfolio[editingHolding] =
            holding;

    }


    savePortfolio();

    closeHoldingModal();

    renderPortfolio();

}


function deleteHolding(index) {

    if (
        !confirm(
            "Delete this portfolio holding?"
        )
    ) {

        return;

    }


    portfolio.splice(index, 1);

    savePortfolio();

    renderPortfolio();

}


function renderPortfolio() {

    let totalValue = 0;

    let totalProfit = 0;


    if (!portfolio.length) {

        $("portfolioTable").innerHTML = `

            <tr>

                <td colspan="6">
                    No holdings yet.
                </td>

            </tr>

        `;

        $("portfolioValue").textContent = "$0";

        $("portfolioPL").textContent = "$0";

        return;

    }


    $("portfolioTable").innerHTML =
        portfolio.map(
            (holding, index) => {

                const coin =
                    coinById(
                        holding.coin
                    );

                const currentValue =
                    coin.price *
                    Number(holding.qty);

                const investment =
                    Number(holding.buy) *
                    Number(holding.qty);

                const profit =
                    currentValue -
                    investment;


                totalValue +=
                    currentValue;

                totalProfit +=
                    profit;


                return `

                    <tr>

                        <td>
                            ${coin.name}
                            (${coin.symbol})
                        </td>

                        <td>
                            ${holding.qty}
                        </td>

                        <td>
                            ${money(holding.buy)}
                        </td>

                        <td>
                            ${money(currentValue)}
                        </td>

                        <td
                            class="${
                                profit >= 0
                                ? "positive"
                                : "negative"
                            }"
                        >

                            ${
                                profit >= 0
                                ? "+"
                                : ""
                            }

                            ${money(profit)}

                        </td>

                        <td>

                            <button
                                class="btn"
                                onclick="openHoldingModal(${index})"
                            >
                                Edit
                            </button>

                            <button
                                class="btn"
                                onclick="deleteHolding(${index})"
                            >
                                Delete
                            </button>

                        </td>

                    </tr>

                `;

            }
        )
        .join("");


    $("portfolioValue").textContent =
        money(totalValue);

    $("portfolioPL").textContent =
        money(totalProfit);

}


/* ================= AUTHENTICATION ================= */

function openLogin() {

    $("loginModal")
        .classList
        .remove("hidden");

}


function closeLogin() {

    $("loginModal")
        .classList
        .add("hidden");

}


function toggleSignup() {

    isSignup = !isSignup;


    $("authTitle").textContent =
        isSignup
        ? "Create Account"
        : "Login";


    $("authName")
        .classList
        .toggle(
            "hidden",
            !isSignup
        );


    document
        .querySelector(
            "#loginModal .primary"
        )
        .textContent =
        isSignup
        ? "Sign Up"
        : "Login";

}


function submitAuth() {

    const name =
        $("authName").value.trim();

    const email =
        $("authEmail").value.trim();

    const password =
        $("authPassword").value;


    if (
        !email ||
        !password ||
        (isSignup && !name)
    ) {

        alert(
            "Please fill all required fields."
        );

        return;

    }


    let account =
        JSON.parse(
            localStorage.getItem(
                "coinAccount"
            )
        );


    if (isSignup) {

        account = {
            name,
            email,
            password
        };


        localStorage.setItem(
            "coinAccount",
            JSON.stringify(account)
        );


        alert(
            "Account created successfully."
        );


        toggleSignup();

        return;

    }


    account =
        account || {

            name: "Demo User",

            email:
                "demo@cointrack.com",

            password:
                "123456"

        };


    if (
        email !== account.email ||
        password !== account.password
    ) {

        alert(
            "Invalid login.\n\nDemo login:\ndemo@cointrack.com\n123456"
        );

        return;

    }


    localStorage.setItem(
        "coinLogin",
        "true"
    );

    localStorage.setItem(
        "coinUser",
        JSON.stringify(account)
    );


    closeLogin();

    openApp();

}


function forgotPassword() {

    alert(
        "Forgot Password UI is available.\n\n" +
        "A real password reset requires a backend/email service."
    );

}


/* ================= APP ================= */

function openApp() {

    $("app")
        .classList
        .remove("hidden");


    document
        .querySelector(".landing-nav")
        .classList
        .add("hidden");


    document
        .querySelectorAll(
            "body > section, body > footer"
        )
        .forEach(
            element =>
                element.classList.add(
                    "hidden"
                )
        );


    showPage("dashboard");

    renderProfile();

}


function logout() {

    localStorage.removeItem(
        "coinLogin"
    );

    $("app")
        .classList
        .add("hidden");


    document
        .querySelector(".landing-nav")
        .classList
        .remove("hidden");


    document
        .querySelectorAll(
            "body > section, body > footer"
        )
        .forEach(
            element =>
                element.classList.remove(
                    "hidden"
                )
        );

}


function showPage(id) {

    document
        .querySelectorAll(".page")
        .forEach(
            page =>
                page.classList.add(
                    "hidden"
                )
        );


    $(id)
        .classList
        .remove("hidden");


    $("pageTitle")
        .textContent =
        id.charAt(0).toUpperCase() +
        id.slice(1);


    if (id === "markets")
        renderMarkets();

    if (id === "watchlist")
        renderWatchlist();

    if (id === "portfolio")
        renderPortfolio();

}


function toggleSidebar() {

    document
        .querySelector(".sidebar")
        .classList
        .toggle("open");

}


/* ================= PROFILE ================= */

function renderProfile() {

    let account =
        JSON.parse(
            localStorage.getItem(
                "coinAccount"
            )
        );


    if (!account) {

        account = {

            name: "Demo User",

            email:
                "demo@cointrack.com",

            password:
                "123456"

        };

    }


    $("profileName").value =
        account.name || "";

    $("profileEmail").value =
        account.email || "";


    $("userMini").textContent =
        account.name || "User";


    $("avatar").textContent =
        (
            account.name ||
            "Y"
        )
        .charAt(0)
        .toUpperCase();

}


function saveProfile() {

    let account =
        JSON.parse(
            localStorage.getItem(
                "coinAccount"
            )
        ) || {

            name: "Demo User",

            email:
                "demo@cointrack.com",

            password:
                "123456"

        };


    account.name =
        $("profileName")
        .value
        .trim() ||
        account.name;


    account.email =
        $("profileEmail")
        .value
        .trim() ||
        account.email;


    localStorage.setItem(
        "coinAccount",
        JSON.stringify(account)
    );


    localStorage.setItem(
        "coinUser",
        JSON.stringify(account)
    );


    renderProfile();

    alert(
        "Profile updated successfully."
    );

}


/* ================= CHANGE PASSWORD ================= */

function changePassword() {

    const current =
        $("currentPassword").value;

    const newPassword =
        $("newPassword").value;

    const confirm =
        $("confirmPassword").value;


    let account =
        JSON.parse(
            localStorage.getItem(
                "coinAccount"
            )
        );


    if (!account) {

        account = {

            name: "Demo User",

            email:
                "demo@cointrack.com",

            password:
                "123456"

        };

    }


    if (
        !current ||
        !newPassword ||
        !confirm
    ) {

        alert(
            "Please fill all password fields."
        );

        return;

    }


    if (
        current !==
        account.password
    ) {

        alert(
            "Current password is incorrect."
        );

        return;

    }


    if (
        newPassword.length < 6
    ) {

        alert(
            "New password must contain at least 6 characters."
        );

        return;

    }


    if (
        newPassword !== confirm
    ) {

        alert(
            "New passwords do not match."
        );

        return;

    }


    account.password =
        newPassword;


    localStorage.setItem(
        "coinAccount",
        JSON.stringify(account)
    );


    localStorage.setItem(
        "coinUser",
        JSON.stringify(account)
    );


    $("currentPassword").value = "";

    $("newPassword").value = "";

    $("confirmPassword").value = "";


    alert(
        "Password changed successfully."
    );

}


/* ================= SETTINGS ================= */

function setTheme(value) {

    localStorage.setItem(
        "coinDark",
        value
    );


    document.body
        .classList
        .toggle(
            "dark",
            value === "dark"
        );

}


function setCurrency(value) {

    localStorage.setItem(
        "coinCurrency",
        value
    );

}


function saveNotification(value) {

    localStorage.setItem(
        "coinNotifications",
        value
    );

}


/* ================= LANDING ================= */

function updateLanding() {

    const total =
        coins.reduce(
            (sum, coin) =>
                sum + coin.cap,
            0
        );


    const btc =
        coinById("bitcoin");

    const eth =
        coinById("ethereum");


    $("landingCap")
        .textContent =
        compact(total);


    $("landingBTC")
        .textContent =
        money(btc?.price);


    $("landingETH")
        .textContent =
        money(eth?.price);


    $("heroPrice")
        .textContent =
        money(btc?.price);

}


/* ================= RENDER ALL ================= */

function renderAll() {

    renderDashboard();

    renderMarkets();

    renderWatchlist();

    renderPortfolio();

    fillHoldingCoins();

    renderProfile();

    updateLanding();


    const theme =
        localStorage.getItem(
            "coinDark"
        ) || "light";


    setTheme(theme);

}


/* ================= START ================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadMarketData();


        if (
            localStorage.getItem(
                "coinLogin"
            ) === "true"
        ) {

            openApp();

        }

    }
);