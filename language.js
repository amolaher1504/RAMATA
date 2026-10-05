// ============================================
// RAMATA - Language Selection
// Default: English
// Option: French
// Popup appears again on a new visit/session
// ============================================

(function () {

    const LANGUAGE_KEY = "ramata_language";

    // ============================================
    // Google Translate Initialization
    // ============================================

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
    // Create Language Popup
    // ============================================

    function createLanguagePopup() {

        // Don't create duplicate popup
        if (document.getElementById("language-popup")) {
            return;
        }

        const popup = document.createElement("div");

        popup.id = "language-popup";

        popup.innerHTML = `
            <div class="language-box">

                <div class="language-icon">
                    🌐
                </div>

                <h2>Choose your language</h2>

                <p>
                    Would you like to view this website in French?
                </p>

                <div class="language-buttons">

                    <button
                        type="button"
                        class="language-btn not-now-btn"
                        id="not-now-language-btn">
                        Not Now
                    </button>

                    <button
                        type="button"
                        class="language-btn french-btn"
                        id="french-language-btn">
                        Français
                    </button>

                </div>

            </div>
        `;

        document.body.appendChild(popup);


        // ========================================
        // Not Now
        // ========================================

        document
            .getElementById("not-now-language-btn")
            .addEventListener("click", function () {

                // Save English only for this session
                sessionStorage.setItem(
                    LANGUAGE_KEY,
                    "en"
                );

                closeLanguagePopup();
            });


        // ========================================
        // French
        // ========================================

        document
            .getElementById("french-language-btn")
            .addEventListener("click", function () {

                // Save French only for this session
                sessionStorage.setItem(
                    LANGUAGE_KEY,
                    "fr"
                );

                closeLanguagePopup();

                // Translate page
                translateToFrench();
            });
    }


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

        const translateSelect =
            document.querySelector(".goog-te-combo");

        if (!translateSelect) {
            return;
        }

        translateSelect.value = "en";

        translateSelect.dispatchEvent(
            new Event("change")
        );
    }


    // ============================================
    // Close Popup
    // ============================================

    function closeLanguagePopup() {

        const popup =
            document.getElementById("language-popup");

        if (!popup) {
            return;
        }

        popup.classList.add(
            "language-popup-hide"
        );

        setTimeout(function () {

            popup.remove();

        }, 300);
    }


    // ============================================
    // Check Language Preference
    // ============================================

    function checkLanguagePreference() {

        // Check only current browser session
        const savedLanguage =
            sessionStorage.getItem(LANGUAGE_KEY);


        // ----------------------------------------
        // No saved preference
        // Show popup
        // ----------------------------------------

        if (!savedLanguage) {

            createLanguagePopup();

            return;
        }


        // ----------------------------------------
        // Saved French
        // Translate automatically
        // ----------------------------------------

        if (savedLanguage === "fr") {

            setTimeout(function () {
                translateToFrench();
            }, 700);
        }


        // ----------------------------------------
        // Saved English
        // Do nothing
        // Website remains English
        // ----------------------------------------
    }


    // ============================================
    // Page Loaded
    // ============================================

    document.addEventListener(
        "DOMContentLoaded",
        function () {

            setTimeout(function () {

                checkLanguagePreference();

            }, 800);

        }
    );

})();