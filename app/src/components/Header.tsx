import { StyleSheet, View, TouchableHighlight } from 'react-native';
import { useContext } from 'react';
import { Icon } from './Icon';
import { ThemeContext, AppContext } from '../../src/context';
import FontAwesome from '@expo/vector-icons/FontAwesome5';

export function Header() {
  const { theme } = useContext(ThemeContext);
  const { handlePresentModalPress } = useContext(AppContext);
  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <Icon size={34} fill={theme.textColor} />
      <TouchableHighlight
        style={styles.buttonContainer}
        underlayColor={'transparent'}
        activeOpacity={0.6}
        onPress={handlePresentModalPress}
      >
        <FontAwesome name="ellipsis-h" size={20} color={theme.textColor} />
      </TouchableHighlight>
    </View>
  );
}

function getStyles(theme: any) {
  return StyleSheet.create({
    buttonContainer: {
      padding: 15,
      position: 'absolute',
      right: 15,
    },
    container: {
      alignItems: 'center',
      backgroundColor: theme.backgroundColor,
      borderBottomColor: theme.borderColor,
      borderBottomWidth: 1,
      justifyContent: 'center',
      paddingVertical: 15,
    },
  });
}
