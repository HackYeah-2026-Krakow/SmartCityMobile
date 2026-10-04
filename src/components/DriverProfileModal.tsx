import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import {
  DriverProfile,
  useDriverProfile,
} from '../context/DriverProfileContext';
import { colors } from '../theme/colors';

interface DriverProfileModalProps {
  visible: boolean;
  onClose: () => void;
}

export function DriverProfileModal({
  visible,
  onClose,
}: DriverProfileModalProps) {
  const { profile, setProfile } = useDriverProfile();

  const [form, setForm] = useState<DriverProfile>(profile);

  const updateField = (
    field: keyof DriverProfile,
    value: string
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const saveProfile = () => {
    setProfile({
      nickname: form.nickname.trim() || 'Wojtas Puczylk',
      car: form.car.trim() || 'BMW Seria 3 E46',
      registration:
        form.registration.trim().toUpperCase() || 'WWL54443',
      fuelConsumption: form.fuelConsumption.trim() || '8',
    });

    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.card}>
          <Text style={styles.brand}>● GREENPACE</Text>

          <Text style={styles.title}>Welcome, driver</Text>

          <Text style={styles.subtitle}>
            Tell us a little about yourself. We use this information
            to personalize your GreenPace experience.
          </Text>

          <Text style={styles.label}>Nickname</Text>

          <TextInput
            style={styles.input}
            value={form.nickname}
            onChangeText={(value) =>
              updateField('nickname', value)
            }
            placeholder="Nickname"
            placeholderTextColor={colors.textSecondary}
          />

          <Text style={styles.label}>Car</Text>

          <TextInput
            style={styles.input}
            value={form.car}
            onChangeText={(value) =>
              updateField('car', value)
            }
            placeholder="BMW Seria 3 E46"
            placeholderTextColor={colors.textSecondary}
          />

          <Text style={styles.label}>Registration number</Text>

          <TextInput
            style={styles.input}
            value={form.registration}
            onChangeText={(value) =>
              updateField('registration', value)
            }
            autoCapitalize="characters"
            placeholder="WWL54443"
            placeholderTextColor={colors.textSecondary}
          />

          <Text style={styles.label}>
            Average fuel consumption
          </Text>

          <View style={styles.fuelRow}>
            <TextInput
              style={[styles.input, styles.fuelInput]}
              value={form.fuelConsumption}
              onChangeText={(value) =>
                updateField(
                  'fuelConsumption',
                  value.replace(',', '.').replace(/[^0-9.]/g, '')
                )
              }
              keyboardType="decimal-pad"
              placeholder="8"
              placeholderTextColor={colors.textSecondary}
            />

            <Text style={styles.unit}>l / 100 km</Text>
          </View>

          <Pressable
            style={styles.button}
            onPress={saveProfile}
          >
            <Text style={styles.buttonText}>
              Start driving
            </Text>
          </Pressable>

          <Text style={styles.privacy}>
            Your profile is used only for the GreenPace prototype.
          </Text>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.82)',
    justifyContent: 'center',
    padding: 22,
  },

  card: {
    backgroundColor: colors.card,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 22,
  },

  brand: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: 18,
  },

  title: {
    color: colors.white,
    fontSize: 26,
    fontWeight: '800',
  },

  subtitle: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 7,
    marginBottom: 20,
  },

  label: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 6,
    marginTop: 10,
  },

  input: {
    backgroundColor: colors.cardSecondary,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: colors.white,
    fontSize: 15,
  },

  fuelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  fuelInput: {
    flex: 1,
  },

  unit: {
    color: colors.textSecondary,
    fontSize: 14,
  },

  button: {
    backgroundColor: colors.primary,
    borderRadius: 14,
    alignItems: 'center',
    paddingVertical: 14,
    marginTop: 24,
  },

  buttonText: {
    color: '#07110B',
    fontWeight: '800',
    fontSize: 16,
  },

  privacy: {
    color: colors.textSecondary,
    textAlign: 'center',
    fontSize: 11,
    marginTop: 14,
  },
});
