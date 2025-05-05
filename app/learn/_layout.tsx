import { Stack } from 'expo-router';

export default function LearnLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="article"
        options={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      />
    </Stack>
  );
} 