import {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {Priority} from '../../data/models/Task';
import {useTheme} from '../../theme/ThemeContext';

export const useEditTaskStyles = () => {
  const {theme} = useTheme();

  return useMemo(() => {
    const getPriorityStyles = (priority: Priority): ViewStyle => ({
      backgroundColor: theme.colors.secondaryAccent,
      borderWidth: 0,
      justifyContent: 'center',
      alignItems: 'center',
    });

    return StyleSheet.create({
      root: {
        flex: 1,
      },
      outerContainer: {
        flex: 1,
        backgroundColor: theme.colors.background,
      },
      container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 16,
        paddingBottom: 100, // espaço extra pro botão
      },
      containerChildren: {
        backgroundColor: theme.colors.secondaryBg,
        borderRadius: 12,
        padding: 24,
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      },
      scrollContent: {
        paddingBottom: 120,
      },
      label: {
        ...theme.typography.mediumTitle,
        fontSize: 20,
        marginBottom: 4,
        marginTop: 12,
        color: theme.colors.secondaryText,
      },
      input: {
        backgroundColor: theme.colors.secondaryBg,
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 12,
        marginBottom: 7,
        ...theme.typography.regular,
        color: theme.colors.mainText,
        borderWidth: 2,
        borderColor: theme.colors.primary,
      },
      multilineInput: {
        height: 100,
        textAlignVertical: 'top',
      },
      priorityContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
      },
      priorityButton: {
        paddingVertical: 2,
        paddingHorizontal: 12,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: theme.colors.primary,
        flex: 1,
        marginHorizontal: 4,
      },
      priorityALTA: getPriorityStyles('ALTA'),
      priorityMÉDIA: getPriorityStyles('MÉDIA'),
      priorityBAIXA: getPriorityStyles('BAIXA'),
      priorityText: {
        ...theme.typography.caption,
        color: theme.colors.primary,
        textTransform: 'uppercase',
        textAlign: 'center',
        fontSize: 16,
      },
      errorText: {
        ...theme.typography.caption,
        color: theme.colors.error,
        alignSelf: 'flex-start',
        marginLeft: 5,
        marginBottom: 12,
        height: 15,
      },
      dateInputButton: {
        justifyContent: 'center',
      },
      dateInputText: {
        ...theme.typography.regular,
        color: theme.colors.mainText,
      },
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 16,
        backgroundColor: theme.colors.background,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
      },
      button: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        width: '48%',
        height: 50,
      },
      buttonText: {
        ...theme.typography.mediumTitle,
        textTransform: 'uppercase',
        fontSize: 14,
      },
      cancelButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: theme.colors.primary,
      },
      cancelButtonText: {
        color: theme.colors.primary,
      },
      saveButton: {
        backgroundColor: theme.colors.primary,
      },
      saveButtonText: {
        color: theme.colors.secondaryBg,
      },
      deleteIcon: {
        color: theme.colors.error,
      },
      submitIcon: {
        color: theme.colors.secondaryAccent,
      },
      tagContainer: {
        flexDirection: 'row',
      },
      tagInputContainer: {
        width: '100%',
        position: 'relative',
      },
      tagChildrenContainer: {
        backgroundColor: theme.colors.primaryLight,
        borderRadius: 8,
        marginRight: 4,
        flexDirection: 'row',
        height: 27,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        marginBottom: 10,
        paddingHorizontal: 6,
      },
      textTag: {
        ...theme.typography.regular,
        fontSize: 16,
        color: theme.colors.mainText,
      },
      tagOuterContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 4,
      },
      buttonArrow: {
        position: 'absolute',
        right: 12,
        top: 16,
      },
    });
  }, [theme]);
};
