// ====================================================================
// DONO JAHAAN (D O N O   J A H A A N)
// Safe Audio Abstraction Layer
// Guards against missing ExponentAV native module in Expo Go
// ====================================================================

import { NativeModules } from 'react-native';

let SafeAudio: any = null;
let isNativeAudioAvailable = false;

try {
  // Check if native ExponentAV module is bound in this runtime
  // In standard Expo Go client, ExponentAV native binary is absent.
  // In an EAS Development Build or standalone APK with expo-av compiled in, it is present.
  const hasNativeModule = Boolean(
    NativeModules.ExponentAV ||
    (global as any)?.ExpoModules?.ExponentAV ||
    (global as any)?.__expo?.nativeModules?.ExponentAV
  );

  if (hasNativeModule) {
    const expoAv = require('expo-av');
    if (expoAv && expoAv.Audio) {
      SafeAudio = expoAv.Audio;
      isNativeAudioAvailable = true;
    }
  } else {
    // Graceful fallback without triggering native unhandled exceptions
    SafeAudio = null;
    isNativeAudioAvailable = false;
  }
} catch (err: any) {
  SafeAudio = null;
  isNativeAudioAvailable = false;
}

export { SafeAudio, isNativeAudioAvailable };

