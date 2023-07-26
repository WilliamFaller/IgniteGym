import { TouchableOpacity, TouchableOpacityProps  } from "react-native";
import { HStack, Heading, Image, Text, VStack, Icon } from "native-base";
import { Entypo } from '@expo/vector-icons'

type Props = TouchableOpacityProps & {
  name: string;
};

export function ExerciseCard({name, ...rest }:Props) {
  return (
    <TouchableOpacity {...rest}>
      <HStack bg="gray.500" alignItems="center" p={2} pr={4} rounded="md" mb={3}>
        <Image
          source={{ uri: 'https://conteudo.imguol.com.br/c/entretenimento/0c/2019/12/03/remada-unilateral-com-halteres-1575402100538_v2_600x600.jpg' }}
          alt="Exercício"
          w={16}
          h={16}
          rounded="md"
          mr={4}
          resizeMode="center"
        />
        <VStack flex={1}>
          <Heading color="white" fontSize="lg">
            {name}
          </Heading>
          <Text color="gray.200" fontSize="sm" mt={1} numberOfLines={2}>
            3 séries x 10 repetições
          </Text>
        </VStack>
        <Icon
          as={Entypo} 
          name="chevron-right"
          color="gray.300"        
        />
      </HStack>
    </TouchableOpacity>
  )
}