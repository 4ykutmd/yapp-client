import { Stack } from "expo-router";

export default function AskQuestionLayout() {
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