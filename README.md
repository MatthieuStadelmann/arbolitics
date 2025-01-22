# Arbolitics Weather Dashboard

A Next.js dashboard application for visualizing weather data from Arbolitics sensors.

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/MatthieuStadelmann/arbolitics
```

2. Navigate to the project directory:
```bash
cd arbolitics
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create environment file:
Create a `.env.local` file in the root directory with the following content:
```env
NEXT_PUBLIC_API_URL=https://staging-api.arbolitics.com
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

The following environment variables are required:

| Variable | Description | Value                              |
|----------|-------------|------------------------------------|
| NEXT_PUBLIC_API_URL | Base URL for the Arbolitics API | https://staging-api.arbolitics.com |
