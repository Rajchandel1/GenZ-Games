        // Games data object
        const gamesData = [
            {
                name: "Flying Modi",
                studio: "DINOBOSS LTD.",
                tags: ["ROGUELITE"],
                emoji: "./images/flying modi.jpg",
                downloadLink: "https://www.mediafire.com/file/t5u1yfh17j3isn8/Flying+Modi_null.apk/file"
            },
            {
                name: "Project Letent",
                studio: "PARADARK STUDIO",
                tags: ["FPS", "RPG"],
                emoji: "./images/project latent.png",
                downloadLink: "https://www.mediafire.com/file/wbiqzazks16lb61/project+Letent_1.0.0+(1).apk/file"
            },
            {
                name: "CID Mario",
                studio: "NAKAZAWA TECH",
                tags: ["TURN-BASED STRATEGY"],
                emoji: "./images/cid mario.png",
                downloadLink: "https://www.mediafire.com/file/c3n4poy7fs0p8lt/CID+Mario.apk/file"
            },
            {
                name: "Super Mario Modi",
                studio: "EXCELLENT RECTANGLE",
                tags: ["ROGUELITE"],
                emoji: "./images/modi mario.png",
                downloadLink: "https://www.mediafire.com/file/ivccj6207eb55ik/Super+Mario+Modi.apk/file"
            },
             {
                name: "Modi Aur Hakla",
                studio: "EXCELLENT RECTANGLE",
                tags: ["ROGUELITE"],
                emoji: "./images/modi aur hakla.png",
                downloadLink: "https://www.mediafire.com/file/8ng1zfjy6j9x4s4/modi+or+hakla.apk/file"
            },
            {
                name: "Angry Dadi",
                studio: "COSMIC GAMES",
                tags: ["RPG", "ADVENTURE"],
                emoji: "./images/angry dadi.png",
                downloadLink: "https://www.mediafire.com/file/572jqnuyii25fsp/Angry+Dadi.apk/file"
            },
            {
                name: "Flappy Tiger",
                studio: "NEON STUDIOS",
                tags: ["ACTION", "FPS"],
                emoji: "./images/Flappy Tiger.png",
                downloadLink: "https://www.mediafire.com/file/pthwgifdhpk0ak6/Flappy+Tiger.apk/file"
            },
            {
                name: "Rebel Kid Game",
                studio: "YOUR STUDIO",
                tags: ["PITCH US"],
                emoji: "./images/rebel kid.webp",
                downloadLink: "https://www.mediafire.com/file/2u3yzb71ogdoev1/rebel+kid+2.0+(1).apk/file"
            },
             {
                name: "Flappy Maaka AAAAAg!",
                studio: "YOUR STUDIO",
                tags: ["PITCH US"],
                emoji: "./images/flappy amitabh.png",
                downloadLink: "https://www.mediafire.com/file/64g0cv7p3eakagc/7547Flappy+Maaka+AAaaag!.apk/file"
            },
             {
                name: "Modi Climb Racing",
                studio: "YOUR STUDIO",
                tags: ["PITCH US"],
                emoji: "./images/modi climb racing.png",
                downloadLink: "https://www.mediafire.com/file/v1ayo6mqvfby8ek/6133ModiClimbRacing.apk/file"
            }
            
        ];

        // Get unique tags for filters
        function getUniqueTags() {
            const tags = new Set();
            gamesData.forEach(game => {
                game.tags.forEach(tag => tags.add(tag));
            });
            return Array.from(tags);
        }

        // Create filter buttons
        function createFilters() {
            const filtersContainer = document.getElementById('filters');
            const uniqueTags = getUniqueTags();
            
            uniqueTags.forEach(tag => {
                const btn = document.createElement('button');
                btn.className = 'filter-btn';
                btn.textContent = tag;
                btn.dataset.filter = tag.toLowerCase().replace(/\s+/g, '-');
                filtersContainer.appendChild(btn);
            });
        }

        // Create game card
        function createGameCard(game) {
            const card = document.createElement('div');
            card.className = 'game-card';
            card.dataset.tags = game.tags.join(',').toLowerCase();
            card.dataset.name = game.name.toLowerCase();
            
            card.innerHTML = `
                <div class="gaming-card">
                <div class="game-image">
                    <img src = "${game.emoji}" alt="${game.name}">
                </div>
                <div class="game-info">
                    <h3>${game.name}</h3>
                    <div class="game-meta">
                    </div>
                    <button target="_blank" class="download-btn" ">
                       <a class="download-link" href = "${game.downloadLink}" target="_blank">Download Game</a> 
                       
                    </button>
                </div>
                </div>
            `;
            
            return card;
        }

        // Render all games
        function renderGames(games = gamesData) {
            const gamesGrid = document.getElementById('gamesGrid');
            gamesGrid.innerHTML = '';
            games.forEach(game => {
                gamesGrid.appendChild(createGameCard(game));
            });
        }

        // Filter functionality
        function setupFilters() {
            const filterBtns = document.querySelectorAll('.filter-btn');
            filterBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    filterBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    
                    const filter = btn.dataset.filter;
                    const gameCards = document.querySelectorAll('.game-card');
                    
                    gameCards.forEach(card => {
                        if (filter === 'all' || card.dataset.tags.includes(filter)) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    });
                });
            });
        }

        // Search functionality
        function setupSearch() {
            const searchBar = document.getElementById('searchBar');
            searchBar.addEventListener('input', (e) => {
                const searchTerm = e.target.value.toLowerCase();
                const gameCards = document.querySelectorAll('.game-card');
                
                gameCards.forEach(card => {
                    const gameName = card.dataset.name;
                    const gameTags = card.dataset.tags;
                    
                    if (gameName.includes(searchTerm) || gameTags.includes(searchTerm)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        }

        // Web3Forms integration for newsletter
        function setupNewsletterForm() {
            const form = document.getElementById('newsletterForm');
            const successMessage = document.getElementById('successMessage');
            
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const formData = new FormData(form);
                formData.append('access_key', 'YOUR_WEB3FORMS_ACCESS_KEY'); // Replace with your actual key
                
                const object = Object.fromEntries(formData);
                const json = JSON.stringify(object);
                
                try {
                    const response = await fetch('https://api.web3forms.com/submit', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: json
                    });
                    
                    const result = await response.json();
                    
                    if (result.success) {
                        successMessage.style.display = 'block';
                        form.reset();
                        setTimeout(() => {
                            successMessage.style.display = 'none';
                        }, 5000);
                    }
                } catch (error) {
                    console.error('Error:', error);
                    alert('Something went wrong. Please try again.');
                }
            });
        }

        // Initialize everything
        document.addEventListener('DOMContentLoaded', () => {
            createFilters();
            renderGames();
            setupFilters();
            setupSearch();
            setupNewsletterForm();
        });

        // Function to add new game (can be called from console for testing)
        function addNewGame(gameData) {
            gamesData.push(gameData);
            renderGames();
            createFilters();
            setupFilters();
        }

        // Example: addNewGame({ name: "New Game", studio: "Studio Name", tags: ["RPG"], emoji: "🎯", downloadLink: "#" });
