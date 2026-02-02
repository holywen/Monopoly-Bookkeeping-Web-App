class MonopolyBookkeeper {
    constructor() {
        this.players = [];
        this.gameStarted = false;
        this.initialAmount = 15;
        this.amountUnit = 'M';
        this.currentGameId = null;
        this.currentGameLog = []; // 当前游戏的操作日志

        this.loadPlayerData();
        this.init();
    }

    init() {
        this.initI18n();
        this.setupEventListeners();
        this.showSetupScreen();
        // 在事件监听器设置完成后，再恢复保存的状态
        this.restoreUIToggleStates();
    }

    initI18n() {
        // 根据浏览器语言设置默认语言
        const browserLang = navigator.language.startsWith('zh') ? 'zh' : 'en';
        this.currentLang = browserLang;
        // 延迟调用 updateUILanguage，确保DOM已加载
        setTimeout(() => this.updateUILanguage(), 0);
    }

    updateUILanguage() {
        const elements = {
            'app-title': document.querySelector('h1'),
            'setup-section h3': document.querySelectorAll('.setup-section h3'),
            'start-game-btn': document.getElementById('start-game-btn'),
            'add-player-btn': document.getElementById('add-player-btn'),
            'new-player-name': document.getElementById('new-player-name'),
            'clear-data-btn': document.getElementById('clear-data-btn')
        };

        // 更新文本
        elements['app-title'].textContent = i18n[this.currentLang].appTitle;
        document.title = i18n[this.currentLang].appTitle;

        // 更新 setup-section 的 h3 文本
        const h3Keys = ['initialAmount', 'playerManagement', 'dataManagement'];
        elements['setup-section h3'].forEach((h3, index) => {
            if (h3Keys[index]) {
                h3.textContent = i18n[this.currentLang].setupSection[h3Keys[index]];
            }
        });

        // 更新设置界面按钮文本
        elements['start-game-btn'].textContent = i18n[this.currentLang].buttons.startGame;
        elements['add-player-btn'].textContent = i18n[this.currentLang].buttons.addPlayer;
        elements['clear-data-btn'].textContent = i18n[this.currentLang].buttons.clearData;

        // 更新占位符
        const nameInput = document.getElementById('new-player-name');
        if (nameInput) {
            nameInput.placeholder = i18n[this.currentLang].placeholders.playerName;
        }

        // 更新游戏界面文本
        this.updateGameInterfaceText();
    }

    updateGameInterfaceText() {
        // 更新游戏界面的标题
        const gameTitle = document.querySelector('#game-screen h2');
        if (gameTitle) {
            gameTitle.textContent = i18n[this.currentLang].appTitle;
        }

        // 更新游戏界面按钮文本
        const addPlayerGameBtn = document.getElementById('add-player-game-btn');
        if (addPlayerGameBtn) {
            addPlayerGameBtn.textContent = i18n[this.currentLang].buttons.addPlayerGame;
        }

        const restartGameBtn = document.getElementById('restart-game-btn');
        if (restartGameBtn) {
            restartGameBtn.textContent = i18n[this.currentLang].buttons.restartGame;
        }

        const clearHistoryBtn = document.getElementById('clear-history-btn');
        if (clearHistoryBtn) {
            clearHistoryBtn.textContent = i18n[this.currentLang].buttons.clearHistory;
            clearHistoryBtn.title = i18n[this.currentLang].buttons.clearHistory;
        }

        // 更新操作记录标题
        const historyTitle = document.querySelector('.game-history-section h3');
        if (historyTitle) {
            historyTitle.textContent = i18n[this.currentLang].setupSection.gameHistory;
        }
    }

    setupEventListeners() {
        // 设置界面事件
        document.getElementById('start-game-btn').addEventListener('click', () => this.startGame());
        document.getElementById('add-player-btn').addEventListener('click', () => this.addPlayer());
        document.getElementById('new-player-name').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addPlayer();
        });
        document.getElementById('clear-data-btn').addEventListener('click', () => this.clearAllData());

        // 游戏界面事件
        document.getElementById('add-player-game-btn').addEventListener('click', () => this.showAddPlayerModal());
        document.getElementById('restart-game-btn').addEventListener('click', () => this.restartGame());
        document.getElementById('clear-history-btn').addEventListener('click', () => this.clearCurrentHistory());

        // 模态框事件
        document.getElementById('close-modal').addEventListener('click', () => this.closeModal());
        document.getElementById('modal-overlay').addEventListener('click', (e) => {
            if (e.target === document.getElementById('modal-overlay')) {
                this.closeModal();
            }
        });

        // 初始金额输入变化
        document.getElementById('initial-amount').addEventListener('input', (e) => {
            this.initialAmount = parseInt(e.target.value) || 15;
            this.savePlayerData();
        });
        // 金额单位toggle切换
        const amountUnitContainer = document.querySelector('.initial-amount-input .toggle-container');
        if (amountUnitContainer) {
            amountUnitContainer.addEventListener('click', (e) => {
                if (e.target.classList.contains('toggle-option')) {
                    const selectedUnit = e.target.dataset.unit;

                    // 更新active状态
                    amountUnitContainer.querySelectorAll('.toggle-option').forEach(btn => {
                        btn.classList.remove('active');
                    });
                    e.target.classList.add('active');

                    this.amountUnit = selectedUnit;
                    this.savePlayerData();
                }
            });
        }
    }

    showSetupScreen() {
        document.getElementById('setup-screen').classList.add('active');
        document.getElementById('game-screen').classList.remove('active');
        this.gameStarted = false;
    }

    showGameScreen() {
        document.getElementById('setup-screen').classList.remove('active');
        document.getElementById('game-screen').classList.add('active');
        this.gameStarted = true;
        this.renderPlayersGrid();
    }

    switchLanguage(lang) {
        if (this.currentLang === lang) return;

        this.currentLang = lang;
        this.updateUILanguage();
        this.updateLanguageButtons();
        this.savePlayerData(); // 保存语言偏好

        // 如果游戏已经开始，更新游戏界面
        if (this.gameStarted) {
            this.renderPlayersGrid();
            this.updateGameHistory();
        }
    }

    updateLanguageButtons() {
        // 更新所有语言按钮的active状态
        const allLangButtons = document.querySelectorAll('.lang-btn');
        allLangButtons.forEach(btn => {
            btn.classList.remove('active');
        });

        // 激活当前语言对应的按钮
        const activeButtons = [
            `lang-${this.currentLang}-btn`,
            `lang-${this.currentLang}-btn-setup`
        ];
        activeButtons.forEach(btnId => {
            const btn = document.getElementById(btnId);
            if (btn) {
                btn.classList.add('active');
            }
        });
    }

    updateGameHistory() {
        const historyContainer = document.getElementById('real-time-history');
        if (!historyContainer) return;

        if (this.currentGameLog.length === 0) {
            historyContainer.innerHTML = `<div class="no-records">${i18n[this.currentLang].gameLog.noOperationRecords}</div>`;
            return;
        }

        historyContainer.innerHTML = this.currentGameLog.map(log => {
            let message;
            switch (log.actionType) {
                case 'gameStart':
                    message = i18n[this.currentLang].gameLog.gameStart;
                    break;
                case 'gameRestart':
                    message = i18n[this.currentLang].gameLog.gameRestart;
                    break;
                case 'transfer':
                    message = i18n[this.currentLang].gameLog.transfer;
                    break;
                case 'balance_adjust':
                    message = i18n[this.currentLang].gameLog.balanceAdjust;
                    break;
                case 'add_player':
                    message = i18n[this.currentLang].gameLog.addPlayer;
                    break;
                default:
                    message = log.details.message || '';
            }

            // 替换模板变量
            message = message.replace(/{(\w+)}/g, (match, key) => {
                return log.details[key] || match;
            });

            return `<div class="history-item">
                <span class="history-time">${new Date(log.timestamp).toLocaleTimeString()}</span>
                <span class="history-message">${message}</span>
            </div>`;
        }).reverse().join('');
    }

    addPlayer() {
        const input = document.getElementById('new-player-name');
        const name = input.value.trim();

        if (!name) {
            alert(i18n[this.currentLang].messages.playerNameRequired);
            return;
        }

        if (this.players.length >= 6) {
            alert(i18n[this.currentLang].messages.maxPlayers);
            return;
        }

        if (this.players.some(p => p.name === name)) {
            alert(i18n[this.currentLang].messages.playerNameExists);
            return;
        }

        const player = {
            id: Date.now(),
            name: name,
            balance: this.gameStarted ? 0 : this.initialAmount
        };

        this.players.push(player);
        input.value = '';

        // 保存玩家数据
        this.savePlayerData();

        if (!this.gameStarted) {
            this.renderPlayersList();
        } else {
            this.renderPlayersGrid();
        }
    }

    removePlayer(playerId) {
        this.players = this.players.filter(p => p.id !== playerId);

        // 保存玩家数据
        this.savePlayerData();

        if (!this.gameStarted) {
            this.renderPlayersList();
        } else {
            this.renderPlayersGrid();
        }
    }

    renderPlayersList() {
        const container = document.getElementById('players-list');
        container.innerHTML = '';

        this.players.forEach(player => {
            const item = document.createElement('div');
            item.className = 'player-item';
            item.innerHTML = `
                <span class="player-name">${player.name}</span>
                <button class="remove-player" onclick="game.removePlayer(${player.id})">×</button>
            `;
            container.appendChild(item);
        });
    }

    renderPlayersGrid() {
        const container = document.getElementById('players-grid');
        container.innerHTML = '';

        // 按余额排序
        const sortedPlayers = [...this.players].sort((a, b) => b.balance - a.balance);

        sortedPlayers.forEach((player, index) => {
            const card = document.createElement('div');
            card.className = 'player-card';
            card.draggable = true;
            card.dataset.playerId = player.id;

            const rankBadge = index < 3 ? `<div class="player-rank">${index + 1}</div>` : '';
            const amountText = this.formatAmount(player.balance);
            const isNegative = player.balance < 0;

            card.innerHTML = `
                ${rankBadge}
                <div class="player-name">${player.name}</div>
                <div class="player-amount ${isNegative ? 'negative' : ''}">${amountText}</div>
            `;

            // 拖拽事件
            card.addEventListener('dragstart', (e) => this.handleDragStart(e, player));
            card.addEventListener('dragend', (e) => this.handleDragEnd(e));
            card.addEventListener('dragover', (e) => this.handleDragOver(e));
            card.addEventListener('drop', (e) => this.handleDrop(e, player));
            card.addEventListener('dragleave', (e) => this.handleDragLeave(e));

            // 点击事件
            card.addEventListener('click', () => this.showEditBalanceModal(player));

            container.appendChild(card);
        });

        // 更新实时历史记录
        this.updateRealTimeHistory();
    }

    handleDragStart(e, player) {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('playerId', player.id);
        e.currentTarget.classList.add('dragging');
    }

    handleDragEnd(e) {
        e.currentTarget.classList.remove('dragging');
        document.querySelectorAll('.player-card').forEach(card => {
            card.classList.remove('drag-over');
        });
    }

    handleDragOver(e) {
        e.preventDefault();
        e.currentTarget.classList.add('drag-over');
    }

    handleDragLeave(e) {
        e.currentTarget.classList.remove('drag-over');
    }

    handleDrop(e, targetPlayer) {
        e.preventDefault();
        e.currentTarget.classList.remove('drag-over');

        const sourcePlayerId = parseInt(e.dataTransfer.getData('playerId'));
        const sourcePlayer = this.players.find(p => p.id === sourcePlayerId);

        if (sourcePlayer && sourcePlayer.id !== targetPlayer.id) {
            this.showTransferModal(sourcePlayer, targetPlayer);
        }
    }

    showTransferModal(fromPlayer, toPlayer) {
        const modal = document.getElementById('modal-overlay');
        const title = document.getElementById('modal-title');
        const body = document.getElementById('modal-body');

        title.textContent = '转账';
        body.innerHTML = `
            <div class="amount-input-group">
                <label>从 ${fromPlayer.name} 转账到 ${toPlayer.name}</label>
                <input type="number" id="transfer-amount" placeholder="输入转账金额" min="0" step="1">
                <div class="unit-toggle">
                    <div class="toggle-container">
                        <button class="toggle-option active" data-unit="M">百万(M)</button>
                        <button class="toggle-option" data-unit="K">千(K)</button>
                    </div>
                </div>
            </div>
            <div class="modal-buttons">
                <button class="confirm" onclick="game.confirmTransfer(${fromPlayer.id}, ${toPlayer.id})">确认转账</button>
                <button class="cancel" onclick="game.closeModal()">取消</button>
            </div>
        `;

        modal.classList.remove('hidden');
        document.getElementById('transfer-amount').focus();
        this.setupToggleToggle(document.querySelector('#transfer-amount ~ .unit-toggle .toggle-container'));
    }

    confirmTransfer(fromPlayerId, toPlayerId) {
        const amount = parseFloat(document.getElementById('transfer-amount').value);
        const modal = document.getElementById('modal-overlay');
        const activeUnit = modal.querySelector('.toggle-option.active');
        const unit = activeUnit ? activeUnit.dataset.unit : 'M';

        if (!amount || amount <= 0) {
            alert(i18n[this.currentLang].messages.enterAmount);
            return;
        }

        const actualAmount = unit === 'K' ? amount * 1000 : amount * 1000000;
        const fromPlayer = this.players.find(p => p.id === fromPlayerId);
        const toPlayer = this.players.find(p => p.id === toPlayerId);

        if (fromPlayer.balance < actualAmount) {
            alert(`${fromPlayer.name} ${this.currentLang === 'zh' ? '余额不足' : 'insufficient balance'}`);
            return;
        }

        fromPlayer.balance -= actualAmount;
        toPlayer.balance += actualAmount;

        // 记录转账日志
        this.logGameAction('transfer', {
            fromPlayer: fromPlayer.name,
            toPlayer: toPlayer.name,
            amount: amount,
            unit: unit
        });

        // 保存玩家数据
        this.savePlayerData();

        this.closeModal();
        this.renderPlayersGrid();
    }

    showEditBalanceModal(player) {
        const modal = document.getElementById('modal-overlay');
        const title = document.getElementById('modal-title');
        const body = document.getElementById('modal-body');

        const currentBalance = player.balance;

        title.textContent = '修改余额';
        body.innerHTML = `
            <div class="amount-input-group">
                <label>${player.name} 当前余额: ${this.formatAmount(currentBalance)}</label>
                <input type="number" id="edit-amount" placeholder="输入变动金额" min="0" step="1" value="0">
                <div class="unit-toggle">
                    <div class="toggle-container">
                        <button class="toggle-option active" data-unit="M">百万(M)</button>
                        <button class="toggle-option" data-unit="K">千(K)</button>
                    </div>
                </div>
                <div class="operation-toggle">
                    <div class="toggle-container">
                        <button class="toggle-option active" data-operation="add">增加 +</button>
                        <button class="toggle-option" data-operation="subtract">减少 -</button>
                    </div>
                </div>
            </div>
            <div class="modal-buttons">
                <button class="confirm" onclick="game.confirmEditBalance(${player.id})">确认</button>
                <button class="cancel" onclick="game.closeModal()">取消</button>
            </div>
        `;

        modal.classList.remove('hidden');
        document.getElementById('edit-amount').focus();

        // 设置金额单位toggle
        this.setupToggleToggle(document.querySelector('#edit-amount ~ .unit-toggle .toggle-container'));
        // 设置操作类型toggle
        this.setupToggleToggle(document.querySelector('.operation-toggle .toggle-container'));
    }

    confirmEditBalance(playerId) {
        const amount = parseFloat(document.getElementById('edit-amount').value);
        const modal = document.getElementById('modal-overlay');

        // 获取选中的金额单位
        const unitBtn = modal.querySelector('#edit-amount ~ .unit-toggle .toggle-option.active');
        const unit = unitBtn ? unitBtn.dataset.unit : 'M';

        // 获取选中的操作类型
        const operationBtn = modal.querySelector('.operation-toggle .toggle-option.active');
        const operation = operationBtn ? operationBtn.dataset.operation : 'add';

        if (isNaN(amount) || amount <= 0) {
            alert(i18n[this.currentLang].messages.enterAmount);
            return;
        }

        const actualAmount = unit === 'K' ? amount * 1000 : amount * 1000000;
        const player = this.players.find(p => p.id === playerId);

        // 根据操作类型调整余额
        if (operation === 'add') {
            player.balance += actualAmount;
        } else {
            player.balance -= actualAmount;
        }

        // 记录余额调整日志
        this.logGameAction('balance_adjust', {
            playerName: player.name,
            operation: operation === 'add' ? '增加' : '减少',
            amount: amount,
            unit: unit,
            newBalance: player.balance
        });

        // 保存玩家数据
        this.savePlayerData();

        this.closeModal();
        this.renderPlayersGrid();
    }

    showAddPlayerModal() {
        if (this.players.length >= 6) {
            alert(i18n[this.currentLang].messages.maxPlayers);
            return;
        }

        const modal = document.getElementById('modal-overlay');
        const title = document.getElementById('modal-title');
        const body = document.getElementById('modal-body');

        const defaultAmount = this.initialAmount;
        title.textContent = '添加玩家';
        body.innerHTML = `
            <div class="amount-input-group">
                <label>玩家名称</label>
                <input type="text" id="new-game-player-name" placeholder="输入玩家名称">
            </div>
            <div class="amount-input-group">
                <label>初始余额 (可选，默认为${defaultAmount}${this.amountUnit})</label>
                <input type="number" id="new-player-balance" placeholder="留空则使用默认初始金额" min="0" step="1">
                <div class="unit-toggle">
                    <div class="toggle-container">
                        <button class="toggle-option active" data-unit="M">百万(M)</button>
                        <button class="toggle-option" data-unit="K">千(K)</button>
                    </div>
                </div>
            </div>
            <div class="modal-buttons">
                <button class="confirm" onclick="game.confirmAddPlayer()">确认</button>
                <button class="cancel" onclick="game.closeModal()">取消</button>
            </div>
        `;

        modal.classList.remove('hidden');
        document.getElementById('new-game-player-name').focus();
        this.setupToggleToggle(document.querySelector('#new-player-balance ~ .unit-toggle .toggle-container'));
    }

    confirmAddPlayer() {
        const name = document.getElementById('new-game-player-name').value.trim();

        if (!name) {
            alert(i18n[this.currentLang].messages.playerNameRequired);
            return;
        }

        if (this.players.some(p => p.name === name)) {
            alert(i18n[this.currentLang].messages.playerNameExists);
            return;
        }

        let balance = this.initialAmount * (this.amountUnit === 'K' ? 1000 : 1000000);
        const balanceInput = document.getElementById('new-player-balance').value;
        if (balanceInput) {
            const amount = parseFloat(balanceInput);
            const modal = document.getElementById('modal-overlay');
            const activeUnit = modal.querySelector('.toggle-option.active');
            const unit = activeUnit ? activeUnit.dataset.unit : 'M';
            balance = unit === 'K' ? amount * 1000 : amount * 1000000;
        }

        const player = {
            id: Date.now(),
            name: name,
            balance: balance
        };

        this.players.push(player);

        // 记录添加玩家日志
        this.logGameAction('add_player', {
            playerName: player.name,
            amount: balanceInput || this.initialAmount,
            unit: balanceInput ? unit : this.amountUnit
        });

        // 保存玩家数据
        this.savePlayerData();

        this.closeModal();
        this.renderPlayersGrid();
    }

    startGame() {
        if (this.players.length < 2) {
            alert(i18n[this.currentLang].messages.atLeastTwoPlayers);
            return;
        }

        // 设置所有玩家的初始余额
        this.players.forEach(player => {
            player.balance = this.initialAmount * (this.amountUnit === 'K' ? 1000 : 1000000);
        });

        this.currentGameId = Date.now();
        this.currentGameLog = []; // 重置日志

        // 记录游戏开始日志
        this.logGameAction('game_start', {
            initialAmount: this.initialAmount,
            unit: this.amountUnit
        });

        this.showGameScreen();
    }

    restartGame() {
        if (confirm('确定要重新开始游戏吗？所有余额将被重置。')) {
            this.players.forEach(player => {
                player.balance = this.initialAmount * (this.amountUnit === 'K' ? 1000 : 1000000);
            });
            this.currentGameId = Date.now();

            // 记录重新开始日志
            this.logGameAction('game_restart', {
                initialAmount: this.initialAmount,
                unit: this.amountUnit
            });

            // 保存玩家数据
            this.savePlayerData();

            this.renderPlayersGrid();
        }
    }

    // 不再需要保存游戏历史了
    saveGame() {
        // 不再需要保存游戏历史了
    }

    loadPlayerData() {
        // 加载保存的玩家信息和初始设置
        const savedData = localStorage.getItem('monopolyPlayerData');
        if (savedData) {
            try {
                const data = JSON.parse(savedData);
                this.players = data.players || [];
                this.initialAmount = data.initialAmount || 15;
                this.amountUnit = data.amountUnit || 'M';
                this.currentLang = data.currentLang || this.currentLang; // 恢复语言偏好

                // 恢复UI设置
                document.getElementById('initial-amount').value = this.initialAmount;

                if (!this.gameStarted) {
                    this.renderPlayersList();
                }
            } catch (e) {
                console.error('Failed to load player data:', e);
            }
        }

        // 语言切换事件
        const langButtons = ['lang-zh-btn', 'lang-en-btn', 'lang-zh-btn-setup', 'lang-en-btn-setup'];
        langButtons.forEach(btnId => {
            const btn = document.getElementById(btnId);
            if (btn) {
                btn.addEventListener('click', (e) => {
                    const lang = btnId.includes('zh') ? 'zh' : 'en';
                    this.switchLanguage(lang);
                });
            }
        });
    }

    restoreUIToggleStates() {
        // 恢复金额单位toggle状态
        const amountUnitContainer = document.querySelector('.initial-amount-input .toggle-container');
        if (amountUnitContainer) {
            amountUnitContainer.querySelectorAll('.toggle-option').forEach(btn => {
                btn.classList.remove('active');
                if (btn.dataset.unit === this.amountUnit) {
                    btn.classList.add('active');
                }
            });
        }
    }

    savePlayerData() {
        // 保存玩家信息和初始设置
        const data = {
            players: this.players,
            initialAmount: this.initialAmount,
            amountUnit: this.amountUnit,
            currentLang: this.currentLang, // 保存语言偏好
            lastUpdated: new Date().toISOString()
        };
        localStorage.setItem('monopolyPlayerData', JSON.stringify(data));
    }

    // 记录游戏操作日志
    logGameAction(actionType, details) {
        if (!this.gameStarted) return;

        const logEntry = {
            timestamp: new Date().toISOString(),
            actionType: actionType,
            details: details,
            playerBalances: this.players.map(p => ({
                name: p.name,
                balance: p.balance
            }))
        };

        this.currentGameLog.push(logEntry);
    }

    // 格式化日志显示文本
    formatLogEntry(logEntry) {
        const date = new Date(logEntry.timestamp);
        const timeStr = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;

        let actionText = '';
        switch (logEntry.actionType) {
            case 'transfer':
                actionText = `${logEntry.details.fromPlayer} 转账 ${logEntry.details.amount}${logEntry.details.unit} 给 ${logEntry.details.toPlayer}`;
                break;
            case 'balance_adjust':
                actionText = `${logEntry.details.playerName} ${logEntry.details.operation} ${logEntry.details.amount}${logEntry.details.unit}`;
                break;
            case 'add_player':
                actionText = `添加玩家 ${logEntry.details.playerName}，初始余额 ${logEntry.details.amount}${logEntry.details.unit}`;
                break;
            case 'game_start':
                actionText = `游戏开始，初始金额 ${logEntry.details.initialAmount}${logEntry.details.unit}`;
                break;
            case 'game_restart':
                actionText = `重新开始游戏，所有余额重置为 ${logEntry.details.initialAmount}${logEntry.details.unit}`;
                break;
        }

        return {
            time: timeStr,
            action: actionText,
            balances: logEntry.playerBalances
        };
    }

    loadHistoryList() {
        // 历史列表会在需要时渲染
    }

    
    
    
    formatAmount(amount) {
        const absAmount = Math.abs(amount);
        const isNegative = amount < 0;

        let value, unit;
        if (absAmount >= 1000000) {
            value = (absAmount / 1000000).toFixed(1);
            unit = 'M';
        } else if (absAmount >= 1000) {
            value = (absAmount / 1000).toFixed(1);
            unit = 'K';
        } else {
            value = absAmount.toString();
            unit = '';
        }

        return `${isNegative ? '-' : ''}${value}${unit}`;
    }

    closeModal() {
        document.getElementById('modal-overlay').classList.add('hidden');
    }

    // 通用toggle事件处理
    setupToggleToggle(container) {
        if (container) {
            container.addEventListener('click', (e) => {
                if (e.target.classList.contains('toggle-option')) {
                    // 移除所有active状态
                    container.querySelectorAll('.toggle-option').forEach(btn => {
                        btn.classList.remove('active');
                    });
                    // 添加active状态到点击的选项
                    e.target.classList.add('active');
                }
            });
        }
    }

    clearAllData() {
        if (confirm('确定要清除所有数据吗？这将删除所有玩家信息、游戏历史、操作日志和设置。此操作不可恢复！')) {
            localStorage.removeItem('monopolyPlayerData');
            localStorage.removeItem('monopolyGameHistory');

            // 重置应用状态
            this.players = [];
            this.gameStarted = false;
            this.initialAmount = 15;
            this.amountUnit = 'M';
            this.currentGameId = null;
            this.currentGameLog = [];

            // 重置UI
            document.getElementById('initial-amount').value = this.initialAmount;

            // 重置金额单位toggle状态
            const amountUnitContainer = document.querySelector('.initial-amount-input .toggle-container');
            if (amountUnitContainer) {
                amountUnitContainer.querySelectorAll('.toggle-option').forEach(btn => {
                    btn.classList.remove('active');
                    if (btn.dataset.unit === this.amountUnit) {
                        btn.classList.add('active');
                    }
                });
            }

            document.getElementById('new-player-name').value = '';

            this.renderPlayersList();

            alert(i18n[this.currentLang].messages.allDataCleared);
        }
    }

    updateRealTimeHistory() {
        if (!this.gameStarted) return;

        const historyContainer = document.getElementById('real-time-history');
        if (!historyContainer) return;

        // 按时间逆序排列（最新的在前）
        const sortedLogs = [...this.currentGameLog].reverse();

        if (sortedLogs.length === 0) {
            historyContainer.innerHTML = '<p style="color: #718096; text-align: center;">暂无操作记录</p>';
            return;
        }

        const historyHtml = sortedLogs.map(entry => {
            const formatted = this.formatLogEntry(entry);
            const balancesHtml = formatted.balances.map(p =>
                `<span class="balance-item">${p.name}: ${this.formatAmount(p.balance)}</span>`
            ).join(' | ');

            return `
                <div class="log-entry">
                    <div class="log-time">${formatted.time}</div>
                    <div class="log-action">${formatted.action}</div>
                    <div class="log-balances">${balancesHtml}</div>
                </div>
            `;
        }).join('');

        historyContainer.innerHTML = historyHtml;
    }

    clearCurrentHistory() {
        if (confirm('确定要清除当前游戏的操作记录吗？')) {
            this.currentGameLog = [];
            this.updateRealTimeHistory();
        }
    }
}

// 初始化游戏
const game = new MonopolyBookkeeper();
// 暴露到全局作用域以便调试
window.game = game;

// 初始化国际化
if (typeof i18n !== 'undefined') {
            window.i18n = i18n;
        }