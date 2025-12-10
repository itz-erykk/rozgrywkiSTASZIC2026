// GŁÓWNY KOD STRONY
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Strona załadowana, inicjalizacja...');
    
    // Załaduj konfigurację
    loadSiteConfig();
    
    // Ustaw datę
    updateCurrentDate();
    
    // Rozpocznij odliczanie
    startCountdown();
    
    // Załaduj wszystkie dane
    loadAllData();
    
    // Dodaj event listeners
    setupEventListeners();
    
    console.log('✅ Inicjalizacja zakończona');
});

// ============================================
// ŁADOWANIE KONFIGURACJI
// ============================================

function loadSiteConfig() {
    if (!window.siteConfig) {
        console.warn('Brak konfiguracji strony');
        return;
    }
    
    const config = window.siteConfig;
    
    // Ustaw tytuł strony
    if (config.siteTitle) {
        document.title = config.siteTitle;
        setElementText('pageTitle', config.siteTitle);
    }
    
    // Ustaw nazwę szkoły
    setElementText('schoolName', config.schoolName);
    
    // Ustaw hero section
    setElementText('heroTitle', config.heroTitle);
    setElementText('heroSubtitle', config.heroSubtitle);
    
    // Ustaw dane kontaktowe
    setElementText('organizerName', config.organizer);
    setElementText('supervisorName', `Opiekun: ${config.supervisor}`);
    setElementText('contactEmail', config.contactEmail);
    setElementText('contactInstagram', config.contactInstagram);
    setElementText('contactPhone', config.contactPhone);
    
    // Ustaw teksty stopki
    setElementText('copyrightText', config.copyrightText);
    setElementText('appVersion', config.appVersion);
    setElementText('systemVersion', config.systemVersion);
}

function setElementText(id, text) {
    const element = document.getElementById(id);
    if (element) {
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

function startCountdown() {
    const endDate = window.siteConfig?.endDate ? new Date(window.siteConfig.endDate) : new Date('2024-06-30T23:59:59');
    
    function update() {
        const now = new Date();
        const diff = endDate - now;
        
        if (diff <= 0) {
            document.getElementById('countdown').innerHTML = '<div class="countdown-ended">Rozgrywki zakończone!</div>';
            return;
        }
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        
        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    }
    
    update();
    setInterval(update, 60000); // Aktualizuj co minutę
}

function setupEventListeners() {
    // Przycisk odświeżania wszystkich danych
    const refreshBtn = document.querySelector('[onclick="refreshAllData()"]');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', refreshAllData);
    }
    
    // Przycisk odświeżania meczów
    const refreshMatchesBtn = document.querySelector('[onclick="loadMatches()"]');
    if (refreshMatchesBtn) {
        refreshMatchesBtn.addEventListener('click', loadMatches);
    }
    
    // Przycisk przełączania ogłoszeń
    const toggleAnnouncementsBtn = document.querySelector('[onclick="toggleAnnouncements()"]');
    if (toggleAnnouncementsBtn) {
        toggleAnnouncementsBtn.addEventListener('click', toggleAnnouncements);
    }
}

// ============================================
// ŁADOWANIE DANYCH
// ============================================

function loadAllData() {
    console.log('📊 Ładowanie wszystkich danych...');
    
    loadStandings();
    loadMatches();
    loadSportsStats();
    loadAnnouncements();
    
    updateLastUpdateTime();
}

function loadStandings() {
    console.log('📈 Ładowanie klasyfikacji...');
    
    const table = document.getElementById('standingsTable');
    const noDataMsg = document.getElementById('noStandingsMessage');
    
    if (!table) {
        console.error('Nie znaleziono tabeli klasyfikacji');
        return;
    }
    
    table.innerHTML = '';
    
    // Pobierz posortowaną klasyfikację
    const standings = getSortedStandings();
    
    if (!standings || standings.length === 0) {
        table.innerHTML = '<tr><td colspan="6" class="no-data">Brak danych klasyfikacji</td></tr>';
        if (noDataMsg) noDataMsg.style.display = 'block';
        return;
    }
    
    if (noDataMsg) noDataMsg.style.display = 'none';
    
    // Wyświetl każdą drużynę
    standings.forEach((team, index) => {
        const row = document.createElement('tr');
        
        // Oznacz pozycje
        if (index === 0) {
            row.classList.add('champion');
        } else if (index < 4) {
            row.classList.add('europe');
        }
        
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>
                <strong class="team-name">${team.Nazwa || team.Klasa}</strong>
                <div class="team-class">${team.Klasa}</div>
            </td>
            <td>${team.PN || 0}</td>
            <td>${team.KOSZ || 0}</td>
            <td>${team.SIATA || 0}</td>
            <td><strong class="total-points">${team.SUMA || 0}</strong></td>
        `;
        
        table.appendChild(row);
    });
    
    console.log(`✅ Wyświetlono ${standings.length} drużyn`);
}

function loadMatches() {
    console.log('⚽ Ładowanie meczów...');
    
    const container = document.getElementById('matchesContainer');
    const noDataMsg = document.getElementById('noMatchesMessage');
    
    if (!container) {
        console.error('Nie znaleziono kontenera meczów');
        return;
    }
    
    container.innerHTML = '';
    
    // Pobierz nadchodzące mecze
    const matches = getUpcomingMatches();
    
    if (!matches || matches.length === 0) {
        container.innerHTML = '<div class="no-matches">Brak nadchodzących meczów</div>';
        if (noDataMsg) noDataMsg.style.display = 'block';
        return;
    }
    
    if (noDataMsg) noDataMsg.style.display = 'none';
    
    // Wyświetl każdy mecz
    matches.forEach(match => {
        const card = document.createElement('div');
        card.className = 'match-card';
        
        // Sprawdź status meczu
        const today = new Date().toISOString().split('T')[0];
        const isToday = match.Data === today || match.Status === 'Dzisiaj';
        
        if (isToday) {
            card.classList.add('today');
        }
        
        // Ikona dyscypliny
        const sportIcons = {
            'Piłka nożna': 'fa-futbol',
            'Siatkówka': 'fa-volleyball-ball',
            'Koszykówka': 'fa-basketball-ball'
        };
        
        const sportIcon = sportIcons[match.Dyscyplina] || 'fa-trophy';
        
        // Formatuj datę
        const formattedDate = formatMatchDate(match.Data);
        
        card.innerHTML = `
            <div class="match-header">
                <span class="match-sport">
                    <i class="fas ${sportIcon}"></i> ${match.Dyscyplina || 'Mecz'}
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
            
            <div class="match-result">
                ${match.Wynik || 'vs'}
            </div>
            
            <div class="match-status ${isToday ? 'status-live' : 'status-upcoming'}">
                <i class="fas fa-circle"></i> ${isToday ? 'Dzisiaj' : (match.Status || 'Nadchodzący')}
            </div>
        `;
        
        container.appendChild(card);
    });
    
    console.log(`✅ Wyświetlono ${matches.length} meczów`);
}

function loadSportsStats() {
    console.log('📊 Ładowanie statystyk dyscyplin...');
    
    if (!window.sportStats) {
        console.warn('Brak statystyk dyscyplin');
        return;
    }
    
    const stats = window.sportStats;
    
    // Piłka nożna
    if (stats.football) {
        setStatValue('footballMatches', stats.football.totalMatches || 0);
        setStatValue('footballGoals', stats.football.totalGoals || 0);
    }
    
    // Siatkówka
    if (stats.volleyball) {
        setStatValue('volleyballMatches', stats.volleyball.totalMatches || 0);
        setStatValue('volleyballSets', stats.volleyball.totalSets || 0);
    }
    
    // Koszykówka
    if (stats.basketball) {
        setStatValue('basketballMatches', stats.basketball.totalMatches || 0);
        setStatValue('basketballPoints', stats.basketball.totalPoints || 0);
    }
    
    // Nagłówek statystyk
    const header = document.getElementById('sportsStatsHeader');
    if (header) {
        const totalMatches = (stats.football?.totalMatches || 0) + 
                            (stats.volleyball?.totalMatches || 0) + 
                            (stats.basketball?.totalMatches || 0);
        
        header.innerHTML = `<span class="stats-summary">Łącznie rozegrano: <strong>${totalMatches}</strong> meczów</span>`;
    }
}

function loadAnnouncements() {
    console.log('📢 Ładowanie ogłoszeń...');
    
    const container = document.getElementById('announcementsList');
    const noDataMsg = document.getElementById('noAnnouncementsMessage');
    
    if (!container) {
        console.error('Nie znaleziono kontenera ogłoszeń');
        return;
    }
    
    container.innerHTML = '';
    
    if (!window.announcements || window.announcements.length === 0) {
        container.innerHTML = '<div class="no-announcements">Brak ogłoszeń</div>';
        if (noDataMsg) noDataMsg.style.display = 'block';
        return;
    }
    
    if (noDataMsg) noDataMsg.style.display = 'none';
    
    // Wyświetl każde ogłoszenie
    window.announcements.forEach(announcement => {
        const item = document.createElement('div');
        item.className = `announcement ${announcement.type || 'info'}`;
        
        item.innerHTML = `
            <div class="announcement-icon">
                <i class="fas ${announcement.icon || 'fa-info-circle'}"></i>
            </div>
            <div class="announcement-content">
                <h3>${announcement.title || 'Ogłoszenie'}</h3>
                <p>${announcement.content || ''}</p>
                <span class="announcement-date">${announcement.date || ''}</span>
            </div>
        `;
        
        container.appendChild(item);
    });
    
    console.log(`✅ Wyświetlono ${window.announcements.length} ogłoszeń`);
}

// ============================================
// FUNKCJE POMOCNICZE
// ============================================

function setStatValue(elementId, value) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = value;
    }
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

function updateLastUpdateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' });
    setElementText('lastUpdateTime', timeString);
}

// ============================================
// FUNKCJE INTERAKTYWNE
// ============================================

function refreshAllData() {
    console.log('🔄 Odświeżanie wszystkich danych...');
    
    // Pokaż animację ładowania
    const refreshBtn = document.querySelector('.btn-refresh-large');
    if (refreshBtn) {
        const originalHtml = refreshBtn.innerHTML;
        refreshBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Ładowanie...';
        refreshBtn.disabled = true;
        
        // Symuluj ładowanie
        setTimeout(() => {
            loadAllData();
            refreshBtn.innerHTML = originalHtml;
            refreshBtn.disabled = false;
            showNotification('Dane zostały odświeżone!', 'success');
        }, 800);
    } else {
        loadAllData();
        showNotification('Dane zostały odświeżone!', 'success');
    }
}

function toggleAnnouncements() {
    const container = document.getElementById('announcementsList');
    const toggleBtn = document.getElementById('toggleAnnouncementsText');
    
    if (!container || !toggleBtn) return;
    
    if (container.style.display === 'none') {
        container.style.display = '';
        toggleBtn.textContent = 'Ukryj';
    } else {
        container.style.display = 'none';
        toggleBtn.textContent = 'Pokaż';
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Stylowanie
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
        display: flex;
        align-items: center;
        gap: 10px;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Ukryj po 3 sekundach
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
// EKSPORT FUNKCJI DO UŻYCIA W HTML
// ============================================

window.loadMatches = loadMatches;
window.refreshAllData = refreshAllData;
window.toggleAnnouncements = toggleAnnouncements;
window.getSortedStandings = getSortedStandings;
window.getUpcomingMatches = getUpcomingMatches;