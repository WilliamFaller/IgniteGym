import { TouchableOpacity } from 'react-native'
import { HStack, Heading, Icon, Text, VStack, Image, Box, ScrollView, useToast } from 'native-base'

import { useNavigation, useRoute } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'

import { AppNavigatorRoutesProps } from '@routes/app.routes'

import { api } from '@services/api'

import BodySvg from '@assets/body.svg'
import SeriesSvg from '@assets/series.svg'
import RepetitionsSvg from '@assets/repetitions.svg'

import { Button } from '@components/Button'
import { AppError } from '@utils/AppError'
import { useEffect, useState } from 'react'
import { ExerciseDTO } from '@dtos/ExerciseDTO'

type RouteParamsProps = {
  exerciseId: string;
}

export function Exercise() {
  const [exercise, setExercise] = useState<ExerciseDTO>({} as ExerciseDTO)
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const route = useRoute();
  const toast = useToast();

  const { exerciseId } = route.params as RouteParamsProps;

  function handleGoBack() {
    navigation.goBack()

  }
  async function fetchExerciseDetails() {
    try {
      const response = await api.get(`/exercises/${exerciseId}`);
      setExercise(response.data)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Erro ao buscar grupos'
      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      })
    }
  }

  useEffect(() => {
    fetchExerciseDetails()
  }, [exerciseId])

  return (
    <VStack flex={1}>

      <VStack px={8} bg="gray.600" pt={12}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon
            as={Feather}
            name="arrow-left"
            color="green.500"
            size={6}
          />
        </TouchableOpacity>
        <HStack justifyContent="space-between" mt={4} mb={8} alignItems="center">
          <Heading fontFamily="heading" color="gray.100" fontSize="lg" flexShrink={1}>
            {exercise.name}
          </Heading>
          <HStack alignItems="center">
            <BodySvg />
            <Text color="gray.200" textTransform="capitalize" ml={1}>
              {exercise.group}
            </Text>
          </HStack>
        </HStack>
      </VStack>
      <ScrollView>
        <VStack p={8}>
          <Box rounded="lg" mb={3} overflow="hidden">
            {exercise.demo &&(
              <Image
                w="full"
                h={80}
                source={{ uri: `${api.defaults.baseURL}/exercise/demo/${exercise.demo}` }}
                alt="Exercise"                
                resizeMode="cover"
                rounded="lg"
              />
            )}
          </Box>
          <Box bg="gray.600" pb={4} px={4} rounded="md">
            <HStack justifyContent="space-around" alignItems="center" mb={6} mt={5}>
              <HStack alignItems="center" mb={3}>
                <SeriesSvg />
                <Text color="gray.200" ml={2} fontSize="sm">
                  {exercise.series} séries
                </Text>
              </HStack>
              <HStack alignItems="center" mb={3}>
                <RepetitionsSvg />
                <Text color="gray.200" ml={2} fontSize="sm">
                  {exercise.repetitions} repetições
                </Text>
              </HStack>
            </HStack>
            <Button title="Marcar como realizado" />
          </Box>
        </VStack>
      </ScrollView>
    </VStack>
  )
}