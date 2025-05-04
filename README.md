# Player Depth Chart Application

A React-based application for managing player depth charts in different sports (NFL and Soccer). Built with TypeScript, Vite, and Material-UI.

## Features

- Support for multiple sports (NFL and Soccer)
- Interactive depth chart visualization
- Add/remove players from positions
- Real-time updates
- Responsive design
- Comprehensive test coverage

## Tech Stack

- React 19
- TypeScript
- Vite
- Material-UI
- Emotion (for styling)
- React Hook Form
- React Select
- Vitest (for testing)

## Prerequisites

- Node.js v20.18.3 or higher
- npm 10.8.2 or higher

## Getting Started

1. Clone the repository:

```bash
git clone git@github.com:congweibai/player-depth-chart-code-challenge.git
cd player-depth-chart-code-challenge
```

2. Install dependencies:

```bash
npm install
```

3. Set up Git hooks:

```bash
npm run prepare
```

4. Start the development server:

```bash
npm run dev
```

Open [http://localhost:5173/](http://localhost:5173/) in your browser to see the application.

## Available Scripts

| Command              | Description                   |
| -------------------- | ----------------------------- |
| `npm run dev`        | Start development server      |
| `npm run build`      | Build for production          |
| `npm run test`       | Run tests once                |
| `npm run test:watch` | Run tests in watch mode       |
| `npm run coverage`   | Generate test coverage report |
| `npm run lint`       | Run ESLint                    |
| `npm run preview`    | Preview production build      |

## Project Structure

```
src/
├── App.tsx                    # Main application component
├── DepthChartTable/          # Depth chart visualization component
├── AddPlayerToGameForm/      # Form for adding players
├── hooks/                    # Custom hooks and utilities
├── types/                    # TypeScript type definitions
└── __tests__/               # Test files
```

## Testing

The project uses Vitest for testing. Run the following commands:

- `npm run test` - Run tests once
- `npm run test:watch` - Run tests in watch mode
- `npm run coverage` - Generate test coverage report

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Run tests and ensure they pass
4. Submit a pull request

## License

This project is private and confidential.
