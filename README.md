# Monopoly Bookkeeper 🎲

A modern, web-based digital ledger for tracking Monopoly game finances. Perfect for keeping track of player balances, transactions, and game history without the hassle of manual calculations.

## ✨ Features

### 🎮 Game Management
- **Multiplayer Support**: 2-6 players with customizable names
- **Flexible Initial Amounts**: Set starting money with support for millions (M) or thousands (K)
- **Persistent Game State**: Save player lists and preferences between sessions
- **Real-time Rankings**: Automatic player sorting by balance with visual rank badges

### 💰 Transaction System
- **Drag-and-Drop Transfers**: Intuitive money transfers between players
- **Balance Adjustments**: Direct add/subtract operations for individual players
- **Comprehensive Logging**: All operations recorded with timestamps and balance snapshots
- **Amount Unit Flexibility**: Switch between millions and thousands display

### 🌐 Internationalization
- **Bilingual Support**: Full Chinese (中文) and English interface
- **Smart Language Detection**: Automatically detects browser language
- **Instant Language Switching**: Toggle languages without restarting
- **Persistent Language Preference**: Remembers your language choice

### 🎨 Modern UI
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Intuitive Interface**: Clean, modern design with smooth animations
- **Interactive Elements**: Drag-and-drop, hover effects, and micro-interactions
- **Real-time Updates**: Instant visual feedback for all actions

## 🚀 Quick Start

1. **Clone or download** the repository
2. **Open `index.html`** in any modern web browser
3. **Set up your game**:
   - Configure initial amount and unit (M/K)
   - Add player names (2-6 players)
4. **Start playing**: Click "Start Game" to begin
5. **Track transactions**: Use drag-and-drop or direct balance adjustments

No installation, no dependencies, no build process required! 🎯

## 🎯 How to Use

### Setup Phase
1. **Initial Amount**: Enter starting money (default: 15)
2. **Unit Selection**: Choose Millions (M) or Thousands (K)
3. **Add Players**: Enter names for 2-6 players
4. **Language**: Toggle between 中文 and English anytime

### During Gameplay
- **Transfer Money**: Drag from one player card to another
- **Adjust Balance**: Click on a player to add/subtract money directly
- **View History**: Track all transactions in real-time
- **Switch Language**: Use the language toggle in any screen

### Advanced Features
- **Save Progress**: Everything is automatically saved to browser storage
- **Clear History**: Reset transaction log while keeping player data
- **Restart Game**: Start fresh with the same players
- **Responsive Controls**: Touch-friendly for mobile devices

## 🛠️ Technical Stack

- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Storage**: Browser localStorage for data persistence
- **Design**: Responsive CSS Grid/Flexbox with modern aesthetics
- **Internationalization**: Custom i18n system with template support
- **Compatibility**: Works on all modern browsers (Chrome, Firefox, Safari, Edge)

## 📱 Browser Support

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 90+ | ✅ Full Support |
| Firefox | 88+ | ✅ Full Support |
| Safari | 14+ | ✅ Full Support |
| Edge | 90+ | ✅ Full Support |

## 🎨 Design System

### Color Palette
- **Primary**: `#5a67d8` (Blue) - Primary actions and active states
- **Background**: Linear gradient `#667eea` to `#764ba2`
- **Text**: `#333` (Primary), `#718096` (Secondary)
- **Success**: Green shades for positive balances
- **Error**: Red shades for negative balances

### Components
- **Toggle Switches**: Pill-style with smooth transitions
- **Player Cards**: Interactive with drag-and-drop capability
- **Modal Dialogs**: Consistent overlay system
- **Buttons**: Hover effects and active states

## 🔧 Development

### Project Structure
```
Monopoly-Bookkeeper/
├── index.html          # Main application structure
├── script.js           # Core application logic
├── styles.css          # Complete styling system
├── i18n.js            # Internationalization data
├── CLAUDE.md          # Development guide
└── README.md          # This file
```

### Key Classes and Methods
- `MonopolyBookkeeper` - Main application class
- `initI18n()` - Language initialization
- `switchLanguage()` - Language switching
- `renderPlayersGrid()` - Player display
- `logGameAction()` - Transaction logging

### Adding New Features
1. Extend the `MonopolyBookkeeper` class
2. Add UI elements to `index.html`
3. Style with existing design patterns in `styles.css`
4. Add i18n strings to both languages in `i18n.js`

## 🌟 Highlights

- **Zero Dependencies**: Pure web technologies
- **Instant Setup**: No installation required
- **Cross-Platform**: Works on any device with a browser
- **Privacy First**: All data stored locally, nothing transmitted
- **Offline Ready**: Works without internet connection
- **Professional UI**: Modern, intuitive design

## 📄 License

This project is open source and available under the MIT License.

---

**Enjoy your Monopoly games with effortless financial tracking!** 🎲💰