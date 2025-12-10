// ============================================
// PLIK Z WSZYSTKIMI DANYMI
// EDYTUJ TYLKO TEN PLIK!
// ============================================

// KONFIGURACJA STRONY
window.siteConfig = {
    // Ustawienia strony
    siteTitle: "Rozgrywki Międzyklasowe 2025",
    schoolName: "Liceum Ogólnokształcące im. Stanisława Staszica",
    heroTitle: "Witamy w rozgrywkach!",
    heroSubtitle: "Śledź na żywo wyniki i klasyfikację drużyn",
    
    // Dane kontaktowe
    organizer: "Samorząd Uczniowski",
    supervisor: "name",
    contactEmail: "rozgrywki@szkola.pl",
    contactInstagram: "@rozgrywki_szkolne",
    contactPhone: "+48 123 456 789",
    
    // Teksty stopki
    copyrightText: "© 2024 Rozgrywki Międzyklasowe LO. Wszystkie prawa zastrzeżone.",
    appVersion: "1.0",
    systemVersion: "1.0",
    
    // Data zakończenia rozgrywek (do odliczania)
    endDate: "2026-06-30T23:59:59"
};

// ============================================
// DRUŻYNY I KLASYFIKACJA GENERALNA
// ============================================

window.teamData = [
    // FORMAT: {Klasa: '1A', Nazwa: 'NazwaDrużyny', PN: punkty, KOSZ: punkty, SIATA: punkty, SUMA: suma}
    // UWAGA: SUMA oblicza się automatycznie z PN+KOSZ+SIATA
    
    // PRZYKŁAD - EDYTUJ TE DANE:
    { Klasa: '1A', Nazwa: 'Feniksy', PN: 1, KOSZ: 5, SIATA: 0 },
    { Klasa: '1B', Nazwa: 'Smoki', PN: 6, KOSZ: 12, SIATA: 9 },
    { Klasa: '2A', Nazwa: 'Wilki', PN: 9, KOSZ: 15, SIATA: 6 },
    { Klasa: '2B', Nazwa: 'Jastrzębie', PN: 4, KOSZ: 10, SIATA: 12 },
    { Klasa: '3A', Nazwa: 'Orły', PN: 15, KOSZ: 18, SIATA: 12 },
    { Klasa: '3B', Nazwa: 'Sokoły', PN: 1, KOSZ: 6, SIATA: 3 },
    { Klasa: '4A', Nazwa: 'Lwy', PN: 3, KOSZ: 9, SIATA: 6 },
    { Klasa: '4B', Nazwa: 'Tygrysy', PN: 12, KOSZ: 20, SIATA: 15 }
    
    // DODAJ WIĘCEJ DRUŻYN WEDŁUG WZORU:
    // { Klasa: '4C', Nazwa: 'TwojaNazwa', PN: 0, KOSZ: 0, SIATA: 0 },
];

// ============================================
// MECZE
// ============================================

window.matchData = [
    // FORMAT: {Data: 'YYYY-MM-DD', Godzina: 'HH:MM', Dyscyplina: 'Piłka nożna/Siatkówka/Koszykówka', Gospodarz: 'Klasa', Gość: 'Klasa', Wynik: 'np. 2:1', Status: 'Nadchodzący/Dzisiaj/Zakończony', Miejsce: 'Boisko/Hala'}
    
    // PRZYKŁAD - EDYTUJ TE DANE:
    { 
        Data: '2025-12-12', 
        Godzina: '10:00', 
        Dyscyplina: 'Piłka nożna', 
        Gospodarz: '1B', 
        Gość: '1A', 
        Wynik: 'Wynik',
        Status: 'Nadchodzący',
        Miejsce: 'Boisko szkolne'
    },
    { 
        Data: '2025-12-16', 
        Godzina: '11:30', 
        Dyscyplina: 'Siatkówka', 
        Gospodarz: '2B', 
        Gość: '2A', 
        Wynik: '2:0',
        Status: 'Nadchodzący',
        Miejsce: 'Boisko szkolne'
    },
    { 
        // Dzisiejsza data - automatycznie pokaże się jako "Dzisiaj"
        Data: new Date().toISOString().split('T')[0],
        Godzina: '14:30', 
        Dyscyplina: 'Siatkówka', 
        Gospodarz: '3B', 
        Gość: '3A', 
        Wynik: '',
        Status: 'Dzisiaj',
        Miejsce: 'Hala sportowa'
    },
    { 
        Data: '2024-02-17', 
        Godzina: '10:00', 
        Dyscyplina: 'Koszykówka', 
        Gospodarz: '4A', 
        Gość: '3B', 
        Wynik: '',
        Status: 'Planowany',
        Miejsce: 'Hala sportowa'
    }
    
    // DODAJ WIĘCEJ MECZÓW WEDŁUG WZORU:
    // { Data: '2024-02-20', Godzina: '15:00', Dyscyplina: 'Piłka nożna', Gospodarz: '3A', Gość: '4B', Wynik: '2:1', Status: 'Zakończony', Miejsce: 'Boisko' },
];

// ============================================
// STATYSTYKI DYSCYPLIN
// ============================================

window.sportStats = {
    // Statystyki piłki nożnej
    football: {
        totalMatches: 8,
        totalGoals: 32,
        topScorer: "Jan Kowalski (3A) - 8 bramek",
        leadingTeam: "Orły (3A)",
        // Dodatkowe statystyki
        averageGoals: 4.0,
        completedMatches: 6,
        upcomingMatches: 2
    },
    
    // Statystyki siatkówki
    volleyball: {
        totalMatches: 6,
        totalSets: 18,
        averageSets: 3.0,
        leadingTeam: "Tygrysy (4B)",
        // Dodatkowe statystyki
        completedMatches: 4,
        upcomingMatches: 2,
        bestSetScore: "25:12"
    },
    
    // Statystyki koszykówki
    basketball: {
        totalMatches: 4,
        totalPoints: 240,
        averagePoints: 60.0,
        topScorer: "Tomasz Kowalski (4B) - 58 punktów",
        leadingTeam: "Tygrysy (4B)",
        // Dodatkowe statystyki
        completedMatches: 2,
        upcomingMatches: 2,
        highestScore: "78:65"
    }
};

// ============================================
// OGŁOSZENIA
// ============================================

window.announcements = [
    // FORMAT: {title: 'Tytuł', content: 'Treść', date: 'Data', type: 'important/info/success', icon: 'fa-icon'}
    
    {
        title: "Ważne! Zgody rodziców",
        content: "Wszystkie drużyny muszą dostarczyć zgody rodziców do piątku (16.02.2024).",
        date: "Dzisiaj, 10:30",
        type: "important",
        icon: "fa-exclamation-circle"
    },
    {
        title: "Zmiana terminu meczu",
        content: "Mecz 3A vs 4B został przełożony z 15.02 na 22.02.2024 (godz. 11:30).",
        date: "Wczoraj, 15:45",
        type: "info",
        icon: "fa-info-circle"
    },
    {
        title: "Nagrody dla zwycięzców",
        content: "Zwycięska klasa otrzyma puchar przechodni i bony do sklepiku szkolnego.",
        date: "2 dni temu",
        type: "success",
        icon: "fa-trophy"
    },
    {
        title: "Zdjęcia z rozgrywek",
        content: "Zdjęcia z meczów będą publikowane na szkolnym Instagramie @rozgrywki_szkolne.",
        date: "3 dni temu",
        type: "info",
        icon: "fa-camera"
    }
    
    // DODAJ WIĘCEJ OGŁOSZEŃ:
    // {title: 'Nowy regulamin', content: 'Opublikowano nowy regulamin rozgrywek.', date: 'Data', type: 'info', icon: 'fa-file-alt'},
];

// ============================================
// FUNKCJE POMOCNICZE (NIE EDYTUJ!)
// ============================================

// Oblicza SUMĘ punktów dla każdej drużyny
function calculateTeamTotals() {
    if (!window.teamData) return [];
    
    return window.teamData.map(team => {
        return {
            ...team,
            SUMA: (parseInt(team.PN) || 0) + (parseInt(team.KOSZ) || 0) + (parseInt(team.SIATA) || 0)
        };
    });
}

// Zwraca posortowaną klasyfikację
function getSortedStandings() {
    const teamsWithTotals = calculateTeamTotals();
    return teamsWithTotals.sort((a, b) => b.SUMA - a.SUMA);
}

// Filtruje nadchodzące mecze (dzisiaj + 3 dni)
function getUpcomingMatches() {
    if (!window.matchData) return [];
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const threeDaysLater = new Date(today);
    threeDaysLater.setDate(threeDaysLater.getDate() + 3);
    
    return window.matchData.filter(match => {
        if (!match.Data || match.Status === 'Zakończony') return false;
        
        try {
            const matchDate = new Date(match.Data);
            matchDate.setHours(0, 0, 0, 0);
            
            const isToday = match.Status === 'Dzisiaj' || matchDate.getTime() === today.getTime();
            const isUpcoming = matchDate >= today && matchDate <= threeDaysLater;
            
            return isToday || isUpcoming;
        } catch {
            return false;
        }
    }).sort((a, b) => new Date(a.Data) - new Date(b.Data));
}

console.log('✅ Plik danych załadowany!');
console.log('Drużyny:', window.teamData.length);
console.log('Mecze:', window.matchData.length);
console.log('Ogłoszenia:', window.announcements.length);

// ============================================
// DODAJ TE DANE DO ISTNIEJĄCEGO data.js
// ============================================

// ============================================
// SZCZEGÓŁOWE DANE O DRUŻYNACH
// ============================================

window.teamDetails = [
    // FORMAT:
    // Klasa: musi być taka sama jak w teamData
    // Logo: URL do logo (może być puste)
    // Opis: krótki opis drużyny
    // Motto: motto drużyny
    // Barwy: kolory drużyny
    // Rok_utworzenia: kiedy powstała drużyna
    // Sukcesy: lista osiągnięć
    
    {
        Klasa: '1A',
        Logo: '',
    },
    {
        Klasa: '1B',
        Logo: '',
    },
    {
        Klasa: '2A',
        Logo: '',
    },
    {
        Klasa: '2B',
        Logo: '',
        Opis: 'Dynamiczna drużyna znana z dobrych występów w siatkówce. Szybkie ataki to ich znak firmowy.',
        Motto: 'Wzloty jak jastrzębie!',
        Barwy: 'Brązowy i pomarańczowy',
        Rok_utworzenia: 2022,
        Sukcesy: ['I miejsce w lidze siatkarskiej 2023', 'Najlepsza drużyna fair play']
    },
    {
        Klasa: '3A',
        Logo: '',
        Opis: 'Aktualni liderzy rankingu. Dominują w piłce nożnej, ale nieźle radzą sobie też w innych dyscyplinach.',
        Motto: 'Orły zawsze na szczycie!',
        Barwy: 'Biały i niebieski',
        Rok_utworzenia: 2021,
        Sukcesy: ['Mistrzostwo w piłce nożnej 2023', 'II miejsce w klasyfikacji generalnej 2023', 'Król strzelców 2023 - Jan Kowalski']
    },
    {
        Klasa: '3B',
        Logo: '',
        Opis: 'Wyspecjalizowani w koszykówce. Indywidualne umiejętności graczy to ich największy atut.',
        Motto: 'Wzloty i upadki - ważne, by się podnieść!',
        Barwy: 'Błękitny i srebrny',
        Rok_utworzenia: 2021,
        Sukcesy: ['Mistrzostwo w koszykówce 2023', 'Najlepszy zawodnik - Tomasz Nowak']
    },
    {
        Klasa: '4A',
        Logo: '',
        Opis: 'Doświadczona drużyna maturzystów. Chcą zakończyć szkolną karierę z przytupem.',
        Motto: 'Siła lwa w każdym z nas!',
        Barwy: 'Złoty i brązowy',
        Rok_utworzenia: 2020,
        Sukcesy: ['Wicemistrzostwo w siatkówce 2022', 'III miejsce w klasyfikacji generalnej 2022']
    },
    {
        Klasa: '4B',
        Logo: '',
        Opis: 'Aktualni mistrzowie w klasyfikacji generalnej. Zespół wszechstronny, groźny w każdej dyscyplinie.',
        Motto: 'Tygrysia determinacja prowadzi do zwycięstwa!',
        Barwy: 'Pomarańczowy i czarny',
        Rok_utworzenia: 2020,
        Sukcesy: ['Mistrzostwo w klasyfikacji generalnej 2023', 'I miejsce w koszykówce 2023', 'I miejsce w siatkówce 2023', 'Najlepsza drużyna roku 2023']
    }
];

// ============================================
// DANE ZAWODNIKÓW DLA KAŻDEJ DRUŻYNY
// ============================================

window.playersData = [
    // FORMAT: {Klasa: '1A', Zawodnicy: [{Imię: 'Jan', Nazwisko: 'Kowalski', Pozycja: 'Bramkarz', Numer: 1, Wzrost: 180, Waga: 75}], Kapitan: 'Imię Nazwisko'}
    
    {
        Klasa: '1A',
        Kapitan: 'Jan Nowak',
        Zawodnicy: [
            { Imię: 'Jan', Nazwisko: 'Nowak', Pozycja: 'Kapitan', Numer: 1, Wzrost: 175, Waga: 70 },
            { Imię: 'Piotr', Nazwisko: 'Kowalski', Pozycja: 'Napastnik', Numer: 9, Wzrost: 180, Waga: 75 },
            { Imię: 'Anna', Nazwisko: 'Wiśniewska', Pozycja: 'Pomocnik', Numer: 7, Wzrost: 168, Waga: 60 },
            { Imię: 'Krzysztof', Nazwisko: 'Wójcik', Pozycja: 'Obrońca', Numer: 4, Wzrost: 185, Waga: 80 },
            { Imię: 'Marta', Nazwisko: 'Kowalczyk', Pozycja: 'Bramkarz', Numer: 12, Wzrost: 170, Waga: 65 }
        ]
    },
    {
        Klasa: '1B',
        Kapitan: 'Anna Kowal',
        Zawodnicy: [
            { Imię: 'Anna', Nazwisko: 'Kowal', Pozycja: 'Kapitan', Numer: 10, Wzrost: 172, Waga: 68 },
            { Imię: 'Krzysztof', Nazwisko: 'Wójcik', Pozycja: 'Rozgrywający', Numer: 2, Wzrost: 182, Waga: 78 },
            { Imię: 'Marta', Nazwisko: 'Kamińska', Pozycja: 'Atakujący', Numer: 15, Wzrost: 176, Waga: 72 }
        ]
    },
    {
        Klasa: '2A',
        Kapitan: 'Piotr Test',
        Zawodnicy: [
            { Imię: 'Piotr', Nazwisko: 'Test', Pozycja: 'Kapitan', Numer: 8, Wzrost: 178, Waga: 74 },
            { Imię: 'Maciej', Nazwisko: 'Zieliński', Pozycja: 'Skrzydłowy', Numer: 11, Wzrost: 185, Waga: 82 },
            { Imię: 'Karolina', Nazwisko: 'Szymańska', Pozycja: 'Środkowy', Numer: 5, Wzrost: 188, Waga: 85 }
        ]
    },
    {
        Klasa: '2B',
        Kapitan: 'Marta Lis',
        Zawodnicy: [
            { Imię: 'Marta', Nazwisko: 'Lis', Pozycja: 'Kapitan', Numer: 3, Wzrost: 174, Waga: 69 },
            { Imię: 'Kamil', Nazwisko: 'Jankowski', Pozycja: 'Libero', Numer: 6, Wzrost: 180, Waga: 76 },
            { Imię: 'Aleksandra', Nazwisko: 'Dąbrowska', Pozycja: 'Przyjmujący', Numer: 14, Wzrost: 177, Waga: 71 }
        ]
    },
    {
        Klasa: '3A',
        Kapitan: 'Krzysztof K.',
        Zawodnicy: [
            { Imię: 'Krzysztof', Nazwisko: 'K.', Pozycja: 'Kapitan', Numer: 7, Wzrost: 182, Waga: 77 },
            { Imię: 'Adam', Nazwisko: 'Nowak', Pozycja: 'Napastnik', Numer: 9, Wzrost: 185, Waga: 80 },
            { Imię: 'Julia', Nazwisko: 'Kowalczyk', Pozycja: 'Obrońca', Numer: 4, Wzrost: 170, Waga: 65 },
            { Imię: 'Mikołaj', Nazwisko: 'Piotrowski', Pozycja: 'Pomocnik', Numer: 10, Wzrost: 178, Waga: 73 }
        ]
    },
    {
        Klasa: '3B',
        Kapitan: 'Alicja M.',
        Zawodnicy: [
            { Imię: 'Alicja', Nazwisko: 'M.', Pozycja: 'Kapitan', Numer: 5, Wzrost: 176, Waga: 68 },
            { Imię: 'Mateusz', Nazwisko: 'Wiśniewski', Pozycja: 'Rozgrywający', Numer: 8, Wzrost: 190, Waga: 85 },
            { Imię: 'Zuzanna', Nazwisko: 'Wójcik', Pozycja: 'Środkowy', Numer: 12, Wzrost: 184, Waga: 78 }
        ]
    },
    {
        Klasa: '4A',
        Kapitan: 'Tomasz Z.',
        Zawodnicy: [
            { Imię: 'Tomasz', Nazwisko: 'Z.', Pozycja: 'Kapitan', Numer: 13, Wzrost: 183, Waga: 79 },
            { Imię: 'Patryk', Nazwisko: 'Lewandowski', Pozycja: 'Skrzydłowy', Numer: 9, Wzrost: 187, Waga: 83 },
            { Imię: 'Natalia', Nazwisko: 'Zielińska', Pozycja: 'Obrotowy', Numer: 7, Wzrost: 179, Waga: 72 }
        ]
    },
    {
        Klasa: '4B',
        Kapitan: 'Karolina P.',
        Zawodnicy: [
            { Imię: 'Karolina', Nazwisko: 'P.', Pozycja: 'Kapitan', Numer: 11, Wzrost: 175, Waga: 70 },
            { Imię: 'Wiktor', Nazwisko: 'Woźniak', Pozycja: 'Rozgrywający', Numer: 6, Wzrost: 192, Waga: 88 },
            { Imię: 'Martyna', Nazwisko: 'Jankowska', Pozycja: 'Środkowy', Numer: 15, Wzrost: 186, Waga: 81 },
            { Imię: 'Filip', Nazwisko: 'Dąbrowski', Pozycja: 'Przyjmujący', Numer: 3, Wzrost: 184, Waga: 79 }
        ]
    }
];

// ============================================
// GRUPY SIATKÓWKI
// ============================================

window.volleyballGroups = {
    // FORMAT: Grupa: [array klas w grupie]
    "Grupa A": ["1A", "2A", "3A", "4A"],
    "Grupa B": ["1B", "2B", "3B", "4B"]
    // Możesz dodać więcej grup
    // "Grupa C": ["1C", "2C", "3C", "4C"]
};

// Statystyki z podziałem na grupy
window.volleyballGroupStandings = {
    "Grupa A": [
        { Team: "Orły", Class: "3A", Points: 12, Matches: 6, Wins: 4, Losses: 2, SetsFor: 14, SetsAgainst: 8, Streak: 2 },
        { Team: "Lwy", Class: "4A", Points: 9, Matches: 6, Wins: 3, Losses: 3, SetsFor: 11, SetsAgainst: 10, Streak: 1 },
        { Team: "Wilki", Class: "2A", Points: 8, Matches: 6, Wins: 2, Losses: 4, SetsFor: 9, SetsAgainst: 12, Streak: -1 },
        { Team: "Feniksy", Class: "1A", Points: 7, Matches: 6, Wins: 1, Losses: 5, SetsFor: 7, SetsAgainst: 14, Streak: -2 }
    ],
    "Grupa B": [
        { Team: "Tygrysy", Class: "4B", Points: 15, Matches: 6, Wins: 5, Losses: 1, SetsFor: 16, SetsAgainst: 5, Streak: 3 },
        { Team: "Jastrzębie", Class: "2B", Points: 12, Matches: 6, Wins: 4, Losses: 2, SetsFor: 13, SetsAgainst: 9, Streak: 2 },
        { Team: "Smoki", Class: "1B", Points: 9, Matches: 6, Wins: 3, Losses: 3, SetsFor: 11, SetsAgainst: 11, Streak: 0 },
        { Team: "Sokoły", Class: "3B", Points: 6, Matches: 6, Wins: 0, Losses: 6, SetsFor: 5, SetsAgainst: 16, Streak: -3 }
    ]
};

// ============================================
// DRABINKA PUCHAROWA SIATKÓWKI
// ============================================

window.volleyballBracket = {
    // Status drabinki
    isActive: false, // Zmień na true po zakończeniu fazy grupowej
    phase: "Ćwierćfinały", // Możliwe wartości: Ćwierćfinały, Półfinały, Finał, Zakończone
    
    // Mecze drabinki
    matches: [
        // FORMAT: 
        // round: numer rundy (1-4)
        // matchNumber: numer meczu w rundzie
        // team1: drużyna 1
        // team2: drużyna 2
        // score: wynik
        // winner: zwycięzca
        // date: data meczu
        // status: "Zaplanowany"/"Oczekujący"/"Zakończony"
        
        // ĆWIERĆFINAŁY (round: 1)
        {
            round: 1,
            matchNumber: 1,
            team1: "1. Grupa A",
            team2: "4. Grupa B",
            score: "",
            winner: "",
            date: "2026-01-15",
            time: "10:00",
            status: "Zaplanowany"
        },
        {
            round: 1,
            matchNumber: 2,
            team1: "2. Grupa B",
            team2: "3. Grupa A",
            score: "",
            winner: "",
            date: "2026-01-15",
            time: "12:00",
            status: "Zaplanowany"
        },
        {
            round: 1,
            matchNumber: 3,
            team1: "1. Grupa B",
            team2: "4. Grupa A",
            score: "",
            winner: "",
            date: "2026-01-15",
            time: "14:00",
            status: "Zaplanowany"
        },
        {
            round: 1,
            matchNumber: 4,
            team1: "2. Grupa A",
            team2: "3. Grupa B",
            score: "",
            winner: "",
            date: "2026-01-15",
            time: "16:00",
            status: "Zaplanowany"
        },
        
        // PÓŁFINAŁY (round: 2) - automatycznie wypełnią się po ćwierćfinałach
        {
            round: 2,
            matchNumber: 1,
            team1: "Zwycięzca M1",
            team2: "Zwycięzca M2",
            score: "",
            winner: "",
            date: "2026-01-22",
            time: "10:00",
            status: "Oczekujący"
        },
        {
            round: 2,
            matchNumber: 2,
            team1: "Zwycięzca M3",
            team2: "Zwycięzca M4",
            score: "",
            winner: "",
            date: "2026-01-22",
            time: "12:00",
            status: "Oczekujący"
        },
        
        // FINAŁ (round: 3)
        {
            round: 3,
            matchNumber: 1,
            team1: "Zwycięzca PF1",
            team2: "Zwycięzca PF2",
            score: "",
            winner: "",
            date: "2026-01-29",
            time: "14:00",
            status: "Oczekujący"
        },
        
        // MECZ O 3 MIEJSCE (round: 3)
        {
            round: 3,
            matchNumber: 2,
            team1: "Przegrany PF1",
            team2: "Przegrany PF2",
            score: "",
            winner: "",
            date: "2026-01-29",
            time: "12:00",
            status: "Oczekujący"
        }
    ],
    
    
};

// ============================================
// FUNKCJE POMOCNICZE DLA DRUŻYN (NIE EDYTUJ!)
// ============================================

// Pobiera szczegóły drużyny na podstawie klasy
function getTeamDetails(klasa) {
    return window.teamDetails?.find(team => team.Klasa === klasa) || {};
}

// Pobiera zawodników drużyny na podstawie klasy
function getTeamPlayers(klasa) {
    return window.playersData?.find(team => team.Klasa === klasa) || { Zawodnicy: [], Kapitan: '' };
}

// Pobiera punkty drużyny z klasyfikacji generalnej
function getTeamPoints(klasa) {
    const team = window.teamData?.find(t => t.Klasa === klasa);
    if (!team) return { PN: 0, KOSZ: 0, SIATA: 0, SUMA: 0 };
    
    return {
        PN: team.PN || 0,
        KOSZ: team.KOSZ || 0,
        SIATA: team.SIATA || 0,
        SUMA: (team.PN || 0) + (team.KOSZ || 0) + (team.SIATA || 0)
    };
}

// Pobiera dyscypliny w których startuje drużyna
function getTeamSports(klasa) {
    const team = window.teamData?.find(t => t.Klasa === klasa);
    if (!team) return [];
    
    const sports = [];
    if (team.PN > 0) sports.push('PN');
    if (team.KOSZ > 0) sports.push('KOSZ');
    if (team.SIATA > 0) sports.push('SIATA');
    
    return sports;
}
// ============================================
// DANE SPECJALNIE DLA SIATKÓWKI
// ============================================

// Statystyki meczów siatkówki
window.volleyballMatchDetails = [
    // FORMAT: { Data: 'YYYY-MM-DD', Gospodarz: 'Klasa', Gość: 'Klasa', Wynik: '3:1', Sety: '25:20, 22:25, 25:18, 25:21', MVP: 'Imię Nazwisko' }
    
    {
        Data: '2025-10-15',
        Gospodarz: '3A',
        Gość: '2B',
        Wynik: '3:1',
        Sety: '25:20, 22:25, 25:18, 25:21',
        MVP: 'Anna Kowalska (3A)',
        Uwagi: 'Dobry mecz obu drużyn'
    },
    {
        Data: '2025-12-12',
        Gospodarz: '4B',
        Gość: '1A',
        Wynik: '3:0',
        Sety: '25:12, 25:15, 25:18',
        MVP: 'Jan Nowak (4B)',
        Uwagi: 'Dominacja gospodarzy'
    },
    {
        Data: '2025-10-25',
        Gospodarz: '2A',
        Gość: '3B',
        Wynik: '3:2',
        Sety: '25:23, 20:25, 25:27, 25:22, 15:12',
        MVP: 'Katarzyna Wiśniewska (2A)',
        Uwagi: 'Mecz pięciu setów, bardzo emocjonujący'
    },
    {
        Data: '2025-11-05',
        Gospodarz: '1B',
        Gość: '4A',
        Wynik: '1:3',
        Sety: '18:25, 25:23, 20:25, 19:25',
        MVP: 'Michał Lewandowski (4A)',
        Uwagi: 'Goście lepsi w kluczowych momentach'
    }
];

console.log('✅ Dane siatkówki załadowane!');
console.log('Szczegóły meczów:', window.volleyballMatchDetails?.length || 0);
console.log('Statystyki zawodników:', window.volleyballPlayerStats?.length || 0);
console.log('✅ Dane drużyn załadowane!');
console.log('Szczegóły drużyn:', window.teamDetails.length);
console.log('Zawodnicy:', window.playersData.length);