// KOD SPECJALNIE DLA STRONY SIATKÓWKI
document.addEventListener('DOMContentLoaded', function() {
    console.log('🏐 Strona siatkówki załadowana');
    
    // Załaduj konfigurację
    loadSiteConfig();
    
    // Ustaw datę
    updateCurrentDate();
    
    // Załaduj wszystkie dane siatkówki
    loadVolleyballData();
    
    // Inicjalizuj filtry
    initVolleyballFilters();
});

// ============================================
// ŁADOWANIE KONFIGURACJI
// ============================================

function loadSiteConfig() {
    if (!window.siteConfig) return;
    
    // Ustaw tytuł strony
    document.title = `Siatkówka - ${window.siteConfig.siteTitle || 'Rozgrywki Międzyklasowe'}`;
    
    // Ustaw nazwę szkoły
    const schoolNameEl = document.getElementById('schoolName');
    if (schoolNameEl && window.siteConfig.schoolName) {
        schoolNameEl.textContent = window.siteConfig.schoolName;
    }
    
    // Ustaw dane w stopce
    setElementText('organizerName', window.siteConfig.organizer);
    setElementText('copyrightText', window.siteConfig.copyrightText);
}

function setElementText(id, text) {
    const element = document.getElementById(id);
    if (element && text) {
        element.textContent = text;
    }
}

// ============================================
// PODSTAWOWE FUNKCJE
// ============================================

function updateCurrentDate() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('currentDate').textContent = now.toLocaleDateString('pl-PL', options);
}

// ============================================
// ŁADOWANIE DANYCH SIATKÓWKI
// ============================================

function loadVolleyballData() {
    console.log('🏐 Ładowanie danych siatkówki...');
    
    // Załaduj tabelę ligową
    loadVolleyballStandings();
    
    // Załaduj mecze
    loadVolleyballMatches();
    
    // Załaduj statystyki
    loadVolleyballStats();
    
    // Załaduj wydarzenia
    loadVolleyballEvents();
    
    // Aktualizuj czas ostatniej aktualizacji
    updateLastUpdateTime();
}

function loadVolleyballStandings() {
    // Załaduj tabele obu grup
    loadGroupStandings('A');
    loadGroupStandings('B');
    
    // Ustaw domyślnie widok Grupy A
    showGroup('A');
    
    // Aktualizuj podsumowanie
    updateVolleyballSummary();
}

function loadGroupStandings(group) {
    const containerId = `group${group}Standings`;
    const container = document.getElementById(containerId);
    
    if (!container) return;
    
    container.innerHTML = '';
    
    // Pobierz dane grupy
    const groupKey = `Grupa ${group}`;
    const standings = window.volleyballGroupStandings?.[groupKey];
    
    if (!standings || standings.length === 0) {
        container.innerHTML = '<tr><td colspan="8">Brak danych grupy</td></tr>';
        return;
    }
    
    // Sortuj drużyny po punktach
    const sortedTeams = [...standings].sort((a, b) => b.Points - a.Points);
    
    // Wyświetl tabelę
    sortedTeams.forEach((team, index) => {
        const row = document.createElement('tr');
        
        // Oznacz tylko 2 pierwsze drużyny jako awansujące
        if (index < 2) {
            row.classList.add('advancing'); // Awans do fazy pucharowej
        } 
        // Oznacz ostatnie miejsce (opcjonalnie)
        else if (index === sortedTeams.length - 1) {
             // Ostatnie miejsce
        }
        // Pozostałe bez oznaczenia
        else {
            row.classList.add('middle');
        }
        
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>
                <strong class="team-name">${team.Team}</strong>
                <div class="team-class">${team.Class}</div>
            </td>
            <td>${team.Matches}</td>
            <td>${team.Wins}</td>
            <td>${team.Losses}</td>
            <td>${team.SetsFor}</td>
            <td>${team.SetsAgainst}</td>
            <td><strong>${team.Points}</strong></td>
        `;
        
        container.appendChild(row);
    });
}

function updateVolleyballSummary() {
    // Znajdź liderów obu grup
    const groupA = window.volleyballGroupStandings?.["Grupa A"];
    const groupB = window.volleyballGroupStandings?.["Grupa B"];
    
    let totalTeams = 0;
    let totalMatches = 0;
    let leaderText = '';
    
    if (groupA && groupA.length > 0) {
        totalTeams += groupA.length;
        const leaderA = [...groupA].sort((a, b) => b.Points - a.Points)[0];
        leaderText += `${leaderA.Team} (A)`;
        
        // Oblicz sumę meczów
        totalMatches += groupA.reduce((sum, team) => sum + team.Matches, 0) / 2;
    }
    
    if (groupB && groupB.length > 0) {
        totalTeams += groupB.length;
        const leaderB = [...groupB].sort((a, b) => b.Points - a.Points)[0];
        
        if (leaderText) leaderText += ' / ';
        leaderText += `${leaderB.Team} (B)`;
        
        // Oblicz sumę meczów
        totalMatches += groupB.reduce((sum, team) => sum + team.Matches, 0) / 2;
    }
    
    // Aktualizuj podsumowanie
    document.getElementById('totalTeams').textContent = totalTeams;
    document.getElementById('totalMatches').textContent = Math.floor(totalMatches);
    document.getElementById('leaderTeam').textContent = leaderText || '-';
}

function showGroup(group) {
    const groupABtn = document.getElementById('groupABtn');
    const groupBBtn = document.getElementById('groupBBtn');
    const allGroupsBtn = document.getElementById('allGroupsBtn');
    
    const groupATable = document.getElementById('groupATable');
    const groupBTable = document.getElementById('groupBTable');
    const allGroupsTable = document.getElementById('allGroupsTable');
    
    // Resetuj wszystkie przyciski
    [groupABtn, groupBBtn, allGroupsBtn].forEach(btn => btn?.classList.remove('active'));
    
    // Ukryj wszystkie tabele
    [groupATable, groupBTable, allGroupsTable].forEach(table => {
        if (table) table.style.display = 'none';
    });
    
    // Pokaż wybraną tabelę
    switch(group) {
        case 'A':
            if (groupATable) groupATable.style.display = 'block';
            if (groupABtn) groupABtn.classList.add('active');
            break;
            
        case 'B':
            if (groupBTable) groupBTable.style.display = 'block';
            if (groupBBtn) groupBBtn.classList.add('active');
            break;
            
        case 'all':
            if (allGroupsTable) {
                allGroupsTable.style.display = 'block';
                loadAllGroupsView();
            }
            if (allGroupsBtn) allGroupsBtn.classList.add('active');
            break;
    }
}

function loadAllGroupsView() {
    const container = document.getElementById('allGroupsTable');
    if (!container) return;
    
    const groupsGrid = container.querySelector('.groups-grid');
    if (!groupsGrid) return;
    
    // Wyczyść kontener
    groupsGrid.innerHTML = '';
    
    // Załaduj obie tabele obok siebie
    const groups = ['A', 'B'];
    
    groups.forEach(group => {
        const groupDiv = document.createElement('div');
        groupDiv.className = 'group-container';
        
        groupDiv.innerHTML = `
            <h3><i class="fas fa-users"></i> Grupa ${group}</h3>
            <div class="table-container">
                <table class="sports-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Drużyna</th>
                            <th>M</th>
                            <th>W</th>
                            <th>P</th>
                            <th>Sety +</th>
                            <th>Sety -</th>
                            <th>Punkty</th>
                        </tr>
                    </thead>
                    <tbody id="allGroups${group}Standings">
                        <!-- Wczyta dynamicznie -->
                    </tbody>
                </table>
            </div>
        `;
        
        groupsGrid.appendChild(groupDiv);
        
        // Załaduj dane do tej tabeli
        setTimeout(() => loadGroupForAllView(group), 0);
    });
}

function loadGroupForAllView(group) {
    const containerId = `allGroups${group}Standings`;
    const container = document.getElementById(containerId);
    
    if (!container) return;
    
    container.innerHTML = '';
    
    // Pobierz dane grupy
    const groupKey = `Grupa ${group}`;
    const standings = window.volleyballGroupStandings?.[groupKey];
    
    if (!standings || standings.length === 0) {
        container.innerHTML = '<tr><td colspan="8">Brak danych</td></tr>';
        return;
    }
    
    // Sortuj drużyny po punktach
    const sortedTeams = [...standings].sort((a, b) => b.Points - a.Points);
    
    // Wyświetl tabelę
    sortedTeams.forEach((team, index) => {
        const row = document.createElement('tr');
        
        // Oznacz tylko 2 pierwsze drużyny
        if (index < 2) {
            row.classList.add('advancing');
        } else if (index === sortedTeams.length - 1) {
            
        } else {
            row.classList.add('middle');
        }
        
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>
                <strong class="team-name">${team.Team}</strong>
                <div class="team-class">${team.Class}</div>
            </td>
            <td>${team.Matches}</td>
            <td>${team.Wins}</td>
            <td>${team.Losses}</td>
            <td>${team.SetsFor}</td>
            <td>${team.SetsAgainst}</td>
            <td><strong>${team.Points}</strong></td>
        `;
        
        container.appendChild(row);
    });
}

function loadVolleyballMatches() {
    const container = document.getElementById('volleyballMatches');
    const noDataMsg = document.getElementById('noVolleyballMatches');
    
    if (!container) return;
    
    container.innerHTML = '';
    
    // Pobierz mecze siatkówki
    const volleyballMatches = getVolleyballMatches();
    
    if (!volleyballMatches || volleyballMatches.length === 0) {
        container.innerHTML = '<div class="no-matches">Brak meczów siatkówki</div>';
        if (noDataMsg) noDataMsg.style.display = 'block';
        
        // Aktualizuj licznik meczów
        document.getElementById('totalMatches').textContent = 0;
        return;
    }
    
    if (noDataMsg) noDataMsg.style.display = 'none';
    
    // Aktualizuj licznik meczów
    document.getElementById('totalMatches').textContent = volleyballMatches.length;
    
    // Wyświetl mecze
    volleyballMatches.forEach(match => {
        const card = document.createElement('div');
        card.className = 'match-card';
        card.dataset.status = match.Status.toLowerCase();
        
        // Sprawdź status meczu
        const today = new Date().toISOString().split('T')[0];
        const isToday = match.Data === today || match.Status === 'Dzisiaj';
        
        if (isToday) {
            card.classList.add('today');
        } else if (match.Status === 'Zakończony') {
            card.classList.add('finished');
        }
        
        // Formatuj datę
        const formattedDate = formatMatchDate(match.Data);
        
        card.innerHTML = `
            <div class="match-header">
                <span class="match-sport">
                    <i class="fas fa-volleyball-ball"></i> Siatkówka
                </span>
                <span class="match-date">
                    <i class="far fa-calendar"></i> ${formattedDate} ${match.Godzina || ''}
                </span>
            </div>
            
            ${match.Miejsce ? `<div class="match-location"><i class="fas fa-map-marker-alt"></i> ${match.Miejsce}</div>` : ''}
            
            <div class="match-teams">
                <div class="team">
                    <span class="team-name">${match.Gospodarz || '?'}</span>
                    <span class="team-class">Gospodarz</span>
                </div>
                
                <div class="vs">vs</div>
                
                <div class="team">
                    <span class="team-name">${match.Gość || '?'}</span>
                    <span class="team-class">Gość</span>
                </div>
            </div>
            
            ${match.Wynik ? `
                <div class="match-result">
                    ${match.Wynik}
                </div>
                
                <div class="match-sets">
                    <small>Set: ${match.Sety || '?'}</small>
                </div>
            ` : `
                <div class="match-result">
                    vs
                </div>
            `}
            
            <div class="match-status ${isToday ? 'status-live' : (match.Status === 'Zakończony' ? 'status-finished' : 'status-upcoming')}">
                <i class="fas fa-circle"></i> ${isToday ? 'Dzisiaj' : (match.Status || 'Nadchodzący')}
            </div>
        `;
        
        container.appendChild(card);
    });
}

function loadVolleyballStats() {
    // Załaduj statystyki drużyn
    loadTeamStats();
    
    // Załaduj statystyki zawodników
    loadPlayerStats();
}

function loadTeamStats() {
    const volleyballTeams = getVolleyballTeams();
    
    if (!volleyballTeams || volleyballTeams.length === 0) return;
    
    // Znajdź najlepszą drużynę
    const bestTeam = [...volleyballTeams].sort((a, b) => b.Points - a.Points)[0];
    if (bestTeam) {
        document.getElementById('bestTeam').textContent = bestTeam.Team;
        document.getElementById('bestTeamDetail').textContent = `Punkty: ${bestTeam.Points}`;
    }
    
    // Znajdź najlepszą serię
    const bestStreakTeam = [...volleyballTeams].sort((a, b) => b.Streak - a.Streak)[0];
    if (bestStreakTeam && bestStreakTeam.Streak > 0) {
        document.getElementById('bestStreak').textContent = bestStreakTeam.Streak;
        document.getElementById('bestStreakDetail').textContent = bestStreakTeam.Team;
    }
    
    // Oblicz średnią setów
    let totalSets = 0;
    let totalMatches = 0;
    
    volleyballTeams.forEach(team => {
        totalSets += (team.SetsFor || 0) + (team.SetsAgainst || 0);
        totalMatches += team.Matches || 0;
    });
    
    const avgSets = totalMatches > 0 ? (totalSets / totalMatches / 2).toFixed(1) : '0.0';
    document.getElementById('avgSets').textContent = avgSets;
    
    // Najwyższy wynik (przykładowe dane)
    document.getElementById('highestScore').textContent = '25:12';
    document.getElementById('highestScoreDetail').textContent = '3A vs 2B';
}

function loadPlayerStats() {
    const table = document.getElementById('playerStatsTable');
    if (!table) return;
    
    table.innerHTML = '';
    
    // Przykładowe dane zawodników - można rozszerzyć w data.js
    const players = [
        { Name: 'Anna Kowalska', Class: '3A', Position: 'Rozgrywający', MVP: 3, Aces: 12, Blocks: 8 },
        { Name: 'Jan Nowak', Class: '4B', Position: 'Przyjmujący', MVP: 2, Aces: 8, Blocks: 5 },
        { Name: 'Katarzyna Wiśniewska', Class: '2A', Position: 'Atakujący', MVP: 4, Aces: 15, Blocks: 10 },
        { Name: 'Michał Lewandowski', Class: '3B', Position: 'Środkowy', MVP: 1, Aces: 5, Blocks: 12 },
        { Name: 'Aleksandra Dąbrowska', Class: '1A', Position: 'Libero', MVP: 0, Aces: 3, Blocks: 2 }
    ];
    
    players.forEach((player, index) => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>
                <strong>${player.Name}</strong>
            </td>
            <td>${player.Class}</td>
            <td>${player.Position}</td>
            <td><strong>${player.MVP}</strong></td>
            <td>${player.Aces}</td>
            <td>${player.Blocks}</td>
        `;
        
        table.appendChild(row);
    });
}

function loadVolleyballEvents() {
    const container = document.getElementById('volleyballEvents');
    const noDataMsg = document.getElementById('noEvents');
    
    if (!container) return;
    
    container.innerHTML = '';
    
    // Przykładowe wydarzenia - można przenieść do data.js
    const events = [
        { date: '2025-12-15', title: 'Ćwiczenia doskonalące', description: 'Trening techniczny dla wszystkich drużyn', type: 'training' },
        { date: '2025-12-20', title: 'Turniej świąteczny', description: 'Mikołajkowy turniej siatkówki', type: 'tournament' },
        { date: '2026-01-10', title: 'Mistrzostwa szkoły', description: 'Finał rozgrywek międzyklasowych', type: 'final' },
        { date: '2026-01-15', title: 'Nagrody i wyróżnienia', description: 'Rozdanie nagród dla najlepszych', type: 'awards' }
    ];
    
    if (events.length === 0) {
        container.innerHTML = '<div class="no-events">Brak wydarzeń</div>';
        if (noDataMsg) noDataMsg.style.display = 'block';
        return;
    }
    
    if (noDataMsg) noDataMsg.style.display = 'none';
    
    events.forEach(event => {
        const eventEl = document.createElement('div');
        eventEl.className = `event-item event-${event.type}`;
        
        // Formatuj datę
        const eventDate = new Date(event.date);
        const formattedDate = eventDate.toLocaleDateString('pl-PL', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
        
        eventEl.innerHTML = `
            <div class="event-date">
                <i class="far fa-calendar"></i>
                <span>${formattedDate}</span>
            </div>
            <div class="event-content">
                <h3>${event.title}</h3>
                <p>${event.description}</p>
            </div>
            <div class="event-type">
                ${event.type === 'training' ? '<i class="fas fa-dumbbell"></i> Trening' : 
                  event.type === 'tournament' ? '<i class="fas fa-trophy"></i> Turniej' :
                  event.type === 'final' ? '<i class="fas fa-flag-checkered"></i> Finał' :
                  '<i class="fas fa-award"></i> Nagrody'}
            </div>
        `;
        
        container.appendChild(eventEl);
    });
}

// ============================================
// FUNKCJE POMOCNICZE DLA SIATKÓWKI
// ============================================

function getVolleyballTeams() {
    if (!window.teamData) return [];
    
    // Filtruj drużyny z punktami w siatkówce i generuj dane tabeli
    const volleyballTeams = window.teamData
        .filter(team => team.SIATA > 0)
        .map(team => {
            // Generuj losowe dale statystyczne dla demonstracji
            // W rzeczywistej implementacji te dane powinny być w data.js
            const matches = Math.floor(Math.random() * 10) + 1;
            const wins = Math.floor(Math.random() * matches);
            const losses = matches - wins;
            const setsFor = wins * 3 + Math.floor(Math.random() * 3);
            const setsAgainst = losses * 3 + Math.floor(Math.random() * 3);
            
            // Generuj losową formę (W - wygrana, P - przegrana)
            const form = [];
            for (let i = 0; i < 5; i++) {
                form.push(Math.random() > 0.5 ? 'W' : 'P');
            }
            
            return {
                Team: team.Nazwa || team.Klasa,
                Class: team.Klasa,
                Points: team.SIATA,
                Matches: matches,
                Wins: wins,
                Losses: losses,
                SetsFor: setsFor,
                SetsAgainst: setsAgainst,
                Streak: Math.floor(Math.random() * 5),
                Form: form.join('')
            };
        });
    
    return volleyballTeams;
}

function getVolleyballMatches() {
    if (!window.matchData) return [];
    
    // Filtruj tylko mecze siatkówki
    return window.matchData.filter(match => 
        match.Dyscyplina === 'Siatkówka' || 
        match.Dyscyplina === 'siatkówka' ||
        match.Dyscyplina === 'SIATA'
    );
}

function formatMatchDate(dateString) {
    if (!dateString) return '';
    
    try {
        const date = new Date(dateString);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        if (date.toDateString() === today.toDateString()) {
            return 'Dzisiaj';
        } else if (date.toDateString() === tomorrow.toDateString()) {
            return 'Jutro';
        } else {
            return date.toLocaleDateString('pl-PL', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
        }
    } catch {
        return dateString;
    }
}

function generateFormIcons(formString) {
    if (!formString) return '';
    
    let icons = '';
    for (let i = 0; i < formString.length; i++) {
        if (formString[i] === 'W') {
            icons += '<span class="form-win" title="Wygrana">W</span>';
        } else if (formString[i] === 'P') {
            icons += '<span class="form-loss" title="Przegrana">P</span>';
        } else {
            icons += '<span class="form-draw" title="Remis">R</span>';
        }
    }
    return icons;
}

function updateLastUpdateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' });
    document.getElementById('lastUpdateTime').textContent = timeString;
}

// ============================================
// FUNKCJE INTERAKTYWNE
// ============================================

function initVolleyballFilters() {
    // Event listener dla filtrowania meczów
    const matchFilter = document.getElementById('matchFilter');
    if (matchFilter) {
        matchFilter.addEventListener('change', filterMatches);
    }
}

function filterMatches() {
    const filterValue = document.getElementById('matchFilter')?.value || 'all';
    const matchCards = document.querySelectorAll('#volleyballMatches .match-card');
    
    let visibleCount = 0;
    
    matchCards.forEach(card => {
        const status = card.dataset.status;
        
        switch (filterValue) {
            case 'upcoming':
                if (status === 'nadchodzący' || status === 'planowany') {
                    card.style.display = '';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
                break;
                
            case 'finished':
                if (status === 'zakończony') {
                    card.style.display = '';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
                break;
                
            case 'today':
                if (status === 'dzisiaj' || card.classList.contains('today')) {
                    card.style.display = '';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
                break;
                
            default: // 'all'
                card.style.display = '';
                visibleCount++;
        }
    });
    
    // Pokaż komunikat jeśli brak wyników
    const noMatchesMsg = document.getElementById('noVolleyballMatches');
    if (noMatchesMsg) {
        if (visibleCount === 0 && matchCards.length > 0) {
            noMatchesMsg.style.display = 'block';
        } else {
            noMatchesMsg.style.display = 'none';
        }
    }
}

function showStats(type) {
    const teamStatsBtn = document.getElementById('teamStatsBtn');
    const playerStatsBtn = document.getElementById('playerStatsBtn');
    const teamStats = document.getElementById('teamStats');
    const playerStats = document.getElementById('playerStats');
    
    if (type === 'teams') {
        teamStats.style.display = '';
        playerStats.style.display = 'none';
        teamStatsBtn.classList.add('active');
        playerStatsBtn.classList.remove('active');
    } else {
        teamStats.style.display = 'none';
        playerStats.style.display = '';
        teamStatsBtn.classList.remove('active');
        playerStatsBtn.classList.add('active');
    }
}

function refreshVolleyballMatches() {
    loadVolleyballMatches();
    showNotification('Mecze zostały odświeżone', 'success');
}

function refreshAllVolleyballData() {
    console.log('🔄 Odświeżanie danych siatkówki...');
    
    // Pokaż animację ładowania
    const refreshBtn = document.querySelector('[onclick="refreshAllVolleyballData()"]');
    if (refreshBtn) {
        const originalHtml = refreshBtn.innerHTML;
        refreshBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Ładowanie...';
        refreshBtn.disabled = true;
        
        // Symuluj ładowanie
        setTimeout(() => {
            loadVolleyballData();
            refreshBtn.innerHTML = originalHtml;
            refreshBtn.disabled = false;
            showNotification('Dane siatkówki zostały odświeżone!', 'success');
        }, 800);
    } else {
        loadVolleyballData();
        showNotification('Dane siatkówki zostały odświeżone!', 'success');
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4caf50' : '#2196f3'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
    
    // Dodaj animacje CSS jeśli nie istnieją
    if (!document.querySelector('#notification-animations')) {
        const style = document.createElement('style');
        style.id = 'notification-animations';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

// ============================================
// EKSPORT FUNKCJI DO HTML
// ============================================

window.filterMatches = filterMatches;
window.showStats = showStats;
window.refreshVolleyballMatches = refreshVolleyballMatches;
window.refreshAllVolleyballData = refreshAllVolleyballData;
window.loadVolleyballEvents = loadVolleyballEvents;

// ============================================
// DRABINKA PUCHAROWA
// ============================================

function loadBracket() {
    console.log('🏆 Ładowanie drabinki pucharowej...');
    
    const bracketSection = document.getElementById('bracketSection');
    const bracket = window.volleyballBracket;
    
    if (!bracket || !bracketSection) return;
    
    // Sprawdź czy drabinka jest aktywna
    if (bracket.isActive) {
        bracketSection.style.display = 'block';
        document.getElementById('currentPhase').textContent = bracket.phase;
        
        // Załaduj drabinkę
        renderBracket();
        
        // Załaduj historię mistrzów
        loadChampionsHistory();
        
        // Pokaż przycisk drabinki
        document.getElementById('showBracketBtn').style.display = 'inline-block';
    } else {
        // Drabinka nieaktywna - pokaż tylko sekcję z informacją
        bracketSection.style.display = 'block';
        document.getElementById('currentPhase').textContent = "Faza grupowa";
        document.getElementById('showBracketBtn').style.display = 'inline-block';
    }
}

function renderBracket() {
    const container = document.getElementById('volleyballBracket');
    if (!container) return;
    
    const bracket = window.volleyballBracket;
    if (!bracket || !bracket.matches) return;
    
    container.innerHTML = '';
    
    // Grupuj mecze według rund
    const rounds = {};
    bracket.matches.forEach(match => {
        if (!rounds[match.round]) {
            rounds[match.round] = [];
        }
        rounds[match.round].push(match);
    });
    
    // Sortuj rundy
    const sortedRounds = Object.keys(rounds).sort((a, b) => a - b);
    
    // Utwórz drabinkę
    sortedRounds.forEach(roundNumber => {
        const roundDiv = document.createElement('div');
        roundDiv.className = 'bracket-round';
        
        const roundName = getRoundName(parseInt(roundNumber));
        roundDiv.innerHTML = `<h4>${roundName}</h4>`;
        
        const matchesContainer = document.createElement('div');
        matchesContainer.className = 'round-matches';
        
        rounds[roundNumber].forEach(match => {
            const matchEl = createMatchElement(match);
            matchesContainer.appendChild(matchEl);
        });
        
        roundDiv.appendChild(matchesContainer);
        container.appendChild(roundDiv);
    });
}

function createMatchElement(match) {
    const matchEl = document.createElement('div');
    matchEl.className = `bracket-match match-status-${match.status.toLowerCase()}`;
    matchEl.dataset.matchId = `${match.round}-${match.matchNumber}`;
    
    // Określ klasę CSS na podstawie statusu
    let statusClass = '';
    switch(match.status) {
        case 'Zakończony':
            statusClass = 'match-finished';
            break;
        case 'W trakcie':
            statusClass = 'match-live';
            break;
        case 'Zaplanowany':
            statusClass = 'match-scheduled';
            break;
        default:
            statusClass = 'match-pending';
    }
    
    // Sprawdź czy to mecz finałowy
    const isFinal = match.round === 3 && match.matchNumber === 1;
    const isThirdPlace = match.round === 3 && match.matchNumber === 2;
    
    if (isFinal) {
        matchEl.classList.add('match-final');
    } else if (isThirdPlace) {
        matchEl.classList.add('match-third-place');
    }
    
    // Formatuj datę
    const matchDate = match.date ? new Date(match.date) : null;
    const formattedDate = matchDate ? matchDate.toLocaleDateString('pl-PL', {
        day: '2-digit',
        month: '2-digit'
    }) : '';
    
    matchEl.innerHTML = `
        <div class="match-header">
            <span class="match-number">Mecz ${match.matchNumber}</span>
            ${formattedDate ? `<span class="match-date">${formattedDate} ${match.time || ''}</span>` : ''}
        </div>
        
        <div class="match-teams">
            <div class="team ${match.winner === match.team1 ? 'team-winner' : ''}">
                <span class="team-name">${match.team1}</span>
                ${match.score ? `<span class="team-score">${getTeamScore(match.score, 1)}</span>` : ''}
            </div>
            
            <div class="team ${match.winner === match.team2 ? 'team-winner' : ''}">
                <span class="team-name">${match.team2}</span>
                ${match.score ? `<span class="team-score">${getTeamScore(match.score, 2)}</span>` : ''}
            </div>
        </div>
        
        ${match.score ? `<div class="match-result">${match.score}</div>` : ''}
        
        <div class="match-status ${statusClass}">
            <i class="fas fa-circle"></i> ${match.status}
        </div>
        
        <button class="btn-match-details" onclick="showMatchDetails(${match.round}, ${match.matchNumber})">
            <i class="fas fa-info-circle"></i> Szczegóły
        </button>
    `;
    
    return matchEl;
}

function getRoundName(roundNumber) {
    switch(roundNumber) {
        case 1: return 'Ćwierćfinały';
        case 2: return 'Półfinały';
        case 3: return 'Finały';
        default: return `Runda ${roundNumber}`;
    }
}

function getTeamScore(score, teamNumber) {
    if (!score) return '';
    const scores = score.split(':');
    return scores[teamNumber - 1] || '';
}

function loadChampionsHistory() {
    const table = document.getElementById('championsTable');
    if (!table) return;
    
    const history = window.volleyballBracket?.championsHistory;
    if (!history) return;
    
    table.innerHTML = '';
    
    // Sortuj malejąco po roku
    const sortedHistory = [...history].sort((a, b) => b.year - a.year);
    
    sortedHistory.forEach(champion => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${champion.year}</strong></td>
            <td>
                <strong class="champion-name">${champion.champion}</strong>
                <span class="champion-badge"><i class="fas fa-crown"></i> Mistrz</span>
            </td>
            <td>${champion.runnerUp}</td>
            <td><strong>${champion.score}</strong></td>
        `;
        table.appendChild(row);
    });
}

function showMatchDetails(round, matchNumber) {
    const bracket = window.volleyballBracket;
    if (!bracket || !bracket.matches) return;
    
    const match = bracket.matches.find(m => 
        m.round === round && m.matchNumber === matchNumber
    );
    
    if (!match) return;
    
    // Formatuj pełną datę
    const matchDate = match.date ? new Date(match.date) : null;
    const formattedDate = matchDate ? matchDate.toLocaleDateString('pl-PL', {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    }) : 'Nie ustalono';
    
    // Określ miejsce (przykładowe)
    const venue = match.round === 3 ? 'Hala Główna' : 'Hala Sportowa';
    
    const modalContent = `
        <div class="match-detail-header">
            <h4>${getRoundName(match.round)} - Mecz ${match.matchNumber}</h4>
            <span class="match-detail-date">${formattedDate} • ${match.time || '--:--'}</span>
        </div>
        
        <div class="match-detail-teams">
            <div class="detail-team ${match.winner === match.team1 ? 'detail-winner' : ''}">
                <div class="detail-team-name">${match.team1}</div>
                <div class="detail-team-class">${getTeamClass(match.team1)}</div>
            </div>
            
            <div class="detail-vs">vs</div>
            
            <div class="detail-team ${match.winner === match.team2 ? 'detail-winner' : ''}">
                <div class="detail-team-name">${match.team2}</div>
                <div class="detail-team-class">${getTeamClass(match.team2)}</div>
            </div>
        </div>
        
        ${match.score ? `
            <div class="match-detail-score">
                <h5>Wynik</h5>
                <div class="score-display">${match.score}</div>
                <div class="score-winner">
                    <i class="fas fa-trophy"></i>
                    Zwycięzca: <strong>${match.winner || 'Nie rozstrzygnięto'}</strong>
                </div>
            </div>
        ` : `
            <div class="match-detail-upcoming">
                <h5>Mecz zaplanowany</h5>
                <p><i class="fas fa-map-marker-alt"></i> Miejsce: ${venue}</p>
                <p><i class="fas fa-clock"></i> Czas trwania: ok. 90 minut</p>
            </div>
        `}
        
        <div class="match-detail-info">
            <h5>Informacje dodatkowe</h5>
            <div class="info-grid">
                <div class="info-item">
                    <i class="fas fa-flag"></i>
                    <span>Status: <strong>${match.status}</strong></span>
                </div>
                <div class="info-item">
                    <i class="fas fa-calendar"></i>
                    <span>Runda: <strong>${getRoundName(match.round)}</strong></span>
                </div>
                <div class="info-item">
                    <i class="fas fa-basketball-ball"></i>
                    <span>Dyscyplina: <strong>Siatkówka</strong></span>
                </div>
                <div class="info-item">
                    <i class="fas fa-users"></i>
                    <span>Format: <strong>${match.round === 3 ? 'Mecz finałowy' : 'Pucharowy'}</strong></span>
                </div>
            </div>
        </div>
        
        <div class="match-detail-actions">
            <button onclick="updateMatchScore(${match.round}, ${match.matchNumber})" class="btn-modal-action">
                <i class="fas fa-edit"></i> Edytuj wynik
            </button>
            <button onclick="simulateMatch(${match.round}, ${match.matchNumber})" class="btn-modal-action">
                <i class="fas fa-play"></i> Symuluj mecz
            </button>
            <button onclick="closeMatchModal()" class="btn-modal-close">
                Zamknij
            </button>
        </div>
    `;
    
    document.getElementById('matchModalTitle').textContent = `${getRoundName(match.round)} - Mecz ${match.matchNumber}`;
    document.getElementById('matchModalBody').innerHTML = modalContent;
    
    // Pokaż modal
    document.getElementById('matchDetailsModal').style.display = 'block';
}

function getTeamClass(teamName) {
    // Pobierz klasę z nazwy drużyny
    const match = teamName.match(/\((\d+[A-Z])\)/);
    return match ? match[1] : 'Nieznana';
}

function toggleBracketVisibility(show) {
    const bracketContainer = document.getElementById('bracketContainer');
    const showBtn = document.getElementById('showBracketBtn');
    const hideBtn = document.getElementById('hideBracketBtn');
    const bracket = window.volleyballBracket;
    
    if (show) {
        // Sprawdź czy drabinka jest aktywna
        if (bracket && bracket.isActive) {
            bracketContainer.style.display = 'block';
            showBtn.style.display = 'none';
            hideBtn.style.display = 'inline-block';
        } else {
            alert('Drabinka pucharowa zostanie aktywowana po zakończeniu fazy grupowej!');
        }
    } else {
        bracketContainer.style.display = 'none';
        showBtn.style.display = 'inline-block';
        hideBtn.style.display = 'none';
    }
}

function closeMatchModal() {
    document.getElementById('matchDetailsModal').style.display = 'none';
}

function refreshBracket() {
    // Przeładuj drabinkę
    renderBracket();
    showNotification('Drabinka została odświeżona', 'success');
}

function updateMatchScore(round, matchNumber) {
    const match = window.volleyballBracket.matches.find(m => 
        m.round === round && m.matchNumber === matchNumber
    );
    
    if (!match) return;
    
    const score = prompt(`Podaj wynik meczu ${match.team1} vs ${match.team2} (format: 3:1):`, match.score || '');
    
    if (score !== null) {
        // Walidacja wyniku
        if (score.match(/^\d+:\d+$/)) {
            match.score = score;
            match.status = 'Zakończony';
            
            // Określ zwycięzcę
            const [score1, score2] = score.split(':').map(Number);
            match.winner = score1 > score2 ? match.team1 : match.team2;
            
            // Zaktualizuj następne mecze
            updateNextMatches(round, matchNumber, match.winner);
            
            // Przeładuj drabinkę
            renderBracket();
            showNotification('Wynik meczu został zaktualizowany', 'success');
        } else {
            alert('Nieprawidłowy format wyniku! Użyj formatu: 3:1');
        }
    }
}

function updateNextMatches(round, matchNumber, winner) {
    // Ta funkcja aktualizuje następne mecze w drabince
    const bracket = window.volleyballBracket;
    
    if (round === 1) {
        // Ćwierćfinały → Półfinały
        if (matchNumber === 1) {
            const nextMatch = bracket.matches.find(m => m.round === 2 && m.matchNumber === 1);
            if (nextMatch) {
                nextMatch.team1 = winner;
                nextMatch.status = 'Zaplanowany';
            }
        } else if (matchNumber === 2) {
            const nextMatch = bracket.matches.find(m => m.round === 2 && m.matchNumber === 1);
            if (nextMatch) {
                nextMatch.team2 = winner;
                nextMatch.status = 'Zaplanowany';
            }
        } else if (matchNumber === 3) {
            const nextMatch = bracket.matches.find(m => m.round === 2 && m.matchNumber === 2);
            if (nextMatch) {
                nextMatch.team1 = winner;
                nextMatch.status = 'Zaplanowany';
            }
        } else if (matchNumber === 4) {
            const nextMatch = bracket.matches.find(m => m.round === 2 && m.matchNumber === 2);
            if (nextMatch) {
                nextMatch.team2 = winner;
                nextMatch.status = 'Zaplanowany';
            }
        }
    } else if (round === 2) {
        // Półfinały → Finał i mecz o 3 miejsce
        if (matchNumber === 1) {
            const finalMatch = bracket.matches.find(m => m.round === 3 && m.matchNumber === 1);
            const thirdPlaceMatch = bracket.matches.find(m => m.round === 3 && m.matchNumber === 2);
            
            if (finalMatch) finalMatch.team1 = winner;
            if (thirdPlaceMatch) thirdPlaceMatch.team1 = `Przegrany PF${matchNumber}`;
        } else if (matchNumber === 2) {
            const finalMatch = bracket.matches.find(m => m.round === 3 && m.matchNumber === 1);
            const thirdPlaceMatch = bracket.matches.find(m => m.round === 3 && m.matchNumber === 2);
            
            if (finalMatch) finalMatch.team2 = winner;
            if (thirdPlaceMatch) thirdPlaceMatch.team2 = `Przegrany PF${matchNumber}`;
        }
    }
}

function simulateMatch(round, matchNumber) {
    const match = window.volleyballBracket.matches.find(m => 
        m.round === round && m.matchNumber === matchNumber
    );
    
    if (!match || match.status === 'Zakończony') return;
    
    // Symuluj losowy wynik
    const setsTeam1 = Math.floor(Math.random() * 2) + 1; // 1-2
    const setsTeam2 = setsTeam1 === 1 ? 3 : (Math.random() > 0.5 ? 3 : 2); // 2 lub 3
    
    const score = `${setsTeam1}:${setsTeam2}`;
    const winner = setsTeam1 > setsTeam2 ? match.team1 : match.team2;
    
    // Zaktualizuj mecz
    match.score = score;
    match.winner = winner;
    match.status = 'Zakończony';
    
    // Zaktualizuj następne mecze
    updateNextMatches(round, matchNumber, winner);
    
    // Przeładuj drabinkę
    renderBracket();
    showNotification(`Mecz zasymulowany! Wynik: ${score}`, 'success');
}

// Dodaj do funkcji loadVolleyballData():
function loadVolleyballData() {
    console.log('🏐 Ładowanie danych siatkówki...');
    
    // Załaduj tabele obu grup
    loadGroupStandings('A');
    loadGroupStandings('B');
    
    // Ustaw domyślnie widok Grupy A
    showGroup('A');
    
    // Załaduj drabinkę
    loadBracket();
    
    // Załaduj mecze
    loadVolleyballMatches();
    
    // Załaduj statystyki
    loadVolleyballStats();
    
    // Załaduj wydarzenia
    loadVolleyballEvents();
    
    // Aktualizuj podsumowanie
    updateVolleyballSummary();
    
    // Aktualizuj czas ostatniej aktualizacji
    updateLastUpdateTime();
}