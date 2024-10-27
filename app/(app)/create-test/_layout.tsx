import { Stack } from "expo-router";

export default function CreateTestLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown:false
        }}
      />
    </Stack>
  )
}