import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  Platform,
} from 'react-native';
import AppText from '@components/atoms/AppText';
import { colors, borderRadius, typography } from '@utils/theme';
import { hs, vs, ms } from '@utils/helper/Metrics';

interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onClear?: () => void;
  style?: ViewStyle;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChangeText,
  placeholder = 'શ્લોક અથવા વિષય શોધો...',
  onClear,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <AppText style={styles.searchIcon}>🔍</AppText>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        clearButtonMode="while-editing"
        autoCapitalize="none"
        autoCorrect={false}
      />
      {value.length > 0 && (
        <TouchableOpacity
          onPress={onClear || (() => onChangeText(''))}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          style={styles.clearBtn}
        >
          <AppText style={styles.clearText}>✕</AppText>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    paddingHorizontal: hs(12),
    minHeight: vs(46),
  },
  searchIcon: {
    fontSize: ms(14),
    marginRight: hs(8),
    opacity: 0.8,
  },
  input: {
    flex: 1,
    fontSize: ms(14),
    color: colors.textPrimary,
    paddingVertical: Platform.OS === 'ios' ? vs(6) : vs(2),
  },
  clearBtn: {
    padding: hs(4),
    marginLeft: hs(4),
  },
  clearText: {
    fontSize: ms(12),
    color: colors.textMuted,
    fontWeight: '700',
  },
});

export default SearchInput;
