import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n.use(LanguageDetector).init({
  // we init with resources
  resources: {
    en: {
      translations: {
        "Product Configurator" : "Product Configurator",
        "Please sign in" : "Please sign in",
        "Username" : "Username",
        "Password" : "Password",
        "Sign in" : "Sign in",
        "Invalid Login Credentials!" : "Invalid Login Credentials!",
        "Remember me" : "Remember me"
      }
    },
    de: {
      translations: {
        "Product Configurator" : "Produktkonfigurator",
        "Please sign in" : "Bitte einloggen",
        "Username" : "Nutzername",
        "Password" : "Passwort",
        "Sign in" : "Einloggen",
        "Invalid Login Credentials!" : "Ungültige Login-Details!",
        "Remember me" : "Erinnere dich an mich"
      }
    },
    fr: {
      translations: {
        "Product Configurator" : "Produktkonfigurator",
        "Please sign in" : "Veuillez vous connecter",
        "Username" : "Nom d'utilisateur",
        "Password" : "Mot de passe",
        "Sign in" : "se connecter",
        "Invalid Login Credentials!" : "Authentification invalide!",
        "Remember me" : "Souviens-toi de moi"
      }
    }
  },
  fallbackLng: "en",
  debug: true,

  // have a common namespace used around the full app
  ns: ["translations"],
  defaultNS: "translations",

  keySeparator: false, // we use content as keys

  interpolation: {
    escapeValue: false, // not needed for react!!
    formatSeparator: ","
  },

  react: {
    wait: true
  }
});

export default i18n;