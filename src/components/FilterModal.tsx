import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useFilterModalStyles} from './FilterModalStyles';

export interface FilterOptions {
  orderBy: 'high-to-low' | 'low-to-high' | null;
  tags: string[];
  dateFrom: string | null;
  dateTo: string | null;
}

interface FilterModalProps {
  isVisible: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterOptions) => void;
  availableTags: string[];
  currentFilters?: FilterOptions | null;
}

const FilterModal: React.FC<FilterModalProps> = ({
  isVisible,
  onClose,
  onApplyFilters,
  availableTags = [],
  currentFilters,
}) => {
  const styles = useFilterModalStyles();

  const [isOrderByOpen, setIsOrderByOpen] = useState<boolean>(false);
  const [isTagsOpen, setIsTagsOpen] = useState<boolean>(false);
  const [isDateOpen, setIsDateOpen] = useState<boolean>(false);

  const [selectedPriority, setSelectedPriority] = useState<'high-to-low' | 'low-to-high' | null>(
    null,
  );
  const [selectedTags, setSelectedTags] = useState<{[key: string]: boolean}>({});

  // Estados para data
  const [dateFrom, setDateFrom] = useState<Date | null>(null);
  const [dateTo, setDateTo] = useState<Date | null>(null);
  const [showDateFromPicker, setShowDateFromPicker] = useState<boolean>(false);
  const [showDateToPicker, setShowDateToPicker] = useState<boolean>(false);

  useEffect(() => {
    if (currentFilters) {
      setSelectedPriority(currentFilters.orderBy);

      // Tags
      const tagsState: {[key: string]: boolean} = {};
      availableTags.forEach(tag => {
        tagsState[tag] = currentFilters.tags.includes(tag);
      });
      setSelectedTags(tagsState);

      // Datas
      setDateFrom(currentFilters.dateFrom ? new Date(currentFilters.dateFrom) : null);
      setDateTo(currentFilters.dateTo ? new Date(currentFilters.dateTo) : null);
    } else {
      setSelectedPriority(null);

      const initialTagsState: {[key: string]: boolean} = {};
      availableTags.forEach(tag => {
        initialTagsState[tag] = false;
      });
      setSelectedTags(initialTagsState);

      setDateFrom(null);
      setDateTo(null);
    }
  }, [availableTags, currentFilters]);

  const toggleOrderBySection = () => setIsOrderByOpen(!isOrderByOpen);
  const toggleTagsSection = () => setIsTagsOpen(!isTagsOpen);
  const toggleDateSection = () => setIsDateOpen(!isDateOpen);

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => ({
      ...prev,
      [tag]: !prev[tag],
    }));
  };

  const handlePriorityChange = (priority: 'high-to-low' | 'low-to-high') => {
    if (selectedPriority === priority) {
      setSelectedPriority(null);
    } else {
      setSelectedPriority(priority);
    }
  };

  // Funções para lidar com as datas
  const formatDateToDisplay = (date: Date | null): string => {
    if (!date) return '';
    return date.toLocaleDateString('pt-BR');
  };

  const onDateFromChange = (event: any, selectedDate?: Date) => {
    setShowDateFromPicker(Platform.OS === 'ios');
    if (selectedDate) {
      // Definir para o início do dia
      const startOfDay = new Date(selectedDate);
      startOfDay.setHours(0, 0, 0, 0);
      setDateFrom(startOfDay);
    }
  };

  const onDateToChange = (event: any, selectedDate?: Date) => {
    setShowDateToPicker(Platform.OS === 'ios');
    if (selectedDate) {
      // Definir para o final do dia
      const endOfDay = new Date(selectedDate);
      endOfDay.setHours(23, 59, 59, 999);
      setDateTo(endOfDay);
    }
  };

  const clearDateFrom = () => setDateFrom(null);
  const clearDateTo = () => setDateTo(null);

  const handleApplyFilters = () => {
    const selectedTagsList = Object.keys(selectedTags).filter(tag => selectedTags[tag]);

    onApplyFilters({
      orderBy: selectedPriority,
      tags: selectedTagsList,
      dateFrom: dateFrom ? dateFrom.toISOString() : null,
      dateTo: dateTo ? dateTo.toISOString() : null,
    });
    onClose();
  };

  const handleClearFilters = () => {
    setSelectedPriority(null);
    const clearedTags: {[key: string]: boolean} = {};
    Object.keys(selectedTags).forEach(tag => {
      clearedTags[tag] = false;
    });
    setSelectedTags(clearedTags);
    setDateFrom(null);
    setDateTo(null);
  };

  const handleModalContainerPress = (e: any) => {
    e.stopPropagation();
  };

  const getModalHeight = () => {
    let height = 380; // Altura base maior para incluir as 3 seções fechadas + botões

    if (isOrderByOpen) {
      height += 120;
    }

    if (isTagsOpen && availableTags.length > 0) {
      const tagsPerRow = 2;
      const tagRows = Math.ceil(availableTags.length / tagsPerRow);
      height += Math.min(tagRows * 50 + 20, 150);
    } else if (isTagsOpen) {
      height += 50;
    }

    if (isDateOpen) {
      height += 200; // Aumentar altura para acomodar os date pickers
    }

    return Math.min(height, 700); // Aumentar altura máxima
  };

  return (
    <Modal transparent visible={isVisible} animationType="fade" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback onPress={handleModalContainerPress}>
            <View style={[styles.modalContainer, {height: getModalHeight()}]}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Filtro</Text>
                <TouchableOpacity onPress={onClose}>
                  <Text style={styles.closeButton}>×</Text>
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
                {/* Seção Ordenar por */}
                <View
                  style={[styles.section, {borderBottomWidth: 1, borderBottomColor: '#E0E0E0'}]}>
                  <TouchableOpacity style={styles.sectionHeader} onPress={toggleOrderBySection}>
                    <Text style={styles.sectionTitle}>Ordenar por</Text>
                    <Text style={[styles.chevron, isOrderByOpen && styles.chevronActive]}>
                      {isOrderByOpen ? '∧' : '∨'}
                    </Text>
                  </TouchableOpacity>
                  {isOrderByOpen && (
                    <View style={styles.sectionContent}>
                      <TouchableOpacity
                        style={[
                          styles.optionRow,
                          selectedPriority === 'low-to-high' && styles.optionRowSelected,
                        ]}
                        onPress={() => handlePriorityChange('low-to-high')}>
                        <View style={styles.radioButtonContainer}>
                          {selectedPriority === 'low-to-high' ? (
                            <View style={styles.radioButtonSelected}>
                              <Text style={styles.checkmark}>✓</Text>
                            </View>
                          ) : (
                            <View style={styles.radioButtonUnselected} />
                          )}
                        </View>
                        <Text style={styles.optionText}>Prioridade (de baixa para alta)</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[
                          styles.optionRow,
                          selectedPriority === 'high-to-low' && styles.optionRowSelected,
                        ]}
                        onPress={() => handlePriorityChange('high-to-low')}>
                        <View style={styles.radioButtonContainer}>
                          {selectedPriority === 'high-to-low' ? (
                            <View style={styles.radioButtonSelected}>
                              <Text style={styles.checkmark}>✓</Text>
                            </View>
                          ) : (
                            <View style={styles.radioButtonUnselected} />
                          )}
                        </View>
                        <Text style={styles.optionText}>Prioridade (de alta para baixa)</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>

                {/* Seção Tags */}
                <View
                  style={[styles.section, {borderBottomWidth: 1, borderBottomColor: '#E0E0E0'}]}>
                  <TouchableOpacity style={styles.sectionHeader} onPress={toggleTagsSection}>
                    <Text style={styles.sectionTitle}>Tags</Text>
                    <Text style={[styles.chevron, isTagsOpen && styles.chevronActive]}>
                      {isTagsOpen ? '∧' : '∨'}
                    </Text>
                  </TouchableOpacity>
                  {isTagsOpen && (
                    <View style={styles.sectionContent}>
                      {availableTags.length > 0 ? (
                        <View style={styles.tagsContainer}>
                          {Object.keys(selectedTags).map(tag => (
                            <TouchableOpacity
                              key={tag}
                              style={styles.tagItem}
                              onPress={() => handleTagToggle(tag)}>
                              <View style={styles.checkboxContainer}>
                                {selectedTags[tag] ? (
                                  <View style={styles.checkboxSelected}>
                                    <Text style={styles.checkmark}>✓</Text>
                                  </View>
                                ) : (
                                  <View style={styles.checkboxUnselected} />
                                )}
                              </View>
                              <Text style={styles.tagText}>{tag.toUpperCase()}</Text>
                            </TouchableOpacity>
                          ))}
                        </View>
                      ) : (
                        <Text style={styles.placeholderText}>Nenhuma tag disponível</Text>
                      )}
                    </View>
                  )}
                </View>

                {/* Seção Data */}
                <View style={styles.sectionLast}>
                  <TouchableOpacity style={styles.sectionHeader} onPress={toggleDateSection}>
                    <Text style={styles.sectionTitle}>Data</Text>
                    <Text style={[styles.chevron, isDateOpen && styles.chevronActive]}>
                      {isDateOpen ? '∧' : '∨'}
                    </Text>
                  </TouchableOpacity>
                  {isDateOpen && (
                    <View style={styles.sectionContent}>
                      {/* Data De */}
                      <View style={styles.dateInputContainer}>
                        <Text style={styles.dateLabel}>Data de:</Text>
                        <TouchableOpacity
                          style={styles.dateButton}
                          onPress={() => setShowDateFromPicker(true)}>
                          <Text style={styles.dateButtonText}>
                            {dateFrom ? formatDateToDisplay(dateFrom) : 'Selecionar data'}
                          </Text>
                        </TouchableOpacity>
                        {dateFrom && (
                          <TouchableOpacity style={styles.clearDateButton} onPress={clearDateFrom}>
                            <Text style={styles.clearDateText}>✕</Text>
                          </TouchableOpacity>
                        )}
                      </View>

                      {/* Data Até */}
                      <View style={styles.dateInputContainer}>
                        <Text style={styles.dateLabel}>Data até:</Text>
                        <TouchableOpacity
                          style={styles.dateButton}
                          onPress={() => setShowDateToPicker(true)}>
                          <Text style={styles.dateButtonText}>
                            {dateTo ? formatDateToDisplay(dateTo) : 'Selecionar data'}
                          </Text>
                        </TouchableOpacity>
                        {dateTo && (
                          <TouchableOpacity style={styles.clearDateButton} onPress={clearDateTo}>
                            <Text style={styles.clearDateText}>✕</Text>
                          </TouchableOpacity>
                        )}
                      </View>

                      {/* DateTimePickers */}
                      {showDateFromPicker && (
                        <DateTimePicker
                          value={dateFrom || new Date()}
                          mode="date"
                          display="default"
                          onChange={onDateFromChange}
                          maximumDate={dateTo || undefined}
                        />
                      )}

                      {showDateToPicker && (
                        <DateTimePicker
                          value={dateTo || new Date()}
                          mode="date"
                          display="default"
                          onChange={onDateToChange}
                          minimumDate={dateFrom || undefined}
                        />
                      )}
                    </View>
                  )}
                </View>
              </ScrollView>

              <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.applyButton} onPress={handleApplyFilters}>
                  <Text style={styles.applyButtonText}>APLICAR</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.clearButton} onPress={handleClearFilters}>
                  <Text style={styles.clearButtonText}>LIMPAR FILTROS</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default FilterModal;
