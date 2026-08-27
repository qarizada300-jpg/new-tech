

        const newsCards = document.querySelectorAll(".news-card");

        function checkNewsText(card) {

            const text = card.querySelector(".news-text");
            const button = card.querySelector(".read-more");

            if (text.scrollHeight > text.clientHeight + 1) {
                button.style.display = "flex";
            } else {
                button.style.display = "none";
            }
        }


        newsCards.forEach(card => {

            const text = card.querySelector(".news-text");
            const button = card.querySelector(".read-more");
            const buttonText = card.querySelector(".button-text");
            const arrow = card.querySelector(".arrow");


            checkNewsText(card);


            button.addEventListener("click", function () {

                const isExpanded = text.classList.contains("expanded");


                if (isExpanded) {

                    /* Close smoothly */

                    text.style.maxHeight = text.scrollHeight + "px";

                    requestAnimationFrame(() => {
                        text.style.maxHeight = "86.7px";
                    });

                    text.classList.remove("expanded");

                    buttonText.textContent = "Read More";
                    arrow.textContent = "→";

                } else {

                    /* Open smoothly */

                    text.style.maxHeight = text.scrollHeight + "px";

                    text.classList.add("expanded");

                    buttonText.textContent = "Read Less";
                    arrow.textContent = "↑";
                }

            });

        });


        window.addEventListener("resize", function () {

            newsCards.forEach(card => {

                const text = card.querySelector(".news-text");

                if (text.classList.contains("expanded")) {
                    text.style.maxHeight = text.scrollHeight + "px";
                }

                checkNewsText(card);

            });

        });



        /* =========================
           DARK / LIGHT MODE
        ========================== */

        const themeToggle = document.getElementById("themeToggle");

        function setTheme(mode) {

            if (mode === "dark") {

                document.body.classList.add("dark-mode");

                themeToggle.textContent = "☀️ Light Mode";

                localStorage.setItem("theme", "dark");

            } else {

                document.body.classList.remove("dark-mode");

                themeToggle.textContent = "🌙 Dark Mode";

                localStorage.setItem("theme", "light");
            }
        }


        const savedTheme = localStorage.getItem("theme");

        if (savedTheme === "dark") {
            setTheme("dark");
        } else {
            setTheme("light");
        }


        themeToggle.addEventListener("click", function () {

            if (document.body.classList.contains("dark-mode")) {
                setTheme("light");
            } else {
                setTheme("dark");
            }

        });



        /* =========================
           SEARCH
        ========================== */

        const searchForm = document.getElementById("searchForm");

        searchForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const query = document
                .getElementById("searchInput")
                .value
                .trim()
                .toLowerCase();

            if (!query) {
                newsCards.forEach(card => {
                    card.style.display = "";
                });
                return;
            }

            newsCards.forEach(card => {

                const title = card
                    .querySelector(".news-title")
                    .textContent
                    .toLowerCase();

                const text = card
                    .querySelector(".news-text")
                    .textContent
                    .toLowerCase();

                const category = card
                    .querySelector(".news-category")
                    .textContent
                    .toLowerCase();

                const match =
                    title.includes(query) ||
                    text.includes(query) ||
                    category.includes(query);

                card.style.display = match ? "" : "none";

            });

        });