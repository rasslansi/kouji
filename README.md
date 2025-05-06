# Kouji App

## TailwindCSS Implementation

This project uses TailwindCSS through NativeWind to style React Native components.

### Setup

The following steps were taken to set up TailwindCSS:

1. Installed required packages:
   ```bash
   npm install nativewind tailwindcss --save-dev
   ```

2. Created Tailwind configuration file:
   ```bash
   npx tailwindcss init
   ```

3. Configured Tailwind to scan app and component files in `tailwind.config.js`:
   ```js
   /** @type {import('tailwindcss').Config} */
   module.exports = {
     content: [
       "./app/**/*.{js,jsx,ts,tsx}",
       "./components/**/*.{js,jsx,ts,tsx}",
     ],
     // ...
   }
   ```

4. Added NativeWind to Babel config in `babel.config.js`:
   ```js
   module.exports = function(api) {
     api.cache(true);
     return {
       presets: ['babel-preset-expo'],
       plugins: ["nativewind/babel"],
     };
   };
   ```

5. Created type definitions in `types/nativewind.d.ts`:
   ```ts
   /// <reference types="nativewind/types" />
   ```

6. Updated `tsconfig.json` to include the types:
   ```json
   {
     "include": [
       // ...
       "types/**/*.d.ts"
     ]
   }
   ```

7. Added NativeWind import to `app/_layout.tsx`:
   ```tsx
   import 'nativewind';
   ```

### Usage

Use the `className` prop directly on React Native components:

```tsx
<View className="flex-1 p-4 bg-background-light">
  <Text className="text-lg font-medium text-text-light">
    Hello World
  </Text>
</View>
```

For dark mode support, use the useColorScheme hook:

```tsx
const colorScheme = useColorScheme();
const isDark = colorScheme === 'dark';

<View className={`flex-1 ${isDark ? 'bg-background-dark' : 'bg-background-light'}`}>
  <Text className={`text-lg ${isDark ? 'text-text-dark' : 'text-text-light'}`}>
    Hello World
  </Text>
</View>
```

### Custom Theme

Custom colors are defined in `tailwind.config.js`:

```js
theme: {
  extend: {
    colors: {
      primary: '#FFCD4F',
      secondary: '#503C00',
      accent: '#775A00',
      // ...
    }
  }
}
``` 