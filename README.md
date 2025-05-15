# Slot Machine Web Game

A simple web-based slot machine game that simulates a casino slot machine experience.

## Description

This slot machine game allows players to:
- Deposit virtual money
- Choose the number of lines to bet on (1-3)
- Set their bet amount per line
- Spin the reels and see the results
- Win based on matching symbols across the lines they bet on

The game features different symbols (A, B, C, D) with varying frequencies and values:
- Symbol A: Highest value (5x multiplier), lowest frequency
- Symbol B: Second highest value (4x multiplier)
- Symbol C: Third highest value (3x multiplier)
- Symbol D: Lowest value (2x multiplier), highest frequency

## How to Play

1. Enter a deposit amount and click "Deposit"
2. Select the number of lines to bet on (1-3)
3. Enter your bet amount per line
4. Click "Spin" to play
5. If you get matching symbols on a line you bet on, you win!
6. Your winnings are calculated as: bet amount × symbol value
7. Click "Play Again" to start a new round

## Game Rules

- You can bet on 1 to 3 horizontal lines
- Winning requires the same symbol across all 3 positions on a betting line
- Each symbol has a different value multiplier
- Your total bet is calculated as: bet amount × number of lines
- You can only bet amounts that you can afford based on your balance


### Running Locally

  ```
  python -m http.server 8000
  (or python3)
  ```
  Then visit `http://localhost:8000` in browser

## Future Enhancements

Potential improvements for future versions:
- Add animations for spinning reels
- Implement sound effects
- Add more symbol types with special features
- Create a high score system
- Add responsive design for mobile devices
