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
- `monopolyPlayerData` - Player information, settings, and preferences
- `monopolyGameHistory` - Legacy game history storage

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
- **Setup Screen**: Player management and initial configuration
- **Game Screen**: Main gameplay interface with player grid and history
- **Modal System**: Reusable overlay dialogs for all user interactions

## Internationalization

The application supports Chinese (zh-CN) and English (en) with:
- Browser language auto-detection
- Comprehensive text coverage including UI elements, messages, and game log entries
- Template string support for dynamic content
- Organized by functional areas (buttons, labels, messages, etc.)

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

### Data Handling
- Input validation and sanitization throughout
- Error handling for localStorage operations
- Graceful fallbacks for corrupted data
- Efficient DOM updates with targeted rendering

## Common Development Tasks

### Adding New Features
1. Extend the `MonopolyBookkeeper` class with new methods
2. Add corresponding UI elements to `index.html`
3. Style new components in `styles.css`
4. Add internationalization strings to `i18n.js`

### Modifying Transaction Logic
- Core transaction processing is in the `MonopolyBookkeeper` class methods
- Drag-and-drop logic is handled in the event listener setup methods
- Balance formatting and unit conversion are in dedicated utility methods

### UI Updates
- Player grid rendering: `renderPlayersGrid()` method
- History panel: `updateGameHistory()` method
- Modal dialogs: `showModal()` method with dynamic content

### Data Persistence
- All save operations use `savePlayerData()` method
- Data loading happens in `loadPlayerData()` method
- Game logs are managed separately from player data

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