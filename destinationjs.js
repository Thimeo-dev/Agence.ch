import { translations } from './translations.js'; 
import { countriesData } from './pays/data.js'; // On entre dans le dossier pays pour trouver data.js

const countryCodes = {
  "Albanie": "AL",
  "Allemagne": "DE",
  "Andorre": "AD",
  "Arménie": "AM",
  "Autriche": "AT",
  "Azerbaïdjan": "AZ",
  "Belgique": "BE",
  "Biélorussie": "BY",
  "Bosnie-Herzégovine": "BA",
  "Bulgarie": "BG",
  "Chypre": "CY",
  "Croatie": "HR",
  "Danemark": "DK",
  "Espagne": "ES",
  "Estonie": "EE",
  "Finlande": "FI",
  "France": "FR",
  "Géorgie": "GE",
  "Grèce": "GR",
  "Hongrie": "HU",
  "Irlande": "IE",
  "Islande": "IS",
  "Italie": "IT",
  "Kazakhstan": "KZ",
  "Kosovo": "XK",
  "Lettonie": "LV",
  "Liechtenstein": "LI",
  "Lituanie": "LT",
  "Luxembourg": "LU",
  "Macédoine du Nord": "MK",
  "Malte": "MT",
  "Moldavie": "MD",
  "Monaco": "MC",
  "Monténégro": "ME",
  "Norvège": "NO",
  "Pays-Bas": "NL",
  "Pologne": "PL",
  "Portugal": "PT",
  "Roumanie": "RO",
  "Royaume-Uni": "GB",
  "Russie": "RU",
  "Saint-Marin": "SM",
  "Serbie": "RS",
  "Slovaquie": "SK",
  "Slovénie": "SI",
  "Suède": "SE",
  "Suisse": "CH",
  "Tchéquie": "CZ",
  "Turquie": "TR",
  "Ukraine": "UA",
  "Afghanistan": "AF",
  "Arabie Saoudite": "SA",
  "Bahreïn": "BH",
  "Bangladesh": "BD",
  "Bhoutan": "BT",
  "Birmanie": "MM",
  "Brunei": "BN",
  "Cambodge": "KH",
  "Chine": "CN",
  "Corée du Nord": "KP",
  "Corée du Sud": "KR",
  "Émirats Arabes Unis": "AE",
  "Inde": "IN",
  "Indonésie": "ID",
  "Irak": "IQ",
  "Iran": "IR",
  "Israël": "IL",
  "Japon": "JP",
  "Jordanie": "JO",
  "Kirghizistan": "KG",
  "Koweït": "KW",
  "Laos": "LA",
  "Liban": "LB",
  "Malaisie": "MY",
  "Maldives": "MV",
  "Mongolie": "MN",
  "Népal": "NP",
  "Oman": "OM",
  "Ouzbékistan": "UZ",
  "Pakistan": "PK",
  "Palestine": "PS",
  "Philippines": "PH",
  "Qatar": "QA",
  "Singapour": "SG",
  "Sri Lanka": "LK",
  "Syrie": "SY",
  "Tadjikistan": "TJ",
  "Taïwan": "TW",
  "Thaïlande": "TH",
  "Timor oriental": "TL",
  "Turkménistan": "TM",
  "Viêt Nam": "VN",
  "Yémen": "YE",
  "Antigua-et-Barbuda": "AG",
  "Argentine": "AR",
  "Bahamas": "BS",
  "Barbade": "BB",
  "Belize": "BZ",
  "Bolivie": "BO",
  "Brésil": "BR",
  "Canada": "CA",
  "Chili": "CL",
  "Colombie": "CO",
  "Costa Rica": "CR",
  "Cuba": "CU",
  "Dominique": "DM",
  "Équateur": "EC",
  "États-Unis": "US",
  "Grenade": "GD",
  "Guatemala": "GT",
  "Guyana": "GY",
  "Haïti": "HT",
  "Honduras": "HN",
  "Jamaïque": "JM",
  "Mexique": "MX",
  "Nicaragua": "NI",
  "Panama": "PA",
  "Paraguay": "PY",
  "Pérou": "PE",
  "République Dominicaine": "DO",
  "Saint-Christophe-et-Niévès": "KN",
  "Saint-Vincent-et-les-Grenadines": "VC",
  "Sainte-Lucie": "LC",
  "Salvador": "SV",
  "Suriname": "SR",
  "Trinité-et-Tobago": "TT",
  "Uruguay": "UY",
  "Venezuela": "VE",
  "Afrique du Sud": "ZA",
  "Algérie": "DZ",
  "Cameroun": "CM",
  "Côte d'Ivoire": "CI",
  "Égypte": "EG",
  "Éthiopie": "ET",
  "Kenya": "KE",
  "Madagascar": "MG",
  "Maroc": "MA",
  "Maurice": "MU",
  "Namibie": "NA",
  "Nigéria": "NG",
  "Sénégal": "SN",
  "Tanzanie": "TZ",
  "Tunisie": "TN",
  "Australie": "AU",
  "Fidji": "FJ",
  "Nouvelle-Zélande": "NZ",
  "Papouasie-Nouvelle-Guinée": "PG",
  "Polynésie Française": "PF",
  "Vatican": "VA"
};

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const countryId = params.get('id');
    const storedLang = localStorage.getItem('lang');
    const normalizeLang = (value) => {
        if (!value || typeof value !== 'string') return null;
        return value.toLowerCase().split(/[_-]/)[0];
    };
    const langParam = normalizeLang(params.get('lang'));
    const langStored = normalizeLang(storedLang);
    const lang = langParam || langStored || 'fr';

    const titleEl = document.getElementById('country-title');
    const descEl = document.getElementById('country-desc');
    const infoEl = document.getElementById('country-info');
    const langEl = document.getElementById('current-lang');
    const langNameEl = document.getElementById('lang-display');

    const languageNames = {
        fr: 'Français',
        en: 'English',
        de: 'Deutsch',
        it: 'Italiano',
        es: 'Español',
        pt: 'Português',
        ja: '日本語',
        zh: '中文',
        ko: '한국어',
        nl: 'Nederlands'
    };

    if (countryId && countriesData[countryId]) {
        const info = countriesData[countryId][lang] || countriesData[countryId]['fr'];
        
        if (titleEl) titleEl.textContent = info.name;
        if (descEl) descEl.textContent = info.desc;
        if (langEl) langEl.textContent = lang.toUpperCase();
        if (langNameEl) langNameEl.textContent = languageNames[lang] || lang.toUpperCase();
        
        document.title = info.name + " — Agence.ch";
    } else {
        if (titleEl) titleEl.textContent = "Destination introuvable";
        console.error("Le pays " + countryId + " n'existe pas dans data.js");
    }
});

const getStoredLang = () => {
    const storedLang = localStorage.getItem('lang');
    if (storedLang && typeof storedLang === 'string') {
        return storedLang.toLowerCase().split(/[_-]/)[0];
    }
    const htmlLang = document.documentElement.lang;
    return htmlLang ? htmlLang.toLowerCase().split(/[_-]/)[0] : 'fr';
};

const countriesEurope = [
    { name: "Albanie", img:"https://images.unsplash.com/photo-1630339858071-4e64cc76fb6c?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Allemagne", img: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Andorre", img: "https://images.unsplash.com/photo-1602776078317-4b7904602277?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Arménie", img: "https://images.unsplash.com/photo-1620693654464-7d33c7eac5a3?q=80&w=1474&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Autriche", img: "https://images.unsplash.com/photo-1520503922584-590e8f7a90d7?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Azerbaïdjan", img: "https://images.unsplash.com/photo-1596306499398-8d88944a5ec4?q=80&w=1412&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Belgique", img: "https://images.unsplash.com/photo-1559113202-c916b8e44373?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Biélorussie", img: "https://images.unsplash.com/photo-1686038365984-06c45193581d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Bosnie-Herzégovine", img: "https://images.unsplash.com/photo-1543831973-481fbf6dc4a8?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Bulgarie", img: "https://images.unsplash.com/photo-1594803294810-c860e5d29e07?q=80&w=1401&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Chypre", img: "https://images.unsplash.com/photo-1677023484291-005b9840132f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Croatie", img: "https://images.unsplash.com/photo-1555990793-da11153b2473?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Danemark", img: "https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Espagne", img: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Estonie", img: "https://images.unsplash.com/photo-1560873564-8423716d9f2a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Finlande", img: "https://images.unsplash.com/photo-1538332576228-eb5b4c4de6f5?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "France", img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=400" },
    { name: "Géorgie", img: "https://images.unsplash.com/photo-1563284223-333497472e88?q=80&w=1476&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Grèce", img: "https://images.unsplash.com/photo-1580502304784-8985b7eb7260?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Hongrie", img: "https://images.unsplash.com/photo-1577366773073-a57cdf7132cb?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Irlande", img: "https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Islande", img: "https://images.unsplash.com/photo-1500043357865-c6b8827edf10?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Italie", img: "https://images.unsplash.com/photo-1499678329028-101435549a4e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Kazakhstan", img: "https://images.unsplash.com/photo-1666975823342-3b755b3784d4?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Kosovo", img: "https://images.unsplash.com/photo-1622151680932-c855a0a0b011?q=80&w=1423&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Lettonie", img: "https://images.unsplash.com/photo-1522054541898-adc6abd570e5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8TGV0dG9uaWV8ZW58MHwwfDB8fHwws" },
    { name: "Liechtenstein", img: "https://images.unsplash.com/photo-1668030904616-f0c576b679d6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Lituanie", img: "https://images.unsplash.com/photo-1632245808555-bc26f2037ff0?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Luxembourg", img: "https://images.unsplash.com/photo-1616778504617-11615e3ceff7?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Macédoine du Nord", img: "https://images.unsplash.com/photo-1619371620133-1c4b489a0569?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Malte", img: "https://images.unsplash.com/photo-1587974928552-4f4aac51b45d?q=80&w=1506&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Moldavie", img: "https://images.unsplash.com/photo-1600159953570-df048e507c7b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Monaco", img: "https://images.unsplash.com/photo-1581819896533-f8ab6767ce7e?q=80&w=1501&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Monténégro", img: "https://images.unsplash.com/photo-1614122027743-50a9e6e8002f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Norvège", img: "https://images.unsplash.com/photo-1544085311-11a028465b03?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Pays-Bas", img: "https://images.unsplash.com/photo-1595698251407-8e7e3030a715?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Pologne", img: "https://images.unsplash.com/photo-1519197924294-4ba991a11128?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Portugal", img: "https://images.unsplash.com/photo-1585208798174-6cedd86e019a?q=80&w=1473&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Roumanie", img: "https://images.unsplash.com/photo-1534371020656-6b85825f2b1a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Royaume-Uni", img: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=400" },
    { name: "Russie", img: "https://images.unsplash.com/photo-1513326738677-b964603b136d?q=80&w=400" },
    { name: "Saint-Marin", img: "https://images.unsplash.com/photo-1510513260777-51d462dbaec9?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Serbie", img: "https://images.unsplash.com/photo-1613601740367-410ae03b2ec7?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Slovaquie", img: "https://images.unsplash.com/photo-1594502645146-919ab24010e8?q=80&w=1933&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Slovénie", img: "https://images.unsplash.com/photo-1520900828798-002c1800f31a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Suède", img: "https://images.unsplash.com/photo-1508189860359-777d945909ef?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Suisse", img: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=400" },
    { name: "Tchéquie", img: "https://images.unsplash.com/photo-1541849546-216549ae216d?q=80&w=400" },
    { name: "Turquie", img: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=400" },
    { name: "Ukraine", img: "https://images.unsplash.com/photo-1545310751-fcdeb3a4981d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Vatican", img: "https://images.unsplash.com/photo-1610655769765-be8a0dd9627a?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }
];
// On récupère TOUS les conteneurs de scroll de la page
const allScrollContainers = document.querySelectorAll('.countries-scroll-container');

allScrollContainers.forEach((container) => {
    container.addEventListener('wheel', (evt) => {
        // Si la molette bouge verticalement
        if (evt.deltaY !== 0) {
            evt.preventDefault(); // On empêche la page de descendre
            container.scrollLeft += evt.deltaY; // On fait défiler horizontalement
        }
    }, { passive: false });
});

const countriesAsia = [
    { name: "Afghanistan", img: "https://images.unsplash.com/photo-1640581878506-a3556686555f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Arabie Saoudite", img: "https://images.unsplash.com/photo-1506795213373-430e921fe2ed?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Bahreïn", img: "https://images.unsplash.com/photo-1547548731-e95343697eb4?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Bangladesh", img: "https://images.unsplash.com/photo-1577624060070-ca1afe89ddad?q=80&w=1626&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Bhoutan", img: "https://images.unsplash.com/photo-1584003734930-b12779f66351?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Birmanie", img: "https://images.unsplash.com/photo-1556967789-e6512208cf68?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Brunei", img: "https://images.unsplash.com/photo-1709808971463-270bae12b837?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Cambodge", img: "https://images.unsplash.com/photo-1526324585411-e24d5ba61edd?q=80&w=1519&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Chine", img: "https://images.unsplash.com/photo-1508804052814-cd3ba865a116?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Corée du Nord", img: "https://images.unsplash.com/photo-1604360898901-ddcbeafab6ee?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Corée du Sud", img: "https://images.unsplash.com/photo-1583833008338-31a6657917ab?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Émirats Arabes Unis", img: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Inde", img: "https://images.unsplash.com/photo-1665888659015-0a50e60e938b?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Indonésie", img: "https://images.unsplash.com/photo-1501179691627-eeaa65ea017c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Irak", img: "https://images.unsplash.com/photo-1599498327587-91e82badc3c4?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Iran", img: "https://images.unsplash.com/photo-1606743056153-f48c4850b980?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Israël", img: "https://images.unsplash.com/photo-1614517453351-6c1522fc7a56?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Japon", img: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Jordanie", img: "https://images.unsplash.com/photo-1580834341580-8c17a3a630ca?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Kirghizistan", img: "https://images.unsplash.com/photo-1489421382202-f7ec0cfd96f7?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Koweït", img: "https://images.unsplash.com/photo-1650563401244-12028cd7ee4e?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Laos", img: "https://images.unsplash.com/photo-1540611025311-01df3cef54b5?q=80&w=1933&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Liban", img: "https://images.unsplash.com/photo-1596607808481-495f70aa5b26?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Malaisie", img: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=1464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Maldives", img: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Mongolie", img: "https://images.unsplash.com/photo-1575415868394-e3b78f3e9b3f?q=80&w=1999&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Népal", img: "https://images.unsplash.com/photo-1611516491426-03025e6043c8?q=80&w=1933&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Oman", img: "https://images.unsplash.com/photo-1585134339424-0fc98d0bfe86?q=80&w=1440&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Ouzbékistan", img: "https://images.unsplash.com/photo-1733586092622-1b3201e802a5?q=80&w=1325&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Pakistan", img: "https://images.unsplash.com/photo-1622546758596-f1f06ba11f58?q=80&w=1521&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Palestine", img: "https://images.unsplash.com/photo-1614517453351-6c1522fc7a56?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Philippines", img: "https://images.unsplash.com/photo-1531761535209-180857e963b9?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Qatar", img: "https://images.unsplash.com/photo-1700901742651-6b353164caf3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Singapour", img: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=1470&auto=format&fit=crop" },
    { name: "Sri Lanka", img: "https://images.unsplash.com/photo-1651264042769-ef84e30f4ac8?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Syrie", img: "https://images.unsplash.com/photo-1580310219243-dbad8c44e576?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Tadjikistan", img: "https://images.unsplash.com/photo-1690191985666-9e25f00763c0?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Taïwan", img: "https://images.unsplash.com/photo-1470004914212-05527e49370b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Thaïlande", img: "https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Timor oriental", img: "https://images.unsplash.com/photo-1707445305630-5962c1e9e1e9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Turkménistan", img: "https://images.unsplash.com/photo-1710225686183-018c79529669?q=80&w=1624&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Viêt Nam", img: "https://images.unsplash.com/photo-1609412058473-c199497c3c5d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Yémen", img: "https://images.unsplash.com/photo-1611907671216-7ec6ef949163?q=80&w=1434&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }
];
const countriesAmerica = [
    { name: "Antigua-et-Barbuda", img: "https://images.unsplash.com/photo-1579144955436-706cc4f0e70a?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Argentine", img: "https://images.unsplash.com/photo-1599094792743-7df3e8870800?q=80&w=1458&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Bahamas", img: "https://images.unsplash.com/photo-1589786161184-6d43d20526e2?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Barbade", img: "https://images.unsplash.com/photo-1626023523650-f9fe5e85cacc?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Belize", img: "https://images.unsplash.com/photo-1585543805890-6051f7829f98?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Bolivie", img: "https://images.unsplash.com/photo-1582986610555-7f5b1ecabab2?q=80&w=1338&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Brésil", img: "https://images.unsplash.com/photo-1518639192441-8fce0a366e2e?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Canada", img: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=1411&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Chili", img: "https://images.unsplash.com/photo-1689850543263-01a52ccc6943?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Colombie", img: "https://images.unsplash.com/photo-1583531352515-8884af319dc1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Q29sb21iaWV8ZW58MHwwfDB8fHww" },
    { name: "Costa Rica", img: "https://images.unsplash.com/photo-1586640866012-8273df34e593?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Cuba", img: "https://images.unsplash.com/photo-1503464093195-36b34a0869bd?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Dominique", img: "https://images.unsplash.com/photo-1548574505-5e239809ee19?q=80&w=400" },
    { name: "Équateur", img: "https://images.unsplash.com/photo-1606591808963-8fc3c63fa6a2?q=80&w=1402&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "États-Unis", img: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?q=80&w=400" },
    { name: "Grenade", img: "https://images.unsplash.com/photo-1730207892716-94467ca991b5?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Guatemala", img: "https://images.unsplash.com/photo-1606503809729-40646b716a36?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Guyana", img: "https://images.unsplash.com/photo-1595794038905-0b713525dead?q=80&w=1467&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Haïti", img: "https://images.unsplash.com/photo-1580741186862-c5d0bf2aff33?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Honduras", img: "https://images.unsplash.com/photo-1599807427405-945924b4bf21?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Jamaïque", img: "https://images.unsplash.com/photo-1605994543054-6ffbabbd8139?q=80&w=1325&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Mexique", img: "https://images.unsplash.com/photo-1521216774850-01bc1c5fe0da?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Nicaragua", img: "https://images.unsplash.com/photo-1599147092320-9ce79b36caa4?q=80&w=1559&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Panama", img: "https://images.unsplash.com/photo-1709653771859-e1e9516da54a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHBhbmFtYSUyMGNpdHklMjBwYW5hbWF8ZW58MHwwfDB8fHww" },
    { name: "Paraguay", img: "https://images.unsplash.com/photo-1708007736300-89c16fa57b40?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Pérou", img: "https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "République Dominicaine", img: "https://images.unsplash.com/photo-1592174887344-02ff9373ca55?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Saint-Christophe-et-Niévès", img: "https://images.unsplash.com/photo-1633107782766-bd7c8507ce41?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Saint-Vincent-et-les-Grenadines", img: "https://images.unsplash.com/photo-1579167149678-76415f24b197?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Sainte-Lucie", img: "https://images.unsplash.com/photo-1738079003703-c452210314f5?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Salvador", img: "https://images.unsplash.com/photo-1624864870794-1b1fc741e448?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Suriname", img: "https://images.unsplash.com/photo-1660758899283-3900e1d04f81?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Trinité-et-Tobago", img: "https://images.unsplash.com/photo-1607642875704-821b6eb0ba44?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Uruguay", img: "https://images.unsplash.com/photo-1589550552885-7ca9f2088974?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Venezuela", img: "https://images.unsplash.com/photo-1714594923299-e915b7d71701?q=80&w=2126&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }
];



const countriesAfrica = [
    { name: "Afrique du Sud", img: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Algérie", img: "https://images.unsplash.com/photo-1575664274476-e02d99195164?q=80&w=1631&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Cameroun", img: "https://images.unsplash.com/photo-1659947234309-804b7fa01cf2?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Côte d'Ivoire", img: "https://images.unsplash.com/photo-1508971607899-a238a095d417?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Égypte", img: "https://images.unsplash.com/photo-1600520611035-84157ad4084d?q=80&w=1631&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Éthiopie", img: "https://images.unsplash.com/photo-1572888195250-3037a59d3578?q=80&w=1500&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Kenya", img: "https://images.unsplash.com/photo-1519659528534-7fd733a832a0?q=80&w=1326&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Madagascar", img: "https://images.unsplash.com/photo-1570742544137-3a469196c32b?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Maroc", img: "https://images.unsplash.com/photo-1519594445471-0e5f86b3fb09?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Maurice", img: "https://images.unsplash.com/photo-1513415277900-a62401e19be4?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Namibie", img: "https://images.unsplash.com/photo-1506710507565-203b9f24669b?q=80&w=1491&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Nigéria", img: "https://images.unsplash.com/photo-1618828665011-0abd973f7bb8?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Sénégal", img: "https://images.unsplash.com/photo-1524518668639-e6cc8c13ca08?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Tanzanie", img: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1468&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Tunisie", img: "https://images.unsplash.com/photo-1665083767499-ce88decba1a2?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }
];

const countriesOceania = [
    { name: "Australie", img: "https://images.unsplash.com/photo-1524820197278-540916411e20?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8QXVzdHJhbGllfGVufDB8MHwwfHx8MA%3D%3D" },
    { name: "Fidji", img: "https://images.unsplash.com/photo-1516091877740-fde016699f2c?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Nouvelle-Zélande", img: "https://images.unsplash.com/photo-1465056836041-7f43ac27dcb5?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Papouasie-Nouvelle-Guinée", img: "https://images.unsplash.com/photo-1738932498296-b4ac7a99fabe?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Polynésie Française", img: "https://images.unsplash.com/photo-1652842183703-47c2f7bb8c3c?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }
];

// Fonction pour injecter les pays (pour éviter de répéter le code 5 fois)
function renderSection(list, elementId) {
    const wrapper = document.getElementById(elementId);
    if (!wrapper) return;

    list.forEach(country => {
        const urlId = country.name.toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/\s+/g, '-');

        const currentLang = getStoredLang();
        const displayNames = new Intl.DisplayNames([currentLang], { type: 'region' });
        const code = countryCodes[country.name];
        const displayName = (code && currentLang !== 'fr')
            ? (displayNames.of(code) || country.name)
            : country.name;

        const card = document.createElement('a');
        
        // On change la destination ici vers pays.html
        card.href = `pays/pays.html?id=${urlId}&lang=${currentLang}`;
        
        card.className = 'country-card';
        card.innerHTML = `
            <div class="country-image" style="background-image: url('${country.img}');"></div>
            <span class="country-name">${displayName}</span>
        `;
        
        wrapper.appendChild(card);
    });
}

// Lancement des injections
renderSection(countriesEurope, 'europe-wrapper');
renderSection(countriesAsia, 'asia-wrapper');
renderSection(countriesAmerica, 'america-wrapper');
renderSection(countriesAfrica, 'africa-wrapper');
renderSection(countriesOceania, 'oceania-wrapper');