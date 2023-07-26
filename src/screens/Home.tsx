import { useState } from 'react'
import { HStack, VStack, FlatList, Heading, Text } from 'native-base'

import { ExerciseCard } from '@components/ExerciseCard'
import { Group } from '@components/Group'
import { HomeHeader } from '@components/HomeHeader'

export function Home() {
  const [groupSelected, setGroupSelected] = useState('costas')
  const [groups, setGroups] = useState(['Costas', 'Biceps', 'Triceps', 'ombro'])
  const [exercicios, setExercicios] = useState(['Remana Unilateral', 'Puxada Frontal', 'Remada Curvada', 'Levantamento Terra', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'])

  return (
    <VStack flex={1}>
      <HomeHeader />
      <FlatList 
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <Group 
            name={item} 
            isActive={groupSelected.toLowerCase() === item.toLowerCase()}
            onPress={() => setGroupSelected(item.toLowerCase())}
          />
        )}  
        horizontal
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{px:8}}
        my={10}
        maxH={10}
      />
      <VStack flex={1} px={8}>
        <HStack justifyContent="space-between" mb={5}>
          <Heading color="gray.200" fontSize="md">
            Exercícios
            </Heading>
            <Text color="gray.200" fontSize="sm">
              4
            </Text>        
        </HStack>
          <FlatList
            data={exercicios}
            keyExtractor={item => item}
            renderItem={({ item }) => (
              <ExerciseCard name={item}/>
            )}
            showsVerticalScrollIndicator={false}
            _contentContainerStyle={{pb:16}}
          />
      </VStack>
    </VStack>
  )
}