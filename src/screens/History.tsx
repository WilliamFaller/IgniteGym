import { useState } from 'react'
import { Heading, VStack, SectionList, Text, Center } from 'native-base'

import { ScreenHeader } from '@components/ScreenHeader'
import { HistoryCard } from '@components/HistoryCard'

export function History() {
  const [exercises, setExercises] = useState([
    {
      title: '26.08.2022',
      data: ['Puxada frontal', 'Remada Unilateral']
    },
    {
      title: '27.08.2022',
      data: ['Puxada frontal']
    }
  ]);


  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de Exercícios" />

      <SectionList
        sections={exercises}
        keyExtractor={item => item}
        renderItem={({ item }) => <HistoryCard />}
        renderSectionHeader={({ section: { title } }) => (
          <Heading color="gray.200" fontSize="md" mt={10} mb={3} ml={2}>{title}</Heading>
        )}
        px={8}
        contentContainerStyle={exercises.length === 0 && { flex: 1 , justifyContent: 'center'}}
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