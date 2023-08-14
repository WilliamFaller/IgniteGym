import { useCallback, useState } from 'react'
import { Heading, VStack, SectionList, Text, Center, useToast } from 'native-base'

import { api } from '@services/api'

import { ScreenHeader } from '@components/ScreenHeader'
import { HistoryCard } from '@components/HistoryCard'
import { AppError } from '@utils/AppError'
import { useFocusEffect } from '@react-navigation/native'
import { HistoryDTO } from '@dtos/HistoryDTO'
import { HistoryByDayDTO } from '@dtos/HistoryByDayDTO'

export function History() {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [exercises, setExercises] = useState<HistoryByDayDTO[]>([]);

  async function fetchHistory() {
    try {
      setIsLoading(true);
      const response = await api.get('/history');
      setExercises(response.data);
      
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Não foi possivel carregar o histórico de exercícios'
      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      })
    }
  }

  useFocusEffect(useCallback(() => {
    fetchHistory()
  }, []));

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de Exercícios" />

      <SectionList
        sections={exercises}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <HistoryCard data={item} />}
        renderSectionHeader={({ section: { title } }) => (
          <Heading fontFamily="heading" color="gray.200" fontSize="md" mt={10} mb={3} ml={2}>{title}</Heading>
        )}
        px={8}
        contentContainerStyle={exercises.length === 0 && { flex: 1, justifyContent: 'center' }}
        ListEmptyComponent={() => (
          <Text color="gray.200" fontSize="md" ml={2} textAlign="center">
            Nenhum exercício registrado ainda.{'\n'}
            Bora treinar?
          </Text>
        )}
        showsVerticalScrollIndicator={false}
      />
    </VStack>
  )
}