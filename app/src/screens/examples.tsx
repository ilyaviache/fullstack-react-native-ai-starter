import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Input,
  Text,
} from '../components/ui';

export function ExamplesScreen() {
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);

  const handleButtonPress = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-4 space-y-6">
        {/* Typography Section */}
        <Card>
          <CardHeader>
            <CardTitle>Typography</CardTitle>
            <CardDescription>Text component variants</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Text variant="h1">Heading 1</Text>
            <Text variant="h2">Heading 2</Text>
            <Text variant="h3">Heading 3</Text>
            <Text variant="h4">Heading 4</Text>
            <Text variant="p">
              This is a paragraph with some longer text to demonstrate the default text styling.
            </Text>
            <Text variant="large">Large text for emphasis</Text>
            <Text variant="small">Small text for metadata</Text>
            <Text variant="muted">Muted text for secondary information</Text>
          </CardContent>
        </Card>

        {/* Buttons Section */}
        <Card>
          <CardHeader>
            <CardTitle>Buttons</CardTitle>
            <CardDescription>Button variants and sizes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <View className="space-y-3">
              <Text variant="small" className="text-muted-foreground">
                Variants
              </Text>
              <Button variant="default" onPress={handleButtonPress}>
                Default Button
              </Button>
              <Button variant="destructive" onPress={handleButtonPress}>
                Destructive
              </Button>
              <Button variant="outline" onPress={handleButtonPress}>
                Outline
              </Button>
              <Button variant="secondary" onPress={handleButtonPress}>
                Secondary
              </Button>
              <Button variant="ghost" onPress={handleButtonPress}>
                Ghost
              </Button>
              <Button variant="link" onPress={handleButtonPress}>
                Link Button
              </Button>
            </View>

            <View className="space-y-3 mt-6">
              <Text variant="small" className="text-muted-foreground">
                Sizes
              </Text>
              <Button size="sm" onPress={handleButtonPress}>
                Small Button
              </Button>
              <Button size="default" onPress={handleButtonPress}>
                Default Size
              </Button>
              <Button size="lg" onPress={handleButtonPress}>
                Large Button
              </Button>
            </View>

            <View className="space-y-3 mt-6">
              <Text variant="small" className="text-muted-foreground">
                States
              </Text>
              <Button loading={loading} onPress={handleButtonPress}>
                {loading ? 'Loading...' : 'Click to Load'}
              </Button>
              <Button disabled onPress={handleButtonPress}>
                Disabled Button
              </Button>
            </View>
          </CardContent>
        </Card>

        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle>Inputs</CardTitle>
            <CardDescription>Text input components</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <View>
              <Text variant="small" className="mb-2">
                Default Input
              </Text>
              <Input
                placeholder="Enter some text..."
                value={inputValue}
                onChangeText={setInputValue}
              />
            </View>

            <View>
              <Text variant="small" className="mb-2">
                With Error
              </Text>
              <Input placeholder="This input has an error" error />
            </View>

            <View>
              <Text variant="small" className="mb-2">
                Password Input
              </Text>
              <Input placeholder="Enter password" secureTextEntry />
            </View>

            <View>
              <Text variant="small" className="mb-2">
                Disabled Input
              </Text>
              <Input placeholder="This is disabled" editable={false} />
            </View>
          </CardContent>
        </Card>

        {/* Cards Section */}
        <Card>
          <CardHeader>
            <CardTitle>Cards</CardTitle>
            <CardDescription>Card component with all parts</CardDescription>
          </CardHeader>
          <CardContent>
            <Text variant="p">
              This is the card content area where you can place any content you want.
            </Text>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" onPress={() => {}}>
              Cancel
            </Button>
            <View className="ml-2">
              <Button variant="default" size="sm" onPress={() => {}}>
                Confirm
              </Button>
            </View>
          </CardFooter>
        </Card>

        {/* Complex Example */}
        <Card>
          <CardHeader>
            <CardTitle>Login Form Example</CardTitle>
            <CardDescription>A complex component composition example</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <View>
              <Text variant="small" className="mb-2 text-foreground">
                Email
              </Text>
              <Input placeholder="email@example.com" keyboardType="email-address" />
            </View>

            <View>
              <Text variant="small" className="mb-2 text-foreground">
                Password
              </Text>
              <Input placeholder="Enter your password" secureTextEntry />
            </View>

            <Button variant="default" onPress={() => {}}>
              Sign In
            </Button>

            <View className="flex-row justify-center">
              <Text variant="small" className="text-muted-foreground">
                Don't have an account?{' '}
              </Text>
              <Button variant="link" size="sm" onPress={() => {}}>
                Sign Up
              </Button>
            </View>
          </CardContent>
        </Card>
      </View>
    </ScrollView>
  );
}
