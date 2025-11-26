module.exports = {
  'app/**/*.{js,jsx,ts,tsx}': [
    'cd app && npm run lint:fix',
  ],
  'server/**/*.ts': [
    'cd server && npm run lint:fix',
  ],
  '*.{json,md}': ['npx prettier --write'],
};
