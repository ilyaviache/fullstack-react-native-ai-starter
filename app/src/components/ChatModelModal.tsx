import { useContext } from 'react';
import { ThemeContext, AppContext } from '../context';
import { MODELS } from '../../constants';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';

export function ChatModelModal({ handlePresentModalPress }) {
  const { theme } = useContext(ThemeContext);
  const { setChatType, chatType } = useContext(AppContext);
  const styles = getStyles(theme);
  const options = Object.values(MODELS);

  function _setChatType(v) {
    setChatType(v);
    handlePresentModalPress();
  }

  return (
    <View style={styles.bottomSheetContainer}>
      <View>
        <View style={styles.chatOptionsTextContainer}>
          <Text style={styles.chatOptionsText}>Language Models</Text>
        </View>
        {options.map((option, index) => (
          <TouchableHighlight
            underlayColor={'transparent'}
            onPress={() => _setChatType(option)}
            key={index}
          >
            <View style={optionContainer(theme, chatType.label, option.label)}>
              <option.icon size={20} theme={theme} selected={chatType.label === option.label} />
              <Text style={optionText(theme, chatType.label, option.label)}>{option.name}</Text>
            </View>
          </TouchableHighlight>
        ))}
      </View>
    </View>
  );
}

function getStyles(theme) {
  return StyleSheet.create({
    bottomSheetContainer: {
      backgroundColor: theme.backgroundColor,
      borderColor: theme.borderColor,
      borderRadius: 20,
      borderWidth: 1,
      justifyContent: 'center',
      marginBottom: 24,
      marginHorizontal: 14,
      padding: 24,
    },
    chatOptionsText: {
      color: theme.textColor,
      fontFamily: theme.semiBoldFont,
      fontSize: 16,
      marginBottom: 22,
      marginLeft: 10,
      textAlign: 'center',
    },
    chatOptionsTextContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    closeIconContainer: {
      position: 'absolute',
      right: 3,
      top: 3,
    },
    logo: {
      height: 17,
      marginRight: 10,
      width: 22,
    },
  });
}

function optionContainer(theme, baseType, type) {
  const selected = baseType === type;
  return {
    backgroundColor: selected ? theme.tintColor : theme.backgroundColor,
    padding: 12,
    borderRadius: 8,
    marginBottom: 9,
    flexDirection: 'row' as const,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  };
}

function optionText(theme, baseType, type) {
  const selected = baseType === type;
  return {
    color: selected ? theme.tintTextColor : theme.textColor,
    fontFamily: theme.boldFont,
    fontSize: 15,
    shadowColor: 'rgba(0, 0, 0, .2)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginLeft: 5,
  };
}
