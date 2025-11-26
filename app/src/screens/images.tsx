import {
  View,
  Text,
  TouchableHighlight,
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TextInput,
  Dimensions,
  Keyboard,
  Image,
} from 'react-native';
import { useState, useRef, useContext } from 'react';
import { DOMAIN, IMAGE_MODELS, ILLUSION_DIFFUSION_IMAGES } from '../../constants';
import { v4 as uuid } from 'uuid';
import { ThemeContext, AppContext } from '../context';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useActionSheet } from '@expo/react-native-action-sheet';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import * as Clipboard from 'expo-clipboard';

const { width } = Dimensions.get('window');

type ImagesState = {
  index: typeof uuid;
  values: any[];
};

export function Images() {
  const [callMade, setCallMade] = useState(false);
  const { theme } = useContext(ThemeContext);
  const styles = getStyles(theme);
  const [input, setInput] = useState('');
  const scrollViewRef = useRef<ScrollView | null>(null);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<any>(null);
  const [images, setImages] = useState<ImagesState>({
    index: uuid,
    values: [],
  });
  const { handlePresentModalPress, closeModal, imageModel, illusionImage } = useContext(AppContext);

  const { showActionSheetWithOptions } = useActionSheet();

  const hideInput =
    imageModel === IMAGE_MODELS.removeBg.label || imageModel === IMAGE_MODELS.upscale.label;
  const buttonLabel = imageModel === IMAGE_MODELS.removeBg.label ? 'Remove background' : 'Upscale';

  async function generate() {
    if (loading) return;
    if (hideInput && !image) {
      console.log('no image selected');
      return;
    } else if (!hideInput && !input) {
      console.log('no input');
      return;
    }
    Keyboard.dismiss();
    const imageCopy = image;
    const currentModel = IMAGE_MODELS[imageModel].name;
    try {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({
          animated: true,
        });
      }, 1);
      setCallMade(true);
      const imagesArray = [
        ...images.values,
        {
          user: input,
        },
      ];
      setImages((images) => ({
        index: images.index,
        values: JSON.parse(JSON.stringify(imagesArray)),
      }));

      let response;

      const body = {
        prompt: input,
        model: imageModel,
      } as any;

      setLoading(true);
      setImage(null);
      setInput('');

      if (imageCopy) {
        const formData = new FormData();
        // @ts-ignore
        formData.append('file', {
          uri: imageCopy.uri.replace('file://', ''),
          name: uuid(),
          type: imageCopy.mimeType,
        });
        for (const key in body) {
          formData.append(key, body[key]);
        }

        response = await fetch(`${DOMAIN}/images/fal`, {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }).then((res) => res.json());
      } else {
        if (imageModel === IMAGE_MODELS.illusionDiffusion.label) {
          body.baseImage = ILLUSION_DIFFUSION_IMAGES[illusionImage].image;
        }

        response = await fetch(`${DOMAIN}/images/fal`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        }).then((res) => res.json());
      }
      if (response.image) {
        imagesArray[imagesArray.length - 1].image = response.image;
        imagesArray[imagesArray.length - 1].model = currentModel;
        setImages((i) => ({
          index: i.index,
          values: imagesArray,
        }));
        setLoading(false);
        setTimeout(() => {
          scrollViewRef.current?.scrollToEnd({
            animated: true,
          });
        }, 50);
      } else {
        setLoading(false);
        console.log('error generating image ...', response);
      }
    } catch (err) {
      setLoading(false);
      console.log('error generating image ...', err);
    }
  }

  async function copyToClipboard(text: string) {
    await Clipboard.setStringAsync(text);
  }

  function clearPrompts() {
    setCallMade(false);
    setImages({
      index: uuid,
      values: [],
    });
  }

  async function showClipboardActionsheet(d) {
    closeModal();
    const cancelButtonIndex = 2;
    showActionSheetWithOptions(
      {
        options: ['Save image', 'Clear prompts', 'cancel'],
        cancelButtonIndex,
      },
      (selectedIndex) => {
        if (selectedIndex === Number(0)) {
          console.log('saving image ...');
          downloadImageToDevice(d.image);
        }
        if (selectedIndex === Number(1)) {
          clearPrompts();
        }
      }
    );
  }

  async function downloadImageToDevice(url: string) {
    try {
      const downloadResumable = FileSystem.createDownloadResumable(
        url,
        FileSystem.documentDirectory + uuid() + '.png'
      );
      try {
        await downloadResumable.downloadAsync();
      } catch (e) {
        console.error(e);
      }
    } catch (err) {
      console.log('error saving image ...', err);
    }
  }

  function onChangeText(val: string) {
    setInput(val);
  }

  async function chooseImage() {
    try {
      const res = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
      if (!res || !res.assets) return;
      setImage(res.assets[0]);
    } catch (err) {
      console.log('error:', err);
    }
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.container}
        keyboardVerticalOffset={110}
      >
        <ScrollView
          contentContainerStyle={!callMade && styles.scrollContentContainer}
          ref={scrollViewRef}
          keyboardShouldPersistTaps="handled"
          style={styles.scrollContainer}
        >
          {!callMade && (
            <View style={styles.midChatInputWrapper}>
              <View style={styles.midChatInputContainer}>
                {!hideInput && (
                  <>
                    <TextInput
                      onChangeText={onChangeText}
                      style={styles.midInput}
                      placeholder="What do you want to create?"
                      placeholderTextColor={theme.placeholderTextColor}
                      autoCorrect={true}
                      value={input}
                    />
                    <TouchableHighlight
                      onPress={generate}
                      underlayColor={'transparent'}
                      onLongPress={() => {
                        Keyboard.dismiss();
                        handlePresentModalPress();
                      }}
                    >
                      <View style={styles.midButtonStyle}>
                        <Ionicons name="images-outline" size={22} color={theme.tintTextColor} />
                        <Text style={styles.midButtonText}>Create</Text>
                      </View>
                    </TouchableHighlight>
                  </>
                )}
                {hideInput && (
                  <TouchableHighlight
                    onPress={image ? generate : chooseImage}
                    underlayColor={'transparent'}
                  >
                    <View style={styles.midButtonStyle}>
                      <Ionicons name="images-outline" size={22} color={theme.tintTextColor} />
                      <Text style={styles.midButtonText}>
                        {image ? buttonLabel : 'Choose image'}
                      </Text>
                    </View>
                  </TouchableHighlight>
                )}
                {image && (
                  <View style={styles.midFileNameContainer}>
                    <Text style={styles.fileName}>{image.name || 'Image from Camera Roll'}</Text>
                    <TouchableHighlight
                      onPress={() => setImage(null)}
                      style={styles.closeIconContainer}
                      underlayColor={'transparent'}
                    >
                      <MaterialIcons
                        style={styles.closeIcon}
                        name="close"
                        color={theme.textColor}
                        size={14}
                      />
                    </TouchableHighlight>
                  </View>
                )}
                <Text style={styles.chatDescription}>
                  Generate images and art using natural language. Choose from a variety of models.
                </Text>
              </View>
            </View>
          )}
          {images.values.map((v, index) => (
            <View key={index} style={styles.imageContainer}>
              {v.user && (
                <View style={styles.promptTextContainer}>
                  <TouchableHighlight underlayColor={'transparent'}>
                    <View style={styles.promptTextWrapper}>
                      <Text style={styles.promptText}>{v.user}</Text>
                    </View>
                  </TouchableHighlight>
                </View>
              )}
              {v.image && (
                <View>
                  <TouchableHighlight
                    onPress={() => showClipboardActionsheet(v)}
                    underlayColor={'transparent'}
                  >
                    <Image source={{ uri: v.image }} style={styles.image} />
                  </TouchableHighlight>
                  <View style={styles.modelLabelContainer}>
                    <Text style={styles.modelLabelText}>Created with Fal.ai model {v.model}</Text>
                  </View>
                </View>
              )}
            </View>
          ))}
          {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator />
            </View>
          )}
        </ScrollView>
        {callMade && (
          <>
            {!hideInput && (
              <View style={styles.chatInputContainer}>
                <TextInput
                  onChangeText={onChangeText}
                  style={styles.input}
                  placeholder="What else do you want to create?"
                  placeholderTextColor={theme.placeholderTextColor}
                  autoCorrect={true}
                  value={input}
                />
                <TouchableHighlight
                  onPress={generate}
                  underlayColor={'transparent'}
                  onLongPress={() => {
                    Keyboard.dismiss();
                    handlePresentModalPress();
                  }}
                >
                  <View style={styles.buttonStyle}>
                    <Ionicons name="arrow-up" size={20} color={theme.tintTextColor} />
                  </View>
                </TouchableHighlight>
              </View>
            )}
            {hideInput && (
              <TouchableHighlight
                onPress={image ? generate : chooseImage}
                underlayColor={'transparent'}
              >
                <View style={styles.bottomButtonStyle}>
                  <Ionicons name="images-outline" size={22} color={theme.tintTextColor} />
                  <Text style={styles.midButtonText}>{image ? buttonLabel : 'Choose image'}</Text>
                </View>
              </TouchableHighlight>
            )}
          </>
        )}
      </KeyboardAvoidingView>
    </View>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    bottomButtonStyle: {
      alignItems: 'center',
      backgroundColor: theme.tintColor,
      borderRadius: 4,
      flexDirection: 'row',
      justifyContent: 'center',
      marginHorizontal: 6,
      marginVertical: 5,
      paddingHorizontal: 7,
      paddingVertical: 7,
    },
    buttonStyle: {
      backgroundColor: theme.tintColor,
      borderRadius: 99,
      marginRight: 14,
      padding: 5,
    },
    buttonText: {
      color: theme.textColor,
      fontFamily: theme.mediumFont,
    },
    chatDescription: {
      color: theme.textColor,
      fontFamily: theme.regularFont,
      fontSize: 13,
      marginTop: 15,
      opacity: 0.8,
      paddingHorizontal: 34,
      textAlign: 'center',
    },
    chatInputContainer: {
      alignItems: 'center',
      borderColor: theme.borderColor,
      flexDirection: 'row',
      paddingBottom: 5,
      paddingTop: 5,
      width: '100%',
    },
    closeIcon: {
      backgroundColor: theme.backgroundColor,
      borderColor: theme.borderColor,
      borderRadius: 15,
      borderWidth: 1,
      padding: 4,
    },
    closeIconContainer: {
      backgroundColor: 'transparent',
      borderRadius: 25,
      padding: 10,
      position: 'absolute',
      right: -15,
      top: -17,
    },
    container: {
      backgroundColor: theme.backgroundColor,
      flex: 1,
    },
    fileName: {
      color: theme.textColor,
    },
    iconContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      borderRadius: 8,
      height: width - 10,
      marginHorizontal: 5,
      marginTop: 5,
      width: width - 10,
    },
    imageContainer: {
      marginBottom: 15,
    },
    input: {
      borderColor: theme.borderColor,
      borderRadius: 99,
      borderWidth: 1,
      color: theme.textColor,
      flex: 1,
      fontFamily: theme.semiBoldFont,
      marginHorizontal: 10,
      paddingHorizontal: 21,
      paddingRight: 39,
      paddingVertical: 10,
    },
    loadingContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      marginVertical: 25,
    },
    midButtonStyle: {
      alignItems: 'center',
      backgroundColor: theme.tintColor,
      borderRadius: 99,
      flexDirection: 'row',
      justifyContent: 'center',
      marginHorizontal: 14,
      paddingHorizontal: 15,
      paddingVertical: 12,
    },
    midButtonText: {
      color: theme.tintTextColor,
      fontFamily: theme.boldFont,
      fontSize: 16,
      marginLeft: 10,
    },
    midChatInputContainer: {
      paddingBottom: 5,
      paddingTop: 5,
      width: '100%',
    },
    midChatInputWrapper: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
    },
    midFileNameContainer: {
      borderColor: theme.borderColor,
      borderRadius: 7,
      borderWidth: 1,
      marginHorizontal: 10,
      marginRight: 20,
      marginTop: 20,
      paddingHorizontal: 10,
      paddingVertical: 10,
    },
    midInput: {
      borderColor: theme.borderColor,
      borderRadius: 99,
      borderWidth: 1,
      color: theme.textColor,
      fontFamily: theme.mediumFont,
      marginBottom: 8,
      marginHorizontal: 10,
      paddingHorizontal: 25,
      paddingVertical: 15,
    },
    modelLabelContainer: {
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: 8,
      borderColor: theme.borderColor,
      borderTopWidth: 0,
      borderWidth: 1,
      marginHorizontal: 5,
      padding: 9,
      paddingLeft: 13,
    },
    modelLabelText: {
      color: theme.mutedForegroundColor,
      fontFamily: theme.regularFont,
      fontSize: 13,
    },
    promptText: {
      color: theme.tintTextColor,
      fontFamily: theme.regularFont,
      fontSize: 16,
      paddingHorizontal: 9,
      paddingVertical: 5,
    },
    promptTextContainer: {
      alignItems: 'flex-end',
      flex: 1,
      marginBottom: 5,
      marginLeft: 24,
      marginRight: 5,
    },
    promptTextWrapper: {
      backgroundColor: theme.tintColor,
      borderRadius: 8,
      borderTopRightRadius: 0,
    },
    scrollContainer: {
      paddingTop: 10,
    },
    scrollContentContainer: {
      flex: 1,
    },
  });
