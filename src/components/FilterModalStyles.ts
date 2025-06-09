import {StyleSheet} from 'react-native';
import {useTheme} from '../theme/ThemeContext';
import {useMemo} from 'react';

export const useFilterModalStyles = () => {
  const {theme} = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        modalOverlay: {
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          justifyContent: 'center',
          alignItems: 'center',
        },
        modalContainer: {
          width: 329,
          maxHeight: '80%',
          borderRadius: 8,
          overflow: 'hidden',
          backgroundColor: theme.colors.secondaryBg,
        },
        modalHeader: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 16,
          borderBottomWidth: 1,
          borderBottomColor: '#E0E0E0',
        },
        modalTitle: {
          ...theme.typography.subtitle,
          color: theme.colors.mainText,
          fontSize: 20,
          fontWeight: '600',
        },
        closeButton: {
          fontSize: 26,
          fontWeight: '500',
          color: '#E74C3C',
          width: 26,
          height: 26,
          textAlign: 'center',
          lineHeight: 26,
        },
        modalContent: {
          paddingHorizontal: 16,
          maxHeight: '70%',
        },
        section: {
          marginBottom: 8,
          paddingBottom: 8,
        },
        sectionLast: {
          marginBottom: 8,
          paddingBottom: 8,
          borderBottomWidth: 0,
        },
        sectionHeader: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 12,
        },
        sectionTitle: {
          ...theme.typography.subtitle,
          color: theme.colors.mainText,
        },
        chevron: {
          fontSize: 24,
          color: '#5B3CC4',
          width: 24,
          height: 24,
          textAlign: 'center',
        },
        chevronActive: {
          color: '#5B3CC4',
        },
        sectionContent: {
          paddingLeft: 8,
          marginTop: 4,
          marginBottom: 8,
        },
        optionRow: {
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 12,
          paddingVertical: 4,
          paddingHorizontal: 8,
        },
        optionRowSelected: {
          backgroundColor: '#F3E5F5',
        },
        radioButtonContainer: {
          marginRight: 10,
        },
        radioButtonUnselected: {
          height: 20,
          width: 20,
          borderRadius: 10,
          borderWidth: 2,
          borderColor: '#BBBBBB',
        },
        radioButtonSelected: {
          height: 19.5,
          width: 19.5,
          borderRadius: 10,
          backgroundColor: '#32C25B',
          borderWidth: 0,
          alignItems: 'center',
          justifyContent: 'center',
        },
        checkmark: {
          color: '#FFFFFF',
          fontSize: 14,
          fontWeight: 'bold',
        },
        optionText: {
          ...theme.typography.regular,
          color: theme.colors.mainText,
        },
        tagsContainer: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginTop: 5,
        },
        tagItem: {
          flexDirection: 'row',
          alignItems: 'center',
          borderRadius: 8,
          paddingHorizontal: 10,
          paddingVertical: 6,
          marginRight: 10,
          marginBottom: 10,
          backgroundColor: '#F3E5F5',
        },
        checkboxContainer: {
          marginRight: 8,
        },
        checkboxUnselected: {
          height: 18,
          width: 18,
          borderRadius: 4,
          borderWidth: 2,
          borderColor: '#BBBBBB',
        },
        checkboxSelected: {
          height: 19.5,
          width: 19.5,
          borderRadius: 4,
          backgroundColor: '#32C25B',
          borderWidth: 0,
          alignItems: 'center',
          justifyContent: 'center',
        },
        tagText: {
          ...theme.typography.caption,
          color: theme.colors.mainText,
        },
        placeholderText: {
          fontStyle: 'italic',
          ...theme.typography.regular,
          color: theme.colors.secondaryText,
        },
        actionButtons: {
          padding: 16,
        },
        applyButton: {
          borderRadius: 4,
          paddingVertical: 12,
          alignItems: 'center',
          marginBottom: 8,
          backgroundColor: '#5B3CC4',
        },
        applyButtonText: {
          ...theme.typography.mediumTitle,
          color: '#FFFFFF',
          textTransform: 'uppercase',
          fontSize: 16,
          fontWeight: '600',
        },
        clearButton: {
          borderRadius: 4,
          paddingVertical: 12,
          alignItems: 'center',
          backgroundColor: '#F3E5F5',
        },
        clearButtonText: {
          ...theme.typography.mediumTitle,
          color: '#5B3CC4',
          textTransform: 'uppercase',
          fontSize: 16,
          fontWeight: '600',
        },
        // Novos estilos para data
        dateInputContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 16,
          flexWrap: 'wrap',
        },
        dateLabel: {
          ...theme.typography.regular,
          color: theme.colors.mainText,
          marginRight: 8,
          minWidth: 60,
          fontSize: 14,
        },
        dateButton: {
          backgroundColor: '#F3E5F5',
          borderRadius: 6,
          paddingHorizontal: 12,
          paddingVertical: 8,
          marginRight: 8,
          borderWidth: 1,
          borderColor: '#E0E0E0',
          flex: 1,
          minWidth: 140,
        },
        dateButtonText: {
          ...theme.typography.regular,
          color: theme.colors.mainText,
          fontSize: 14,
          textAlign: 'center',
        },
        clearDateButton: {
          backgroundColor: '#E74C3C',
          borderRadius: 12,
          width: 24,
          height: 24,
          alignItems: 'center',
          justifyContent: 'center',
        },
        clearDateText: {
          color: '#FFFFFF',
          fontSize: 14,
          fontWeight: 'bold',
          lineHeight: 16,
        },
      }),
    [theme],
  );

  return styles;
};
