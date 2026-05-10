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

const container = document.querySelector('.countries-scroll-container');
const wrapper = document.getElementById('europe-wrapper');

if (wrapper) {
    countriesEurope.forEach(country => {
        const urlName = country.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-');
        
        const card = document.createElement('a');
        card.href = `pays/${urlName}.html`;
        card.className = 'country-card';

        card.innerHTML = `
            <div class="country-image" style="background-image: url('${country.img}');"></div>
            <span class="country-name">${country.name}</span>
        `;

        wrapper.appendChild(card);
    });
}

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
    { name: "Afghanistan", img: "https://images.unsplash.com/photo-1589146144014-72436f852aa5?q=80&w=1470&auto=format&fit=crop" },
    { name: "Arabie Saoudite", img: "https://images.unsplash.com/photo-1586724230021-4c2bf648aa4c?q=80&w=1470&auto=format&fit=crop" },
    { name: "Bahreïn", img: "https://images.unsplash.com/photo-1549944850-84e00be4203b?q=80&w=1470&auto=format&fit=crop" },
    { name: "Bangladesh", img: "https://images.unsplash.com/photo-1585938389612-a552a28d6914?q=80&w=1470&auto=format&fit=crop" },
    { name: "Bhoutan", img: "https://images.unsplash.com/photo-1578516125863-306d649d83a1?q=80&w=1470&auto=format&fit=crop" },
    { name: "Birmanie", img: "https://images.unsplash.com/photo-1543739446-402096037203?q=80&w=1470&auto=format&fit=crop" },
    { name: "Brunei", img: "https://images.unsplash.com/photo-1629806411350-2340ee97448a?q=80&w=1470&auto=format&fit=crop" },
    { name: "Cambodge", img: "https://images.unsplash.com/photo-1500049222539-6593a38001d5?q=80&w=1470&auto=format&fit=crop" },
    { name: "Chine", img: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?q=80&w=1470&auto=format&fit=crop" },
    { name: "Corée du Nord", img: "https://images.unsplash.com/photo-1570191913384-5b4306346747?q=80&w=1470&auto=format&fit=crop" },
    { name: "Corée du Sud", img: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=1470&auto=format&fit=crop" },
    { name: "Émirats Arabes Unis", img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1470&auto=format&fit=crop" },
    { name: "Inde", img: "https://images.unsplash.com/photo-1524492707943-5da365b11a27?q=80&w=1470&auto=format&fit=crop" },
    { name: "Indonésie", img: "https://images.unsplash.com/photo-1518548419970-58e3b40e9bd1?q=80&w=1470&auto=format&fit=crop" },
    { name: "Irak", img: "https://images.unsplash.com/photo-1531589184190-27e1db1d4d8b?q=80&w=1470&auto=format&fit=crop" },
    { name: "Iran", img: "https://images.unsplash.com/photo-1527126887308-6cee83674330?q=80&w=1470&auto=format&fit=crop" },
    { name: "Israël", img: "https://images.unsplash.com/photo-1544971587-b842c27f8e14?q=80&w=1470&auto=format&fit=crop" },
    { name: "Japon", img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1470&auto=format&fit=crop" },
    { name: "Jordanie", img: "https://images.unsplash.com/photo-1547235033-926fe7f5d7cf?q=80&w=1470&auto=format&fit=crop" },
    { name: "Kirghizistan", img: "https://images.unsplash.com/photo-1569530593440-e48dc1841329?q=80&w=1470&auto=format&fit=crop" },
    { name: "Koweït", img: "https://images.unsplash.com/photo-1614713568397-b33b79363766?q=80&w=1470&auto=format&fit=crop" },
    { name: "Laos", img: "https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=1470&auto=format&fit=crop" },
    { name: "Liban", img: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1470&auto=format&fit=crop" },
    { name: "Malaisie", img: "https://images.unsplash.com/photo-1523073158913-90d522708306?q=80&w=1470&auto=format&fit=crop" },
    { name: "Maldives", img: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1470&auto=format&fit=crop" },
    { name: "Mongolie", img: "https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=1470&auto=format&fit=crop" },
    { name: "Népal", img: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1470&auto=format&fit=crop" },
    { name: "Oman", img: "https://images.unsplash.com/photo-1544191696-102dbdaeeaa0?q=80&w=1470&auto=format&fit=crop" },
    { name: "Ouzbékistan", img: "https://images.unsplash.com/photo-1528533321320-0eaef9e5744c?q=80&w=1470&auto=format&fit=crop" },
    { name: "Pakistan", img: "https://images.unsplash.com/photo-1527786356703-4b100091cd2c?q=80&w=1470&auto=format&fit=crop" },
    { name: "Palestine", img: "https://images.unsplash.com/photo-1561490431-7d1900139772?q=80&w=1470&auto=format&fit=crop" },
    { name: "Philippines", img: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=80&w=1470&auto=format&fit=crop" },
    { name: "Qatar", img: "https://images.unsplash.com/photo-1510665724063-f77a99b5105b?q=80&w=1470&auto=format&fit=crop" },
    { name: "Singapour", img: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=1470&auto=format&fit=crop" },
    { name: "Sri Lanka", img: "https://images.unsplash.com/photo-1523438097201-512ae7d59c44?q=80&w=1470&auto=format&fit=crop" },
    { name: "Syrie", img: "https://images.unsplash.com/photo-1536489885071-87983c3e2859?q=80&w=1470&auto=format&fit=crop" },
    { name: "Tadjikistan", img: "https://images.unsplash.com/photo-1555502621-39655845bc7a?q=80&w=1470&auto=format&fit=crop" },
    { name: "Taïwan", img: "https://images.unsplash.com/photo-1470004914212-05527e49370b?q=80&w=1470&auto=format&fit=crop" },
    { name: "Thaïlande", img: "https://images.unsplash.com/photo-1528181304800-2f1258bb9f35?q=80&w=1470&auto=format&fit=crop" },
    { name: "Timor oriental", img: "https://images.unsplash.com/photo-1516108317508-6788f6a160e6?q=80&w=1470&auto=format&fit=crop" },
    { name: "Turkménistan", img: "https://images.unsplash.com/photo-1629806411350-2340ee97448a?q=80&w=1470&auto=format&fit=crop" },
    { name: "Viêt Nam", img: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1470&auto=format&fit=crop" },
    { name: "Yémen", img: "https://images.unsplash.com/photo-1540810903332-9080dc687056?q=80&w=1470&auto=format&fit=crop" }
];

const asiaWrapper = document.getElementById('asia-wrapper');

if (asiaWrapper) {
    countriesAsia.forEach(country => {
        const urlName = country.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-');
        
        const card = document.createElement('a');
        card.href = `pays/${urlName}.html`;
        card.className = 'country-card';

        card.innerHTML = `
            <div class="country-image" style="background-image: url('${country.img}');"></div>
            <span class="country-name">${country.name}</span>
        `;

        asiaWrapper.appendChild(card);
    });
}