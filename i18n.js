const i18n = {
    // 界面文本
    zh: {
        appTitle: '大富翁记账',
        setupSection: {
            initialAmount: '初始金额设置',
            playerManagement: '玩家管理',
            gameHistory: '游戏历史',
            dataManagement: '数据管理'
        },
        buttons: {
            startGame: '开始游戏',
            addPlayer: '添加玩家',
            removePlayer: '×',
            loadHistory: '加载历史游戏',
            clearData: '清除所有数据',
            saveGame: '保存游戏',
            restartGame: '重新开始',
            addPlayerGame: '添加玩家',
            saveGame: '保存游戏',
            clearHistory: '清除记录'
        },
        labels: {
            playerName: '输入玩家名称',
            initialAmount: '输入初始金额',
            initialAmountUnit: '选择单位',
            newPlayerBalance: '初始余额 (可选，默认为{defaultAmount}{unit})',
            newPlayerBalancePlaceholder: '留空则使用默认初始金额',
            editBalance: '{playerName} 的余额',
            editAmountPlaceholder: '输入变动金额',
            operation: '选择操作类型',
            confirm: '确认',
            cancel: '取消',
            removePlayer: '×',
            clearData: '清除所有数据'
        },
        placeholders: {
            playerName: '输入玩家名称',
            initialAmount: '输入初始金额',
            newPlayerBalance: '留空则使用默认初始金额',
            editAmount: '输入变动金额'
        },
        messages: {
            atLeastTwoPlayers: '至少需要2个玩家才能开始游戏',
            playerNameRequired: '请输入玩家名称',
            playerNameExists: '玩家名称已存在',
            maxPlayers: '最多支持6个玩家',
            enterAmount: '请输入有效的金额',
            confirmClearData: '确定要清除所有数据吗？这将删除所有玩家信息、游戏历史、操作日志和设置。此操作不可恢复！',
            allDataCleared: '所有数据已清除',
            gameSaved: '游戏已保存',
            confirmClearHistory: '确定要清除当前游戏的操作记录吗？'
        },
        gameLog: {
            gameStart: '游戏开始，初始金额 {initialAmount}{unit}',
            gameRestart: '重新开始游戏，所有余额重置为 {initialAmount}{unit}',
            transfer: '{fromPlayer} 转账 {amount}{unit} 给 {toPlayer}',
            balanceAdjust: '{playerName} {operation} {amount}{unit}',
            addPlayer: '添加玩家 {playerName}，初始余额 {amount}{unit}',
            noOperationRecords: '暂无操作记录'
        },
        units: {
            thousand: '千(K)',
            million: '百万(M)'
        }
    },
    en: {
        appTitle: 'Monopoly Bookkeeper',
        setupSection: {
            initialAmount: 'Initial Amount',
            playerManagement: 'Player Management',
            gameHistory: 'Game History',
            dataManagement: 'Data Management'
        },
        buttons: {
            startGame: 'Start Game',
            addPlayer: 'Add Player',
            removePlayer: '×',
            loadHistory: 'Load History',
            clearData: 'Clear All Data',
            saveGame: 'Save Game',
            restartGame: 'Restart Game',
            addPlayerGame: 'Add Player',
            saveGame: 'Save Game',
            clearHistory: 'Clear Records'
        },
        labels: {
            playerName: 'Player Name',
            initialAmount: 'Enter Initial Amount',
            initialAmountUnit: 'Select Unit',
            newPlayerBalance: 'Initial Balance (Optional, Default: {defaultAmount}{unit})',
            newPlayerBalancePlaceholder: 'Leave empty to use default amount',
            editBalance: '{playerName} Balance',
            editAmountPlaceholder: 'Enter Change Amount',
            operation: 'Select Operation Type',
            confirm: 'Confirm',
            cancel: 'Cancel',
            removePlayer: '×',
            clearData: 'Clear All Data'
        },
        placeholders: {
            playerName: 'Enter Player Name',
            initialAmount: 'Enter Initial Amount',
            newPlayerBalance: 'Leave empty to use default amount',
            editAmount: 'Enter Change Amount'
        },
        messages: {
            atLeastTwoPlayers: 'At least 2 players required to start game',
            playerNameRequired: 'Please enter player name',
            playerNameExists: 'Player name already exists',
            maxPlayers: 'Maximum 6 players supported',
            enterAmount: 'Please enter valid amount',
            confirmClearData: 'Clear all data? This will delete all player info, game history, operation logs and settings. This action cannot be undone!',
            allDataCleared: 'All data cleared',
            gameSaved: 'Game saved',
            confirmClearHistory: 'Clear current game records?'
        },
        gameLog: {
            gameStart: 'Game started, initial amount {initialAmount}{unit}',
            gameRestart: 'Game restarted, all balances reset to {initialAmount}{unit}',
            transfer: '{fromPlayer} transferred {amount}{unit} to {toPlayer}',
            balanceAdjust: '{playerName} {operation} {amount}{unit}',
            addPlayer: 'Added player {playerName} with initial balance {amount}{unit}',
            noOperationRecords: 'No operation records'
        },
        units: {
            thousand: 'K (Thousand)',
            million: 'M (Million)'
        }
    }
};

// 导出配置
if (typeof module !== 'undefined') {
    module.exports = i18n;
} else if (typeof window !== 'undefined') {
    window.i18n = i18n;
}