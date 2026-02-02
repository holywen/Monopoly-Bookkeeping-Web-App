# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a web-based Monopoly Bookkeeper application built with vanilla JavaScript, HTML, and CSS. It provides a digital ledger for tracking player balances, transactions, and game history during Monopoly games.

## Development Environment

- **Node Version**: Use Node.js 18 (specified in `.nvmrc`)
- **No Build Process**: This is a static web application with no compilation or bundling required
- **Browser Testing**: Open `index.html` directly in a browser for development

## Core Architecture

### Main Application Class
The entire application is built around the `MonopolyBookkeeper` class in `script.js` which handles:
- Game state management and player data
- localStorage persistence
- UI screen transitions
- Transaction processing
- Event handling and modal dialogs
- Operation logging and history tracking

### Key Files Structure
- `index.html` - Main HTML structure with setup and game screens
- `script.js` - Core application logic and MonopolyBookkeeper class
- `styles.css` - Complete styling with responsive design
- `i18n.js` - Internationalization support for Chinese and English

### Data Management
The application uses localStorage with two main keys:
- `monopolyPlayerData` - Player information, settings, language preference, and game state
- `monopolyGameHistory` - Legacy game history storage

#### Data Structure
```javascript
{
  players: [{id, name, balance}],
  initialAmount: number,
  amountUnit: 'M' | 'K',
  currentLang: 'zh' | 'en',  // Language preference
  lastUpdated: ISO string
}
```

## Key Features

### Game Management
- Support for 2-6 players with configurable initial amounts
- Flexible amount units (Millions/Thousands)
- Persistent player lists between sessions
- Real-time balance tracking with automatic ranking

### Transaction System
- **Drag-and-Drop Transfers**: Primary method for money transfers between players
- **Balance Adjustments**: Direct add/subtract operations for individual players
- **Comprehensive Logging**: All operations are logged with timestamps and balance snapshots

### User Interface
- **Setup Screen**: Player management and initial configuration with language toggle
- **Game Screen**: Main gameplay interface with player grid, history, and language toggle
- **Modal System**: Reusable overlay dialogs for all user interactions
- **Toggle Components**: Unified pill-style toggle switches for language and amount units
- **Responsive Design**: Mobile-friendly with adaptive layouts and touch controls

### UI Component System
- **Language Toggle**: Bilingual switcher (中文/EN) with consistent styling across screens
- **Amount Unit Toggle**: Million (M) / Thousand (K) selector with pill design
- **Player Cards**: Interactive cards with drag-and-drop, rank badges, and balance display
- **Button Styling**: Consistent hover effects, transitions, and active states across all buttons

## Internationalization

The application supports Chinese (zh-CN) and English (en) with:
- Browser language auto-detection with fallback to English
- Comprehensive text coverage including UI elements, messages, and game log entries
- Template string support for dynamic content interpolation
- Organized by functional areas (buttons, labels, messages, etc.)
- **Language Toggle UI**: Interactive language switcher buttons in both setup and game screens
- **Persistent Language Preference**: Language choice is saved to localStorage and restored on reload
- **Real-time Language Switching**: All UI elements update immediately when language is changed

### i18n Implementation Details
- Language structure: `i18n[langCode].category.item`
- Initialization: `initI18n()` method called during app startup
- UI Updates: `updateUILanguage()` and `updateGameInterfaceText()` methods
- Storage: Language preference saved as `currentLang` in player data

## Development Patterns

### Code Organization
- Single main class with focused methods for different concerns
- Event-driven architecture with proper delegation
- Component-based UI elements (toggle switches, modals, player cards)
- Clear separation between data management and UI rendering

### Styling Approach
- CSS Grid and Flexbox for responsive layouts
- CSS custom properties for consistent theming
- Mobile-first design with touch-friendly controls
- Semantic color coding (green for positive, red for negative balances)
- **Unified Toggle Design**: Pill-style buttons with consistent styling across all components
- **Modern UI Elements**: Rounded corners, smooth transitions, and subtle shadows
- **Responsive Toggles**: Language and unit switches adapt to different screen sizes

### Data Handling
- Input validation and sanitization throughout
- Error handling for localStorage operations
- Graceful fallbacks for corrupted data
- Efficient DOM updates with targeted rendering

## Common Development Tasks

### Adding New Features
1. Extend the `MonopolyBookkeeper` class with new methods
2. Add corresponding UI elements to `index.html`
3. Style new components in `styles.css` following the unified design system
4. Add internationalization strings to both `zh` and `en` sections in `i18n.js`
5. Update `updateUILanguage()` and `updateGameInterfaceText()` if new UI text is added

### Adding New Languages
1. Add new language section to `i18n.js` following the existing structure
2. Update `initI18n()` method to include language detection logic
3. Add corresponding language toggle buttons if needed
4. Test all UI elements and error messages in the new language

### Modifying Transaction Logic
- Core transaction processing is in the `MonopolyBookkeeper` class methods
- Drag-and-drop logic is handled in the event listener setup methods
- Balance formatting and unit conversion are in dedicated utility methods

### UI Updates
- Player grid rendering: `renderPlayersGrid()` method
- History panel: `updateGameHistory()` method
- Modal dialogs: `showModal()` method with dynamic content

### UI Updates
- Player grid rendering: `renderPlayersGrid()` method
- History panel: `updateGameHistory()` method with i18n support
- Modal dialogs: `showModal()` method with dynamic content
- Language switching: `switchLanguage()` and `updateLanguageButtons()` methods

### Data Persistence
- All save operations use `savePlayerData()` method
- Data loading happens in `loadPlayerData()` method with language preference restoration
- Game logs are managed separately from player data
- Language preferences are automatically saved and restored

## Technical Considerations

### Performance
- No framework dependencies for maximum compatibility
- Efficient DOM manipulation with targeted updates
- Smart amount formatting with caching
- Minimal localStorage usage

### Browser Compatibility
- Vanilla JavaScript ensures broad compatibility
- Modern CSS features with fallbacks
- Touch and mouse event support
- Responsive design for all screen sizes

### Data Integrity
- Input validation on all user entries
- Error handling for storage operations
- Consistent state management
- Comprehensive logging for audit trails