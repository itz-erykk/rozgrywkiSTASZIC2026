// KOD SPECJALNIE DLA STRONY DRUŻYN - POPRAWIONY
document.addEventListener('DOMContentLoaded', function() {
    console.log('👥 Strona drużyn załadowana');
    
    // Załaduj konfigurację
    loadSiteConfig();
    
    // Ustaw datę
    updateCurrentDate();
    
    // Załaduj wszystkie dane
    loadAllTeamsData();
    
    // Inicjalizuj filtry
    initFilters();
    
    // Ustaw domyślny widok
    setViewMode('grid');
});

// ============================================
// ŁADOWANIE KONFIGURACJI
// ============================================

function loadSiteConfig() {
    if (!window.siteConfig) return;
    
    // Ustaw tytuł strony
    document.title = `Drużyny - ${window.siteConfig.siteTitle || 'Rozgrywki Międzyklasowe'}`;
    
    // Ustaw nazwę szkoły
    const schoolNameEl = document.getElementById('schoolName');
    if (schoolNameEl && window.siteConfig.schoolName) {
        schoolNameEl.textContent = window.siteConfig.schoolName;
    }
    
    // Ustaw dane kontaktowe w stopce
    setElementText('organizerName', window.siteConfig.organizer);
    setElementText('contactEmail', window.siteConfig.contactEmail);
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
// ŁADOWANIE DANYCH DRUŻYN
// ============================================

function loadAllTeamsData() {
    console.log('👥 Ładowanie danych drużyn...');
    
    // Sprawdź czy mamy dane
    if (!window.teamData || window.teamData.length === 0) {
        showNoDataMessage();
        return;
    }
    
    // Oblicz statystyki
    calculateSummaryStats();
    
    // Wypełnij listę klas w filtrze
    populateClassFilter();
    
    // Wypełnij listę dyscyplin w filtrze
    populateSportFilter();
    
    // Załaduj drużyny
    loadTeamsGrid();
    loadTeamsList();
}

function calculateSummaryStats() {
    if (!window.teamData) return;
    
    // Liczba drużyn
    document.getElementById('totalTeams').textContent = window.teamData.length;
    
    // Liczba zawodników
    let totalPlayers = 0;
    if (window.playersData) {
        window.playersData.forEach(team => {
            totalPlayers += team.Zawodnicy?.length || 0;
        });
    }
    document.getElementById('totalPlayers').textContent = totalPlayers;
    
    // Aktualny mistrz (drużyna z najwyższą sumą punktów)
    const standings = getSortedStandings();
    if (standings.length > 0) {
        const champion = standings[0];
        document.getElementById('championTeam').textContent = champion.Nazwa || champion.Klasa;
    }
}

function populateClassFilter() {
    const classFilter = document.getElementById('classFilter');
    if (!classFilter || !window.teamData) return;
    
    // Pobierz unikalne klasy
    const classes = [...new Set(window.teamData.map(team => team.Klasa))].sort();
    
    // Dodaj opcje do selecta
    classes.forEach(klasa => {
        const option = document.createElement('option');
        option.value = klasa;
        option.textContent = klasa;
        classFilter.appendChild(option);
    });
}

function populateSportFilter() {
    const sportFilter = document.getElementById('sportFilter');
    if (!sportFilter) return;
    
    // Opcje dyscyplin
    const sports = [
        { value: 'all', text: 'Wszystkie dyscypliny' },
        { value: 'PN', text: 'Piłka nożna' },
        { value: 'SIATA', text: 'Siatkówka' },  // ZMIENIONE z SIAT na SIATA
        { value: 'KOSZ', text: 'Koszykówka' }
    ];
    
    // Dodaj opcje do selecta
    sports.forEach(sport => {
        const option = document.createElement('option');
        option.value = sport.value;
        option.textContent = sport.text;
        sportFilter.appendChild(option);
    });
}

function initFilters() {
    // Event listener dla wyszukiwarki
    const searchInput = document.getElementById('teamSearch');
    if (searchInput) {
        searchInput.addEventListener('input', filterTeams);
    }
    
    // Event listener dla filtrów
    const sportFilter = document.getElementById('sportFilter');
    const classFilter = document.getElementById('classFilter');
    
    if (sportFilter) sportFilter.addEventListener('change', filterTeams);
    if (classFilter) classFilter.addEventListener('change', filterTeams);
}

// ============================================
// WYSWIETLANIE DRUŻYN
// ============================================

function loadTeamsGrid() {
    const container = document.getElementById('teamsGridContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (!window.teamData || window.teamData.length === 0) {
        container.innerHTML = '<div class="no-teams">Brak danych o drużynach</div>';
        return;
    }
    
    // Sortuj drużyny alfabetycznie po nazwie
    const sortedTeams = [...window.teamData].sort((a, b) => {
        const nameA = a.Nazwa || a.Klasa;
        const nameB = b.Nazwa || b.Klasa;
        return nameA.localeCompare(nameB);
    });
    
    // Wyświetl każdą drużynę jako kafelek
    sortedTeams.forEach(team => {
        const teamCard = createTeamCard(team);
        container.appendChild(teamCard);
    });
}

function loadTeamsList() {
    const table = document.getElementById('teamsListTable');
    if (!table) return;
    
    table.innerHTML = '';
    
    if (!window.teamData || window.teamData.length === 0) {
        table.innerHTML = '<tr><td colspan="7">Brak danych o drużynach</td></tr>';
        return;
    }
    
    // Sortuj drużyny alfabetycznie
    const sortedTeams = [...window.teamData].sort((a, b) => {
        const nameA = a.Nazwa || a.Klasa;
        const nameB = b.Nazwa || b.Klasa;
        return nameA.localeCompare(nameB);
    });
    
    // Wyświetl jako tabelę
    sortedTeams.forEach(team => {
        const row = createTeamListRow(team);
        table.appendChild(row);
    });
}

function createTeamCard(team) {
    const card = document.createElement('div');
    card.className = 'team-card';
    card.dataset.klasa = team.Klasa;
    
    // Pobierz dyscypliny w których drużyna ma punkty
    const sports = getTeamSports(team.Klasa);
    card.dataset.sports = sports.join(',');
    
    // Pobierz dodatkowe dane
    const details = getTeamDetails(team.Klasa);
    const players = getTeamPlayers(team.Klasa);
    const points = getTeamPoints(team.Klasa);
    
    // Utwórz ikony dyscyplin
    let sportsHtml = '';
    sports.forEach(sport => {
        const sportIcon = getSportIcon(sport);
        if (sportIcon) {
            sportsHtml += `<span class="team-sport-icon" title="${getSportName(sport)}"><i class="fas ${sportIcon}"></i></span>`;
        }
    });
    
    card.innerHTML = `
        <div class="team-card-header">
            <div class="team-logo-placeholder">
                <i class="fas fa-users"></i>
            </div>
            <div class="team-card-title">
                <h3>${team.Nazwa || team.Klasa}</h3>
                <span class="team-class">${team.Klasa}</span>
            </div>
        </div>
        
        <div class="team-card-content">
            <div class="team-info">
                <div class="team-info-item">
                    <i class="fas fa-user-friends"></i>
                    <span>${players.Zawodnicy?.length || 0} zawodników</span>
                </div>
                <div class="team-info-item">
                    <i class="fas fa-user-tie"></i>
                    <span>Kapitan: ${players.Kapitan || 'Brak'}</span>
                </div>
                <div class="team-info-item">
                    <i class="fas fa-trophy"></i>
                    <span>Punkty: ${points.SUMA}</span>
                </div>
            </div>
            
            <div class="team-sports">
                ${sportsHtml || '<span class="no-sports">Brak dyscyplin</span>'}
            </div>
        </div>
        
        <div class="team-card-footer">
            <button onclick="showTeamDetails('${team.Klasa}')" class="btn-team-details">
                <i class="fas fa-info-circle"></i> Szczegóły
            </button>
            <button onclick="showTeamPlayers('${team.Klasa}')" class="btn-team-players">
                <i class="fas fa-list"></i> Skład
            </button>
        </div>
    `;
    
    return card;
}

function createTeamListRow(team) {
    const row = document.createElement('tr');
    row.dataset.klasa = team.Klasa;
    
    // Pobierz dyscypliny
    const sports = getTeamSports(team.Klasa);
    row.dataset.sports = sports.join(',');
    
    const players = getTeamPlayers(team.Klasa);
    const points = getTeamPoints(team.Klasa);
    
    // Formatuj dyscypliny
    const sportsText = sports.map(s => getSportName(s)).join(', ');
    
    row.innerHTML = `
        <td>
            <strong>${team.Nazwa || team.Klasa}</strong>
            <div class="team-class-small">${team.Klasa}</div>
        </td>
        <td>${team.Klasa}</td>
        <td>${sportsText || 'Brak'}</td>
        <td>${players.Kapitan || 'Brak'}</td>
        <td>${players.Zawodnicy?.length || 0}</td>
        <td><strong>${points.SUMA}</strong></td>
        <td>
            <button onclick="showTeamDetails('${team.Klasa}')" class="btn-action">
                <i class="fas fa-eye"></i>
            </button>
            <button onclick="showTeamPlayers('${team.Klasa}')" class="btn-action">
                <i class="fas fa-users"></i>
            </button>
        </td>
    `;
    
    return row;
}

// ============================================
// FILTROWANIE I WYSZUKIWANIE - POPRAWIONE!
// ============================================

function filterTeams() {
    const searchTerm = document.getElementById('teamSearch')?.value.toLowerCase() || '';
    const sportFilter = document.getElementById('sportFilter')?.value || 'all';
    const classFilter = document.getElementById('classFilter')?.value || 'all';
    
    console.log('Filtrowanie:', { searchTerm, sportFilter, classFilter });
    
    // Pokaż/ukryj kafelki
    const cards = document.querySelectorAll('.team-card');
    let visibleCount = 0;
    
    cards.forEach(card => {
        const teamName = card.querySelector('h3')?.textContent.toLowerCase() || '';
        const teamClass = card.dataset.klasa || '';
        const teamSports = card.dataset.sports ? card.dataset.sports.split(',') : [];
        
        console.log(`Drużyna: ${teamName}, dyscypliny: ${teamSports}`);
        
        // Sprawdź warunki
        const matchesSearch = teamName.includes(searchTerm) || teamClass.toLowerCase().includes(searchTerm);
        const matchesSport = sportFilter === 'all' || teamSports.includes(sportFilter);
        const matchesClass = classFilter === 'all' || teamClass === classFilter;
        
        console.log(`Warunki: search=${matchesSearch}, sport=${matchesSport}, class=${matchesClass}`);
        
        if (matchesSearch && matchesSport && matchesClass) {
            card.style.display = '';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });
    
    // Pokaż/ukryj wiersze w liście
    const rows = document.querySelectorAll('#teamsListTable tr');
    rows.forEach(row => {
        if (row.cells && row.cells.length > 0) {
            const teamName = row.cells[0]?.querySelector('strong')?.textContent.toLowerCase() || '';
            const teamClass = row.dataset.klasa || '';
            const teamSports = row.dataset.sports ? row.dataset.sports.split(',') : [];
            
            const matchesSearch = teamName.includes(searchTerm) || teamClass.toLowerCase().includes(searchTerm);
            const matchesSport = sportFilter === 'all' || teamSports.includes(sportFilter);
            const matchesClass = classFilter === 'all' || teamClass === classFilter;
            
            if (matchesSearch && matchesSport && matchesClass) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        }
    });
    
    // Pokaż komunikat jeśli brak wyników
    const noTeamsMsg = document.getElementById('noTeamsMessage');
    if (noTeamsMsg) {
        if (visibleCount === 0 && cards.length > 0) {
            noTeamsMsg.style.display = 'block';
        } else {
            noTeamsMsg.style.display = 'none';
        }
    }
    
    console.log(`Widocznych drużyn: ${visibleCount}`);
}

function resetFilters() {
    // Zresetuj wartości
    document.getElementById('teamSearch').value = '';
    document.getElementById('sportFilter').value = 'all';
    document.getElementById('classFilter').value = 'all';
    
    // Zresetuj widok
    filterTeams();
    
    // Pokaż powiadomienie
    showNotification('Filtry zostały zresetowane', 'info');
}

// ============================================
// PRZEŁĄCZANIE WIDOKU
// ============================================

function setViewMode(mode) {
    const gridView = document.getElementById('teamsGridContainer');
    const listView = document.getElementById('teamsListContainer');
    const gridBtn = document.getElementById('gridViewBtn');
    const listBtn = document.getElementById('listViewBtn');
    
    if (mode === 'grid') {
        gridView.style.display = '';
        listView.style.display = 'none';
        gridBtn.classList.add('active');
        listBtn.classList.remove('active');
    } else {
        gridView.style.display = 'none';
        listView.style.display = '';
        gridBtn.classList.remove('active');
        listBtn.classList.add('active');
    }
    
    // Zastosuj filtry do aktywnego widoku
    filterTeams();
}

// ============================================
// MODAL Z SZCZEGÓŁAMI DRUŻYNY - UPROSZCZONY!
// ============================================

function showTeamDetails(klasa) {
    const team = window.teamData?.find(t => t.Klasa === klasa);
    if (!team) return;
    
    const details = getTeamDetails(klasa);
    const players = getTeamPlayers(klasa);
    const points = getTeamPoints(klasa);
    const sports = getTeamSports(klasa);
    
    // Nazwy dyscyplin
    const sportsNames = sports.map(s => getSportName(s)).join(', ');
    
    // UPROSZCZONY HTML - tylko najważniejsze informacje
    const modalContent = `
        <div class="team-modal-header">
            <div class="team-modal-logo">
                <i class="fas fa-users"></i>
            </div>
            <div class="team-modal-title">
                <h2>${team.Nazwa || team.Klasa}</h2>
                <div class="team-modal-subtitle">
                    <span class="team-class-badge">${team.Klasa}</span>
                    <span class="team-sports-badge">${sportsNames}</span>
                </div>
            </div>
        </div>
        
        <div class="team-modal-stats">
            <div class="modal-stat">
                <span class="stat-label">Punkty ogółem</span>
                <span class="stat-value">${points.SUMA}</span>
            </div>
            <div class="modal-stat">
                <span class="stat-label">Piłka nożna</span>
                <span class="stat-value">${points.PN}</span>
            </div>
            <div class="modal-stat">
                <span class="stat-label">Koszykówka</span>
                <span class="stat-value">${points.KOSZ}</span>
            </div>
            <div class="modal-stat">
                <span class="stat-label">Siatkówka</span>
                <span class="stat-value">${points.SIATA}</span>
            </div>
        </div>
        
        <div class="team-modal-section">
            <h3><i class="fas fa-user-tie"></i> Kapitan</h3>
            <p class="team-captain">${players.Kapitan || 'Brak danych'}</p>
        </div>
        
        <div class="modal-actions">
            <button onclick="showTeamPlayers('${klasa}')" class="btn-modal-action">
                <i class="fas fa-users"></i> Zobacz skład
            </button>
            <button onclick="closeModal()" class="btn-modal-close">
                Zamknij
            </button>
        </div>
    `;
    
    // Pokaż modal
    showModal(`${team.Nazwa || team.Klasa} - Szczegóły`, modalContent);
}

function showTeamPlayers(klasa) {
    const team = window.teamData?.find(t => t.Klasa === klasa);
    if (!team) return;
    
    const players = getTeamPlayers(klasa);
    
    if (!players.Zawodnicy || players.Zawodnicy.length === 0) {
        showNotification('Brak danych o zawodnikach', 'info');
        return;
    }
    
    // UPROSZCZONA TABELA ZAWODNIKÓW - tylko imię, nazwisko i oznaczenie kapitana
    let playersTable = `
        <div class="players-table-container">
            <table class="players-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Zawodnik</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    players.Zawodnicy.forEach((player, index) => {
        const isCaptain = `${player.Imię} ${player.Nazwisko}` === players.Kapitan;
        
        playersTable += `
            <tr ${isCaptain ? 'class="player-captain"' : ''}>
                <td>${index + 1}</td>
                <td>
                    ${player.Imię} ${player.Nazwisko}
                    ${isCaptain ? '<span class="captain-badge"><i class="fas fa-crown"></i> Kapitan</span>' : ''}
                </td>
            </tr>
        `;
    });
    
    playersTable += `
                </tbody>
            </table>
        </div>
        
        <div class="players-summary">
            <div class="summary-item">
                <i class="fas fa-user-friends"></i>
                <span>${players.Zawodnicy.length} zawodników</span>
            </div>
            <div class="summary-item">
                <i class="fas fa-user-tie"></i>
                <span>Kapitan: ${players.Kapitan || 'Brak'}</span>
            </div>
        </div>
        
        <div class="modal-actions">
            <button onclick="showTeamDetails('${klasa}')" class="btn-modal-action">
                <i class="fas fa-info-circle"></i> Szczegóły drużyny
            </button>
            <button onclick="closeModal()" class="btn-modal-close">
                Zamknij
            </button>
        </div>
    `;
    
    showModal(`Skład drużyny: ${team.Nazwa || team.Klasa}`, playersTable);
}

// ============================================
// SYSTEM MODALI
// ============================================

function showModal(title, content) {
    const modal = document.getElementById('teamModal');
    if (!modal) return;
    
    // Ustaw tytuł i treść
    document.getElementById('modalTeamName').textContent = title;
    
    const modalBody = modal.querySelector('.team-details');
    if (modalBody) {
        modalBody.innerHTML = content;
    }
    
    // Pokaż modal
    modal.style.display = 'block';
    
    // Dodaj event listener do zamknięcia
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // Dodaj event listener ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    });
}

function closeModal() {
    const modal = document.getElementById('teamModal');
    if (modal) {
        modal.style.display = 'none';
    }
    
    // Usuń event listener ESC
    document.removeEventListener('keydown', arguments.callee);
}

// ============================================
// FUNKCJE POMOCNICZE - POPRAWIONE!
// ============================================

function getSportName(code) {
    const sports = {
        'PN': 'Piłka nożna',
        'SIATA': 'Siatkówka',  // ZMIENIONE z SIAT na SIATA
        'KOSZ': 'Koszykówka'
    };
    return sports[code] || code;
}

function getSportIcon(code) {
    const icons = {
        'PN': 'fa-futbol',
        'SIATA': 'fa-volleyball-ball',  // ZMIENIONE z SIAT na SIATA
        'KOSZ': 'fa-basketball-ball'
    };
    return icons[code];
}

function getTeamSports(klasa) {
    const team = window.teamData?.find(t => t.Klasa === klasa);
    if (!team) return [];
    
    const sports = [];
    
    // Sprawdź które dyscypliny mają punkty > 0
    if (team.PN > 0) sports.push('PN');
    if (team.KOSZ > 0) sports.push('KOSZ');
    if (team.SIATA > 0) sports.push('SIATA');  // ZMIENIONE z SIAT na SIATA
    
    console.log(`Dyscypliny dla ${klasa}:`, sports);
    return sports;
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

function showNoDataMessage() {
    const container = document.getElementById('teamsGridContainer');
    if (container) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="far fa-frown"></i>
                <h3>Brak danych o drużynach</h3>
                <p>Dodaj drużyny w pliku <code>data.js</code></p>
                <button onclick="window.location.href='index.html'" class="btn-sport">
                    <i class="fas fa-home"></i> Wróć do strony głównej
                </button>
            </div>
        `;
    }
}

// ============================================
// EKSPORT FUNKCJI DO HTML
// ============================================

window.filterTeams = filterTeams;
window.resetFilters = resetFilters;
window.setViewMode = setViewMode;
window.showTeamDetails = showTeamDetails;
window.showTeamPlayers = showTeamPlayers;
window.closeModal = closeModal;