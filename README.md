# Monopoly Bookkeeping Web App

A mobile-first Monopoly bookkeeping web application with offline capability, designed for single-user game management during Monopoly sessions.

## Features ✨

### Core Features
- **6 Standard Monopoly Tokens**: Top hat, racecar, Scottish terrier, battleship, flat iron, and thimble
- **Transaction Types**:
  - One-to-one: Direct player-to-player transfers
  - One-to-many: Single payer to multiple receivers (equal split)
  - Many-to-one: Multiple payers to single receiver (combined action)
- **Mobile-First Design**: Touch-friendly interface with 44px minimum touch targets
- **Offline Capability**: Works completely offline with service worker
- **Data Persistence**: Automatic saving to localStorage
- **Transaction History**: Complete audit trail with timestamps

### Technical Features
- **Progressive Web App (PWA)**: Installable on mobile home screens
- **Responsive Design**: Optimized for mobile, works on all screen sizes
- **Swipe Navigation**: Intuitive gesture-based navigation
- **Import/Export**: Backup and restore game data as JSON
- **No External Dependencies**: All resources embedded, truly offline

## Quick Start 🚀

### Option 1: Direct Use
1. Open `index.html` in any modern web browser
2. Add players and select tokens
3. Start tracking transactions!

### Option 2: Local Server (Recommended)
```bash
# Using Python
python3 -m http.server 8000

# Using Node.js
npx serve .

# Then visit http://localhost:8000
```

### Option 3: Mobile Installation
1. Open the app in mobile browser (Chrome/Safari)
2. Tap "Add to Home Screen" from browser menu
3. Use as native app with offline support

## How to Use 📖

### 1. Setup Players
- Enter player names
- Select unique tokens for each player
- Minimum 2 players required to start
- Each player starts with $1500

### 2. Record Transactions
- **One-to-One (1→1)**: Direct transfers between two players
- **One-to-Many (1→Many)**: Split payment equally among multiple players
- **Many-to-One (Many→1)**: Combine payments from multiple players

### 3. View History
- Complete transaction log with timestamps
- Current player balances
- Export data for backup

### 4. Data Management
- **Export**: Download game data as JSON file
- **Import**: Restore from previously saved game
- **Reset**: Clear all data and start fresh

## Game Rules Applied 🎲

- Standard Monopoly starting balance: $1500 per player
- Equal splitting for one-to-many transactions
- Amount divided by number of recipients/payers
- Real-time balance updates
- Full transaction audit trail

## Technical Architecture 🏗️

### File Structure
```
Monopoly_bookkeeping/
├── index.html          # Single-file application (HTML/CSS/JS)
├── manifest.json       # PWA manifest
├── sw.js              # Service worker for offline
├── icon-192.png       # App icon (192x192)
├── icon-512.png       # App icon (512x512)
└── README.md          # This documentation
```

### Data Schema
```javascript
{
  gameState: {
    players: [
      {
        id: string,
        name: string,
        token: TokenObject,
        balance: number,
        isActive: boolean
      }
    ],
    transactions: [
      {
        id: string,
        type: "one-to-one" | "one-to-many" | "many-to-one",
        from: string[], // Player IDs
        to: string[],   // Player IDs
        amount: number,
        description: string,
        timestamp: string
      }
    ],
    lastModified: string
  }
}
```

### Browser Support
- Chrome 60+
- Safari 12+
- Firefox 55+
- Edge 79+
- Mobile browsers (iOS Safari, Android Chrome)

## Offline Features 📱

- **Service Worker**: Caches all resources for offline access
- **localStorage**: Persistent game state storage
- **No Network Required**: Full functionality without internet
- **Sync When Online**: Seamless online/offline transitions

## Mobile Gestures 👆

- **Tap**: Select buttons, tokens, and options
- **Swipe**: Navigate between screens
- **Long Press**: (Future feature for player options)
- **Pull to Refresh**: (Future feature for data sync)

## Security & Privacy 🔒

- **Local Storage Only**: No data sent to servers
- **No Third-Party Scripts**: Complete privacy
- **Client-Side Processing**: All calculations local
- **Optional Data Export**: You control your data

## Performance ⚡

- **Single File**: Fast loading, no network requests
- **Optimized Images**: Efficient SVG icons
- **Minimal JavaScript**: Lightweight and fast
- **Hardware Acceleration**: CSS transforms for smooth animations

## Troubleshooting 🔧

### Common Issues

**Q: App not working offline**
- Ensure you've visited the app while online at least once
- Check that service worker is registered in browser dev tools

**Q: Data not saving**
- Check browser localStorage permissions
- Ensure sufficient storage space
- Try refreshing the page

**Q: Icons not displaying**
- Clear browser cache
- Ensure PNG files are in the same directory as index.html

**Q: Mobile installation not working**
- Use HTTPS or localhost
- Check browser PWA support
- Ensure manifest.json is accessible

### Data Recovery
If data is lost:
1. Check browser localStorage in dev tools
2. Import from previously exported JSON file
3. Transaction history helps reconstruct recent activity

## Development 🛠️

### Local Development
```bash
# Clone or download the files
git clone <repository-url>
cd Monopoly_bookkeeping

# Start local server
python3 -m http.server 8000

# Open browser to http://localhost:8000
```

### Customization
- Edit tokens in the `initializeTokens()` method
- Modify starting balance in `addPlayer()` method
- Customize colors in CSS variables
- Add new transaction types in `addTransaction()`

### Contributing
1. Fork the repository
2. Create feature branch
3. Test on mobile devices
4. Submit pull request

## Future Enhancements 🚀

- [ ] Additional token options
- [ ] Custom starting balances
- [ ] Transaction categories
- [ ] Player debt tracking
- [ ] Game statistics
- [ ] Multiple game sessions
- [ ] Cloud sync (optional)
- [ ] Sound effects
- [ ] Dark mode theme
- [ ] Accessibility improvements

## License 📄

MIT License - Feel free to use, modify, and distribute.

## Support 💬

For issues, suggestions, or questions:
1. Check this README first
2. Test on different browsers/devices
3. Create issue in repository (if available)
4. Include browser/device information in bug reports

---

**Enjoy your Monopoly games with hassle-free bookkeeping!** 🎩🎲