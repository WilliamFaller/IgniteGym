import { HStack, Heading, Text, VStack, Icon } from "native-base";
import { MaterialIcons } from '@expo/vector-icons'
import { UserPhoto } from "./UserPhoto";
import { Touchable, TouchableOpacity } from "react-native";

export function HomeHeader() {
  return(
    <HStack bg="gray.600" pt={16} pb={5} px={8} alignItems="center">
      <UserPhoto 
        source={{ uri: 'https://github.com/williamfaller.png'}}
        size={16}
        alt="Imagem do usuário"
        mr={4}
      />

      <VStack flex={1}>
        <Text color="gray.100" fontSize="md">
          Olá,
        </Text>

        <Heading fontFamily="heading" color="gray.100" fontSize="md">
          William
        </Heading>

      </VStack>
      <TouchableOpacity>
        <Icon
          as={MaterialIcons}
          name="logout" 
          size={7} 
          color="gray.100"
        />
      </TouchableOpacity>
    </HStack>
  )
}