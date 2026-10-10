import React from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import AppText from '@components/atoms/AppText';
import CardSurface from '@components/atoms/CardSurface';
import OrnamentalDivider from '@components/atoms/OrnamentalDivider';
import Badge from '@components/atoms/Badge';
import { colors, borderRadius, shadows } from '@utils/theme';
import { hs, vs, ms } from '@utils/helper/Metrics';
import { toGujaratiNumeral } from '@utils/helper/gujaratiNumbers';

interface ResumeReadingModalProps {
  visible: boolean;
  shlokaId: number;
  chapterTitle: string;
  isDhyan?: boolean;
  onContinue: () => void;
  onDismiss: () => void;
}

const ResumeReadingModal: React.FC<ResumeReadingModalProps> = ({
  visible,
  shlokaId,
  chapterTitle,
  isDhyan = false,
  onContinue,
  onDismiss,
}) => {
  if (!visible) return null;

  const typeLabel = isDhyan ? 'ધ્યાન' : 'શ્લોક';
  const displayNum = toGujaratiNumeral ? toGujaratiNumeral(shlokaId) : String(shlokaId);

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      statusBarTranslucent={true}
      onRequestClose={onDismiss}
    >
      <Pressable style={styles.backdrop} onPress={onDismiss}>
        <Pressable
          style={styles.dialogWrapper}
          onPress={(e) => e.stopPropagation()}
        >
          <CardSurface variant="elevated" style={styles.card}>
            {/* Close 'X' button */}
            <TouchableOpacity
              onPress={onDismiss}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
              style={styles.closeButton}
            >
              <AppText style={styles.closeText}>✕</AppText>
            </TouchableOpacity>

            {/* Sacred Lotus / Header */}
            <View style={styles.header}>
              <Badge
                label="વાંચન ચાલુ રાખો"
                variant="gold"
                size="sm"
                style={styles.badge}
              />
              <AppText variant="h2" center color={colors.primaryDark} style={styles.title}>
                જ્યાંથી બાકી હતું ત્યાંથી આગળ વધો
              </AppText>
            </View>

            <OrnamentalDivider variant="light" style={styles.divider} />

            {/* Resume Info Card */}
            <View style={styles.infoBox}>
              <View style={styles.shlokaPill}>
                <AppText style={styles.pillText}>
                  {typeLabel} {displayNum}
                </AppText>
              </View>

              <AppText
                variant="body"
                center
                color={colors.textPrimary}
                style={styles.chapterText}
                numberOfLines={2}
              >
                {chapterTitle}
              </AppText>
            </View>

            <AppText
              variant="caption"
              center
              color={colors.textMuted}
              style={styles.promptText}
            >
              શું તમે છેલ્લે વાંચેલા આ {typeLabel}થી વાંચન ચાલુ રાખવા માંગો છો?
            </AppText>

            {/* Action Buttons */}
            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={styles.continueButton}
                activeOpacity={0.8}
                onPress={onContinue}
              >
                <AppText style={styles.continueButtonText}>
                  હા, ચાલુ રાખો
                </AppText>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.dismissButton}
                activeOpacity={0.7}
                onPress={onDismiss}
              >
                <AppText style={styles.dismissButtonText}>
                  શરૂઆતથી શરૂ કરો
                </AppText>
              </TouchableOpacity>
            </View>
          </CardSurface>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(28, 17, 10, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: hs(20),
  },
  dialogWrapper: {
    width: '100%',
    maxWidth: 380,
  },
  card: {
    backgroundColor: '#FFFDF9',
    borderRadius: borderRadius.lg,
    paddingHorizontal: hs(20),
    paddingTop: vs(24),
    paddingBottom: vs(20),
    borderWidth: 1.5,
    borderColor: colors.borderGold,
    ...shadows.lg,
  },
  closeButton: {
    position: 'absolute',
    top: vs(14),
    right: hs(16),
    zIndex: 10,
    padding: hs(4),
  },
  closeText: {
    fontSize: ms(16),
    color: colors.textMuted,
    fontWeight: '700',
  },
  header: {
    alignItems: 'center',
    marginBottom: vs(4),
  },
  badge: {
    marginBottom: vs(8),
  },
  title: {
    fontSize: ms(17),
    fontWeight: '700',
    marginTop: vs(2),
  },
  divider: {
    marginVertical: vs(10),
  },
  infoBox: {
    backgroundColor: colors.surfaceGold,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.borderGold,
    paddingVertical: vs(12),
    paddingHorizontal: hs(14),
    alignItems: 'center',
    marginBottom: vs(12),
  },
  shlokaPill: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.round,
    paddingHorizontal: hs(14),
    paddingVertical: vs(4),
    marginBottom: vs(6),
  },
  pillText: {
    color: '#FFFFFF',
    fontSize: ms(14),
    fontWeight: '800',
  },
  chapterText: {
    fontSize: ms(14),
    fontWeight: '600',
    lineHeight: ms(22),
  },
  promptText: {
    fontSize: ms(12.5),
    lineHeight: ms(20),
    marginBottom: vs(18),
    paddingHorizontal: hs(8),
  },
  buttonGroup: {
    width: '100%',
    gap: vs(8),
  },
  continueButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    paddingVertical: vs(12),
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.sm,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: ms(15),
    fontWeight: '700',
  },
  dismissButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: borderRadius.md,
    paddingVertical: vs(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  dismissButtonText: {
    color: colors.textSecondary,
    fontSize: ms(13.5),
    fontWeight: '600',
  },
});

export default ResumeReadingModal;
