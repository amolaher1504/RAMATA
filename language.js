// ============================================
// RAMATA - Language Switch
// Default: English
// Option: French
// EN / FR switch in the header (no popup)
// ============================================

(function () {

    const LANGUAGE_KEY = "ramata_language";

    // ============================================
    // Google Translate Initialization
    // ============================================

    if (sessionStorage.getItem(LANGUAGE_KEY) === "en") {
        clearGoogleTranslateCookie();
    }

    window.googleTranslateElementInit = function () {

        new google.translate.TranslateElement(
            {
                pageLanguage: "en",
                includedLanguages: "en,fr",
                autoDisplay: false
            },
            "google_translate_element"
        );

        // Check saved language for this session
        const savedLanguage =
            sessionStorage.getItem(LANGUAGE_KEY);

        // If user selected French in this session
        if (savedLanguage === "fr") {

            setTimeout(function () {
                translateToFrench();
            }, 700);
        }
    };


    // ============================================
    // Translate to French
    // ============================================

    function translateToFrench() {

        const translateSelect =
            document.querySelector(".goog-te-combo");

        // Google Translate not ready
        if (!translateSelect) {

            setTimeout(function () {
                translateToFrench();
            }, 300);

            return;
        }

        translateSelect.value = "fr";

        translateSelect.dispatchEvent(
            new Event("change")
        );
    }


    // ============================================
    // Translate to English
    // ============================================

    function translateToEnglish() {

        clearGoogleTranslateCookie();

        // Reload to show the original English text
        window.location.reload();
    }


    // ============================================
    // Clear Google Translate's saved language
    // (cookie can be set on several domain levels)
    // ============================================

    function clearGoogleTranslateCookie() {

        const expired =
            "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";

        const parts =
            window.location.hostname.split(".");

        document.cookie = expired;

        // e.g. www.ramata.tech, ramata.tech
        for (let i = 0; i < parts.length - 1; i++) {

            const domain =
                parts.slice(i).join(".");

            document.cookie = expired + "; domain=" + domain;
            document.cookie = expired + "; domain=." + domain;
        }
    }


    // ============================================
    // Current Language
    // ============================================

    function getCurrentLanguage() {

        const savedLanguage =
            sessionStorage.getItem(LANGUAGE_KEY);

        if (savedLanguage) {
            return savedLanguage;
        }

        // Google Translate remembers French in a cookie
        if (/googtrans=\/[a-z]+\/fr/.test(document.cookie)) {
            return "fr";
        }

        return "en";
    }


    // ============================================
    // Update Switch Buttons
    // ============================================

    function updateLanguageSwitch(language) {

        document
            .querySelectorAll(".lang-switch button")
            .forEach(function (button) {

                const isActive =
                    button.getAttribute("data-lang") === language;

                button.classList.toggle("active", isActive);
                button.setAttribute("aria-pressed", isActive);
            });
    }


    // ============================================
    // Create EN / FR Switch
    // (added right after the Contact Us button)
    // ============================================

    function createLanguageSwitch() {

        const navLinks =
            document.querySelector(".nav-links");

        // Don't create duplicate switch
        if (!navLinks || document.querySelector(".lang-switch")) {
            return;
        }

        const item = document.createElement("li");

        item.className = "lang-switch-item";

        // "notranslate" keeps Google from translating EN / FR
        item.innerHTML = `
            <div class="lang-switch notranslate" translate="no" role="group" aria-label="Language">

                <button type="button" data-lang="en" aria-pressed="false">EN</button>

                <button type="button" data-lang="fr" aria-pressed="false">FR</button>

            </div>
        `;

        navLinks.appendChild(item);

        item
            .querySelectorAll("button")
            .forEach(function (button) {

                button.addEventListener("click", function () {

                    const language =
                        button.getAttribute("data-lang");

                    sessionStorage.setItem(
                        LANGUAGE_KEY,
                        language
                    );

                    updateLanguageSwitch(language);

                    // Close mobile menu after choosing
                    navLinks.classList.remove("active");

                    if (language === "fr") {
                        translateToFrench();
                    } else {
                        translateToEnglish();
                    }
                });
            });

        updateLanguageSwitch(getCurrentLanguage());
    }


    // ============================================
    // Add Switch Right Away
    // (header is already on the page, so the switch
    // appears together with it and nothing moves)
    // ============================================

    if (document.querySelector(".nav-links")) {

        createLanguageSwitch();

    } else {

        document.addEventListener(
            "DOMContentLoaded",
            createLanguageSwitch
        );
    }

})();
